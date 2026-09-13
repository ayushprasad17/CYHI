import { useMemo, useState } from 'react';
import {
  SearchIcon, PlusIcon, EyeIcon, EditIcon, TrashIcon, CalendarIcon, ClockIcon, PinIcon, UsersIcon,
} from '../components/Icons.jsx';
import { fmtDate, pillClass, uniq } from '../utils/helpers.js';

export default function Events({
  events, onDelete, onOpenModal, showToast, onConfirmDelete,
}) {
  const [search, setSearch] = useState('');
  const [fCategory, setFCategory] = useState('');
  const [fStatus, setFStatus] = useState('');
  const [view, setView] = useState('cards');

  const categories = useMemo(() => uniq(events.map((e) => e.category)), [events]);

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return events
      .filter((e) => e.title.toLowerCase().includes(q)
        && (!fCategory || e.category === fCategory)
        && (!fStatus || e.status === fStatus || e.reg === fStatus))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, search, fCategory, fStatus]);

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Events</h1><p>Manage campus events and activities</p></div>
        <button className="btn btn-accent" onClick={() => onOpenModal()}><PlusIcon />Create Event</button>
      </div>

      <div className="filter-bar">
        <div className="search-box" style={{ maxWidth: 320 }}>
          <SearchIcon />
          <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={fCategory} onChange={(e) => setFCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Upcoming</option><option>Open</option><option>Closed</option><option>Completed</option>
        </select>
        <div style={{ flex: 1 }}></div>
        <div className="view-toggle">
          <button className={view === 'cards' ? 'active' : ''} onClick={() => setView('cards')}>Cards</button>
          <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>Table</button>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="cards-grid">
          {rows.length ? rows.map((e) => (
            <div className="item-card" key={e.id}>
              <div className="top"><h4>{e.title}</h4><span className="pill pill-blue">{e.status}</span></div>
              <div className="tag"><span className="pill pill-neutral">{e.category}</span></div>
              <div className="meta-line"><CalendarIcon width={13} height={13} />{fmtDate(e.date)}</div>
              <div className="meta-line"><ClockIcon width={13} height={13} />{e.time || '—'}</div>
              <div className="meta-line"><PinIcon width={13} height={13} />{e.location}</div>
              <div className="meta-line"><UsersIcon width={13} height={13} />{e.registered} registered</div>
              <div className="foot">
                <span className={`pill ${pillClass(e.reg)}`}>{e.reg}</span>
                <div className="actions">
                  <button className="icon-btn btn-sm" title="View" onClick={() => showToast(`Viewing: ${e.title}`)}><EyeIcon /></button>
                  <button className="icon-btn btn-sm" title="Edit" onClick={() => onOpenModal(e.id)}><EditIcon /></button>
                  <button className="icon-btn btn-sm" title="Delete" onClick={() => onConfirmDelete(() => onDelete(e.id))}><TrashIcon /></button>
                </div>
              </div>
            </div>
          )) : <div className="empty-state" style={{ gridColumn: '1/-1' }}>No events match your filters.</div>}
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Location</th><th>Registered</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.length ? rows.map((e) => (
                <tr key={e.id}>
                  <td className="cell-title">{e.title}</td>
                  <td><span className="pill pill-neutral">{e.category}</span></td>
                  <td>{fmtDate(e.date)}</td>
                  <td>{e.location}</td>
                  <td>{e.registered}</td>
                  <td><span className={`pill ${pillClass(e.status)}`}>{e.status}</span></td>
                  <td className="actions">
                    <button className="icon-btn btn-sm" title="Edit" onClick={() => onOpenModal(e.id)}><EditIcon /></button>
                    <button className="icon-btn btn-sm" title="Delete" onClick={() => onConfirmDelete(() => onDelete(e.id))}><TrashIcon /></button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7}><div className="empty-state">No events match your filters.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
