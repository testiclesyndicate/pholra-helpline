import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, ShieldAlert, CloudSun, Stethoscope } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';

const BOTTOM_ITEMS = [
  { to: '/', key: 'nav.home', icon: Home, end: true },
  { to: '/assistant', key: 'nav.assistant', icon: MessageSquare, end: false },
  { to: '/disease', key: 'nav.disease', icon: Stethoscope, end: false },
  { to: '/risk', key: 'nav.risk', icon: ShieldAlert, end: false },
  { to: '/weather', key: 'nav.weather', icon: CloudSun, end: false },
];

export const BottomNav: React.FC = () => {
  const { lang } = useApp();

  return (
    <nav
      aria-label="Bottom Navigation"
      className="bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottomnav-h)',
        background: 'var(--bottomnavBg)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderTop: '1px solid var(--glassBorder)',
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.04)',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
      }}
    >
      {BOTTOM_ITEMS.map(({ to, key, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bnav-item${isActive ? ' bnav-item--active' : ''}`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            color: 'var(--ink-soft)',
            textDecoration: 'none',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 0',
            transition: 'color .15s ease',
          }}
        >
          {({ isActive }) => (
            <>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 26,
                  borderRadius: 13,
                  background: isActive ? 'var(--leaf-light)' : 'transparent',
                }}
              >
                <Icon size={19} color={isActive ? 'var(--forest)' : 'currentColor'} />
              </span>
              <span style={{ color: isActive ? 'var(--forest)' : 'inherit' }}>
                {d(lang, key)}
              </span>
            </>
          )}
        </NavLink>
      ))}
      <style>{`
        @media (min-width: 641px) {
          .bottom-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
};
