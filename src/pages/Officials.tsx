import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Search,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  Headphones,
  GraduationCap,
  ExternalLink,
  LocateFixed,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { OfficialContact } from '../types';

export const Officials: React.FC = () => {
  const { lang, pushToast, userLocation, userState, setUserLocation, setShowLocationModal } = useApp();
  const [officials, setOfficials] = useState<OfficialContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<string>(userState || 'Maharashtra');
  const [activeTab, setActiveTab] = useState<'both' | 'local' | 'all-india'>('both');
  const [disclaimer, setDisclaimer] = useState('');

  // Keep selectedState synced if userLocation changes initially
  useEffect(() => {
    if (userState) {
      setSelectedState(userState);
    }
  }, [userState]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get<{ officials: OfficialContact[]; disclaimer?: string }>(
      `/officials?lang=${lang}&region=all`
    )
      .then(res => {
        if (active) {
          setOfficials(res.officials || []);
          setDisclaimer(res.disclaimer || '');
        }
      })
      .catch(() => {
        if (active) pushToast({ kind: 'error', title: d(lang, 'toast.error') });
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

  // Partition officials
  const { localOfficials, allIndiaOfficials } = useMemo(() => {
    const q = search.trim().toLowerCase();

    const matchesSearch = (o: OfficialContact) => {
      if (!q) return true;
      return `${o.name} ${o.region} ${o.contact} ${o.notes} ${o.kind}`.toLowerCase().includes(q);
    };

    const local = officials.filter(
      (o) => o.region.toLowerCase() === selectedState.toLowerCase() && matchesSearch(o)
    );

    const national = officials.filter(
      (o) => (o.region === 'All India' || o.region === 'National') && matchesSearch(o)
    );

    return { localOfficials: local, allIndiaOfficials: national };
  }, [officials, search, selectedState]);

  const renderOfficialCard = (officer: OfficialContact, isLocalPriority: boolean) => {
    const isHelpline = officer.kind === 'helpline';
    const isExpert = officer.kind === 'expert';
    const isDept = officer.kind === 'department';

    const cleanTel = officer.contact.match(/[\d-]{8,}/)?.[0]?.replace(/-/g, '') || '';

    return (
      <motion.article
        key={officer.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="card"
        style={{
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          borderRadius: 16,
          border: isLocalPriority ? '1.5px solid var(--forestLight)' : '1px solid var(--line)',
          background: isLocalPriority
            ? 'linear-gradient(180deg, var(--surface) 0%, rgba(46, 107, 69, 0.03) 100%)'
            : 'var(--surface)',
          boxShadow: isLocalPriority ? '0 4px 18px rgba(46, 107, 69, 0.08)' : 'var(--shadowCard)',
        }}
      >
        {/* Top Kind & Region Badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ flex: 1 }}>
            {isLocalPriority && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 800,
                  color: 'var(--forest)',
                  background: 'var(--leaf-light)',
                  padding: '2px 8px',
                  borderRadius: 999,
                  marginBottom: 6,
                }}
              >
                <Sparkles size={11} /> {lang === 'hi' ? 'आपके स्थान का अधिकारी' : 'Your Local Officer / Center'}
              </span>
            )}
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              {officer.name}
            </h3>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12.5,
                color: 'var(--ink-soft)',
                marginTop: 4,
              }}
            >
              <MapPin size={13} color="var(--forest)" />
              <span style={{ fontWeight: 600 }}>{officer.region}</span>
            </div>
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11.5,
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 999,
              background: isHelpline
                ? 'rgba(235, 94, 40, 0.12)'
                : isExpert
                ? 'var(--leaf-light)'
                : 'rgba(56, 189, 248, 0.12)',
              color: isHelpline ? 'var(--danger)' : isExpert ? 'var(--forest)' : '#0284c7',
              whiteSpace: 'nowrap',
            }}
          >
            {isHelpline && <Headphones size={12} />}
            {isExpert && <GraduationCap size={12} />}
            {isDept && <Building2 size={12} />}
            {officer.kind.toUpperCase()}
          </span>
        </div>

        {/* Detailed Notes */}
        <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0, color: 'var(--ink-soft)' }}>
          {officer.notes}
        </p>

        {/* Working Hours */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12.5,
            color: 'var(--ink-soft)',
            marginTop: 'auto',
            paddingTop: 8,
          }}
        >
          <Clock size={13} color="var(--ink-soft)" />
          <span>{lang === 'hi' ? 'समय:' : 'Timings:'} {officer.timings}</span>
        </div>

        {/* Action Call & Contact Buttons */}
        <div style={{ paddingTop: 10, borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
          {cleanTel ? (
            <a
              href={`tel:${cleanTel}`}
              className="btn btn--primary btn--sm"
              style={{
                flex: 1,
                textDecoration: 'none',
                justifyContent: 'center',
                background: 'var(--forest)',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <PhoneCall size={14} />
              <span>{lang === 'hi' ? 'कॉल करें:' : 'Call:'} {cleanTel}</span>
            </a>
          ) : (
            <div
              className="btn btn--outline btn--sm"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              <ExternalLink size={14} />
              <span>{officer.contact}</span>
            </div>
          )}
        </div>
      </motion.article>
    );
  };

  return (
    <div className="page page--wide" style={{ paddingTop: 24, paddingBottom: 60 }}>
      {/* Title & Header */}
      <div style={{ marginBottom: 20 }}>
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
            marginBottom: 8,
          }}
        >
          <ShieldCheck size={13} /> {lang === 'hi' ? 'सत्यापित कृषि विभाग संपर्क' : 'VERIFIED GOVERNMENT EXTENSION DIRECTORY'}
        </span>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={30} color="var(--forest)" />
          {lang === 'hi' ? 'कृषि अधिकारी, KVK व हेल्पलाइन' : 'Agricultural Officers & KVK Directory'}
        </h1>
        <p className="page-sub">
          {lang === 'hi'
            ? 'आपके जिले के कृषि अधिकारी (DAO), कृषि विज्ञान केंद्र (KVK), व राष्ट्रीय किसान कॉल सेंटर 1800-180-1551 के आधिकारिक संपर्क सूत्र।'
            : 'Direct verified contact numbers for District Agriculture Officers, Krishi Vigyan Kendras, and 24/7 National Farmer Helplines.'}
        </p>
      </div>

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
                ? `सबसे पहले आपके राज्य (${selectedState}) के अधिकारी दिखाए जा रहे हैं, फिर पूरे भारत की हेल्पलाइन।`
                : `Showing officers for ${selectedState} first at the top, followed by All-India Helplines.`}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>
            {lang === 'hi' ? 'राज्य बदलें:' : 'Switch State:'}
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

      {/* SEARCH AND TABS FILTER */}
      <div className="card" style={{ padding: 18, display: 'grid', gap: 14, marginBottom: 24 }}>
        {/* Search Input */}
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
                ? `अधिकारी, KVK या जिला खोजें (उदा. ${selectedState}, KVK, कॉल सेंटर)...`
                : `Search official, KVK, district or helpline in ${selectedState}...`
            }
            style={{ paddingLeft: 42, borderRadius: 12, minHeight: 46 }}
          />
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button
            type="button"
            className={`chip${activeTab === 'both' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('both')}
            style={{
              padding: '7px 16px',
              borderRadius: 999,
              fontWeight: activeTab === 'both' ? 800 : 600,
              fontSize: 13,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'both' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'both' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'both' ? '#ffffff' : 'var(--ink)',
            }}
          >
            📍 {lang === 'hi' ? `${selectedState} + राष्ट्रीय हेल्पलाइन (दोनों)` : `${selectedState} & National (All)`}
          </button>

          <button
            type="button"
            className={`chip${activeTab === 'local' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('local')}
            style={{
              padding: '7px 16px',
              borderRadius: 999,
              fontWeight: activeTab === 'local' ? 800 : 600,
              fontSize: 13,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'local' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'local' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'local' ? '#ffffff' : 'var(--ink)',
            }}
          >
            📍 {lang === 'hi' ? `केवल ${selectedState} के अधिकारी (${localOfficials.length})` : `Only ${selectedState} (${localOfficials.length})`}
          </button>

          <button
            type="button"
            className={`chip${activeTab === 'all-india' ? ' lang-chip--on' : ''}`}
            onClick={() => setActiveTab('all-india')}
            style={{
              padding: '7px 16px',
              borderRadius: 999,
              fontWeight: activeTab === 'all-india' ? 800 : 600,
              fontSize: 13,
              cursor: 'pointer',
              border: `1.5px solid ${activeTab === 'all-india' ? 'var(--forest)' : 'var(--line)'}`,
              background: activeTab === 'all-india' ? 'var(--forest)' : 'var(--surface)',
              color: activeTab === 'all-india' ? '#ffffff' : 'var(--ink)',
            }}
          >
            🇮🇳 {lang === 'hi' ? `केवल अखिल भारतीय हेल्पलाइन (${allIndiaOfficials.length})` : `Only All-India Helplines (${allIndiaOfficials.length})`}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: 16 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="card" style={{ height: 160, padding: 20 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {/* SECTION 1: USER'S STATE & LOCAL DISTRICT OFFICERS (SHOWN FIRST) */}
          {(activeTab === 'both' || activeTab === 'local') && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '2px solid var(--forestLight)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: 'var(--forest)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: 0,
                    }}
                  >
                    <MapPin size={22} color="var(--forest)" />
                    {lang === 'hi'
                      ? `📍 आपके राज्य (${selectedState}) के कृषि अधिकारी व KVK`
                      : `📍 Agricultural Officers & KVK for ${selectedState}`}
                  </h2>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                    {lang === 'hi'
                      ? 'आपके जिले व संभाग के मुख्य कृषि अधिकारी, मिट्टी परीक्षण व किसान समाधान केंद्र'
                      : `District Agriculture Officers, ICAR Krishi Vigyan Kendras, and State Helplines for ${selectedState}`}
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
                  {localOfficials.length} {lang === 'hi' ? 'अधिकारी उपलब्ध' : 'Local Contacts'}
                </span>
              </div>

              {localOfficials.length === 0 ? (
                <div className="card" style={{ padding: 28, textAlign: 'center' }}>
                  <AlertCircle size={32} color="var(--ink-soft)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                    {lang === 'hi'
                      ? `${selectedState} के लिए कोई विशिष्ट अधिकारी नहीं मिला। कृपया ऊपर से दूसरा राज्य चुनें या राष्ट्रीय हेल्पलाइन 1800-180-1551 पर कॉल करें।`
                      : `No specific contact found for ${selectedState}. Please select another state above or dial the national helpline 1800-180-1551.`}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 16,
                  }}
                >
                  {localOfficials.map((officer) => renderOfficialCard(officer, true))}
                </div>
              )}
            </section>
          )}

          {/* SECTION 2: ALL-INDIA NATIONAL HELPLINES & CENTRAL INSTITUTES */}
          {(activeTab === 'both' || activeTab === 'all-india') && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '2px solid var(--line)',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: 0,
                    }}
                  >
                    <Headphones size={22} color="var(--earth-dark)" />
                    {lang === 'hi'
                      ? '🇮🇳 राष्ट्रीय हेल्पलाइन व अखिल भारतीय कार्यालय'
                      : '🇮🇳 National Helplines & All-India Agricultural Centers'}
                  </h2>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                    {lang === 'hi'
                      ? 'किसान कॉल सेंटर 1800-180-1551 (22 भाषाओं में मुफ्त), पीएम-किसान व फसल बीमा हेल्पलाइन'
                      : 'Kisan Call Centre 1800-180-1551 (22 Indian languages), PM-KISAN, and Crop Insurance National Centers'}
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
                  {allIndiaOfficials.length} {lang === 'hi' ? 'राष्ट्रीय हेल्पलाइन' : 'Central Helplines'}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 16,
                }}
              >
                {allIndiaOfficials.map((officer) => renderOfficialCard(officer, false))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Government Source Disclaimer */}
      {disclaimer && (
        <div
          style={{
            marginTop: 32,
            padding: '14px 18px',
            borderRadius: 12,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <ShieldCheck size={18} color="var(--forest)" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            {disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};
