import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Landmark,
  Search,
  ExternalLink,
  Gift,
  Sparkles,
  Sun,
  Droplets,
  ShieldCheck,
  Tractor,
  CreditCard,
  Sprout,
  FileText,
  Share2,
  ChevronDown,
  ChevronUp,
  Calculator,
  Award,
  MapPin,
  LocateFixed,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { Scheme } from '../types';

const CATEGORY_PILLS = [
  { id: 'all', label: 'All Schemes (सभी योजनाएं)', icon: Landmark },
  { id: 'income', label: '💰 Cash & DBT', icon: Gift, match: 'Income' },
  { id: 'solar', label: '☀️ Solar Pumps (PM-KUSUM)', icon: Sun, match: 'Solar' },
  { id: 'irrigation', label: '💧 Drip Irrigation (PMKSY)', icon: Droplets, match: 'Irrigation' },
  { id: 'insurance', label: '🛡️ Crop Insurance (PMFBY)', icon: ShieldCheck, match: 'Insurance' },
  { id: 'machinery', label: '🚜 Tractors & Drones (SMAM)', icon: Tractor, match: 'Machinery' },
  { id: 'credit', label: '💳 Cheap Loans @ 4% (KCC)', icon: CreditCard, match: 'Credit' },
  { id: 'organic', label: '🌿 Organic (PKVY)', icon: Sprout, match: 'Organic' },
];

export const GovtSchemes: React.FC = () => {
  const { lang, pushToast, userLocation, userState, setUserLocation, setShowLocationModal, refreshGpsLocation } = useApp();
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPill, setSelectedPill] = useState('all');
  const [selectedState, setSelectedState] = useState<string>(userState || 'Maharashtra');
  const [activeTab, setActiveTab] = useState<'both' | 'local' | 'all-india'>('both');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);

  // Calculator State
  const [showCalculator, setShowCalculator] = useState(false);
  const [landSize, setLandSize] = useState<'small' | 'medium' | 'large' | 'tenant'>('small');
  const [farmerCat, setFarmerCat] = useState<'gen' | 'obc' | 'scst' | 'woman'>('gen');
  const [calcResult, setCalcResult] = useState<{
    count: number;
    estBenefit: string;
    topSchemes: string[];
  } | null>(null);

  // Sync state if userState updates
  useEffect(() => {
    if (userState) {
      setSelectedState(userState);
    }
  }, [userState]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get<{ schemes: Scheme[] }>(`/schemes?lang=${lang}`)
      .then((res) => {
        if (active) setSchemes(res.schemes || []);
      })
      .catch(() => {
        if (active) pushToast({ kind: 'error', title: d(lang, 'toast.schemeError') });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [lang, pushToast]);

  const stateOptions = [
    'Maharashtra',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Rajasthan',
    'Punjab',
    'Bihar',
    'Haryana',
    'Gujarat',
    'Karnataka',
    'Kerala',
  ];

  // Partition schemes into local vs all-india
  const { localSchemes, allIndiaSchemes } = useMemo(() => {
    const q = search.trim().toLowerCase();

    const matchesSearchAndCategory = (s: Scheme) => {
      // Category pill filter
      if (selectedPill !== 'all') {
        const pill = CATEGORY_PILLS.find((p) => p.id === selectedPill);
        if (pill?.match) {
          const matchStr = `${s.category} ${s.categories?.join(' ')} ${s.tags?.join(' ')}`.toLowerCase();
          if (!matchStr.includes(pill.match.toLowerCase())) {
            return false;
          }
        }
      }
      // Search filter
      if (!q) return true;
      const combined = `${s.name} ${s.nameLocal || ''} ${s.summary} ${s.category} ${s.benefits} ${s.eligibility} ${s.subsidyHighlight || ''} ${s.tags?.join(' ') || ''}`.toLowerCase();
      return combined.includes(q);
    };

    const local = schemes.filter(
      (s) =>
        (s.state?.toLowerCase() === selectedState.toLowerCase() ||
          (s.states?.some((st) => st.toLowerCase() === selectedState.toLowerCase()) && s.state !== 'All India')) &&
        matchesSearchAndCategory(s)
    );

    const national = schemes.filter(
      (s) => (s.state === 'All India' || s.states?.includes('All India')) && matchesSearchAndCategory(s)
    );

    return { localSchemes: local, allIndiaSchemes: national };
  }, [schemes, search, selectedState, selectedPill]);

  const runEligibilityCalculator = () => {
    let count = 6;
    let estBenefit = '₹1,50,000 - ₹2,80,000';
    let topSchemes = ['PM-KISAN (₹6,000/yr)', 'PM-KUSUM (60% Solar Subsidy)', 'PMKSY (55% Drip Subsidy)'];

    if (landSize === 'small' || farmerCat === 'scst' || farmerCat === 'woman') {
      count = 8;
      estBenefit = '₹2,50,000 - ₹4,50,000+';
      topSchemes = [
        'PM-KISAN (₹6,000/yr Direct Cash)',
        'PM-KUSUM (Up to 90% Solar Pump Subsidy)',
        'PMKSY (Up to 80% Drip Irrigation Grant)',
        'SMAM (50% Machinery & Drone Subsidy)',
      ];
    } else if (landSize === 'tenant') {
      count = 4;
      estBenefit = '₹80,000 - ₹1,60,000';
      topSchemes = ['PMFBY (Crop Loss Protection)', 'Kisan Credit Card (4% Interest Loan)', 'Soil Health Card (Free Testing)'];
    }

    setCalcResult({ count, estBenefit, topSchemes });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b45309', '#d97706', '#f59e0b', '#c2410c'],
      });
    } catch {
      // ignore
    }
  };

  const handleShareWhatsApp = (scheme: Scheme) => {
    const text = encodeURIComponent(
      `🌾 *${scheme.name}*\n` +
      `💡 ${scheme.subsidyHighlight || scheme.summary}\n` +
      `🔗 अधिक जानकारी और आवेदन: ${scheme.portalUrl}\n` +
      `_Phlora Helpline AI Agriculture Portal_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const renderSchemeCard = (scheme: Scheme, isLocalPriority: boolean, index: number) => {
    const isExpanded = expandedSchemeId === scheme.id;
    return (
      <motion.article
        key={scheme.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
        whileHover={{ y: -4 }}
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 18,
          border: isLocalPriority ? '1.5px solid var(--forestLight)' : '1px solid var(--line)',
          boxShadow: isLocalPriority ? '0 6px 24px rgba(46, 107, 69, 0.12)' : 'var(--shadowCard)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Real High-Definition Agricultural Image with Badges */}
        <div style={{ position: 'relative', height: 180, width: '100%', overflow: 'hidden', background: '#13281c' }}>
          <img
            src={
              scheme.imageUrl ||
              'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=800&auto=format&fit=crop&q=80'
            }
            alt={scheme.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9)',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,35,22,0.85) 100%)',
            }}
          />

          {/* Top Badges */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--forest)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {scheme.category.split('&')[0]}
            </span>

            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 999,
                background: isLocalPriority ? 'var(--forest)' : 'rgba(0, 0, 0, 0.65)',
                color: '#ffffff',
                backdropFilter: 'blur(4px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {isLocalPriority ? (
                <>
                  <Sparkles size={11} /> {scheme.state} {lang === 'hi' ? 'विशेष' : 'Special'}
                </>
              ) : (
                '🇮🇳 All India'
              )}
            </span>
          </div>

          {/* Bottom Image Overlay: Subsidy Highlight Pill */}
          <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12.5,
                fontWeight: 800,
                padding: '5px 12px',
                borderRadius: 8,
                background: 'var(--sun)',
                color: '#2b1b04',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              <Award size={14} />
              {scheme.subsidyHighlight || 'Government Approved Scheme'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {/* Ministry Tag */}
          {scheme.ministry && (
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-soft)' }}>
              🏛️ {scheme.ministry}
            </span>
          )}

          {/* Scheme Title */}
          <div>
            <h3 style={{ fontSize: 17.5, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)', lineHeight: 1.3 }}>
              {scheme.name}
            </h3>
            {scheme.nameLocal && (
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--forest)', margin: 0 }}>
                {scheme.nameLocal}
              </p>
            )}
          </div>

          {/* Summary */}
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0, color: 'var(--ink-soft)' }}>
            {scheme.summary}
          </p>

          {/* Key Benefits Card */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              background: 'var(--surfaceSoft)',
              border: '1px solid var(--line)',
              fontSize: 13,
              display: 'flex',
              gap: 8,
            }}
          >
            <Gift size={16} color="var(--forest)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ color: 'var(--forest)' }}>
                {lang === 'hi' ? 'मुख्य लाभ: ' : 'Direct Benefits: '}
              </strong>
              <span style={{ color: 'var(--ink)' }}>{scheme.benefits}</span>
            </div>
          </div>

          {/* Target Eligibility Preview */}
          <div style={{ fontSize: 12.5, color: 'var(--ink)' }}>
            <strong style={{ color: 'var(--earth)' }}>
              👥 {lang === 'hi' ? 'पात्र किसान:' : 'Eligible Farmers:'}{' '}
            </strong>
            {scheme.targetFarmers || scheme.eligibility.slice(0, 85) + '...'}
          </div>

          {/* EXPANDABLE SECTION: Documents Checklist & 4-Step How-to-Apply */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  paddingTop: 8,
                  borderTop: '1px dashed var(--line)',
                }}
              >
                {/* Required Documents */}
                {scheme.documentsRequired && scheme.documentsRequired.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileText size={14} color="var(--forest)" />
                      {lang === 'hi' ? 'आवश्यक दस्तावेज (Documents Required):' : 'Required Documents Checklist:'}
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                      {scheme.documentsRequired.map((doc, dIdx) => (
                        <li key={dIdx}>
                          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Application Steps */}
                {scheme.applicationSteps && scheme.applicationSteps.length > 0 ? (
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--forest)', margin: '0 0 6px' }}>
                      🚀 {lang === 'hi' ? 'आवेदन कैसे करें (Step-by-Step Guide):' : 'How to Apply (Application Steps):'}
                    </h4>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {scheme.applicationSteps.map((step, sIdx) => (
                        <div key={sIdx} style={{ fontSize: 12, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              background: 'var(--leaf-light)',
                              color: 'var(--forest)',
                              fontSize: 10,
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            {sIdx + 1}
                          </span>
                          <span style={{ color: 'var(--ink)', lineHeight: 1.45 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                    <strong>{lang === 'hi' ? 'आवेदन का तरीका:' : 'How to Apply:'}</strong> {scheme.howToApply}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Expand Details Button */}
          <button
            type="button"
            onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--forest)',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: 0,
              marginTop: 2,
            }}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={14} /> {lang === 'hi' ? 'दस्तावेज व विवरण कम करें' : 'Hide Details & Documents'}
              </>
            ) : (
              <>
                <ChevronDown size={14} /> {lang === 'hi' ? 'आवश्यक दस्तावेज व 4-स्टेप आवेदन देखें' : 'View Required Documents & Steps'}
              </>
            )}
          </button>

          {/* Action Buttons Row */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 14,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              <span>{lang === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
              <ExternalLink size={13} />
            </a>

            <button
              type="button"
              className="icon-btn"
              title="Share via WhatsApp"
              onClick={() => handleShareWhatsApp(scheme)}
            >
              <Share2 size={16} />
            </button>

            <button
              type="button"
              className="icon-btn"
              title="Ask AI Assistant about this scheme"
              onClick={() => navigate(`/assistant?q=${encodeURIComponent(`Tell me how to apply for ${scheme.name} step by step`)}`)}
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    <div className="page page--wide" style={{ paddingTop: 24, paddingBottom: 60 }}>
      {/* Title & Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'var(--leaf-light)',
              color: 'var(--forest)',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            <Sparkles size={13} /> DIRECT BENEFIT TRANSFER (DBT) & CENTRAL SCHEMES
          </span>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Landmark size={30} color="var(--forest)" />
            {lang === 'hi' ? 'सरकारी कृषि योजनाएं व सब्सिडी' : 'Government Agricultural Schemes & Subsidies'}
          </h1>
          <p className="page-sub">
            {lang === 'hi'
              ? 'सोलर पंप (60-90%), ड्रिप सिंचाई (55%), ड्रोन व ट्रैक्टर सब्सिडी, और पीएम-किसान ₹6000 की सम्पूर्ण जानकारी और आवेदन प्रक्रिया।'
              : 'Explore verified government subsidies, solar pumps, drip grants, drone mechanization, crop insurance, and DBT cash support.'}
          </p>
        </div>

        {/* Toggle Eligibility Calculator Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="btn btn--primary"
          onClick={() => setShowCalculator(!showCalculator)}
          style={{
            background: 'linear-gradient(135deg, var(--forest), #78350f)',
            boxShadow: '0 4px 14px rgba(120, 53, 15, 0.25)',
          }}
        >
          <Calculator size={18} />
          {showCalculator
            ? lang === 'hi'
              ? 'कैलकुलेटर छिपाएं'
              : 'Close Calculator'
            : lang === 'hi'
            ? 'पात्रता व अनुदान कैलकुलेटर'
            : 'Eligibility & Subsidy Finder'}
        </motion.button>
      </motion.div>

      {/* LOCATION & STATE SELECTOR BAR */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: 20,
          background: 'linear-gradient(135deg, var(--surface) 0%, rgba(46, 107, 69, 0.05) 100%)',
          border: '1.5px solid var(--forestLight)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'var(--forest)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>
                {lang === 'hi' ? 'आपका स्थान:' : 'Your Location:'}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--forest)' }}>
                📍 {userLocation || selectedState}
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: 12.5, color: 'var(--ink-soft)' }}>
              {lang === 'hi'
                ? `✨ सबसे पहले आपके राज्य (${selectedState}) की योजनाएं दिखाई जा रही हैं, फिर अखिल भारतीय योजनाएं।`
                : `✨ Showing schemes for ${selectedState} first at the top, followed by All-India schemes.`}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>
            {lang === 'hi' ? 'राज्य चुनें:' : 'Select State:'}
          </label>
          <select
            className="select"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setUserLocation(e.target.value);
            }}
            style={{ minHeight: 40, padding: '4px 14px', borderRadius: 10, fontWeight: 700 }}
          >
            {stateOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setShowLocationModal(true)}
            style={{ borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            title={lang === 'hi' ? 'स्थान बदलें या GPS से खोजें' : 'Change location or find via GPS'}
          >
            <LocateFixed size={14} color="var(--forest)" />
            <span>{lang === 'hi' ? 'स्थान / GPS बदलें' : 'Change Location'}</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE ELIGIBILITY & SUBSIDY CALCULATOR DRAWER */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', marginBottom: 24 }}
          >
            <div
              className="card"
              style={{
                padding: '24px 28px',
                background: 'linear-gradient(145deg, var(--surface), var(--cream))',
                border: '2px solid var(--forestLight)',
                boxShadow: '0 8px 30px rgba(46, 107, 69, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--leaf-light)',
                    color: 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Calculator size={20} />
                </span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: 'var(--forest)' }}>
                    {lang === 'hi' ? 'जादुई पात्रता व सब्सिडी खोजक (1-क्लिक)' : 'Kisan Yojana Eligibility & Grant Calculator'}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                    {lang === 'hi'
                      ? 'अपनी जमीन और श्रेणी चुनें — सिस्टम तुरंत आपके लिए पात्र योजनाएं और अनुमानित सब्सिडी निकालेगा'
                      : 'Select your landholding and category to instantly compute eligible subsidies and entitlements'}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 16,
                  marginTop: 18,
                }}
              >
                <div className="field">
                  <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>
                    🌱 {lang === 'hi' ? 'जमीन का आकार (Landholding):' : 'Landholding Size:'}
                  </label>
                  <select
                    className="select"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value as any)}
                  >
                    <option value="small">Small & Marginal (&lt; 2 Hectares / 5 Acres)</option>
                    <option value="medium">Medium Farmer (2 to 5 Hectares)</option>
                    <option value="large">Large Farmer (&gt; 5 Hectares)</option>
                    <option value="tenant">Tenant / Sharecropper (बटाईदार / पट्टेदार)</option>
                  </select>
                </div>

                <div className="field">
                  <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>
                    👤 {lang === 'hi' ? 'किसान श्रेणी (Category):' : 'Farmer Category:'}
                  </label>
                  <select
                    className="select"
                    value={farmerCat}
                    onChange={(e) => setFarmerCat(e.target.value as any)}
                  >
                    <option value="gen">General</option>
                    <option value="obc">OBC</option>
                    <option value="scst">SC / ST (अतिरिक्त 20-30% सब्सिडी)</option>
                    <option value="woman">Woman Farmer (महिला किसान प्राथमिकता)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={runEligibilityCalculator}
                    style={{ minHeight: 46, background: 'var(--forest)' }}
                  >
                    <Sparkles size={16} />
                    {lang === 'hi' ? 'सब्सिडी व योजनाएं निकालें' : 'Compute My Subsidies'}
                  </motion.button>
                </div>
              </div>

              {calcResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 20,
                    padding: 16,
                    borderRadius: 14,
                    background: 'var(--leaf-light)',
                    border: '1.5px solid var(--forest)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--forest)', textTransform: 'uppercase' }}>
                        🎉 {lang === 'hi' ? 'अनुमानित वार्षिक सरकारी सहायता:' : 'Estimated Total Subsidy & Support:'}
                      </span>
                      <h4 style={{ fontSize: 22, fontWeight: 900, color: 'var(--forest)', margin: '2px 0 0' }}>
                        {calcResult.estBenefit}
                      </h4>
                    </div>
                    <span
                      style={{
                        padding: '6px 14px',
                        borderRadius: 999,
                        background: 'var(--forest)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      {calcResult.count} {lang === 'hi' ? 'योजनाओं में पात्र' : 'Eligible Schemes'}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--ink)' }}>
                    <strong>{lang === 'hi' ? 'शीर्ष अनुशंसित योजनाएं:' : 'Top Recommended Schemes:'}</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                      {calcResult.topSchemes.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '3px 10px',
                            borderRadius: 6,
                            background: '#ffffff',
                            color: 'var(--forest)',
                            fontSize: 12,
                            fontWeight: 700,
                            border: '1px solid var(--forestLight)',
                          }}
                        >
                          <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4 }} />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH AND CATEGORY FILTER CARD */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 20 }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            color="var(--ink-soft)"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'योजना का नाम, सब्सिडी या कीवर्ड खोजें (उदा. सोलर, ट्रैक्टर, बीमा, ₹6000)...'
                : 'Search by scheme, subsidy, keyword (e.g. Solar, Drone, Insurance, 6000)...'
            }
            style={{
              paddingLeft: 42,
              borderRadius: 12,
              minHeight: 46,
              fontSize: 14.5,
              fontWeight: 600,
            }}
          />
        </div>

        {/* Visual Category Pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingTop: 14,
            marginTop: 10,
            borderTop: '1px solid var(--line)',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORY_PILLS.map((pill) => {
            const Icon = pill.icon;
            const active = selectedPill === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedPill(pill.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: active ? 800 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: `1.5px solid ${active ? 'var(--forest)' : 'var(--line)'}`,
                  background: active ? 'var(--forest)' : 'var(--surface)',
                  color: active ? '#ffffff' : 'var(--ink)',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Section Tabs: Both (Priority Local First) vs Local Only vs All-India */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
          <button
            type="button"
            className={`chip${activeTab === 'both' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('both')}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontWeight: activeTab === 'both' ? 800 : 600,
              fontSize: 12.5,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'both' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'both' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'both' ? '#ffffff' : 'var(--ink)',
            }}
          >
            📍 {lang === 'hi' ? `${selectedState} (पहले) + पूरे भारत की` : `${selectedState} (First) & All India`}
          </button>

          <button
            type="button"
            className={`chip${activeTab === 'local' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('local')}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontWeight: activeTab === 'local' ? 800 : 600,
              fontSize: 12.5,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'local' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'local' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'local' ? '#ffffff' : 'var(--ink)',
            }}
          >
            📍 {lang === 'hi' ? `केवल ${selectedState} की योजनाएं (${localSchemes.length})` : `Only ${selectedState} (${localSchemes.length})`}
          </button>

          <button
            type="button"
            className={`chip${activeTab === 'all-india' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('all-india')}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontWeight: activeTab === 'all-india' ? 800 : 600,
              fontSize: 12.5,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'all-india' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'all-india' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'all-india' ? '#ffffff' : 'var(--ink)',
            }}
          >
            🇮🇳 {lang === 'hi' ? `केवल अखिल भारतीय योजनाएं (${allIndiaSchemes.length})` : `Only All India Schemes (${allIndiaSchemes.length})`}
          </button>
        </div>
      </div>

      {/* SCHEMES CONTAINER: LOCAL SECTION SHOWN FIRST, THEN ALL INDIA SECTION */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card" style={{ height: 320, padding: 20 }} />
          ))}
        </div>
      ) : localSchemes.length === 0 && allIndiaSchemes.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <Landmark size={40} color="var(--forest)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px', color: 'var(--ink)' }}>
            {lang === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes match your search'}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            {lang === 'hi' ? 'कृपया अलग कीवर्ड या राज्य चुनकर दोबारा देखें।' : 'Try clearing your search query or selecting another state.'}
          </p>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => {
              setSearch('');
              setSelectedPill('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* SECTION 1: USER'S LOCATION / STATE SCHEMES (SHOWN FIRST) */}
          {(activeTab === 'both' || activeTab === 'local') && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 18,
                  paddingBottom: 8,
                  borderBottom: '2px solid var(--forestLight)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: 'var(--forest)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: 0,
                    }}
                  >
                    <MapPin size={24} color="var(--forest)" />
                    {lang === 'hi'
                      ? `📍 आपके राज्य (${selectedState}) के लिए विशेष योजनाएं`
                      : `📍 Special Schemes for Your State (${selectedState})`}
                  </h2>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                    {lang === 'hi'
                      ? `✨ आपके स्थान (${userLocation || selectedState}) के अनुसार अनुशंसित विशेष राज्य योजनाएं (सबसे पहले)`
                      : `✨ Top priority regional schemes recommended specifically for your location (${userLocation || selectedState})`}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 999,
                    background: 'var(--leaf-light)',
                    color: 'var(--forest)',
                  }}
                >
                  {localSchemes.length} {lang === 'hi' ? 'राज्य योजनाएं' : 'State Schemes'}
                </span>
              </div>

              {localSchemes.length === 0 ? (
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                  <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: 0 }}>
                    {lang === 'hi'
                      ? `वर्तमान में ${selectedState} के लिए कोई विशिष्ट योजना नहीं मिली। कृपया नीचे अखिल भारतीय योजनाएं देखें या राज्य बदलें।`
                      : `No state-specific scheme found for ${selectedState}. Please check the All-India schemes below.`}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: 22,
                  }}
                >
                  {localSchemes.map((scheme, idx) => renderSchemeCard(scheme, true, idx))}
                </div>
              )}
            </section>
          )}

          {/* SECTION 2: ALL-INDIA CENTRAL FLAGSHIP SCHEMES */}
          {(activeTab === 'both' || activeTab === 'all-india') && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 18,
                  paddingBottom: 8,
                  borderBottom: '2px solid var(--line)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: 0,
                    }}
                  >
                    <Landmark size={24} color="var(--earth-dark)" />
                    {lang === 'hi'
                      ? '🇮🇳 अखिल भारतीय केंद्रीय योजनाएं (All India Schemes)'
                      : '🇮🇳 All-India Central Flagship Schemes'}
                  </h2>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                    {lang === 'hi'
                      ? 'पीएम-किसान, पीएम-कुसुम सोलर पंप, पीएमएफबीवाई फसल बीमा व केसीसी — पूरे देश के सभी किसानों के लिए उपलब्ध'
                      : 'PM-KISAN, PM-KUSUM Solar Pumps, Crop Insurance, and KCC Loans — available to all farmers across India'}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 999,
                    background: 'var(--cream)',
                    color: 'var(--ink)',
                  }}
                >
                  {allIndiaSchemes.length} {lang === 'hi' ? 'केंद्रीय योजनाएं' : 'Central Schemes'}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: 22,
                }}
              >
                {allIndiaSchemes.map((scheme, idx) => renderSchemeCard(scheme, false, idx))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
