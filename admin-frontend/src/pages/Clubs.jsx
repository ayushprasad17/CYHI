import { useMemo, useState } from 'react';
import { SearchIcon, PlusIcon, EyeIcon, EditIcon, TrashIcon } from '../components/Icons.jsx';
import { initials, pillClass, uniq } from '../utils/helpers.js';

const clubColors = ['#EEF0FE', '#ECFDF5', '#F3E8FF', '#FFFBEB', '#EFF6FF', '#FEF2F2'];
const clubTextColors = ['#4F46E5', '#10B981', '#9333EA', '#D97706', '#3B82F6', '#EF4444'];

export default function Clubs({
  clubs, onDelete, onOpenModal, showToast, onConfirmDelete,
}) {
  const [search, setSearch] = useState('');
  const [fCategory, setFCategory] = useState('');
  const [fStatus, setFStatus] = useState('');

  const categories = useMemo(() => uniq(clubs.map((c) => c.category)), [clubs]);

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return clubs.filter((c) => c.name.toLowerCase().includes(q)
      && (!fCategory || c.category === fCategory)
      && (!fStatus || c.status === fStatus));
  }, [clubs, search, fCategory, fStatus]);

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Clubs</h1><p>Manage student clubs and campus organizations</p></div>
        <button className="btn btn-accent" onClick={() => onOpenModal()}><PlusIcon />Add Club</button>
      </div>

      <div className="filter-bar">
        <div className="search-box" style={{ maxWidth: 320 }}>
          <SearchIcon />
          <input type="text" placeholder="Search clubs..." value={search} onChange={(e) => setSearch(e.target.value)} />
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

      <div className="cards-grid">
        {rows.length ? rows.map((c, i) => (
          <div className="item-card" key={c.id}>
            <div className="club-head">
              <div className="club-avatar" style={{ background: clubColors[i % clubColors.length], color: clubTextColors[i % clubTextColors.length] }}>
                {initials(c.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{c.name}</h4>
                  <span className={`pill ${pillClass(c.status)}`}>{c.status}</span>
                </div>
                <span className="pill pill-neutral" style={{ marginTop: 4 }}>{c.category}</span>
              </div>
            </div>
            <div className="club-desc">{c.desc}</div>
            <div className="kv-row"><span className="k">Coordinator</span><span className="v">{c.coordinator}</span></div>
            <div className="kv-row"><span className="k">Members</span><span className="v">{c.members}</span></div>
            <div className="kv-row"><span className="k">Contact</span><span className="v"><a href="#" onClick={(e) => e.preventDefault()}>{c.contact}</a></span></div>
            <div className="foot" style={{ justifyContent: 'flex-end' }}>
              <div className="actions">
                <button className="icon-btn btn-sm" title="View" onClick={() => showToast(`Viewing: ${c.name}`)}><EyeIcon /></button>
                <button className="icon-btn btn-sm" title="Edit" onClick={() => onOpenModal(c.id)}><EditIcon /></button>
                <button className="icon-btn btn-sm" title="Delete" onClick={() => onConfirmDelete(() => onDelete(c.id))}><TrashIcon /></button>
              </div>
            </div>
          </div>
        )) : <div className="empty-state" style={{ gridColumn: '1/-1' }}>No clubs match your filters.</div>}
      </div>
    </section>
  );
}
