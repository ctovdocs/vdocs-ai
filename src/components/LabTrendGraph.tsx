import { useState } from 'react';
import { Button, Select, Tag } from 'antd';
import type { Report } from '../domain/models';
import { flagStyle, labSampleDate, numericLabValue, parseReferenceRange, trendRows } from '../services/labTrends';
import { formatDate } from '../lib/format';

const colours = ['#226b5c', '#5676be', '#ae6990'];
export type TrendRow = ReturnType<typeof trendRows>[number];
export function LabTrendGraph({ reports, row, onOpenReport }: { reports: Report[]; row: TrendRow; onOpenReport: (id: string) => void }) {
  const [focused, setFocused] = useState('');
  const [focusedMetric, setFocusedMetric] = useState(row.key);
  const [compare, setCompare] = useState<string[]>([]);
  const ordered = [...reports].sort((first, second) => Date.parse(labSampleDate(first)) - Date.parse(labSampleDate(second)));
  const compatible = trendRows(reports).filter(item => item.key !== row.key && item.unit === row.unit && reports.some(report => numericLabValue(item.cells[report.id]?.value) !== null));
  const metrics = [row, ...compatible.filter(item => compare.includes(item.key)).slice(0, 2)];
  const series = metrics.map((metric, index) => ({
    metric, colour: metrics.length === 1 ? '#5f6b66' : colours[index], points: ordered.map(report => ({ report, metric, at: Date.parse(labSampleDate(report)), value: numericLabValue(metric.cells[report.id]?.value) })),
  }));
  const numeric = series.flatMap(item => item.points).filter((point): point is typeof point & { value: number } => point.value !== null && Number.isFinite(point.at));
  if (!numeric.length) return <p>No numeric measurements available.</p>;
  const selected = numeric.find(point => point.report.id === focused && point.metric.key === focusedMetric) ?? numeric.filter(point => point.metric.key === row.key).at(-1) ?? numeric.at(-1)!;
  const references = [...new Set(numeric.map(point => point.metric.cells[point.report.id].reference))];
  const band = metrics.length === 1 && references.length === 1 ? parseReferenceRange(references[0]) : null;
  const values = [...numeric.map(point => point.value), ...(band ?? [])];
  const low = Math.min(...values), high = Math.max(...values);
  const padding = (high - low || Math.abs(high) || 1) * 0.15;
  const minimum = low - padding, maximum = high + padding;
  const firstAt = Math.min(...numeric.map(point => point.at)), lastAt = Math.max(...numeric.map(point => point.at));
  const horizontal = (at: number) => 75 + (lastAt === firstAt ? 0.5 : (at - firstAt) / (lastAt - firstAt)) * 620;
  const vertical = (value: number) => 230 - (value - minimum) / (maximum - minimum) * 180;
  const observation = selected.metric.cells[selected.report.id];
  const dateLabel = (at: number) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: '2-digit', timeZone: 'Asia/Kolkata' }).format(at);
  const selectPoint = (reportId: string, metricKey: string) => { setFocused(reportId); setFocusedMetric(metricKey); };
  return <div className="lab-graph-panel">
    <div className="lab-graph-header"><div><strong>{row.name}</strong><span className="muted"> · {ordered.length} report dates</span></div>
      {compatible.length > 0 && <Select mode="multiple" size="small" maxCount={2} value={compare} onChange={setCompare} aria-label="Compare parameters with matching units" placeholder="Compare same-unit parameters" options={compatible.map(item => ({ value: item.key, label: item.name }))} style={{ minWidth: 260 }} />}
    </div>
    <div className="lab-series-legend">{series.map(item => <span key={item.metric.key}><i style={{ background: item.colour }} />{item.metric.name}</span>)}<span className="muted">Shared scale · {row.unit || 'unitless'}</span><span className="lab-flag-key">{(['low', 'normal', 'high'] as const).map(flag => <span key={flag}><b style={{ background: flagStyle[flag].colour }} />{flag === 'low' ? 'Low' : flag === 'high' ? 'High' : 'Normal'}</span>)}</span></div>
    <div className="lab-graph-content">
      <div className="lab-graph-canvas"><svg viewBox="0 0 760 295" role="group" aria-label={`${row.name} trend graph. Select a point to inspect its source.`}>
        <text x="75" y="26" fill="#6d7a73" fontSize="11">{row.unit || 'Value'}</text>
        {band && <>
          <rect x="75" y={vertical(maximum)} width="620" height={vertical(band[1]) - vertical(maximum)} fill={flagStyle.high.tint} />
          <rect x="75" y={vertical(band[1])} width="620" height={vertical(band[0]) - vertical(band[1])} fill={flagStyle.normal.tint} />
          <rect x="75" y={vertical(band[0])} width="620" height={vertical(minimum) - vertical(band[0])} fill={flagStyle.low.tint} />
          <text x="700" y={(vertical(maximum) + vertical(band[1])) / 2 + 4} fill={flagStyle.high.colour} fontSize="10">High</text>
          <text x="700" y={(vertical(band[1]) + vertical(band[0])) / 2 + 4} fill={flagStyle.normal.colour} fontSize="10">Normal</text>
          <text x="700" y={(vertical(band[0]) + vertical(minimum)) / 2 + 4} fill={flagStyle.low.colour} fontSize="10">Low</text>
        </>}
        {[0, 1, 2, 3, 4].map(index => { const value = minimum + index / 4 * (maximum - minimum); return <g key={index}><line x1="75" x2="695" y1={vertical(value)} y2={vertical(value)} stroke="#e3e9e5" strokeDasharray="3 4" /><text x="64" y={vertical(value) + 4} textAnchor="end" fill="#6d7a73" fontSize="11">{Number(value.toPrecision(3))}</text></g>; })}
        {[0, 1, 2, 3, 4].filter(index => lastAt !== firstAt || index === 2).map(index => { const at = firstAt + index / 4 * (lastAt - firstAt); return <text key={index} x={horizontal(at)} y="258" textAnchor="middle" fill="#6d7a73" fontSize="11">{dateLabel(at)}</text>; })}
        <text x="385" y="283" textAnchor="middle" fill="#6d7a73" fontSize="11">Collection date · oldest to latest · IST</text>
        <line x1={horizontal(selected.at)} x2={horizontal(selected.at)} y1="45" y2="230" stroke="#a3b7ac" strokeDasharray="4 3" />
        {series.map(item => {
          const segments: string[][] = [[]];
          for (const point of item.points) {
            if (point.value === null || !Number.isFinite(point.at)) segments.push([]);
            else segments.at(-1)!.push(`${horizontal(point.at)},${vertical(point.value)}`);
          }
          return <g key={item.metric.key}>{segments.map((segment, index) => <polyline key={index} points={segment.join(' ')} fill="none" stroke={item.colour} strokeWidth="2.5" strokeLinejoin="round" strokeDasharray={item.metric.key === row.key ? undefined : '6 3'} />)}
            {item.points.filter((point): point is typeof point & { value: number } => point.value !== null && Number.isFinite(point.at)).map(point => <g key={point.report.id} role="button" tabIndex={0} aria-label={`${item.metric.name}: ${item.metric.cells[point.report.id].value} ${row.unit}, ${formatDate(labSampleDate(point.report))}. Select result.`} onMouseEnter={() => selectPoint(point.report.id, item.metric.key)} onFocus={() => selectPoint(point.report.id, item.metric.key)} onClick={() => selectPoint(point.report.id, item.metric.key)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectPoint(point.report.id, item.metric.key); } }}>
              <circle cx={horizontal(point.at)} cy={vertical(point.value)} r="12" fill="transparent" />
              <circle cx={horizontal(point.at)} cy={vertical(point.value)} r={selected.report.id === point.report.id && selected.metric.key === item.metric.key ? 6 : 4.5} stroke={metrics.length === 1 ? 'white' : item.colour} strokeWidth="2" fill={flagStyle[item.metric.cells[point.report.id].flag].colour} />
              <title>{item.metric.name}: {item.metric.cells[point.report.id].value} {row.unit} ({flagStyle[item.metric.cells[point.report.id].flag].label}) · {formatDate(labSampleDate(point.report))}</title>
            </g>)}</g>;
        })}
      </svg></div>
      <aside className="lab-graph-source"><span className="muted">{selected.metric.name}</span><div className="lab-graph-measurement" style={{ color: flagStyle[observation.flag].colour }}>{flagStyle[observation.flag].arrow} {observation.value} <small>{row.unit}</small></div>
        <Tag color={flagStyle[observation.flag].colour}>{flagStyle[observation.flag].arrow} {flagStyle[observation.flag].label}</Tag>
        <span>Reference: {observation.reference || 'Not supplied'}</span>
        <Select size="small" aria-label="Select graph measurement" value={selected.report.id} onChange={setFocused} options={numeric.filter(point => point.metric.key === selected.metric.key).map(point => ({ value: point.report.id, label: formatDate(labSampleDate(point.report)) }))} />
        <span className="muted">{selected.report.author ?? selected.report.source}</span><Button size="small" onClick={() => onOpenReport(selected.report.id)}>Open source report</Button>
      </aside>
    </div>
    <div className="lab-graph-legend">{band && <span className="lab-reference-key" />}{band ? `Reference interval ${references[0]} ${row.unit}` : 'Check source-specific reference intervals.'}<span>Auto-scaled Y-axis · actual time spacing · gaps are not connected</span></div>
  </div>;
}
