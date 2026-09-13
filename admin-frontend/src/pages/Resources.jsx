import { useMemo, useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from '../components/Icons.jsx';
import { fmtDate, pillClass, uniq } from '../utils/helpers.js';

export default function Resources({
  resources, onDelete, onOpenModal, onConfirmDelete,
}) {
  const [search, setSearch] = useState('');
  const [fCategory, setFCategory] = useState('');
  const [fStatus, setFStatus] = useState('');

  const categories = useMemo(() => uniq(resources.map((r) => r.category)), [resources]);

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return resources.filter((r) => r.name.toLowerCase().includes(q)
      && (!fCategory || r.category === fCategory)
      && (!fStatus || r.status === fStatus));
  }, [resources, search, fCategory, fStatus]);

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Campus Resources</h1><p>Manage useful resources and links for students</p></div>
        <button className="btn btn-accent" onClick={() => onOpenModal()}><PlusIcon />Add Resource</button>
      </div>

      <div className="filter-bar">
        <div className="search-box" style={{ maxWidth: 320 }}>
          <SearchIcon />
          <input type="text" placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={fCategory} onChange={(e) => setFCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Active</option><option>Inactive</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Resource Name</th><th>Category</th><th>Description</th><th>Last Updated</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.length ? rows.map((r) => (
              <tr key={r.id}>
                <td className="cell-title">{r.name} <a href={r.url} onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary)' }}>↗</a></td>
                <td><span className="pill pill-neutral">{r.category}</span></td>
                <td style={{ maxWidth: 320, color: 'var(--text-muted)' }}>{r.desc}</td>
                <td>{fmtDate(r.updated)}</td>
                <td><span className={`pill ${pillClass(r.status)}`}>{r.status}</span></td>
                <td className="actions">
                  <button className="icon-btn btn-sm" title="Edit" onClick={() => onOpenModal(r.id)}><EditIcon /></button>
                  <button className="icon-btn btn-sm" title="Delete" onClick={() => onConfirmDelete(() => onDelete(r.id))}><TrashIcon /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6}><div className="empty-state">No resources match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
        <div className="table-foot"><span>Showing {rows.length} of {resources.length} resources</span></div>
      </div>
    </section>
  );
}
