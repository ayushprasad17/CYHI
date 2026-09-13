import { useEffect, useState } from 'react';

const EMPTY = { title: '', category: 'Academic', priority: 'Medium', audience: 'All Students', date: new Date().toISOString().slice(0, 10), status: 'Draft' };

export default function AnnouncementModal({ open, editing, onClose, onSave, showToast }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(editing ? { ...editing } : { ...EMPTY });
  }, [open, editing]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  function handleSave() {
    const title = form.title.trim();
    if (!title) { showToast('Please enter a title'); return; }
    onSave({ ...form, title, date: form.date || new Date().toISOString().slice(0, 10) });
  }

  return (
    <div className={`overlay${open ? ' active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{editing ? 'Edit Announcement' : 'Create Announcement'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Title</label>
            <input type="text" placeholder="e.g. Course Registration Deadline" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option>Academic</option><option>Scholarship</option><option>General</option><option>Finance</option><option>Sports</option>
              </select>
            </div>
            <div className="field">
              <label>Priority</label>
              <select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
                <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
          <div className="two-col">
            <div className="field">
              <label>Audience</label>
              <select value={form.audience} onChange={(e) => set('audience', e.target.value)}>
                <option>All Students</option><option>Hostel Students</option><option>Final Year</option>
              </select>
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)}>
              <option>Draft</option><option>Published</option>
            </select>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-accent" onClick={handleSave}>Save Announcement</button>
        </div>
      </div>
    </div>
  );
}
