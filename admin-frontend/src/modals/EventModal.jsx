import { useEffect, useState } from 'react';

const EMPTY = { title: '', category: 'Workshop', status: 'Upcoming', date: new Date().toISOString().slice(0, 10), time: '10:00', location: '', registered: 0, reg: 'Open' };

export default function EventModal({ open, editing, onClose, onSave, showToast }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(editing ? { ...editing } : { ...EMPTY });
  }, [open, editing]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  function handleSave() {
    const title = form.title.trim();
    if (!title) { showToast('Please enter a title'); return; }
    onSave({
      ...form,
      title,
      date: form.date || new Date().toISOString().slice(0, 10),
      location: form.location || 'TBA',
      registered: parseInt(form.registered, 10) || 0,
    });
  }

  return (
    <div className={`overlay${open ? ' active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{editing ? 'Edit Event' : 'Create Event'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Title</label>
            <input type="text" placeholder="e.g. Hackathon 2026" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option>Workshop</option><option>Cultural</option><option>Seminar</option><option>Competition</option><option>Social</option><option>Lecture</option>
              </select>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option>Upcoming</option><option>Completed</option>
              </select>
            </div>
          </div>
          <div className="two-col">
            <div className="field">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
            <div className="field">
              <label>Time</label>
              <input type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Location</label>
            <input type="text" placeholder="e.g. Main Auditorium" value={form.location} onChange={(e) => set('location', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Registered</label>
              <input type="number" min="0" value={form.registered} onChange={(e) => set('registered', e.target.value)} />
            </div>
            <div className="field">
              <label>Registration</label>
              <select value={form.reg} onChange={(e) => set('reg', e.target.value)}>
                <option>Open</option><option>Closed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-accent" onClick={handleSave}>Save Event</button>
        </div>
      </div>
    </div>
  );
}
