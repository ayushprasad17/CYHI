import { CheckIcon } from './Icons.jsx';

// toasts: [{ id, msg, leaving }]
export default function ToastStack({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast${t.leaving ? ' leaving' : ''}`}>
          <CheckIcon />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
