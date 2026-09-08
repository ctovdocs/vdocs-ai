import { useState } from 'react';
import { Button, Descriptions, Empty, Table, Tag, Typography } from 'antd';
import { ClinicalDrawer as Drawer } from './ClinicalOverlay';
import { ExperimentOutlined, FileImageOutlined, WarningFilled } from '@ant-design/icons';
import type { Report } from '../domain/models';
import { formatDate } from '../lib/format';
import { useWorkflow, useWorkflowAction } from '../services/useWorkflow';

export function ReportList({ reports }: { reports: Report[] }) {
  const [selected, setSelected] = useState<Report | null>(null);
  const workflow = useWorkflow();
  const action = useWorkflowAction();
  const review = selected && workflow.data?.reviews[selected.id];
  if (!reports.length) return <Empty className="report-grid-empty" description="No reports available" />;
  return <>
    <div className="report-rows">
      {reports.map(report => {
        const abnormal = report.observations.some(observation => observation.flag !== 'normal');
        return (
          <button key={report.id} type="button" className="report-row" onClick={() => setSelected(report)}>
            <span className={`report-card-icon ${report.kind}`}>{report.kind === 'lab' ? <ExperimentOutlined /> : <FileImageOutlined />}</span>
            <span className="report-row-title">{report.title}{abnormal && <WarningFilled className="report-card-flag" />}</span>
            <Tag className="report-card-tag">{report.kind === 'lab' ? 'Lab' : 'Imaging'}</Tag>
            <span className="report-row-time">{formatDate(report.reported_at)}</span>
          </button>
        );
      })}
    </div>
    <Drawer title={selected?.title} patientId={selected?.patient_id} description="Source report · Review the findings and reporting details." open={Boolean(selected)} onClose={() => setSelected(null)} size="large">
      {selected && <>
        <Tag color="gold">Synthetic report</Tag>
        {review ? <Tag color="green">Reviewed · {review.actor}</Tag> : <Button type="primary" loading={action.isPending} onClick={() => action.mutate({ type: 'report.review', patient_id: selected.patient_id, entity_id: selected.id })}>Mark reviewed</Button>}
        <Descriptions column={1} className="section-gap" items={[
          { key: 'source', label: 'Source', children: selected.source },
          { key: 'date', label: 'Reported · IST', children: formatDate(selected.reported_at) },
          { key: 'indication', label: 'Indication', children: selected.indication ?? 'Not documented' },
          { key: 'author', label: 'Reporting clinician', children: selected.author ?? 'Not documented' },
          { key: 'id', label: 'Record ID', children: selected.id },
        ]} />
        {selected.observations.length > 0 && <Table rowKey="name" dataSource={selected.observations} pagination={false} size="small" columns={[
          { title: 'Test', dataIndex: 'name' },
          { title: 'Result', render: (_, observation) => <span>{observation.value} {observation.unit} {observation.flag !== 'normal' && <Tag color="orange">{observation.flag === 'high' ? 'High' : 'Low'}</Tag>}</span> },
          { title: 'Reference', dataIndex: 'reference' },
        ]} />}
        <Typography.Paragraph className="section-gap">{selected.findings}</Typography.Paragraph>
      </>}
    </Drawer>
  </>;
}
