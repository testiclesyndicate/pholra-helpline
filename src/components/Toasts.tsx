import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: 'var(--leaf)',
  error: 'var(--danger)',
  warning: 'var(--sun-dark)',
  info: 'var(--forest)',
};

export const Toasts: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  useEffect(() => {
    if (toasts.length === 0) return;
    const handleClear = () => toasts.forEach(t => dismissToast(t.id));
    window.addEventListener('kisanai:clearToasts', handleClear);
    return () => window.removeEventListener('kisanai:clearToasts', handleClear);
  }, [toasts, dismissToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 76,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 'min(92vw, 420px)',
      }}
    >
      {toasts.map(toast => {
        const IconComponent = ICONS[toast.kind];
        const accentColor = COLORS[toast.kind];
        return (
          <div
            key={toast.id}
            role="status"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              background: 'var(--white)',
              border: '1px solid var(--line)',
              borderLeft: `5px solid ${accentColor}`,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-float)',
              padding: '12px 14px',
            }}
          >
            <IconComponent size={20} color={accentColor} style={{ marginTop: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--ink)' }}>
                {toast.title}
              </div>
              {toast.message && (
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.45 }}>
                  {toast.message}
                </div>
              )}
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={() => dismissToast(toast.id)}
              style={{ width: 28, height: 28, marginTop: -2 }}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
