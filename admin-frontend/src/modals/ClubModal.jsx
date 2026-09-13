import { useEffect, useState } from 'react';

const EMPTY = { name: '', category: 'Technical', status: 'Active', desc: '', coordinator: '', members: 0, contact: '' };

export default function ClubModal({ open, editing, onClose, onSave, showToast }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(editing ? { ...editing } : { ...EMPTY });
  }, [open, editing]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  function handleSave() {
    const name = form.name.trim();
    if (!name) { showToast('Please enter a club name'); return; }
    onSave({ ...form, name, members: parseInt(form.members, 10) || 0 });
  }

  return (
    <div className={`overlay${open ? ' active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{editing ? 'Edit Club' : 'Add Club'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Club Name</label>
            <input type="text" placeholder="e.g. Coding Club" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option>Technical</option><option>Cultural</option><option>Sports</option><option>Business</option><option>Creative</option>
              </select>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Description</label>
            <textarea placeholder="What does this club do?" value={form.desc} onChange={(e) => set('desc', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Coordinator</label>
              <input type="text" placeholder="Prof. Sharma" value={form.coordinator} onChange={(e) => set('coordinator', e.target.value)} />
            </div>
            <div className="field">
              <label>Members</label>
              <input type="number" min="0" value={form.members} onChange={(e) => set('members', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Contact Email</label>
            <input type="email" placeholder="club@university.edu" value={form.contact} onChange={(e) => set('contact', e.target.value)} />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-accent" onClick={handleSave}>Save Club</button>
        </div>
      </div>
    </div>
  );
}
