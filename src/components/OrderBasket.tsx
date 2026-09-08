import { useState } from 'react';
import { Button, Input, Select, Tag } from 'antd';
import { orderCatalog } from '../data/orderCatalog';

export type OrderItem = { catalog_id?: string; title: string; specimen?: string; modality?: string; site?: string; instructions?: string };

export function OrderBasket({ kind, value = [], onChange, pendingTitles = [] }: { kind: 'lab' | 'imaging'; value?: OrderItem[]; onChange?: (items: OrderItem[]) => void; pendingTitles?: string[] }) {
  const [category, setCategory] = useState('');
  const [custom, setCustom] = useState('');
  const catalog = orderCatalog.filter(item => item.kind === kind);
  const update = (index: number, fields: Partial<OrderItem>) => onChange?.(value.map((item, position) => position === index ? { ...item, ...fields } : item));
  const duplicate = (title: string) => [...pendingTitles, ...value.map(item => item.title)].some(existing => existing.toLowerCase() === title.trim().toLowerCase());
  return <div className="order-basket">
    <div className="order-catalog-search">
      <Select aria-label="Investigation category" value={category} onChange={setCategory} options={[{ value: '', label: 'All categories' }, ...[...new Set(catalog.map(item => item.category))].map(value => ({ value }))]} />
      <Select aria-label="Add investigation" showSearch value={null} placeholder="Search name, abbreviation or sample…" optionFilterProp="searchText"
        onChange={id => { const item = catalog.find(item => item.id === id)!; onChange?.([...value, { catalog_id: item.id, title: item.title, specimen: item.specimen, modality: item.modality }]); }}
        options={catalog.filter(item => !category || item.category === category).map(item => ({ value: item.id,
          label: `${item.title} · ${item.specimen ?? item.modality}${duplicate(item.title) ? ' · already ordered / selected' : ''}`,
          searchText: `${item.title} ${item.aliases} ${item.category} ${item.specimen ?? ''}`, disabled: duplicate(item.title) || value.length >= 30 }))} />
    </div>
    <div className="order-basket-heading"><strong>{value.length} selected</strong><span>Each investigation is tracked separately</span></div>
    {!value.length && <p className="overlay-helper">Add one or more investigations. Nothing is selected automatically.</p>}
    {value.map((item, index) => <div className="order-basket-item" key={item.catalog_id ?? item.title}>
      <div className="order-basket-heading"><strong>{item.title}</strong><Button type="text" danger size="small" aria-label={`Remove ${item.title}`} onClick={() => onChange?.(value.filter((_, position) => position !== index))}>Remove</Button></div>
      <Tag>{item.specimen ?? item.modality ?? 'Custom order'}</Tag>
      {!item.catalog_id && <Input aria-label={`${item.title} sample or modality`} placeholder={kind === 'lab' ? 'Required: specimen type' : 'Required: imaging modality'} value={kind === 'lab' ? item.specimen : item.modality} onChange={event => update(index, kind === 'lab' ? { specimen: event.target.value } : { modality: event.target.value })} />}
      <Input aria-label={`${item.title} site`} placeholder={kind === 'lab' ? 'Sample site / collection detail, if applicable' : 'Body site, side and requested protocol'} value={item.site} onChange={event => update(index, { site: event.target.value })} />
      <Input aria-label={`${item.title} instructions`} placeholder={kind === 'lab' ? 'Collection timing / instructions, if applicable' : 'Relevant safety information / question for radiology'} value={item.instructions} onChange={event => update(index, { instructions: event.target.value })} />
    </div>)}
    <details className="overlay-source-list"><summary>Cannot find it? Add a custom investigation</summary>
      <div className="order-custom"><Input aria-label="Custom investigation name" value={custom} maxLength={200} onChange={event => setCustom(event.target.value)} placeholder="Exact test or study name" />
        <Button disabled={!custom.trim() || duplicate(custom) || value.length >= 30} onClick={() => { onChange?.([...value, { title: custom.trim() }]); setCustom(''); }}>Add</Button></div>
      <p className="overlay-helper">Receiving service must confirm availability and protocol.</p>
    </details>
  </div>;
}
