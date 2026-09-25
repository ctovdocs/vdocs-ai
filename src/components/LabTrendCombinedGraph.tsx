import { useState } from 'react';
import { Button, Tag } from 'antd';
import type { Report } from '../domain/models';
import type { TrendRow } from './LabTrendGraph';
import { flagStyle, labSampleDate, numericLabValue, parseReferenceRange, relativeToRange } from '../services/labTrends';
import { formatDate } from '../lib/format';

const palette = ['#226b5c', '#5676be', '#ae6990', '#c47f2c', '#7a5bb5', '#3a8fa3', '#b0473f', '#6f8f2f', '#d06aa3', '#44607a', '#9a7b4f', '#2e9e78'];

type Point = { report: Report; at: number; value: number; relative: number };

export function LabTrendCombinedGraph({ reports, rows, onOpenReport }: { reports: Report[]; rows: TrendRow[]; onOpenReport: (id: string) => void }) {
  const [hidden, setHidden] = useState<string[]>([]);
  const [focus, setFocus] = useState<{ key: string; reportId: string } | null>(null);
  const ordered = [...reports].sort((first, second) => Date.parse(labSampleDate(first)) - Date.parse(labSampleDate(second)));
  const plottable: { row: TrendRow; colour: string; points: (Point | null)[] }[] = [];
  const skipped: string[] = [];
  for (const row of rows) {
    const points = ordered.map(report => {
      const cell = row.cells[report.id];
      const value = numericLabValue(cell?.value);
      const range = parseReferenceRange(cell?.reference);
      const at = Date.parse(labSampleDate(report));
      return value !== null && range && Number.isFinite(at) ? { report, at, value, relative: relativeToRange(value, range) } : null;
    });
    if (points.some(Boolean)) plottable.push({ row, colour: palette[plottable.length % palette.length], points });
    else skipped.push(row.name);
  }
  if (!plottable.length) return <p className="lab-trend-note">No parameters in this range have numeric results with a numeric reference interval to plot.{skipped.length > 0 && ` Use the Table view for ${skipped.length} qualitative or unranged parameters.`}</p>;

  const visible = plottable.filter(series => !hidden.includes(series.row.key));
  const shown = visible.flatMap(series => series.points.filter((point): point is Point => point !== null).map(point => ({ series, point })));
  const all = plottable.flatMap(series => series.points.filter((point): point is Point => point !== null));
  const values = [0, 100, ...shown.map(item => item.point.relative)];
  const low = Math.min(...values), high = Math.max(...values);
  const step = [10, 20, 25, 50, 100, 200, 250, 500, 1000].find(candidate => (high - low) / candidate <= 6) ?? Math.ceil((high - low) / 6);
  const minimum = Math.floor(low / step) * step, maximum = Math.ceil(high / step) * step;
  const firstAt = Math.min(...all.map(point => point.at)), lastAt = Math.max(...all.map(point => point.at));
  const horizontal = (at: number) => 75 + (lastAt === firstAt ? 0.5 : (at - firstAt) / (lastAt - firstAt)) * 620;
  const vertical = (value: number) => 230 - (value - minimum) / (maximum - minimum) * 180;
  const dateLabel = (at: number) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: '2-digit', timeZone: 'Asia/Kolkata' }).format(at);
  const selected = shown.find(item => item.series.row.key === focus?.key && item.point.report.id === focus.reportId) ?? shown.at(-1);
  const observation = selected ? selected.series.row.cells[selected.point.report.id] : null;
  const toggle = (key: string) => setHidden(current => current.includes(key) ? current.filter(item => item !== key) : [...current, key]);
  const ticks = Array.from({ length: Math.round((maximum - minimum) / step) + 1 }, (_, index) => minimum + index * step);

  return <div className="lab-graph-panel lab-combined">
    <div className="lab-graph-header"><div><strong>All parameters</strong><span className="muted"> · {plottable.length} plotted · {ordered.length} report dates</span></div>
      <span><Button size="small" type="link" onClick={() => setHidden([])}>Show all</Button><Button size="small" type="link" onClick={() => setHidden(plottable.map(series => series.row.key))}>Hide all</Button></span>
    </div>
    <div className="lab-combined-legend">{plottable.map(series => {
      const off = hidden.includes(series.row.key);
      return <button type="button" key={series.row.key} className={off ? 'off' : undefined} aria-pressed={!off} onClick={() => toggle(series.row.key)}><i style={{ background: series.colour }} />{series.row.name}</button>;
    })}</div>
    <div className="lab-graph-content">
      <div className="lab-graph-canvas"><svg viewBox="0 0 760 295" role="group" aria-label="Combined lab trend graph. Each line is a parameter's position within its own reference interval. Select a point to inspect its real value.">
        <text x="75" y="26" fill="#6d7a73" fontSize="11">% of reference interval</text>
        <rect x="75" y={vertical(100)} width="620" height={vertical(0) - vertical(100)} fill="#edf5ef" />
        {ticks.map((value, index) => <g key={index}><line x1="75" x2="695" y1={vertical(value)} y2={vertical(value)} stroke="#e3e9e5" strokeDasharray="3 4" /><text x="64" y={vertical(value) + 4} textAnchor="end" fill="#6d7a73" fontSize="11">{value}%</text></g>)}
        {[0, 100].map(value => <text key={value} x="700" y={vertical(value) + 4} fill="#5b8a73" fontSize="10">{value === 0 ? 'low limit' : 'high limit'}</text>)}
        {[0, 1, 2, 3, 4].filter(index => lastAt !== firstAt || index === 2).map(index => { const at = firstAt + index / 4 * (lastAt - firstAt); return <text key={index} x={horizontal(at)} y="258" textAnchor="middle" fill="#6d7a73" fontSize="11">{dateLabel(at)}</text>; })}
        <text x="385" y="283" textAnchor="middle" fill="#6d7a73" fontSize="11">Collection date · oldest to latest · IST</text>
        {selected && <line x1={horizontal(selected.point.at)} x2={horizontal(selected.point.at)} y1="45" y2="230" stroke="#a3b7ac" strokeDasharray="4 3" />}
        {visible.map(series => {
          const segments: string[][] = [[]];
          for (const point of series.points) {
            if (!point) segments.push([]);
            else segments.at(-1)!.push(`${horizontal(point.at)},${vertical(point.relative)}`);
          }
          const isSelected = selected?.series.row.key === series.row.key;
          return <g key={series.row.key} opacity={selected && !isSelected ? 0.55 : 1}>
            {segments.map((segment, index) => <polyline key={index} points={segment.join(' ')} fill="none" stroke={series.colour} strokeWidth={isSelected ? 3 : 2} strokeLinejoin="round" />)}
            {series.points.filter((point): point is Point => point !== null).map(point => {
              const cell = series.row.cells[point.report.id];
              const pick = () => setFocus({ key: series.row.key, reportId: point.report.id });
              return <g key={point.report.id} role="button" tabIndex={0} aria-label={`${series.row.name}: ${cell.value} ${series.row.unit}, ${formatDate(labSampleDate(point.report))}. Select result.`} onMouseEnter={pick} onFocus={pick} onClick={pick} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); pick(); } }}>
                <circle cx={horizontal(point.at)} cy={vertical(point.relative)} r="10" fill="transparent" />
                <circle cx={horizontal(point.at)} cy={vertical(point.relative)} r={isSelected && selected?.point.report.id === point.report.id ? 5.5 : 3.5} stroke="white" strokeWidth="1.5" fill={series.colour} />
                <title>{series.row.name}: {cell.value} {series.row.unit} (ref {cell.reference}) · {formatDate(labSampleDate(point.report))}</title>
              </g>;
            })}
          </g>;
        })}
      </svg></div>
      <aside className="lab-graph-source">{selected && observation ? <>
        <span className="muted">{selected.series.row.name}</span>
        <div className="lab-graph-measurement" style={{ color: flagStyle[observation.flag].colour }}>{flagStyle[observation.flag].arrow} {observation.value} <small>{selected.series.row.unit}</small></div>
        <Tag color={flagStyle[observation.flag].colour}>{flagStyle[observation.flag].arrow} {flagStyle[observation.flag].label}</Tag>
        <span>Reference: {observation.reference}</span>
        <span className="muted">{Math.round(selected.point.relative)}% of reference interval</span>
        <span>{formatDate(labSampleDate(selected.point.report))}</span>
        <span className="muted">{selected.point.report.author ?? selected.point.report.source}</span>
        <Button size="small" onClick={() => onOpenReport(selected.point.report.id)}>Open source report</Button>
      </> : <span className="muted">All parameters hidden. Select a legend item to show it.</span>}</aside>
    </div>
    <div className="lab-graph-legend"><span className="lab-reference-key" />Shaded band = inside each test's own reference interval (0% low limit, 100% high limit). Not raw values — real value and unit shown on selection.<span>Actual time spacing · gaps are not connected</span></div>
    {skipped.length > 0 && <p className="lab-trend-note">Not plotted (qualitative or no numeric reference interval): {skipped.join(', ')}. See the Table view.</p>}
  </div>;
}
