import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  Search,
  Check,
  X,
  Compass,
  Building2,
  Wheat,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PresetLocation {
  name: string;
  hindiName: string;
  state: string;
  badge: string;
}

const POPULAR_AGRI_HUBS: PresetLocation[] = [
  { name: 'Nashik, Maharashtra', hindiName: 'नाशिक (Nashik)', state: 'Maharashtra', badge: 'प्याज व अंगूर हब' },
  { name: 'Pune, Maharashtra', hindiName: 'पुणे (Pune)', state: 'Maharashtra', badge: 'सब्जी व गन्ना बेल्ट' },
  { name: 'Nagpur, Maharashtra', hindiName: 'नागपुर (Nagpur)', state: 'Maharashtra', badge: 'संतरा व कपास मंडी' },
  { name: 'Jaipur, Rajasthan', hindiName: 'जयपुर (Jaipur)', state: 'Rajasthan', badge: 'बाजरा व तिलहन' },
  { name: 'Jodhpur, Rajasthan', hindiName: 'जोधपुर (Jodhpur)', state: 'Rajasthan', badge: 'ग्वार व मूंग मंडी' },
  { name: 'Lucknow, Uttar Pradesh', hindiName: 'लखनऊ (Lucknow)', state: 'Uttar Pradesh', badge: 'आम व गन्ना बेल्ट' },
  { name: 'Varanasi, Uttar Pradesh', hindiName: 'वाराणसी (Varanasi)', state: 'Uttar Pradesh', badge: 'गंगा कछार धान' },
  { name: 'Indore, Madhya Pradesh', hindiName: 'इंदौर (Indore)', state: 'Madhya Pradesh', badge: 'सोयाबीन व गेहूँ हब' },
  { name: 'Ludhiana, Punjab', hindiName: 'लुधियाना (Ludhiana)', state: 'Punjab', badge: 'गेहूँ व धान क्रांति' },
  { name: 'Karnal, Haryana', hindiName: 'करनाल (Karnal)', state: 'Haryana', badge: 'बासमती चावल हब' },
  { name: 'Patna, Bihar', hindiName: 'पटना (Patna)', state: 'Bihar', badge: 'मक्का व सब्जी बेल्ट' },
  { name: 'Rajkot, Gujarat', hindiName: 'राजकोट (Rajkot)', state: 'Gujarat', badge: 'मूंगफली व कपास मंडी' },
];

const ALL_STATES = [
  'Maharashtra',
  'Rajasthan',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Bihar',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'West Bengal',
  'Odisha',
];

export const LocationModal: React.FC = () => {
  const {
    lang,
    userLocation,
    userState,
    setUserLocation,
    showLocationModal,
    setShowLocationModal,
    refreshGpsLocation,
    pushToast,
  } = useApp();

  const [searchInput, setSearchInput] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('');
  const [refreshingGps, setRefreshingGps] = useState(false);

  if (!showLocationModal) return null;

  const isHi = lang === 'hi';
  const isMr = lang === 'mr';

  const handleApplyLocation = (newLoc: string) => {
    if (!newLoc.trim()) return;
    const clean = newLoc.trim();
    setUserLocation(clean);
    pushToast({
      kind: 'success',
      title: isHi ? 'स्थान अपडेट हुआ' : isMr ? 'स्थान बदलले' : 'Location Updated',
      message: `${clean}`,
    });
    setShowLocationModal(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    handleApplyLocation(searchInput);
  };

  const handleLiveGpsRefresh = async () => {
    setRefreshingGps(true);
    try {
      const result = await refreshGpsLocation();
      if (result.success && result.location) {
        pushToast({
          kind: 'success',
          title: isHi ? 'लाइव GPS स्थान मिला' : 'Live GPS Detected',
          message: `${result.location}`,
        });
        setShowLocationModal(false);
      } else {
        pushToast({
          kind: 'warning',
          title: isHi ? 'GPS स्थान नहीं मिला' : 'GPS Not Available',
          message: result.error || (isHi ? 'कृपया ब्राउज़र में लोकेशन अनुमति जांचें' : 'Please check browser location permission'),
        });
      }
    } catch {
      pushToast({
        kind: 'error',
        title: isHi ? 'GPS त्रुटि' : 'GPS Error',
        message: isHi ? 'कृपया नीचे सूची से अपना शहर चुनें' : 'Please select your city from the list below',
      });
    } finally {
      setRefreshingGps(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          background: 'rgba(10, 20, 14, 0.76)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowLocationModal(false);
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="loc-modal-title"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 580,
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--surface)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'var(--ink)',
            borderRadius: 24,
            padding: '24px 22px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), var(--glassShadow)',
            border: '1.5px solid var(--glassBorder)',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowLocationModal(false)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 36,
              height: 36,
              borderRadius: 18,
              background: 'var(--cream)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink-soft)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
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
              <Compass size={13} /> {isHi ? 'स्थान व मौसम केंद्र सेटिंग्स' : 'LOCATION & WEATHER SETUP'}
            </span>

            <h2
              id="loc-modal-title"
              style={{
                fontSize: 'clamp(20px, 3.4vw, 24px)',
                fontWeight: 800,
                margin: '0 0 6px',
                color: 'var(--ink)',
              }}
            >
              {isHi ? 'अपना स्थान चुनें या GPS रीफ्रेश करें' : 'Set Location or Refresh GPS'}
            </h2>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.45 }}>
              {isHi
                ? 'सटीक 7-दिवसीय मौसम पूर्वानुमान, लाइव मंडी भाव और राज्य-स्तरीय सरकारी योजनाओं के लिए स्थान चुनें:'
                : 'Select your farm location for pinpoint localized weather forecasts, APMC rates & state schemes:'}
            </p>

            {/* Currently active location banner */}
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 14,
                background: 'var(--cream)',
                border: '1px solid var(--line)',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'var(--forest)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-soft)' }}>
                    {isHi ? 'वर्तमान सक्रिय स्थान:' : 'Currently Active Location:'}
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)' }}>
                    {userLocation || 'Nashik, Maharashtra'} <span style={{ opacity: 0.7, fontSize: 12.5 }}>({userState})</span>
                  </div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: 'var(--forest)',
                  background: 'var(--leaf-light)',
                  padding: '3px 8px',
                  borderRadius: 999,
                }}
              >
                <CheckCircle2 size={12} /> {isHi ? 'सक्रिय' : 'Active'}
              </span>
            </div>
          </div>

          {/* Section 1: Live GPS Instant Fetch */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--forest)', marginBottom: 8 }}>
              {isHi ? 'विकल्प 1 · सैटेलाइट जीपीएस से स्वतः पहचानें' : 'OPTION 1 · REAL-TIME DEVICE GPS'}
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={refreshingGps}
              onClick={handleLiveGpsRefresh}
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 4px 14px rgba(120, 53, 15, 0.25)',
              }}
            >
              {refreshingGps ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{isHi ? 'लाइव GPS स्थान खोज रहे हैं...' : 'Acquiring Fresh GPS Coordinates...'}</span>
                </>
              ) : (
                <>
                  <Navigation size={18} />
                  <span>{isHi ? '🛰️ वर्तमान GPS स्थान से अपडेट करें' : '🛰️ Refresh Live GPS Location'}</span>
                </>
              )}
            </motion.button>
            <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '6px 0 0 4px' }}>
              {isHi
                ? '⚡ फ्रेश कोऑर्डिनेट्स प्राप्त होंगे जिससे पिछला स्थान तुरंत बदल जाएगा।'
                : '⚡ Force-updates hardware GPS without reusing stale cache.'}
            </p>
          </div>

          {/* Section 2: Type Any District / City */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--forest)', marginBottom: 8 }}>
              {isHi ? 'विकल्प 2 · अपना जिला, तहसील या शहर खोजें' : 'OPTION 2 · SEARCH DISTRICT OR CITY'}
            </div>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--ink-soft)',
                  }}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={isHi ? 'उदा. पुणे, बारामती, इंदौर, जयपुर, करनाल...' : 'e.g. Pune, Indore, Jaipur, Karnal...'}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 12,
                    background: 'var(--cream)',
                    border: '1.5px solid var(--line)',
                    color: 'var(--ink)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={!searchInput.trim()}
                style={{
                  padding: '0 16px',
                  borderRadius: 12,
                  background: searchInput.trim() ? 'var(--forest)' : 'var(--cream)',
                  color: searchInput.trim() ? '#ffffff' : 'var(--ink-soft)',
                  border: '1px solid var(--line)',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: searchInput.trim() ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                }}
              >
                {isHi ? 'लागू करें' : 'Apply'}
              </button>
            </form>
          </div>

          {/* Section 3: Popular Agricultural Hubs */}
          <div style={{ padding: '16px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--forest)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Wheat size={14} /> {isHi ? 'प्रमुख कृषि क्षेत्र (1-क्लिक चयन)' : 'PRIMARY AGRI HUBS (1-CLICK)'}
              </div>

              {/* State Filter Dropdown */}
              <select
                value={selectedStateFilter}
                onChange={(e) => {
                  setSelectedStateFilter(e.target.value);
                  if (e.target.value) {
                    handleApplyLocation(e.target.value);
                  }
                }}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 8,
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                <option value="">{isHi ? '— सभी राज्य —' : '— Select State —'}</option>
                {ALL_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 8,
                maxHeight: 220,
                overflowY: 'auto',
                paddingRight: 4,
              }}
            >
              {POPULAR_AGRI_HUBS.map((hub) => {
                const isCurrent = userLocation?.toLowerCase().includes(hub.name.split(',')[0].toLowerCase());
                return (
                  <button
                    key={hub.name}
                    type="button"
                    onClick={() => handleApplyLocation(hub.name)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: 12,
                      background: isCurrent ? 'var(--leaf-light)' : 'var(--cream)',
                      border: `1.5px solid ${isCurrent ? 'var(--leaf)' : 'var(--line)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: isCurrent ? 'var(--forest)' : 'var(--ink)' }}>
                        {isHi ? hub.hindiName : hub.name.split(',')[0]}
                      </span>
                      {isCurrent && <Check size={13} color="var(--forest)" />}
                    </div>
                    <span style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>
                      {hub.state} · {hub.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
