import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Edit2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Droplets,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { CropProfile, CropAdvisory } from '../types';

const CROPS = [
  'Wheat (गेहूं / गहू)',
  'Rice / Paddy (धान / तांदूळ)',
  'Cotton (कपास / कापूस)',
  'Soybean (सोयाबीन)',
  'Sugarcane (गन्ना / ऊस)',
  'Maize (मक्का / मका)',
  'Tomato (टमाटर / टोमॅटो)',
  'Onion (प्याज़ / कांदा)',
  'Groundnut (मूंगफली / भुईमूग)',
  'Mustard (सरसों / मोहरी)',
  'Potato (आलू / बटाटा)',
  'Chickpea / Gram (चना / हरभरा)',
  'Banana (केला / केळी)',
  'Chilli (मिर्च / मिरची)',
];

const STATES = [
  'Maharashtra',
  'Punjab',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Karnataka',
  'Gujarat',
  'Kerala',
  'Haryana',
  'Rajasthan',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Bihar',
  'West Bengal',
  'Odisha',
];

const SOILS = [
  'Black cotton soil (काळी माती)',
  'Alluvial soil (गाळाची माती)',
  'Red and yellow soil (लाल माती)',
  'Laterite soil (जांभी माती)',
  'Sandy loam (रेताळ पोयटा)',
  'Clayey loam (चोपणी माती)',
];

const STAGES = [
  'Germination / Seedling (अंकुरण / रोपे)',
  'Vegetative growth (शाकीय वाढ)',
  'Tillering / Branching (फुटवे / फांद्या)',
  'Flowering stage (फुलोरा अवस्था)',
  'Fruit / Pod / Grain filling (दाणे / फळे भरणे)',
  'Maturation / Harvest (पक्वता / काढणी)',
];

const IRRIGATIONS = [
  'Drip irrigation (ठिबक सिंचन)',
  'Sprinkler irrigation (तुषार सिंचन)',
  'Flood / Furrow irrigation (पाटपाणी)',
  'Rainfed / Dryland (कोरडवाहू)',
];

export const MyCrop: React.FC = () => {
  const { lang, pushToast, cropProfile, setCropProfile } = useApp();

  const [form, setForm] = useState<CropProfile>(() => {
    return (
      cropProfile || {
        crop: 'Wheat (गेहूं / गहू)',
        state: 'Maharashtra',
        soil: 'Black cotton soil (काळी माती)',
        sowingDate: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
        stage: 'Vegetative growth (शाकीय वाढ)',
        irrigation: 'Drip irrigation (ठिबक सिंचन)',
        area: '3',
        areaUnit: 'acres',
      }
    );
  });

  const [advisory, setAdvisory] = useState<CropAdvisory | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchAdvisory = async (profile: CropProfile) => {
    setLoading(true);
    try {
      const res = await api.post<{ advisory: CropAdvisory }>('/crop/advisory', {
        profile,
        lang,
      });
      setAdvisory(res.advisory);
      setCropProfile(profile);
      setEditing(false);
      pushToast({ kind: 'success', title: d(lang, 'crop.resultTitle') });
    } catch {
      pushToast({ kind: 'error', title: d(lang, 'toast.error') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cropProfile?.crop) {
      fetchAdvisory(cropProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdvisory(form);
  };

  return (
    <div className="page page--wide" style={{ paddingTop: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sprout size={28} color="var(--forest)" />
            {d(lang, 'crop.title')}
          </h1>
          <p className="page-sub">{d(lang, 'crop.sub')}</p>
        </div>

        {advisory && !editing && (
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setEditing(true)}
          >
            <Edit2 size={14} /> {d(lang, 'crop.edit')}
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="typing-dots">
              <i />
              <i />
              <i />
            </span>
            <span style={{ fontWeight: 700, color: 'var(--ink-soft)' }}>
              {d(lang, 'crop.generating')}
            </span>
          </div>
        </div>
      ) : editing || !advisory ? (
        /* Form */
        <form onSubmit={handleSubmit} className="card" style={{ padding: 26 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
            {d(lang, 'crop.formTitle')}
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, margin: '0 0 22px' }}>
            {d(lang, 'crop.recommendFields')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            <div className="field">
              <label htmlFor="c-crop" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.cropLabel')} *
              </label>
              <select
                id="c-crop"
                className="select"
                required
                value={form.crop}
                onChange={e => setForm(prev => ({ ...prev, crop: e.target.value }))}
              >
                {CROPS.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-state" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.stateLabel')} *
              </label>
              <select
                id="c-state"
                className="select"
                required
                value={form.state}
                onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))}
              >
                {STATES.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-soil" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.soilLabel')} *
              </label>
              <select
                id="c-soil"
                className="select"
                required
                value={form.soil}
                onChange={e => setForm(prev => ({ ...prev, soil: e.target.value }))}
              >
                {SOILS.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-sowing" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.sowingLabel')} *
              </label>
              <input
                id="c-sowing"
                type="date"
                className="input"
                required
                value={form.sowingDate}
                onChange={e => setForm(prev => ({ ...prev, sowingDate: e.target.value }))}
              />
            </div>

            <div className="field">
              <label htmlFor="c-stage" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.stageLabel')} *
              </label>
              <select
                id="c-stage"
                className="select"
                required
                value={form.stage}
                onChange={e => setForm(prev => ({ ...prev, stage: e.target.value }))}
              >
                {STAGES.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-irrigation" style={{ fontSize: 13, fontWeight: 700 }}>
                {d(lang, 'crop.irrigationLabel')} *
              </label>
              <select
                id="c-irrigation"
                className="select"
                required
                value={form.irrigation}
                onChange={e => setForm(prev => ({ ...prev, irrigation: e.target.value }))}
              >
                {IRRIGATIONS.map(ir => (
                  <option key={ir} value={ir}>
                    {ir}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="c-area" style={{ fontSize: 13, fontWeight: 700 }}>
                Farm Area
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  id="c-area"
                  type="number"
                  className="input"
                  min="0.1"
                  step="0.1"
                  value={form.area}
                  onChange={e => setForm(prev => ({ ...prev, area: e.target.value }))}
                  style={{ flex: 2 }}
                />
                <select
                  className="select"
                  value={form.areaUnit}
                  onChange={e => setForm(prev => ({ ...prev, areaUnit: e.target.value }))}
                  style={{ flex: 1.5 }}
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="bigha">Bigha</option>
                  <option value="guntha">Guntha</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn--primary btn--lg">
              <Sparkles size={18} /> {d(lang, 'crop.submit')}
            </button>
            {advisory && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setEditing(false)}
              >
                {d(lang, 'common.cancel')}
              </button>
            )}
          </div>
        </form>
      ) : (
        /* Advisory Result Report */
        <div style={{ display: 'grid', gap: 20 }}>
          <div
            className="card"
            style={{
              padding: '24px 26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              background: 'linear-gradient(145deg, var(--leaf-light), var(--surface))',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--forest)',
                  letterSpacing: '.05em',
                }}
              >
                Tailored Advisory Plan
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '4px 0 2px' }}>
                {advisory.cropLabel}
              </h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: 0 }}>
                {advisory.growthStage} · {form.state} ({form.area} {form.areaUnit})
              </p>
            </div>

            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => setEditing(true)}
            >
              <Edit2 size={14} /> {d(lang, 'crop.edit')}
            </button>
          </div>

          {/* Alerts */}
          {advisory.alerts && advisory.alerts.length > 0 && (
            <div style={{ display: 'grid', gap: 10 }}>
              {advisory.alerts.map((al, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    background:
                      al.severity === 'high'
                        ? 'var(--danger-light)'
                        : al.severity === 'medium'
                        ? 'var(--sun-light)'
                        : 'var(--leaf-light)',
                    color:
                      al.severity === 'high'
                        ? 'var(--danger)'
                        : al.severity === 'medium'
                        ? 'var(--sun-dark)'
                        : 'var(--forest)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    gap: 10,
                  }}
                >
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{al.title}</div>
                    <div style={{ fontSize: 13, marginTop: 2 }}>{al.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Advisory Sections Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            {advisory.sections.map((sec, idx) => (
              <div key={idx} className="card" style={{ padding: 22 }}>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    margin: '0 0 10px',
                    color: 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {sec.icon} {sec.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0, color: 'var(--ink)' }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: 'var(--ink-soft)', fontStyle: 'italic', margin: 0 }}>
            {advisory.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};
