import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mic,
  AlertTriangle,
  ChevronRight,
  CloudSun,
  Sprout,
  ShieldCheck,
  Landmark,
  Stethoscope,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { WeatherReport } from '../types';

function getGreetingKey(hour: number): string {
  if (hour < 12) return 'dashboard.greetingMorning';
  if (hour < 17) return 'dashboard.greetingAfternoon';
  return 'dashboard.greetingEvening';
}

export const FarmerDashboard: React.FC = () => {
  const { lang, cropProfile, recentQueries, userLocation, setShowLocationModal } = useApp();
  const [weatherData, setWeatherData] = useState<WeatherReport | null>(null);

  useEffect(() => {
    const locParam = userLocation ? `&location=${encodeURIComponent(userLocation)}` : '';
    api.get<{ weather: WeatherReport }>(`/weather?lang=${lang}${locParam}`)
      .then(res => setWeatherData(res.weather))
      .catch(() => {});
  }, [lang, userLocation]);

  const currentHour = new Date().getHours();
  const greetingKey = getGreetingKey(currentHour);

  const actionTiles = [
    {
      icon: Stethoscope,
      label: d(lang, 'dashboard.detect'),
      to: '/disease',
      color: 'var(--sun-light)',
      fg: 'var(--sun-dark)',
    },
    {
      icon: CloudSun,
      label: d(lang, 'dashboard.weather'),
      to: '/weather',
      color: 'var(--leaf-light)',
      fg: 'var(--forest)',
    },
    {
      icon: Sprout,
      label: d(lang, 'dashboard.myCrop'),
      to: '/my-crop',
      color: 'var(--earth-light)',
      fg: 'var(--earth-dark)',
    },
    {
      icon: ShieldCheck,
      label: d(lang, 'nav.officials'),
      to: '/officials',
      color: 'var(--danger-light)',
      fg: 'var(--danger)',
    },
    {
      icon: Landmark,
      label: d(lang, 'dashboard.schemes'),
      to: '/schemes',
      color: 'var(--sun-light)',
      fg: 'var(--sun-dark)',
    },
  ];

  const alerts: { sev: 'high' | 'medium' | 'low'; text: string }[] = [];
  if (weatherData?.advisory) {
    if (weatherData.advisory.risk === 'high') {
      alerts.push({ sev: 'high', text: weatherData.advisory.headline });
    } else if (weatherData.advisory.risk === 'medium') {
      alerts.push({ sev: 'medium', text: weatherData.advisory.headline });
    } else {
      alerts.push({ sev: 'low', text: weatherData.advisory.headline });
    }
  }

  return (
    <section className="page" style={{ paddingTop: 30 }}>
      {/* Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
      >
        <div>
          <p style={{ fontWeight: 800, fontSize: 'clamp(24px, 3.6vw, 34px)', margin: 0 }}>
            {d(lang, greetingKey)} 👋
          </p>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginTop: 4 }}>
            {d(lang, 'dashboard.ask')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLocationModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 999,
            background: 'var(--surface)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid var(--glassBorder)',
            color: 'var(--forest)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadowSoft)',
            transition: 'all 0.2s ease',
          }}
        >
          📍 {userLocation || (lang === 'hi' ? 'स्थान सेट करें' : 'Set Location')}
        </button>
      </motion.div>

      {/* Primary Voice CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
      >
        <Link
          to="/assistant"
          className="card ask-cta glass-shine"
          style={{
            marginTop: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px 22px',
            background: 'linear-gradient(150deg, rgba(29, 74, 47, 0.95), rgba(46, 107, 69, 0.9))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            textDecoration: 'none',
            boxShadow: '0 12px 30px rgba(29, 74, 47, 0.25)',
          }}
        >
          <span
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            }}
          >
            <Mic size={30} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 800,
                fontSize: 'clamp(17px, 2.4vw, 21px)',
              }}
            >
              🎤 {d(lang, 'dashboard.askCta')}
            </span>
            <span
              style={{
                display: 'block',
                color: '#c6d8cb',
                fontSize: 13.5,
                marginTop: 2,
              }}
            >
              {d(lang, 'dashboard.askSub')}
            </span>
          </span>
          <ChevronRight size={22} color="#f0d9a6" aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Risk CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15 }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
      >
        <Link
          to="/risk"
          className="card risk-cta glass-shine"
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '18px 22px',
            background: 'var(--surface)',
            border: '1px solid var(--glassBorder)',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--sun)',
              color: '#4a3206',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(232, 160, 32, 0.3)',
            }}
          >
            <AlertTriangle size={28} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                color: 'var(--ink)',
                fontWeight: 800,
                fontSize: 'clamp(16px, 2.2vw, 20px)',
              }}
            >
              ⚠️ {d(lang, 'dashboard.riskCta')}
            </span>
            <span
              style={{
                display: 'block',
                color: 'var(--ink-soft)',
                fontSize: 13.5,
                marginTop: 2,
              }}
            >
              {d(lang, 'dashboard.riskCtaSub')}
            </span>
          </span>
          <ChevronRight size={22} color="var(--sun-dark)" aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Action tiles grid */}
      <div className="dash-actions" style={{ display: 'grid', gap: 12, marginTop: 14 }}>
        {actionTiles.map(({ icon: Icon, label, to, color, fg }, idx) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            whileHover={{ y: -3 }}
          >
            <Link
              to={to}
              className="card glass-shine"
              style={{
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                textDecoration: 'none',
                height: '100%',
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: color,
                  color: fg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
                }}
              >
                <Icon size={23} />
              </span>
              <span style={{ fontWeight: 800, fontSize: 15.5, color: 'var(--ink)' }}>
                {label}
              </span>
              <ChevronRight size={17} color="var(--ink-soft)" style={{ marginLeft: 'auto' }} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 4 Summary Cards Grid */}
      <div className="dash-grid" style={{ display: 'grid', gap: 14, marginTop: 14 }}>
        {/* 1. Today's Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card"
          style={{ padding: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            <h2
              style={{
                fontSize: 15.5,
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                margin: 0,
              }}
            >
              <CloudSun size={18} color="var(--forest)" /> {d(lang, 'dashboard.todayAdvisory')}
            </h2>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--forest)',
                background: 'var(--leaf-light)',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              📍 {weatherData?.location || userLocation || 'Your Location'}
            </span>
          </div>
          {weatherData ? (
            <>
              <p style={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.55 }}>
                {weatherData.advisory.headline}
              </p>
              <ul style={{ margin: '10px 0 0', paddingLeft: 18, display: 'grid', gap: 4 }}>
                {weatherData.advisory.points.slice(0, 2).map((pt, idx) => (
                  <li key={idx} style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to="/weather"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 12,
                  fontWeight: 800,
                  fontSize: 13.5,
                }}
              >
                {d(lang, 'common.viewAll')} <ChevronRight size={14} />
              </Link>
            </>
          ) : (
            <div className="skeleton" style={{ height: 14 }} />
          )}
        </motion.div>

        {/* 2. My Crop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="card"
          style={{ padding: 20 }}
        >
          <h2
            style={{
              fontSize: 15.5,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Sprout size={18} color="var(--forest)" /> {d(lang, 'dashboard.myCropSection')}
          </h2>
          {cropProfile?.crop ? (
            <>
              <p style={{ fontWeight: 800, fontSize: 17 }}>{cropProfile.crop}</p>
              <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 2 }}>
                {cropProfile.stage} · {cropProfile.state}
              </p>
              <Link
                to="/my-crop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 12,
                  fontWeight: 800,
                  fontSize: 13.5,
                }}
              >
                {d(lang, 'common.viewAll')} <ChevronRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
                {d(lang, 'dashboard.setupCrop')}
              </p>
              <Link
                to="/my-crop"
                className="btn btn--outline btn--sm"
                style={{ marginTop: 12 }}
              >
                {d(lang, 'dashboard.setupCropBtn')}
              </Link>
            </>
          )}
        </motion.div>

        {/* 3. Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="card"
          style={{ padding: 20 }}
        >
          <h2
            style={{
              fontSize: 15.5,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Info size={18} color="var(--sun-dark)" /> {d(lang, 'dashboard.alerts')}
          </h2>
          {alerts.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {alerts.map((al, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: 13.5,
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1px solid',
                    borderColor:
                      al.sev === 'high'
                        ? '#f2cdc8'
                        : al.sev === 'medium'
                        ? '#f0d9a6'
                        : 'var(--leaf-mid)',
                    background:
                      al.sev === 'high'
                        ? 'var(--danger-light)'
                        : al.sev === 'medium'
                        ? 'var(--sun-light)'
                        : 'var(--leaf-light)',
                    color:
                      al.sev === 'high'
                        ? '#7c2a21'
                        : al.sev === 'medium'
                        ? '#6d4d08'
                        : 'var(--forest)',
                    lineHeight: 1.5,
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  <Info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{al.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
              {d(lang, 'dashboard.noAlerts')}
            </p>
          )}
        </motion.div>
      </div>

      <style>{`
        .dash-actions { grid-template-columns: 1fr 1fr; }
        .dash-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px) {
          .dash-actions { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
          .dash-grid { grid-template-columns: 1fr 1fr; }
        }
        .ask-cta:hover, .risk-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-float);
          text-decoration: none;
        }
        .dash-actions .card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
        }
      `}</style>
    </section>
  );
};
