import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';

export const DemoBanner: React.FC = () => {
  const { lang, demoBanner, setDemoBanner } = useApp();

  if (!demoBanner) return null;

  return (
    <div
      role="note"
      style={{
        background: 'var(--sun-light)',
        borderBottom: '1px solid var(--line)',
        color: 'var(--sun-dark)',
        fontSize: 13.5,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 18px',
      }}
    >
      <AlertCircle size={16} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{d(lang, 'demo.banner')}</span>
      <button
        type="button"
        className="icon-btn"
        aria-label={d(lang, 'common.close')}
        onClick={() => setDemoBanner(false)}
        style={{ width: 30, height: 30 }}
      >
        <X size={15} />
      </button>
    </div>
  );
};
