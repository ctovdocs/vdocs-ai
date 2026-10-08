import { Tag } from 'antd';
import type { AuthorRole } from '../domain/roles';

const roles: Record<AuthorRole, string> = { doctor: 'Doctor', nurse: 'Nurse', system: 'Lab / system' };

export function RoleTag({ role }: { role: AuthorRole }) {
  return <Tag className={`role-tag role-tag-${role}`}>{roles[role]}</Tag>;
}
