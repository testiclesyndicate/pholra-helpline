import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  ShieldCheck,
  Languages,
  Cpu,
  Heart,
  ChevronRight,
  Sparkles,
  CloudSun,
  Stethoscope,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';

export const About: React.FC = () => {
  const { lang } = useApp();

  const steps = [
    { icon: Mic, title: d(lang, 'about.how1t'), desc: d(lang, 'about.how1d') },
    { icon: CloudSun, title: d(lang, 'about.how2t'), desc: d(lang, 'about.how2d') },
    { icon: Sparkles, title: d(lang, 'about.how3t'), desc: d(lang, 'about.how3d') },
    { icon: Languages, title: d(lang, 'about.how4t'), desc: d(lang, 'about.how4d') },
  ];

  const safeties = [
    d(lang, 'about.safety1'),
    d(lang, 'about.safety2'),
    d(lang, 'about.safety3'),
    d(lang, 'about.safety4'),
  ];

  const tech = [
    { icon: Cpu, text: d(lang, 'about.tech1') },
    { icon: Languages, text: d(lang, 'about.tech2') },
    { icon: Stethoscope, text: d(lang, 'about.tech3') },
    { icon: ShieldCheck, text: d(lang, 'about.tech4') },
  ];

  return (
    <div className="page" style={{ paddingTop: 24 }}>
      <h1 className="page-title">{d(lang, 'about.title')}</h1>

      {/* Mission Banner */}
      <section
        className="card"
        style={{
          marginTop: 22,
          padding: 'clamp(24px, 4vw, 40px)',
          background: 'linear-gradient(145deg, var(--leaf-light), var(--surface))',
        }}
      >
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', margin: '0 0 12px', fontWeight: 800 }}>
          {d(lang, 'about.missionTitle')}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', maxWidth: 720, margin: 0 }}>
          {d(lang, 'about.mission')}
        </p>
        <div style={{ marginTop: 22 }}>
          <Link to="/assistant" className="btn btn--primary">
            <Mic size={18} /> {d(lang, 'home.ctaPrimary')}
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>
          {d(lang, 'about.howTitle')}
        </h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {steps.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: 20,
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--leaf-light)',
                  color: 'var(--forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={24} />
              </span>
              <div>
                <h3 style={{ fontSize: 16.5, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                  {idx + 1}. {title}
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Principles */}
      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={22} color="var(--forest)" />
          {d(lang, 'about.safetyTitle')}
        </h2>
        <div className="card" style={{ padding: 24 }}>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 12 }}>
            {safeties.map((s, idx) => (
              <li key={idx} style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)' }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technology */}
      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>
          {d(lang, 'about.techTitle')}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {tech.map(({ icon: Icon, text }, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'var(--cream)',
                  color: 'var(--forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4 }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
