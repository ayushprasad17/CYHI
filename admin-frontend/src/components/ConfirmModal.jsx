export default function ConfirmModal({ open, onCancel, onConfirm }) {
  return (
    <div
      className={`overlay${open ? ' active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="modal" style={{ maxWidth: 380 }}>
        <div className="modal-head">
          <h3>Delete item?</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="modal-body">
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)' }}>
            This action can't be undone. Are you sure you want to delete this item?
          </p>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button
            className="btn"
            style={{ background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
