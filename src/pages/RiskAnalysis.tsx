import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  Bug,
  Droplets,
  Sprout,
  HelpCircle,
  PhoneCall,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { RiskResult, OfficialContact } from '../types';

const PROBLEMS = [
  { id: 'yellowing', key: 'risk.problem.yellowing', icon: Sprout },
  { id: 'spots', key: 'risk.problem.spots', icon: AlertTriangle },
  { id: 'pests', key: 'risk.problem.pests', icon: Bug },
  { id: 'wilting', key: 'risk.problem.wilting', icon: Sprout },
  { id: 'water', key: 'risk.problem.water', icon: Droplets },
  { id: 'soil', key: 'risk.problem.soil', icon: Sprout },
  { id: 'none', key: 'risk.problem.none', icon: HelpCircle },
];

const SPREADS = ['unknown', 'one-plant', 'few', 'many'];

const AGES = [
  { id: 'null', days: null },
  { id: '0', days: 0 },
  { id: '3', days: 3 },
  { id: '7', days: 7 },
  { id: '14', days: 14 },
];

export const RiskAnalysis: React.FC = () => {
  const { lang, pushToast } = useApp();
  const [problem, setProblem] = useState('yellowing');
  const [spread, setSpread] = useState('unknown');
  const [ageId, setAgeId] = useState('null');
  const [loading, setLoading] = useState(false);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [officials, setOfficials] = useState<OfficialContact[]>([]);

  useEffect(() => {
    api.get<{ officials: OfficialContact[] }>(`/officials?lang=${lang}`)
      .then(res => setOfficials((res.officials || []).slice(0, 3)))
      .catch(() => {});
  }, [lang]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRiskResult(null);

    const ageEntry = AGES.find(a => a.id === ageId);
    try {
      const res = await api.post<{ risk: RiskResult }>('/risk', {
        problem,
        spread,
        ageDays: ageEntry?.days ?? null,
        lang,
      });
      setRiskResult(res.risk);
      pushToast({ kind: 'info', title: `Risk Score: ${res.risk.score}/100 (${res.risk.label})` });
    } catch {
      pushToast({ kind: 'error', title: d(lang, 'toast.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--wide" style={{ paddingTop: 24 }}>
      <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ShieldAlert size={28} color="var(--sun-dark)" />
        {d(lang, 'risk.title')}
      </h1>
      <p className="page-sub">{d(lang, 'risk.sub')}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: riskResult ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
          gap: 20,
          marginTop: 24,
        }}
      >
        {/* Form Card */}
        <form onSubmit={handleAnalyze} className="card" style={{ padding: 24 }}>
          {/* 1. Problem */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: 14.5, marginBottom: 10 }}>
              {d(lang, 'risk.problemLabel')}
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 10,
              }}
            >
              {PROBLEMS.map(p => {
                const Icon = p.icon;
                const active = problem === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProblem(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `2px solid ${active ? 'var(--forest)' : 'var(--line)'}`,
                      background: active ? 'var(--leaf-light)' : 'var(--surface)',
                      color: 'var(--ink)',
                      fontWeight: 700,
                      fontSize: 13.5,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'all .15s ease',
                    }}
                  >
                    <Icon size={18} color={active ? 'var(--forest)' : 'var(--ink-soft)'} />
                    <span>{d(lang, p.key)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Spread */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: 14.5, marginBottom: 10 }}>
              {d(lang, 'risk.spreadLabel')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SPREADS.map(s => {
                const active = spread === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpread(s)}
                    style={{
                      borderRadius: 'var(--radius-pill)',
                      padding: '8px 16px',
                      fontSize: 13.5,
                      fontWeight: active ? 800 : 600,
                      border: `1.5px solid ${active ? 'var(--forest)' : 'var(--line)'}`,
                      background: active ? 'var(--leaf-light)' : 'var(--cream)',
                      color: active ? 'var(--forest)' : 'var(--ink)',
                      cursor: 'pointer',
                    }}
                  >
                    {d(lang, `risk.spread.${s}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Duration */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 800,
                fontSize: 14.5,
                marginBottom: 10,
              }}
            >
              <Clock size={16} /> {d(lang, 'risk.ageLabel')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {AGES.map(a => {
                const active = ageId === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAgeId(a.id)}
                    style={{
                      borderRadius: 'var(--radius-pill)',
                      padding: '8px 16px',
                      fontSize: 13.5,
                      fontWeight: active ? 800 : 600,
                      border: `1.5px solid ${active ? 'var(--forest)' : 'var(--line)'}`,
                      background: active ? 'var(--leaf-light)' : 'var(--cream)',
                      color: active ? 'var(--forest)' : 'var(--ink)',
                      cursor: 'pointer',
                    }}
                  >
                    {d(lang, `risk.age.${a.id}`)}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--block"
            disabled={loading}
          >
            <Sparkles size={18} />
            {loading ? d(lang, 'risk.analyzing') : d(lang, 'risk.analyze')}
          </button>
        </form>

        {/* Risk Result Card */}
        {riskResult && (
          <div
            className="card"
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderLeft: `5px solid ${
                riskResult.level === 'high'
                  ? 'var(--danger)'
                  : riskResult.level === 'medium'
                  ? 'var(--sun-dark)'
                  : 'var(--leaf)'
              }`,
            }}
          >
            {/* Score & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 999,
                  background:
                    riskResult.level === 'high'
                      ? 'var(--danger-light)'
                      : riskResult.level === 'medium'
                      ? 'var(--sun-light)'
                      : 'var(--leaf-light)',
                  color:
                    riskResult.level === 'high'
                      ? 'var(--danger)'
                      : riskResult.level === 'medium'
                      ? 'var(--sun-dark)'
                      : 'var(--forest)',
                }}
              >
                {riskResult.label.toUpperCase()} RISK
              </span>

              <div style={{ fontSize: 24, fontWeight: 800 }}>
                {riskResult.score} <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>/ 100</span>
              </div>
            </div>

            {/* Score Meter Bar */}
            <div
              style={{
                width: '100%',
                height: 8,
                background: 'var(--creamDark)',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${riskResult.score}%`,
                  height: '100%',
                  background:
                    riskResult.level === 'high'
                      ? 'var(--danger)'
                      : riskResult.level === 'medium'
                      ? 'var(--sun)'
                      : 'var(--leaf)',
                  transition: 'width .5s ease',
                }}
              />
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-soft)', marginBottom: 4 }}>
                {riskResult.basisLabel}
              </h4>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                {riskResult.basis}
              </p>
            </div>

            <div
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                background: 'var(--surfaceSoft)',
                border: '1px solid var(--line)',
              }}
            >
              <h4 style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--forest)', margin: '0 0 4px' }}>
                {riskResult.actionLabel}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                {riskResult.action}
              </p>
            </div>

            {/* Official KVK Contacts */}
            {officials.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                  KVK Officers to Contact:
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  {officials.map(o => (
                    <div
                      key={o.id}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: 'var(--cream)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 13,
                      }}
                    >
                      <span>{o.name}</span>
                      <a
                        href={`tel:${o.contact.replace(/\D/g, '')}`}
                        style={{
                          color: 'var(--forest)',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <PhoneCall size={12} /> {o.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              to={`/assistant?q=${encodeURIComponent(`What should I do about ${problem} in my crops?`)}`}
              className="btn btn--outline btn--block"
              style={{ marginTop: 10 }}
            >
              Ask AI Assistant for exact remedies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
