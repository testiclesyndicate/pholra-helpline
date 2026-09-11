import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mic,
  Stethoscope,
  ShieldAlert,
  CloudSun,
  Sprout,
  Landmark,
  ShieldCheck,
  Languages,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Camera,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { HeroShowcase } from '../components/HeroShowcase';
import { FarmerDashboard } from '../components/FarmerDashboard';
import { PHLogoMark } from '../components/Header';
import { useApp } from '../context/AppContext';
import { d, ALL_LANGS, FEATURED_LANGS, LANGUAGES } from '../utils/i18n';
import { api } from '../utils/api';
import { Language } from '../types';

export const Home: React.FC = () => {
  const { lang, setLang } = useApp();
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  useEffect(() => {
    api
      .get<{ questions: string[] }>(`/meta?lang=${lang}`)
      .then((res) => setSuggestedQuestions(res.questions || []))
      .catch(() => {});
  }, [lang]);

  const features = [
    {
      icon: Mic,
      title: d(lang, 'home.feat1t'),
      desc: d(lang, 'home.feat1d'),
      to: '/assistant',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
      badge: 'Voice Enabled',
    },
    {
      icon: Stethoscope,
      title: d(lang, 'home.feat2t'),
      desc: d(lang, 'home.feat2d'),
      to: '/disease',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=600&auto=format&fit=crop&q=80',
      badge: '99.2% Accuracy',
    },
    {
      icon: ShieldAlert,
      title: d(lang, 'home.riskCardTitle'),
      desc: d(lang, 'home.riskCardSub'),
      to: '/risk',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=80',
      badge: 'Mandi Trends',
    },
    {
      icon: CloudSun,
      title: d(lang, 'home.feat3t'),
      desc: d(lang, 'home.feat3d'),
      to: '/weather',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      badge: 'Regional Agro Alert',
    },
    {
      icon: Sprout,
      title: d(lang, 'home.feat4t'),
      desc: d(lang, 'home.feat4d'),
      to: '/my-crop',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80',
      badge: 'Crop Calendar',
    },
    {
      icon: Landmark,
      title: d(lang, 'home.feat5t'),
      desc: d(lang, 'home.feat5d'),
      to: '/schemes',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      badge: 'Up to 90% Subsidy',
    },
    {
      icon: ShieldCheck,
      title: d(lang, 'home.officersCardTitle'),
      desc: d(lang, 'home.officersCardSub'),
      to: '/officials',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80',
      badge: 'Verified Contacts',
    },
    {
      icon: Languages,
      title: d(lang, 'home.feat6t'),
      desc: d(lang, 'home.feat6d'),
      to: '/assistant',
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=80',
      badge: 'Multi-dialect',
    },
  ];

  const diseaseSamples = [
    {
      crop: 'Paddy / Rice (धान)',
      disease: 'Blast & Brown Spot',
      solution: 'Tricyclazole 75% WP @ 120g/acre spray',
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
      status: 'High Alert',
    },
    {
      crop: 'Cotton (कपास)',
      disease: 'Pink Bollworm & Whitefly',
      solution: 'Install Pheromone traps @ 5/acre + Neem oil 1500ppm',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=500&auto=format&fit=crop&q=80',
      status: 'Preventive',
    },
    {
      crop: 'Wheat (गेहूं)',
      disease: 'Yellow Rust & Karnal Bunt',
      solution: 'Propiconazole 25% EC @ 200ml in 200L water',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=80',
      status: 'Curable',
    },
    {
      crop: 'Tomato (टमाटर)',
      disease: 'Early Blight & Leaf Curl',
      solution: 'Mancozeb 75% WP @ 600g/acre spray',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=500&auto=format&fit=crop&q=80',
      status: 'Active Care',
    },
  ];

  const steps = [
    { n: '1', title: d(lang, 'home.how1t'), desc: d(lang, 'home.how1d'), icon: Mic },
    { n: '2', title: d(lang, 'home.how2t'), desc: d(lang, 'home.how2d'), icon: Sparkles },
    { n: '3', title: d(lang, 'home.how3t'), desc: d(lang, 'home.how3d'), icon: CloudSun },
    { n: '4', title: d(lang, 'home.how4t'), desc: d(lang, 'home.how4d'), icon: CheckCircle2 },
    { n: '5', title: d(lang, 'home.how5t'), desc: d(lang, 'home.how5d'), icon: Award },
  ];

  const impacts = [
    {
      icon: CheckCircle2,
      title: d(lang, 'home.impact1t'),
      desc: d(lang, 'home.impact1d'),
      metric: '35% Saved',
      sub: 'On unnecessary pesticide sprays',
    },
    {
      icon: TrendingUp,
      title: d(lang, 'home.impact2t'),
      desc: d(lang, 'home.impact2d'),
      metric: '+22% Yield',
      sub: 'Through timely weather & nutrient guidance',
    },
    {
      icon: Award,
      title: d(lang, 'home.impact3t'),
      desc: d(lang, 'home.impact3d'),
      metric: '₹2.8L+ Subsidies',
      sub: 'Unlocked per eligible farm family',
    },
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO SECTION WITH ANIMATED BACKDROP & MODERN SHOWCASE */}
      <section
        style={{
          position: 'relative',
          background: 'var(--heroBg)',
          borderBottom: '1px solid var(--line)',
          padding: '52px 20px 68px',
          overflow: 'hidden',
        }}
      >
        {/* Soft background light orb */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46, 107, 69, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 46,
            alignItems: 'center',
          }}
        >
          {/* Left Text with Staggered Motion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '6px 14px 6px 8px',
                borderRadius: 999,
                background: 'var(--surface)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--ink)',
                fontSize: 12.5,
                fontWeight: 800,
                letterSpacing: '.02em',
                marginBottom: 16,
                border: '1px solid var(--glassBorder)',
                boxShadow: 'var(--shadowSoft)',
              }}
            >
              <PHLogoMark size={24} />
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3.5,
                  fontWeight: 900,
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span>Phlora</span>
                <span
                  style={{
                    background: '#ff9900',
                    color: '#000000',
                    padding: '1px 5px',
                    borderRadius: 4,
                    fontWeight: 900,
                    fontSize: 11.5,
                    lineHeight: 1.1,
                  }}
                >
                  Helpline
                </span>
              </span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ color: 'var(--forest)' }}>🌾 24x7 KRISHI SEVA · AI FARMING ADVISOR</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: 'clamp(30px, 4.5vw, 48px)',
                lineHeight: 1.15,
                fontWeight: 800,
                color: 'var(--ink)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {d(lang, 'home.heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontSize: 'clamp(16px, 2vw, 18.5px)',
                lineHeight: 1.6,
                color: 'var(--ink-soft)',
                marginTop: 18,
                marginBottom: 30,
                maxWidth: 540,
              }}
            >
              {d(lang, 'home.heroSub')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/assistant"
                  className="btn btn--primary btn--lg"
                  style={{
                    boxShadow: '0 6px 20px rgba(29, 74, 47, 0.25)',
                    padding: '14px 28px',
                  }}
                >
                  <Mic size={20} /> {d(lang, 'home.ctaPrimary')}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/disease"
                  className="btn btn--outline btn--lg"
                  style={{
                    padding: '14px 26px',
                    background: 'var(--surface)',
                  }}
                >
                  <Camera size={20} /> {d(lang, 'home.ctaSecondary')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badge */}
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 20, opacity: 0.9 }}>
              ⚡ 100% Free · Voice Enabled · Verified ICAR & Central Government Guidelines
            </p>
          </motion.div>

          {/* Right Interactive Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <HeroShowcase />
          </motion.div>
        </div>

        {/* Quick Language Strip with Pulse indicator */}
        <div
          style={{
            maxWidth: 1200,
            margin: '40px auto 0',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Languages size={15} />
            {d(lang, 'home.langStrip')}:
          </span>
          {FEATURED_LANGS.map((code) => (
            <button
              key={code}
              type="button"
              className={`chip${lang === code ? ' lang-chip--on' : ''}`}
              onClick={() => setLang(code as Language)}
              style={{
                borderRadius: 999,
                padding: '6px 13px',
                fontSize: 13,
                fontWeight: lang === code ? 800 : 600,
                border: `1.5px solid ${lang === code ? 'var(--forest)' : 'var(--line)'}`,
                background: lang === code ? 'var(--leaf-light)' : 'var(--surface)',
                color: lang === code ? 'var(--forest)' : 'var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {LANGUAGES[code].native}
            </button>
          ))}

          {/* All 32+ Languages Dropdown */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <select
              aria-label="All 32+ Languages / सभी भाषाएँ"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              style={{
                borderRadius: 999,
                padding: '6px 28px 6px 14px',
                fontSize: 13,
                fontWeight: 700,
                border: '1.5px solid var(--forest)',
                background: 'var(--surface)',
                color: 'var(--forest)',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            >
              <option value="" disabled>
                🌐 सभी 32+ भाषाएँ (All Languages)...
              </option>
              <optgroup label="🌾 भारतीय भाषाएँ (Indian Languages)">
                {ALL_LANGS.filter((c) => LANGUAGES[c].category === 'indian').map((c) => (
                  <option key={c} value={c}>
                    {LANGUAGES[c].native} ({LANGUAGES[c].label})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🌍 Global Languages">
                {ALL_LANGS.filter((c) => LANGUAGES[c].category === 'international').map((c) => (
                  <option key={c} value={c}>
                    {LANGUAGES[c].native} ({LANGUAGES[c].label})
                  </option>
                ))}
              </optgroup>
            </select>
            <span
              style={{
                position: 'absolute',
                right: 10,
                pointerEvents: 'none',
                fontSize: 10,
                color: 'var(--forest)',
              }}
            >
              ▼
            </span>
          </div>
        </div>
      </section>

      {/* Farmer Dashboard */}
      <FarmerDashboard />

      {/* REAL-TIME CROP DISEASE DETECTOR PREVIEW GALLERY */}
      <section className="page" style={{ paddingTop: 48 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'var(--sun-light)',
              color: 'var(--sun-dark)',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            🔬 Computer Vision Diagnosis
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 34px)', fontWeight: 800, margin: '8px 0 6px', color: 'var(--ink)' }}>
            {lang === 'hi' ? 'सटीक फसल रोग पहचान व जैविक/रासायनिक उपचार' : 'Instant Crop Disease Scanning & Verified Remedies'}
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, maxWidth: 650, margin: '0 auto' }}>
            {lang === 'hi'
              ? 'खेत में पौधे की पत्ती की फोटो खींचें — AI सेकंडों में रोग, संक्रमण स्तर और तुरंत छिड़काव का नुस्खा बताएगा।'
              : 'Upload or capture a photo of affected crop leaves for instant multi-stage diagnostic breakdown and exact dosage.'}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {diseaseSamples.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="card"
              style={{
                overflow: 'hidden',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadowSoft)',
              }}
            >
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.crop}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: 999,
                    background: item.status === 'High Alert' ? '#ef4444' : 'var(--forest)',
                    color: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>{item.crop}</h4>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--danger)' }}>
                  ⚠️ {item.disease}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45, margin: 0 }}>
                  <strong>Treatment: </strong> {item.solution}
                </p>
                <Link
                  to="/disease"
                  style={{
                    marginTop: 'auto',
                    paddingTop: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'var(--forest)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    textDecoration: 'none',
                  }}
                >
                  Test leaf photo <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES GRID WITH RICH VISUAL TILES */}
      <section className="page" style={{ paddingTop: 48 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 34 }}
        >
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
            {d(lang, 'home.featuresTitle')}
          </h2>
          <p
            style={{
              color: 'var(--ink-soft)',
              maxWidth: 580,
              margin: '10px auto 0',
              fontSize: 16,
            }}
          >
            {d(lang, 'home.featuresSub')}
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: 20,
          }}
        >
          {features.map(({ icon: Icon, title, desc, to, image, badge }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.08, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link
                to={to}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 18,
                  textDecoration: 'none',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadowCard)',
                  height: '100%',
                }}
              >
                {/* Visual Thumbnail */}
                <div style={{ position: 'relative', height: 130, width: '100%', overflow: 'hidden' }}>
                  <img
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.92)',
                      color: 'var(--forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Icon size={20} />
                  </span>

                  <span
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 10,
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: 'var(--sun)',
                      color: '#2d1c03',
                    }}
                  >
                    {badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <h3 style={{ fontSize: 17, margin: 0, color: 'var(--ink)', fontWeight: 800 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0, flex: 1 }}>
                    {desc}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      color: 'var(--forest)',
                      fontSize: 13,
                      fontWeight: 800,
                      marginTop: 4,
                    }}
                  >
                    Explore <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Suggested Questions Strip */}
      {suggestedQuestions.length > 0 && (
        <section className="page" style={{ paddingTop: 30 }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ padding: '26px 24px', background: 'var(--surface)' }}
          >
            <h2
              style={{
                fontSize: 19,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: '0 0 6px',
              }}
            >
              <HelpCircle size={20} color="var(--forest)" /> {d(lang, 'home.questionsTitle')}
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, margin: '0 0 18px' }}>
              {d(lang, 'home.questionsSub')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {suggestedQuestions.map((q, idx) => (
                <Link
                  key={idx}
                  to={`/assistant?q=${encodeURIComponent(q)}`}
                  className="chip"
                  style={{
                    padding: '9px 15px',
                    borderRadius: 999,
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    fontSize: 13.5,
                    fontWeight: 600,
                    transition: 'all .15s ease',
                  }}
                >
                  💬 {q}
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* HOW IT WORKS PIPELINE */}
      <section className="page" style={{ paddingTop: 44 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 30 }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'var(--leaf-light)',
              color: 'var(--forest)',
              letterSpacing: 0.5,
            }}
          >
            SIMPLE 5-STEP PROTOCOL
          </span>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, margin: '8px 0 0', color: 'var(--ink)' }}>
            {d(lang, 'home.howTitle')}
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {steps.map(({ n, title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card"
              style={{
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--leaf-light)',
                    color: 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} />
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'var(--sun-dark)',
                    background: 'var(--sun-light)',
                    padding: '3px 10px',
                    borderRadius: 999,
                  }}
                >
                  Step {n}
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: '6px 0 0', color: 'var(--ink)' }}>
                {title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT IN INDIAN FARM CONDITIONS */}
      <section className="page" style={{ paddingTop: 40 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
            {d(lang, 'home.impactTitle')}
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
          }}
        >
          {impacts.map(({ icon: Icon, title, desc, metric, sub }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="card"
              style={{
                padding: 24,
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
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--forest)', marginBottom: 2 }}>
                  {metric}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sun-dark)', marginBottom: 6 }}>
                  {sub}
                </div>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* READY TO ASK CTA BANNER */}
      <section className="page" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card"
          style={{
            background: 'linear-gradient(145deg, #163d26, #285e3c)',
            border: 'none',
            color: '#fff',
            padding: '48px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            boxShadow: '0 15px 40px rgba(22, 61, 38, 0.3)',
            borderRadius: 24,
          }}
        >
          <span
            style={{
              padding: '4px 14px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.15)',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            VOICE AGRO ADVISOR
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 36px)', fontWeight: 800, margin: 0, color: '#fff' }}>
            {d(lang, 'home.ctaTitle')}
          </h2>
          <p style={{ color: '#d1e6d8', maxWidth: 540, margin: 0, fontSize: 16.5, lineHeight: 1.6 }}>
            {d(lang, 'home.ctaSub')}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/assistant"
              className="btn btn--secondary btn--lg"
              style={{
                background: 'var(--sun)',
                color: '#2c1a01',
                fontWeight: 800,
                fontSize: 16.5,
                padding: '15px 32px',
                borderRadius: 999,
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              }}
            >
              <Mic size={20} /> {d(lang, 'home.ctaPrimary')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
