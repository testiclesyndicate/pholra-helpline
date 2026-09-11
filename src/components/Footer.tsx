import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Heart } from 'lucide-react';
import { BrandLogo } from './Header';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';

export const Footer: React.FC = () => {
  const { lang } = useApp();

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        marginTop: 60,
        padding: '50px 20px 80px',
        color: 'var(--ink)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 36,
            marginBottom: 40,
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <BrandLogo />
            <p
              style={{
                color: 'var(--ink-soft)',
                fontSize: 14,
                lineHeight: 1.65,
                marginTop: 14,
                maxWidth: 320,
              }}
            >
              {d(lang, 'app.tagline')}
            </p>
            <div
              style={{
                marginTop: 16,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--leaf-light)',
                color: 'var(--forest)',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <PhoneCall size={14} />
              <span>Kisan Call Centre: 1800-180-1551</span>
            </div>
          </div>

          {/* Col 2: Tools */}
          <div>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: 'var(--ink)',
                marginBottom: 14,
                letterSpacing: '.02em',
              }}
            >
              {d(lang, 'home.featuresTitle')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
              <li>
                <Link to="/assistant" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.assistant')}
                </Link>
              </li>
              <li>
                <Link to="/disease" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.disease')}
                </Link>
              </li>
              <li>
                <Link to="/risk" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.risk')}
                </Link>
              </li>
              <li>
                <Link to="/weather" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.weather')}
                </Link>
              </li>
              <li>
                <Link to="/my-crop" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.crop')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: 'var(--ink)',
                marginBottom: 14,
                letterSpacing: '.02em',
              }}
            >
              Resources & Officials
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
              <li>
                <Link to="/schemes" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.schemes')}
                </Link>
              </li>
              <li>
                <Link to="/officials" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.officials')}
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14 }}>
                  {d(lang, 'nav.about')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            fontSize: 12.5,
            color: 'var(--ink-soft)',
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: 0 }}>
            {d(lang, 'about.mission')}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
              paddingTop: 8,
            }}
          >
            <span>© {new Date().getFullYear()} Phlora Helpline · AI for Indian Agriculture</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              Made with <Heart size={13} color="var(--danger)" fill="var(--danger)" /> for Indian Farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
