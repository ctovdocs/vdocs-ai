import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Skeleton, Tag, Typography } from 'antd';
import { MessageOutlined, ReloadOutlined, ThunderboltFilled } from '@ant-design/icons';
import type { Patient, Report } from '../domain/models';
import type { PatientHistory } from '../domain/longitudinal';
import { summarizePatient, type AiOutcome, type AiSummaryResult } from '../services/aiAssistant';
import { computeBriefFingerprint, loadCachedBrief, saveCachedBrief } from '../lib/aiBriefCache';
import type { EvidenceRef } from './EvidenceDrawer';

export function AiBriefCard({ patient, history, reports, onEvidence, onOpenChat }: {
  patient: Patient; history?: PatientHistory | null; reports: Report[]; onEvidence: (evidence: EvidenceRef) => void; onOpenChat: () => void;
}) {
  const forceRef = useRef(false);
  const aiQuery = useQuery({
    queryKey: ['ai-summary', patient.id],
    queryFn: async (): Promise<AiOutcome<AiSummaryResult>> => {
      const force = forceRef.current;
      forceRef.current = false;
      const payload = { patient, history, reports };
      const currentFingerprint = computeBriefFingerprint(payload);
      if (!force) {
        const cached = loadCachedBrief(patient.id);
        if (cached && cached.fingerprint === currentFingerprint) return { status: 'ok', data: cached.result };
      }
      const outcome = await summarizePatient(patient, history!, reports);
      if (outcome.status === 'ok') saveCachedBrief(patient.id, currentFingerprint, outcome.data);
      return outcome;
    },
    enabled: Boolean(history),
    staleTime: Infinity,
    retry: false,
  });
  const ai = aiQuery.data;

  const regenerate = () => { forceRef.current = true; aiQuery.refetch(); };

  return <section className="ai-brief-card">
    <div className="ai-brief-toolbar">
      <span className="ai-brief-label"><ThunderboltFilled /> AI patient assistant</span>
      <div className="ai-brief-actions">
        {ai?.status === 'ok' && <Button size="small" type="text" icon={<ReloadOutlined />} onClick={regenerate}>Regenerate</Button>}
        <Button size="small" type="primary" icon={<MessageOutlined />} onClick={onOpenChat}>Ask AI</Button>
      </div>
    </div>
    {!history && <Typography.Text type="secondary">Waiting on the chart to finish loading…</Typography.Text>}
    {history && aiQuery.isFetching && <Skeleton active title={false} paragraph={{ rows: 2 }} />}
    {history && !aiQuery.isFetching && ai?.status === 'unavailable' && <Typography.Text type="secondary">AI assistant requires configuration (set an AI provider and key on the server). Not available in this environment — ask your admin to add an API key to run this demo live.</Typography.Text>}
    {history && !aiQuery.isFetching && ai?.status === 'error' && <><Typography.Text type="danger">AI brief failed to generate: {ai.message}</Typography.Text> <Button size="small" type="link" onClick={regenerate}>Retry</Button></>}
    {history && !aiQuery.isFetching && ai?.status === 'ok' && <>
      <Typography.Paragraph className="ai-brief-text">{ai.data.summary}</Typography.Paragraph>
      {ai.data.criticalFindings.length > 0 && <div className="ai-finding-group">
        <span className="ai-finding-group-label">Critical findings</span>
        <div className="highlight-row">
          {ai.data.criticalFindings.map((finding, index) => <Tag key={index} color="red" className="ai-citation-chip" onClick={() => onEvidence({ record_type: finding.record_type, record_id: finding.record_id })}>{finding.text}</Tag>)}
        </div>
      </div>}
      {ai.data.pendingWork.length > 0 && <div className="ai-finding-group">
        <span className="ai-finding-group-label">Pending work</span>
        <div className="highlight-row">
          {ai.data.pendingWork.map((item, index) => <Tag key={index} className="ai-citation-chip" onClick={() => onEvidence({ record_type: item.record_type, record_id: item.record_id })}>{item.text}</Tag>)}
        </div>
      </div>}
      <Typography.Text type="secondary" className="ai-brief-meta">Generated {new Date(ai.data.generatedAt).toLocaleTimeString('en-IN')} · AI-generated, verify against the chart</Typography.Text>
    </>}
  </section>;
}
