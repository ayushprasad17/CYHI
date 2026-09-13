import { useCallback, useRef, useState } from 'react';

export default function useToasts() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((msg) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, msg, leaving: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 2400);
  }, []);

  return { toasts, showToast };
}
