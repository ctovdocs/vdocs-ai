import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Empty, Input, Segmented, Select, Switch, Table, Tooltip } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { LabTrendGraph } from './LabTrendGraph';
import { LabTrendCombinedGraph } from './LabTrendCombinedGraph';
import { ClinicalModal } from './ClinicalOverlay';
import { LAB_TREND_SEED, labTrendPatientIds } from '../data/labTrendDemo';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';
import { flagStyle, labSampleDate, numericLabValue, panelName, selectTrendReports, trendRows } from '../services/labTrends';
import { formatDate } from '../lib/format';

const VISIBLE_KEY = 'vdoc.labTrends.visible';
type View = 'Combined' | 'Separate' | 'Table';

function readVisible() {
  try { return localStorage.getItem(VISIBLE_KEY) === 'true'; } catch { return false; }
}

export function LabTrends({ patientId, onOpenReport }: { patientId: string; onOpenReport: (id: string) => void }) {
  const workflow = useWorkflow();
  const seed = useWorkflowAction();
  const attempted = useRef(false);
  const [panel, setPanel] = useState('CBC');
  const [count, setCount] = useState(5);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');
  const [detailKey, setDetailKey] = useState<string | null>(null);
  const [visible, setVisible] = useState(readVisible);
  const [view, setView] = useState<View>('Separate');
  const toggleVisible = (next: boolean) => { setVisible(next); try { localStorage.setItem(VISIBLE_KEY, String(next)); } catch { /* storage unavailable */ } };
  const needsSeed = Boolean(workflow.data && labTrendPatientIds.includes(patientId) && !workflow.data.commands.includes(LAB_TREND_SEED));
  useEffect(() => {
    if (needsSeed && !attempted.current) { attempted.current = true; seed.mutate({ type: 'labs.seed', patient_id: patientId }); }
  }, [needsSeed, patientId, seed]);
  const all = workflow.data?.reports.filter(report => report.patient_id === patientId && report.kind === 'lab') ?? [];
  const panels = [...new Set(all.map(panelName))].sort();
  const activePanel = panels.includes(panel) ? panel : panels[0] ?? panel;
  const reports = selectTrendReports(all, activePanel, count, from, to);
  const rows = trendRows(reports).filter(row => row.name.toLowerCase().includes(search.toLowerCase()));
  const detailed = trendRows(reports).find(row => row.key === detailKey);
  const openSource = (id: string) => { setDetailKey(null); onOpenReport(id); };
  const hasNumeric = (row: (typeof rows)[number]) => reports.some(report => numericLabValue(row.cells[report.id]?.value) !== null);
  const header = <div className="workflow-toolbar lab-trends-header"><strong>Lab trends</strong>
    {visible && <Segmented size="small" aria-label="Lab trend view" value={view} onChange={value => setView(value as View)} options={['Separate', 'Table']} />}
    <label className="lab-trends-switch"><span className="muted">Show trends</span><Switch size="small" checked={visible} onChange={toggleVisible} aria-label="Show lab trends" /></label>
  </div>;
  if (!visible) return <section className="surface lab-trends lab-trends-collapsed">{header}</section>;
  return <section className="surface lab-trends">
    {header}
    {seed.isPending && <Alert type="info" title="Adding synthetic lab history to the shared record…" />}
    {seed.isError && <Alert type="error" title="Lab history could not be saved" description={seed.error.message} action={<Button size="small" onClick={() => seed.mutate({ type: 'labs.seed', patient_id: patientId })}>Retry</Button>} />}
    <div className="workflow-toolbar">
      <Select size="small" aria-label="Lab panel" showSearch value={activePanel} onChange={setPanel} options={panels.map(value => ({ value, label: value }))} style={{ minWidth: 185, maxWidth: 320 }} />
      <Select size="small" aria-label="Number of complete reports" value={count} onChange={setCount} options={[5, 7, 10, 25, 1000].map(value => ({ value, label: value === 1000 ? 'All reports (up to 1,000)' : `Latest ${value} reports` }))} style={{ width: 160 }} />
      <Input size="small" type="date" aria-label="Samples from date" value={from} max={to || undefined} onChange={event => setFrom(event.target.value)} style={{ width: 140 }} />
      <Input size="small" type="date" aria-label="Samples to date" value={to} min={from || undefined} onChange={event => setTo(event.target.value)} style={{ width: 140 }} />
      <Input.Search size="small" allowClear placeholder="Find a parameter" aria-label="Find a lab parameter" value={search} onChange={event => setSearch(event.target.value)} style={{ width: 175 }} />
      <Button size="small" onClick={() => { setFrom(''); setTo(''); setCount(5); setSearch(''); }}>Reset</Button>
    </div>
    {view === 'Combined' && <div className="lab-trend-view"><LabTrendCombinedGraph key={`${activePanel}|${reports.map(report => report.id).join(',')}`} reports={reports} rows={rows} onOpenReport={onOpenReport} /></div>}
    {view === 'Separate' && <div className="lab-trend-view lab-trend-separate">
      {rows.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No comparable results in this range" />}
      {rows.map(row => hasNumeric(row)
        ? <LabTrendGraph key={row.key} reports={reports} row={row} onOpenReport={onOpenReport} />
        : <div key={row.key} className="lab-graph-panel lab-trend-qualitative"><strong>{row.name}</strong>{(() => { const latest = reports.map(report => row.cells[report.id]).find(Boolean); return latest ? <span className={`lab-value-${latest.flag}`}>Latest: {flagStyle[latest.flag].arrow} {latest.value}</span> : null; })()}<span className="muted">Qualitative result — not graphed</span><Button size="small" onClick={() => setDetailKey(row.key)}>View history</Button></div>)}
    </div>}
    {view === 'Table' && <><Table size="small" rowKey="key" dataSource={rows} pagination={false} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No comparable results in this range" /> }} scroll={{ x: Math.max(800, reports.length * 135 + 320) }} columns={[
      { title: 'Parameter / unit', fixed: 'left', width: 180, render: (_, row) => <><strong>{row.name}</strong><div className="muted">{row.unit || 'Qualitative / unitless'}</div></> },
      { title: 'Trend', width: 130, render: (_, row) => <Button size="small" type="text" icon={<LineChartOutlined />} onClick={() => setDetailKey(row.key)}>{reports.some(report => numericLabValue(row.cells[report.id]?.value) !== null) ? 'View trend' : 'View history'}</Button> },
      ...reports.map(report => ({ key: report.id, width: 135, title: <Button className="lab-date-button" type="link" size="small" onClick={() => onOpenReport(report.id)}>{formatDate(labSampleDate(report))}</Button>, render: (_: unknown, row: ReturnType<typeof trendRows>[number]) => {
        const observation = row.cells[report.id];
        return observation ? <Tooltip title={`Reference: ${observation.reference || 'Not supplied'} · ${report.source} · ${report.author ?? 'Author not recorded'}`}><button type="button" className={`lab-value lab-value-${observation.flag}`} onClick={() => onOpenReport(report.id)}><strong>{flagStyle[observation.flag].arrow} {observation.value}</strong><small>{observation.reference || 'Reference not supplied'}</small></button></Tooltip> : <span className="muted">—</span>;
      } })),
    ]} />
    <p className="lab-trend-note">{reports.length} complete reports shown · Collection time when available, otherwise report time (IST). Red ↑ above · orange ↓ below · green within the source reference interval — flags from the source report, not diagnoses. Select View trend for a detailed graph.</p></>}
    <ClinicalModal width={1100} title={`${detailed?.name ?? 'Test'} · trend and results`} patientId={patientId} description="Dated measurements with source reports. No automatic clinical interpretation." open={Boolean(detailed)} onCancel={() => setDetailKey(null)} footer={<Button onClick={() => setDetailKey(null)}>Back to lab trends</Button>}>
      {detailed && <>
        <div className="workflow-toolbar"><span className="muted">{activePanel}</span><Select size="small" aria-label="Reports in graph" value={count} onChange={setCount} options={[5, 7, 10, 25, 1000].map(value => ({ value, label: value === 1000 ? 'All (up to 1,000)' : `Latest ${value} reports` }))} /></div>
        {reports.some(report => numericLabValue(detailed.cells[report.id]?.value) !== null) ? <LabTrendGraph key={detailed.key} reports={reports} row={detailed} onOpenReport={openSource} /> : <Alert type="info" title="Qualitative result history" description="These results are not converted into a numeric graph. Compare their recorded values below." />}
        <h4>Recorded results · newest first</h4>
        <Table size="small" rowKey="id" dataSource={reports} pagination={{ pageSize: 7, showSizeChanger: false }} scroll={{ x: 650 }} columns={[
          { title: 'Collected · IST', render: (_, report) => formatDate(labSampleDate(report)) },
          { title: 'Result', render: (_, report) => `${detailed.cells[report.id]?.value ?? '—'} ${detailed.cells[report.id]?.unit ?? ''}` },
          { title: 'Reference / flag', render: (_, report) => { const cell = detailed.cells[report.id]; return cell ? `${cell.reference} · ${cell.flag}` : 'Not measured'; } },
          { title: 'Reported · IST', render: (_, report) => formatDate(report.reported_at) },
          { title: 'Source', render: (_, report) => <Button type="link" size="small" onClick={() => openSource(report.id)}>Open report</Button> },
        ]} />
      </>}
    </ClinicalModal>
  </section>;
}
