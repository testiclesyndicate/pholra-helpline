import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Globe, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d, LANGUAGES, ALL_LANGS } from '../utils/i18n';
import { Language } from '../types';

export const PHLogoMark: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const radius = Math.round(size * 0.28);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: 'linear-gradient(145deg, #3d1b06 0%, #6b2f0a 50%, #853b0d 100%)',
        border: '2px solid #ff9900',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        userSelect: 'none',
      }}
      aria-label="PH Logo Mark"
    >
      {/* Background organic agricultural wheat/stalk silhouette inspired by user emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.28,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M35 85 C35 60, 48 40, 52 18 M46 85 C46 65, 58 45, 62 25"
          stroke="#ff9900"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M52 20 Q65 20, 68 28 Q55 30, 50 34" fill="#ff9900" />
        <path d="M62 26 Q74 26, 76 34 Q65 36, 60 40" fill="#ff9900" />
        <path d="M32 50 C26 58, 25 70, 32 80 C36 74, 38 62, 35 50 Z" fill="#d97706" />
        <path d="M60 55 C66 62, 67 72, 60 82 C56 76, 55 64, 60 55 Z" fill="#d97706" />
      </svg>

      {/* The iconic high-contrast P and [H] badge */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: Math.max(1, Math.round(size * 0.04)),
          zIndex: 2,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: '-0.03em',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontWeight: 900,
            fontSize: Math.round(size * 0.52),
            lineHeight: 1,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
          }}
        >
          P
        </span>
        <span
          style={{
            background: '#ff9900',
            color: '#000000',
            fontWeight: 900,
            fontSize: Math.round(size * 0.44),
            lineHeight: 1,
            padding: `${Math.max(1, Math.round(size * 0.05))}px ${Math.max(3, Math.round(size * 0.09))}px`,
            borderRadius: Math.max(3, Math.round(size * 0.12)),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          H
        </span>
      </span>
    </span>
  );
};

export const BrandLogo: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <span
      className="brand-logo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 9 : 12,
        userSelect: 'none',
      }}
    >
      <PHLogoMark size={compact ? 36 : 42} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          className="brand-word"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 900,
            fontSize: compact ? 19 : 23.5,
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          <span style={{ color: 'var(--ink)' }}>Phlora</span>
          <span
            style={{
              background: '#ff9900',
              color: '#000000',
              padding: compact ? '2px 7px' : '3px 9px',
              borderRadius: 6,
              fontWeight: 900,
              fontSize: compact ? 17 : 21,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              boxShadow: '0 2px 8px rgba(255, 153, 0, 0.45)',
              display: 'inline-block',
            }}
          >
            Helpline
          </span>
        </span>
        {!compact && (
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: 'var(--ink-soft)',
              letterSpacing: '.08em',
              marginTop: 4,
            }}
          >
            🌾 24x7 KRISHI SEVA · AI FARMING ADVISOR
          </span>
        )}
      </span>
    </span>
  );
};

export const LanguagePicker: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { lang, setLang } = useApp();

  const indianLangs = ALL_LANGS.filter(c => LANGUAGES[c].category === 'indian');
  const globalLangs = ALL_LANGS.filter(c => LANGUAGES[c].category === 'international');

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <Globe
        size={17}
        color="var(--ink-soft)"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
      <select
        className="select"
        aria-label="Language / भाषा चुनें"
        value={lang}
        onChange={e => setLang(e.target.value as Language)}
        style={{
          minHeight: 42,
          paddingLeft: 36,
          paddingRight: 32,
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 13.5,
          maxWidth: compact ? 140 : 180,
          cursor: 'pointer',
        }}
      >
        <optgroup label="🌾 भारतीय भाषाएँ (Indian Languages)">
          {indianLangs.map(code => (
            <option key={code} value={code}>
              {LANGUAGES[code].native} ({LANGUAGES[code].label})
            </option>
          ))}
        </optgroup>
        <optgroup label="🌍 Global Languages">
          {globalLangs.map(code => (
            <option key={code} value={code}>
              {LANGUAGES[code].native} ({LANGUAGES[code].label})
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

const NAV_ITEMS = [
  { to: '/', key: 'nav.home' },
  { to: '/assistant', key: 'nav.assistant' },
  { to: '/disease', key: 'nav.disease' },
  { to: '/risk', key: 'nav.risk' },
  { to: '/weather', key: 'nav.weather' },
  { to: '/my-crop', key: 'nav.crop' },
  { to: '/officials', key: 'nav.officials' },
  { to: '/schemes', key: 'nav.schemes' },
  { to: '/about', key: 'nav.about' },
];

export const Header: React.FC = () => {
  const { lang, theme, toggleTheme, permissions, userLocation, setShowLocationModal } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--headerBg)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid var(--glassBorder)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          height: 'var(--header-h)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '0 18px',
        }}
      >
        <Link to="/" aria-label="Phlora Helpline — Home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <BrandLogo compact />
        </Link>

        <nav aria-label="Main" className="desktop-nav" style={{ flex: 1, gap: 2, marginLeft: 18 }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              {d(lang, item.key)}
            </NavLink>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <LanguagePicker compact />

        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={21} color="var(--sun)" /> : <Moon size={20} />}
        </button>

        <button
          type="button"
          onClick={() => setShowLocationModal(true)}
          title={lang === 'hi' ? 'स्थान बदलें या GPS अपडेट करें' : 'Change Location or Update GPS'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 999,
            background: permissions.location === 'granted' ? 'var(--leaf-light)' : 'var(--cream)',
            border: `1.5px solid ${permissions.location === 'granted' ? 'var(--leaf)' : 'var(--line)'}`,
            color: permissions.location === 'granted' ? 'var(--forest)' : 'var(--ink-soft)',
            fontSize: 12.5,
            fontWeight: 800,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          <MapPin size={13} color={permissions.location === 'granted' ? 'var(--forest)' : 'var(--ink-soft)'} />
          <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {userLocation ? userLocation.split(',')[0] : (lang === 'hi' ? '📍 स्थान' : '📍 Location')}
          </span>
        </button>

        <Link
          to="/assistant"
          className="btn btn--primary btn--sm ask-now-btn"
          style={{ display: 'none' }}
        >
          {d(lang, 'home.ctaPrimary')}
        </Link>

        <button
          type="button"
          className="icon-btn mobile-menu-btn"
          aria-label={mobileOpen ? d(lang, 'common.close') : d(lang, 'nav.menu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(prev => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile"
          style={{
            position: 'fixed',
            inset: 'var(--header-h) 0 0 0',
            background: 'var(--cream)',
            zIndex: 39,
            overflowY: 'auto',
            padding: '12px 18px 40px',
            borderTop: '1px solid var(--line)',
          }}
        >
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `mnav-link${isActive ? ' mnav-link--active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 6px',
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--ink)',
                borderBottom: '1px solid var(--line)',
                textDecoration: 'none',
              }}
            >
              <span>{d(lang, item.key)}</span>
              <span aria-hidden="true" style={{ color: 'var(--ink-soft)' }}>
                ›
              </span>
            </NavLink>
          ))}
          <Link
            to="/assistant"
            className="btn btn--primary btn--block"
            style={{ marginTop: 18 }}
          >
            {d(lang, 'home.ctaPrimary')}
          </Link>
        </nav>
      )}

      <style>{`
        .desktop-nav { display: none; }
        .ask-now-btn { display: none; }
        .mobile-menu-btn { display: inline-flex; }
        @media (min-width: 1080px) {
          .desktop-nav { display: flex; }
          .ask-now-btn { display: inline-flex; }
          .mobile-menu-btn { display: none; }
        }
        .nav-link {
          padding: 8px 12px;
          border-radius: var(--radius-pill);
          font-weight: 700;
          font-size: 14px;
          color: var(--ink-soft);
          text-decoration: none;
          transition: all .15s ease;
        }
        .nav-link:hover {
          color: var(--forest);
          background: var(--leaf-light);
          text-decoration: none;
        }
        .nav-link--active {
          color: var(--forest) !important;
          background: var(--leaf-light);
        }
        .mnav-link--active {
          color: var(--forest) !important;
        }
      `}</style>
    </header>
  );
};
