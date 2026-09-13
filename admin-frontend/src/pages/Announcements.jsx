import { useMemo, useState } from 'react';
import { SearchIcon, PlusIcon, EyeIcon, EditIcon, TrashIcon } from '../components/Icons.jsx';
import { fmtDate, pillClass, uniq } from '../utils/helpers.js';

export default function Announcements({
  announcements, onAdd, onEdit, onDelete, onOpenModal, showToast, onConfirmDelete,
}) {
  const [search, setSearch] = useState('');
  const [fCategory, setFCategory] = useState('');
  const [fPriority, setFPriority] = useState('');
  const [fStatus, setFStatus] = useState('');

  const categories = useMemo(() => uniq(announcements.map((a) => a.category)), [announcements]);

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return announcements
      .filter((a) => a.title.toLowerCase().includes(q)
        && (!fCategory || a.category === fCategory)
        && (!fPriority || a.priority === fPriority)
        && (!fStatus || a.status === fStatus))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [announcements, search, fCategory, fPriority, fStatus]);

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Announcements</h1><p>Create and manage important information for students</p></div>
        <button className="btn btn-accent" onClick={() => onOpenModal()}><PlusIcon />Create Announcement</button>
      </div>

      <div className="filter-bar">
        <div className="search-box" style={{ maxWidth: 320 }}>
          <SearchIcon />
          <input type="text" placeholder="Search announcements..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={fCategory} onChange={(e) => setFCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={fPriority} onChange={(e) => setFPriority(e.target.value)}>
          <option value="">All Priorities</option>
          <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Published</option><option>Draft</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Category</th><th>Priority</th><th>Audience</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.length ? rows.map((a) => (
              <tr key={a.id}>
                <td className="cell-title">{a.title}</td>
                <td><span className="pill pill-neutral">{a.category}</span></td>
                <td><span className={`pill ${pillClass(a.priority)}`}>{a.priority}</span></td>
                <td>{a.audience}</td>
                <td>{fmtDate(a.date)}</td>
                <td><span className={`pill ${pillClass(a.status)}`}>{a.status}</span></td>
                <td className="actions">
                  <button className="icon-btn btn-sm" title="View" onClick={() => showToast(`Viewing: ${a.title}`)}><EyeIcon /></button>
                  <button className="icon-btn btn-sm" title="Edit" onClick={() => onOpenModal(a.id)}><EditIcon /></button>
                  <button className="icon-btn btn-sm" title="Delete" onClick={() => onConfirmDelete(() => onDelete(a.id))}><TrashIcon /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={7}><div className="empty-state">No announcements match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
        <div className="table-foot"><span>Showing {rows.length} of {announcements.length} announcements</span></div>
      </div>
    </section>
  );
}
