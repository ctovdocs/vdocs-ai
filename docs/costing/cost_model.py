#!/usr/bin/env python3
"""Recompute planning estimates using the saved price snapshot; no network calls.

Run from any directory: python3 docs/costing/cost_model.py
Writes scenario-totals.csv and refreshes generated tables in COST_ESTIMATE.md.
Values are estimates, not quotes or capacity-test results. No AWS resources change.
"""

import csv
import json
import re
from pathlib import Path


HERE = Path(__file__).resolve().parent
CONFIG = json.loads((HERE / "inputs.json").read_text())
SNAPSHOT = json.loads((HERE / "pricing-snapshot-2026-10-19.json").read_text())
RATES = {key: row["usd"] for key, row in SNAPSHOT["rates"].items()}
MODELS = SNAPSHOT["models"]
FX = CONFIG["usd_inr"]


def rupees(value):
    digits = str(round(value))
    if len(digits) <= 3:
        return "₹" + digits
    prefix, tail = digits[:-3], digits[-3:]
    groups = []
    while prefix:
        groups.insert(0, prefix[-2:])
        prefix = prefix[:-2]
    return "₹" + ",".join([*groups, tail])


def pair(usd):
    return f"${usd:,.2f} / {rupees(usd * FX)}"


def table(headers, rows):
    return "\n".join([
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
        *("| " + " | ".join(map(str, row)) + " |" for row in rows),
    ])


def volume(scenario):
    c = CONFIG
    days = scenario["beds"] * c["occupancy"] * c["days_per_month"]
    return {"opd": scenario["daily_opd"] * c["days_per_month"],
            "ipd_days": days,
            "discharges": days / c["average_length_of_stay_days"],
            "claims": days / c["average_length_of_stay_days"] * c["insured_admission_share"]}


def usage(scenario, profile):
    v, p = volume(scenario), CONFIG["profiles"][profile]
    calls_by_flow = {
        "opd": v["opd"] * p["opd_calls"],
        "ipd": v["ipd_days"] * p["ipd_day_calls"],
        "discharge": v["discharges"] * p["discharge_calls"],
        "claims": v["claims"] * p["claim_calls"],
    }
    calls = sum(calls_by_flow.values()) * CONFIG["retry_multiplier"]
    minutes = (v["opd"] * p["opd_voice_minutes"]
               + v["ipd_days"] * p["ipd_day_voice_minutes"]
               + v["discharges"] * p["discharge_voice_minutes"])
    billed_minutes = minutes * CONFIG["retry_multiplier"]
    cleanup = CONFIG["cleanup"]
    clips = billed_minutes / cleanup["clip_minutes"]
    cleanup_model = MODELS[cleanup["model"]]
    cleanup_usd = clips * (cleanup["input_tokens_per_clip"] * cleanup_model["input"]
                          + cleanup["output_tokens_per_clip"] * cleanup_model["output"]) / 1e6
    return {"calls_by_flow": calls_by_flow, "calls_before_retry": sum(calls_by_flow.values()),
            "calls": calls, "input_million": calls * p["input_tokens"] / 1e6,
            "output_million": calls * p["output_tokens"] / 1e6,
            "voice_minutes": minutes, "billed_voice_minutes": billed_minutes,
            "speech_usd": billed_minutes / 60 * RATES["assemblyai_sync_hour"],
            "cleanup_usd": cleanup_usd}


def ai_price(u, model):
    if model == "hybrid_80_haiku_20_sonnet":
        return 0.8 * ai_price(u, "claude_haiku_5_5") + 0.2 * ai_price(u, "claude_sonnet_5_5")
    m = MODELS[model]
    return u["input_million"] * m["input"] + u["output_million"] * m["output"]


def infrastructure(s):
    r, h, v = RATES, CONFIG["hours_per_month"], volume(s)
    store = CONFIG["storage"]
    new_gb = (v["opd"] * store["opd_mb"] + v["ipd_days"] * store["ipd_day_mb"]
              + v["discharges"] * store["discharge_mb"]) / store["mb_per_gb"]
    retained_gb = new_gb * store["retention_months_for_snapshot"] * store["version_multiplier"]
    objects = v["opd"] + v["ipd_days"] + v["discharges"]
    rows = {
        "Amplify: 300 build minutes, 5 GB artifacts, frontend delivery": 300 * r["amplify_build_minute"] + 5 * r["amplify_storage_gb_month"] + s["frontend_gb"] * r["amplify_gb_served"],
        "Fargate API + AI gateway + worker": h * (s["compute_vcpu"] * r["fargate_vcpu_hour"] + s["compute_gb"] * r["fargate_gb_hour"]),
        "RDS PostgreSQL instances": h * r[s["db_rate"]],
        "RDS gp3 allocated storage": s["db_gb"] * r["rds_gp3_multi_gb_month" if s["multi_az"] else "rds_gp3_single_gb_month"],
        "RDS backups above included allowance": s["backup_excess_gb"] * r["rds_backup_excess_gb_month"],
        "S3 documents: retained month-12 snapshot": retained_gb * r["s3_gb_month"],
        "S3 document PUT and GET requests": objects * r["s3_put_request"] + objects * 10 * r["s3_get_request"],
        "API/document internet delivery, separate from Amplify": s["download_gb"] * r["internet_out_gb"],
        "ALB hours plus assumed average LCUs": h * (r["alb_hour"] + s["alb_lcu"] * r["alb_lcu_hour"]),
        "NAT gateway provisioned hours": s["nat_count"] * h * r["nat_hour"],
        "NAT processed traffic": s["nat_gb"] * r["nat_gb"],
        "Public IPv4: ALB and NAT, minimum assumed count": s["public_ipv4_count"] * h * r["ipv4_hour"],
        "CloudWatch log ingestion and retained compressed volume": s["log_gb"] * (r["log_ingest_gb"] + r["log_storage_gb_month"]),
        "CloudWatch custom metrics, alarms, one dashboard": s["custom_metrics"] * r["custom_metric_month"] + s["alarms"] * r["alarm_month"] + r["dashboard_month"],
        "WAF: Amplify integration, 2 ACLs, 10 rules, requests": r["amplify_waf_app_month"] + 2 * r["waf_acl_month"] + 10 * r["waf_rule_month"] + s["waf_requests_million"] * 1e6 * r["waf_request"],
        "Cognito Essentials staff MAUs at gross paid rate": s["staff_mau"] * r["cognito_essentials_mau"],
        "Secrets Manager: 10 secrets and 20,000 requests": 10 * r["secret_month"] + 20000 * r["secret_request"],
        "KMS: 4 key versions and 100,000 requests": 4 * r["kms_key_month"] + 100000 * r["kms_request"],
        "SQS: 1 million billed request units": 1e6 * r["sqs_request"],
        "SES: 10,000 basic outbound emails": 10000 * r["ses_email"],
        "ECR: 10 GB image storage": 10 * r["ecr_gb_month"],
        "Route 53: zone and 1 million standard DNS queries": r["dns_zone_month"] + 1e6 * r["dns_query"],
        "Cross-AZ/internal transfer ALLOWANCE": s["cross_az_allowance_usd"],
        "Security/data-event monitoring ALLOWANCE": s["security_allowance_usd"],
        "Separate staging/development AWS ALLOWANCE": s["staging_allowance_usd"],
    }
    aws_services = sum(rows.values())
    remaining, percentage_support = aws_services, 0
    for width, fraction in [(10000, .09), (70000, .07), (170000, .05), (float("inf"), .03)]:
        portion = min(remaining, width)
        percentage_support += portion * fraction
        remaining -= portion
    support = max(29, percentage_support)
    rows["AWS Business Support+ planning charge"] = support
    rows["Container CI build runner ALLOWANCE"] = s["ci_allowance_usd"]
    rows["Domain registration ALLOWANCE: $20/year"] = 20 / 12
    return {"rows": rows, "usd": sum(rows.values()), "aws_before_support_usd": aws_services,
            "new_document_gb": new_gb, "retained_document_gb": retained_gb}


def estimate(s, profile, model=None):
    infra, u = infrastructure(s), usage(s, profile)
    ai = ai_price(u, model or CONFIG["primary_ai_model"])
    subtotal = infra["usd"] + ai + u["speech_usd"] + u["cleanup_usd"]
    budget = subtotal * (1 + CONFIG["contingency_fraction"])
    return {"scenario": s["name"], "profile": profile, "infrastructure_usd": infra["usd"],
            "chart_ai_usd": ai, "voice_usd": u["speech_usd"], "cleanup_usd": u["cleanup_usd"],
            "subtotal_usd": subtotal, "budget_usd": budget, "budget_inr": budget * FX,
            "illustrative_taxed_budget_inr": budget * FX * (1 + CONFIG["illustrative_tax_fraction"]),
            "annual_budget_usd": budget * 12, "annual_budget_inr": budget * 12 * FX}


def generated_tables():
    scenarios, tables = CONFIG["scenarios"], {}
    main = next(s for s in scenarios if s["beds"] == 100)
    rate_rows = [
        ("Amplify standard build", "amplify_build_minute", 1, "minute"),
        ("Amplify frontend transfer", "amplify_gb_served", 1, "GB served"),
        ("Amplify artifact storage", "amplify_storage_gb_month", 1, "GB-month"),
        ("Amplify WAF integration surcharge", "amplify_waf_app_month", 1, "app-month"),
        ("Fargate Linux x86 CPU", "fargate_vcpu_hour", 1, "vCPU-hour"),
        ("Fargate Linux x86 memory", "fargate_gb_hour", 1, "GB-hour"),
        ("RDS t4g.medium Single-AZ", "rds_t4g_medium_single_hour", 1, "hour"),
        ("RDS t4g.medium Multi-AZ pair", "rds_t4g_medium_multi_hour", 1, "hour"),
        ("RDS m7g.large Multi-AZ pair", "rds_m7g_large_multi_hour", 1, "hour"),
        ("RDS m7g.xlarge Multi-AZ pair", "rds_m7g_xlarge_multi_hour", 1, "hour"),
        ("RDS gp3 Single-AZ", "rds_gp3_single_gb_month", 1, "allocated GB-month"),
        ("RDS gp3 Multi-AZ", "rds_gp3_multi_gb_month", 1, "allocated GB-month"),
        ("RDS excess backup", "rds_backup_excess_gb_month", 1, "GB-month above included allowance"),
        ("S3 Standard, first tier", "s3_gb_month", 1, "GB-month"),
        ("S3 PUT requests", "s3_put_request", 1000, "1,000 requests"),
        ("S3 GET requests", "s3_get_request", 1000, "1,000 requests"),
        ("ALB", "alb_hour", 1, "hour"),
        ("ALB capacity", "alb_lcu_hour", 1, "LCU-hour"),
        ("NAT gateway", "nat_hour", 1, "gateway-hour"),
        ("NAT data processing", "nat_gb", 1, "GB processed"),
        ("Public IPv4", "ipv4_hour", 1, "address-hour"),
        ("Interface endpoint", "interface_endpoint_az_hour", 1, "endpoint-AZ-hour"),
        ("Internet outbound, first paid tier", "internet_out_gb", 1, "GB"),
        ("Regional transfer", "regional_transfer_gb", 1, "billed GB-side"),
        ("CloudWatch Standard log ingestion", "log_ingest_gb", 1, "GB"),
        ("CloudWatch retained logs", "log_storage_gb_month", 1, "compressed GB-month"),
        ("CloudWatch custom metrics", "custom_metric_month", 1, "metric-month"),
        ("CloudWatch standard alarm", "alarm_month", 1, "alarm-month"),
        ("WAF ACL", "waf_acl_month", 1, "ACL-month"),
        ("WAF rule", "waf_rule_month", 1, "rule-month"),
        ("WAF requests", "waf_request", 1000000, "million requests"),
        ("Cognito Essentials gross paid tier", "cognito_essentials_mau", 1, "MAU"),
        ("Secrets Manager", "secret_month", 1, "secret-month"),
        ("KMS managed key version", "kms_key_month", 1, "key-version-month"),
        ("KMS symmetric requests", "kms_request", 10000, "10,000 requests"),
        ("SQS Standard", "sqs_request", 1000000, "million billed request units"),
        ("SES basic outbound", "ses_email", 1000, "1,000 emails, attachment data extra"),
        ("ECR private image storage", "ecr_gb_month", 1, "GB-month"),
        ("Textract text detection", "ocr_text_page", 1, "page"),
        ("Textract forms", "ocr_forms_page", 1, "page"),
        ("Textract tables", "ocr_tables_page", 1, "page"),
        ("Lambda x86 duration", "lambda_gb_second", 1000000, "million GB-seconds"),
        ("Lambda requests", "lambda_request", 1000000, "million requests"),
        ("API Gateway HTTP API", "http_api_request", 1000000, "million requests"),
    ]
    tables["UNIT_RATES"] = table(["Service / meter", "Billing unit", "USD / INR per billing unit", "Official rate evidence"],
        [[label,unit,f'${RATES[key]*scale:g} / ₹{RATES[key]*scale*FX:.5g}',f'[catalog]({SNAPSHOT["rates"][key]["source"]})'] for label,key,scale,unit in rate_rows])
    tables["VOLUMES"] = table(
        ["Hospital", "OPD visits/month", "Occupied IPD patient-days", "Discharges/month", "Claims/month", "Staff MAU"],
        [[s["name"], f'{volume(s)["opd"]:,.0f}', f'{volume(s)["ipd_days"]:,.0f}', f'{volume(s)["discharges"]:,.0f}', f'{volume(s)["claims"]:,.0f}', s["staff_mau"]] for s in scenarios])
    tables["INFRA"] = table(["Monthly infrastructure item", "USD", "INR"],
                            [[label, f"${value:,.2f}", rupees(value * FX)] for label, value in infrastructure(main)["rows"].items()]
                            + [["TOTAL infrastructure and allowances", f'${infrastructure(main)["usd"]:,.2f}', rupees(infrastructure(main)["usd"] * FX)]])
    tables["USAGE"] = table(
        ["100-bed hospital", "Chart calls before retries", "Billed chart calls", "Input/output million tokens", "Voice hours before retries"],
        [[p, f'{usage(main,p)["calls_before_retry"]:,.0f}', f'{usage(main,p)["calls"]:,.0f}', f'{usage(main,p)["input_million"]:.3f} / {usage(main,p)["output_million"]:.3f}', f'{usage(main,p)["voice_minutes"]/60:,.0f}'] for p in CONFIG["profiles"]])
    tables["MODELS"] = table(
        ["Chart AI model", "Input / output USD per 1M tokens", "Monthly chart AI: USD / INR"],
        [[m["name"], f'${m["input"]:g} / ${m["output"]:g}', pair(ai_price(usage(main,"standard"), k))] for k, m in MODELS.items()]
        + [["80% Haiku 5.5 + 20% Sonnet 5.5", "Weighted by equal-size request share", pair(ai_price(usage(main,"standard"), "hybrid_80_haiku_20_sonnet"))]])
    tables["TOTALS"] = table(
        ["Hospital", "Light monthly budget USD / INR", "Standard monthly budget USD / INR", "Heavy monthly budget USD / INR"],
        [[s["name"], *(pair(estimate(s,p)["budget_usd"]) for p in CONFIG["profiles"])] for s in scenarios])
    tables["STANDARD"] = table(
        ["Hospital", "Infrastructure", "Chart AI", "Speech + cleanup", "Before reserve", "Budget +20%", "Annual budget"],
        [[s["name"], pair(e["infrastructure_usd"]), pair(e["chart_ai_usd"]), pair(e["voice_usd"]+e["cleanup_usd"]), pair(e["subtotal_usd"]), pair(e["budget_usd"]), pair(e["annual_budget_usd"])] for s in scenarios for e in [estimate(s,"standard")]])
    tables["MODEL_TOTALS"] = table(
        ["100 beds / 200 OPD, standard use", "Total monthly budget +20%, USD / INR"],
        [[name, pair(estimate(main,"standard",key)["budget_usd"])] for key,name in [
            ("claude_haiku_5_5","All Haiku 5.5"), ("gemini_2_5_flash","All Gemini 2.5 Flash"),
            ("hybrid_80_haiku_20_sonnet","80% Haiku 5.5 + 20% Sonnet 5.5"),
            ("claude_sonnet_5_5","All Sonnet 5.5"), ("claude_sonnet_4_6","All Sonnet 4.6"),
            ("claude_opus_5_5","All Opus 5.5"), ("bedrock_sonnet_5_regional","Bedrock Sonnet 5 regional price SKU")]])
    u = usage(main,"standard")
    hours = u["billed_voice_minutes"] / 60
    tables["VOICE"] = table(["Speech option", "USD/audio or connection hour", "Standard 100-bed monthly speech cost USD / INR"],
        [[label, f'${rate:.2f}', pair(hours*rate)] for label,rate in [
            ("AssemblyAI Sync: current push-to-talk path",RATES["assemblyai_sync_hour"]),
            ("Async Universal-3.5 Pro + keyterms: code change",RATES["assemblyai_async_hour"]+RATES["assemblyai_async_keyterms_hour"]),
            ("Universal-Streaming + keyterms: if connection hours equal audio hours",RATES["assemblyai_stream_hour"]+RATES["assemblyai_stream_keyterms_hour"]),
            ("Universal-3.6 Pro Realtime: code change",RATES["assemblyai_realtime_pro_hour"]),
            ("Amazon Transcribe standard batch: code change",RATES["aws_transcribe_batch_second"]*3600),
            ("Amazon Transcribe standard streaming: code change",RATES["aws_transcribe_stream_second"]*3600)]]
        + [["Gemini cleanup, separate from speech", "500 input + 250 output tokens per 1-minute clip", pair(u["cleanup_usd"])]] )
    quote_rows=[]
    for s in scenarios:
        e=estimate(s,"standard")
        allocated=s["monthly_support_inr"]+s["product_allocation_inr"]+s["admin_allocation_inr"]
        full=e["budget_inr"]+allocated
        quote_rows.append([s["name"],pair(e["budget_usd"]),pair(allocated/FX),pair(full/FX),pair(full/FX/.6),pair(full/FX/.4)])
    tables["QUOTES"] = table(["Hospital", "Technology budget", "Support/product/admin allocation", "Allocated monthly cost", "Price at 40% contribution margin", "Price at 60% contribution margin"],quote_rows)
    standard=estimate(main,"standard")
    co=CONFIG["company_example"]
    people=sum(co["monthly_budget_inr"].values())*(1+co["employment_overhead_fraction"])
    fixed=people+co["office_tools_legal_admin_monthly_inr"]
    build_cloud=(main["staging_allowance_usd"]+29)*FX
    post_cloud=standard["subtotal_usd"]*FX
    onboarding=co["onboarding_hours"]*co["onboarding_loaded_inr_per_hour"]+co["onboarding_travel_training_inr"]
    external = co["external_security_review_allowance_inr"] + co["external_his_vendor_integration_allowance_inr"]
    tables["FUNDING"] = table(["Illustrative startup budget", "USD / INR"],[
        ["Team including 20% employment overhead / month",pair(people/FX)],
        ["Office, tools, legal and admin / month",pair(co["office_tools_legal_admin_monthly_inr"]/FX)],
        ["6-month build: team/admin + $229/month staging, before reserve",pair((fixed+build_cloud)*co["initial_build_months"]/FX)],
        ["12-month operation with one standard 100-bed client, before reserve",pair((fixed+post_cloud)*12/FX)],
        ["Onboarding cash travel/training allowance (delivery labor already in team payroll)",pair(co["onboarding_travel_training_inr"]/FX)],
        ["External security review and HIS vendor integration fee ALLOWANCES",pair(external/FX)],
        ["18-month build + operate + one-time external cash, with one 20% reserve",pair(((fixed+build_cloud)*co["initial_build_months"]+(fixed+post_cloud)*12+co["onboarding_travel_training_inr"]+external)*1.2/FX)],
        ["Standalone onboarding cost example, including allocated delivery labor",pair(onboarding/FX)]])
    tables["RETENTION"] = table(["100-bed document retention snapshot", "Stored GB including versions", "S3 Standard monthly USD / INR"],
        [[f"End of year {year}",f'{infrastructure(main)["new_document_gb"]*year*12*CONFIG["storage"]["version_multiplier"]:,.0f}',pair(infrastructure(main)["new_document_gb"]*year*12*CONFIG["storage"]["version_multiplier"]*RATES["s3_gb_month"])] for year in [1,3,7]])
    return tables


def main():
    assert 0 < CONFIG["occupancy"] <= 1
    assert CONFIG["average_length_of_stay_days"] > 0
    assert CONFIG["retry_multiplier"] >= 1
    assert FX > 0
    rows=[estimate(s,p) for s in CONFIG["scenarios"] for p in CONFIG["profiles"]]
    for row in rows:
        assert abs(row["subtotal_usd"]-sum(row[k] for k in ["infrastructure_usd","chart_ai_usd","voice_usd","cleanup_usd"])) < 1e-8
        assert abs(row["budget_inr"]-row["budget_usd"]*FX) < 1e-8
    for s in CONFIG["scenarios"]:
        assert estimate(s,"light")["budget_usd"] < estimate(s,"standard")["budget_usd"] < estimate(s,"heavy")["budget_usd"]
    output=HERE/"scenario-totals.csv"
    with output.open("w",newline="") as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator="\n")
        writer.writeheader()
        writer.writerows({k:round(v,4) if isinstance(v,float) else v for k,v in row.items()} for row in rows)
    doc=HERE.parent/"developer"/"COST_ESTIMATE.md"
    if doc.exists():
        text=doc.read_text()
        for name,value in generated_tables().items():
            pattern=rf"(<!-- BEGIN {name} -->\n).*?(<!-- END {name} -->)"
            text,count=re.subn(pattern,lambda m:m[1]+value+"\n"+m[2],text,flags=re.S)
            assert count==1, f"Missing or duplicated generated table marker: {name}"
        doc.write_text(text)
    print(f"Updated {len(rows)} scenarios in {output.name}; arithmetic and ordering checks passed.")
    for s in CONFIG["scenarios"]:
        print(s["name"],"standard monthly",pair(estimate(s,"standard")["budget_usd"]))


if __name__ == "__main__":
    main()
