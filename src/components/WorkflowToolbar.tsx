import { Input, Select } from 'antd';
import { referralDepartments } from '../data/orderCatalog';
import type { ReactNode } from 'react';

export function WorkflowToolbar({ title, search, onSearch, department, onDepartment, children }: {
  title: string; search: string; onSearch: (value: string) => void;
  department: string; onDepartment: (value: string) => void; children?: ReactNode;
}) {
  return <div className="workflow-toolbar">
    <strong>{title}</strong>
    <Input size="small" aria-label={`Search ${title}`} placeholder="Name / UHID / details" allowClear value={search} onChange={event => onSearch(event.target.value)} style={{ width: 210 }} />
    <Select size="small" showSearch aria-label="Department filter" value={department} onChange={onDepartment} style={{ width: 180 }} options={[{ value: '', label: 'All departments' }, ...referralDepartments.map(value => ({ value, label: value }))]} />
    {children}
  </div>;
}
