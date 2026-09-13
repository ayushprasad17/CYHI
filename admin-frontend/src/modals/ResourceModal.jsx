import { useEffect, useState } from 'react';

const EMPTY = { name: '', category: 'Academic', status: 'Active', desc: '', url: '' };

export default function ResourceModal({ open, editing, onClose, onSave, showToast }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(editing ? { ...editing } : { ...EMPTY });
  }, [open, editing]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  function handleSave() {
    const name = form.name.trim();
    if (!name) { showToast('Please enter a resource name'); return; }
    onSave({
      ...form,
      name,
      url: form.url || '#',
      updated: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <div className={`overlay${open ? ' active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{editing ? 'Edit Resource' : 'Add Resource'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Resource Name</label>
            <input type="text" placeholder="e.g. University Library Portal" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="two-col">
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option>Academic</option><option>Library</option><option>Hostel</option><option>Transport</option><option>Finance</option><option>Placement</option><option>Admin</option>
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
            <textarea placeholder="Short description of the resource" value={form.desc} onChange={(e) => set('desc', e.target.value)} />
          </div>
          <div className="field">
            <label>Link URL</label>
            <input type="text" placeholder="https://..." value={form.url} onChange={(e) => set('url', e.target.value)} />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-accent" onClick={handleSave}>Save Resource</button>
        </div>
      </div>
    </div>
  );
}
