import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Mic,
  Camera,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X,
  ArrowRight,
  AlertCircle,
  Loader2,
  Navigation,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PHLogoMark } from './Header';

export const InitialPermissionModal: React.FC = () => {
  const {
    lang,
    permissions,
    userLocation,
    showPermissionModal,
    setShowPermissionModal,
    setShowLocationModal,
    requestPermission,
    requestAllPermissions,
    pushToast,
  } = useApp();

  const [requesting, setRequesting] = useState<'all' | 'location' | 'microphone' | 'camera' | null>(null);
  const [successAll, setSuccessAll] = useState(false);

  if (!showPermissionModal) return null;

  const isHi = lang === 'hi';
  const isMr = lang === 'mr';
  const isMl = lang === 'ml';

  const t = {
    badge: isHi
      ? 'स्मार्ट कृषि सहायक · अनुमतियाँ'
      : isMr
      ? 'स्मार्ट कृषी सहाय्यक · परवानग्या'
      : isMl
      ? 'സ്മാർട്ട് കാർഷിക അസിസ്റ്റന്റ്'
      : 'SMART AGRI-TECH SETUP · PERMISSIONS',
    title:
      lang === 'hi'
        ? 'Phlora Helpline में आपका स्वागत है'
        : lang === 'mr'
        ? 'Phlora Helpline मध्ये आपले स्वागत आहे'
        : lang === 'pa'
        ? 'Phlora Helpline ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ'
        : lang === 'bn'
        ? 'Phlora Helpline-এ আপনাকে স্বাগতম'
        : lang === 'te'
        ? 'Phlora Helpline కి స్వాగతం'
        : lang === 'ta'
        ? 'Phlora Helpline-க்கு வரவேற்கிறோம்'
        : lang === 'gu'
        ? 'Phlora Helpline માં આપનું સ્વાગત છે'
        : lang === 'kn'
        ? 'Phlora Helpline ಗೆ ಸುಸ್ವಾಗತ'
        : lang === 'ml'
        ? 'Phlora Helpline-ലേക്ക് സ്വാഗതം'
        : lang === 'ur'
        ? 'Phlora Helpline میں خوش آمدید'
        : 'Welcome to Phlora Helpline',
    sub: isHi
      ? 'आपके खेत के लिए सटीक मौसम, बारिश अलर्ट और बोलकर सवाल पूछने के लिए स्थान व माइक्रोफोन एक्सेस की आवश्यकता है:'
      : isMr
      ? 'आपल्या शेतासाठी अचूक हवामान, पावसाचा इशारा आणि बोलून प्रश्न विचारण्यासाठी स्थान व मायक्रोफोन आवश्यक आहे:'
      : isMl
      ? 'കൃത്യമായ കാലാവസ്ഥ, മഴ മുന്നറിയിപ്പ്, വോയ്സ് എന്നിവക്കായി അനുമതി നൽകുക:'
      : 'Enable location and microphone for localized farm weather, heavy rain alerts, and hands-free voice advisory:',
    locTitle: isHi ? 'जीपीएस स्थान (Location Access)' : isMr ? 'जीपीएस स्थान (Location)' : isMl ? 'ലൊക്കേഷൻ (Location)' : 'GPS Location Access',
    locDesc: isHi
      ? 'आपके जिले का सटीक 7-दिवसीय मौसम, बारिश अलर्ट और नजदीकी कृषि मंडी के भाव'
      : isMr
      ? 'आपल्या भागातील अचूक हवामान, पावसाचा इशारा व जवळच्या बाजार समितीचे भाव'
      : isMl
      ? 'പ്രാദേശിക കാലാവസ്ഥാ മുന്നറിയിപ്പും അടുത്തുള്ള മാർക്കറ്റ് നിരക്കുകളും'
      : 'Pinpoint 7-day weather, heavy rain alerts, and nearest APMC mandi crop rates',
    micTitle: isHi ? 'माइक्रोफोन (Voice Assistant)' : isMr ? 'मायक्रोफोन (Voice AI)' : isMl ? 'മൈക്രോഫോൺ (Voice)' : 'Microphone (Voice Assistant)',
    micDesc: isHi
      ? 'टाइप करने की जरूरत नहीं — अपनी भाषा में बोलकर खेती से जुड़ा कोई भी सवाल पूछें'
      : isMr
      ? 'टाईप न करता मराठीत बोलून शेतीविषयक कोणतेही प्रश्न विचारा'
      : isMl
      ? 'സംസാരിച്ച് കാർഷിക സംശയങ്ങൾ ചോദിക്കാനും ഉപദേശം കേൾക്കാനും'
      : 'Ask questions by speaking in your regional language — zero typing required',
    allowAllBtn: isHi
      ? 'स्थान व माइक्रोफोन सक्षम करें'
      : isMr
      ? 'स्थान व मायक्रोफोन सुरू करा'
      : isMl
      ? 'ലൊക്കേഷനും മൈക്രോഫോണും നൽകുക'
      : 'Allow Location & Microphone',
    skipBtn: isHi ? 'बाद में करें (Skip for Now)' : isMr ? 'नंतर करा' : isMl ? 'പിന്നീട് ചെയ്യാം' : 'Skip for now',
    granted: isHi ? 'स्वीकृत' : isMr ? 'मंजूर' : isMl ? 'ലഭിച്ചു' : 'Granted',
    allowSingle: isHi ? 'अनुमति दें' : isMr ? 'परवानगी द्या' : isMl ? 'അനുവദിക്കുക' : 'Allow',
    privacyNote: isHi
      ? '🔒 आपकी गोपनीयता सुरक्षित है: आपका डेटा केवल कृषि सलाह के लिए उपयोग होता है।'
      : isMr
      ? '🔒 आपला डेटा सुरक्षित आहे: माहिती केवळ शेतीविषयक सल्ल्यासाठी वापरली जाते.'
      : isMl
      ? '🔒 നിങ്ങളുടെ സ്വകാര്യത സുരക്ഷിതമാണ്. കൃഷി ആവശ്യങ്ങൾക്ക് മാത്രം.'
      : '🔒 100% Privacy Protected: Sensors and location are exclusively used for farming advisory.',
    successBanner: isHi
      ? 'शानदार! अनुमतियाँ सक्रिय हो गईं'
      : isMr
      ? 'छान! परवानग्या सुरू झाल्या'
      : isMl
      ? 'അനുമതികൾ വിജയകരമായി ലഭിച്ചു'
      : 'Success! Permissions granted',
  };

  const handleAllowAll = async () => {
    setRequesting('all');
    try {
      const results = await requestAllPermissions();
      if (results.location || results.microphone) {
        setSuccessAll(true);
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#b45309', '#d97706', '#f59e0b', '#c2410c'],
          });
        } catch {}
        pushToast({
          kind: 'success',
          title: isHi ? 'अनुमतियाँ सक्रिय हो गईं' : 'Permissions Activated',
          message: isHi ? 'स्थान व वॉइस अब चालू हैं।' : 'Location & Voice are now ready.',
        });
        localStorage.setItem('kisanai.permissionsDismissed', 'true');
        setTimeout(() => {
          setShowPermissionModal(false);
        }, 1200);
      } else {
        pushToast({
          kind: 'info',
          title: isHi ? 'कुछ अनुमतियाँ अस्वीकृत रहीं' : 'Some permissions were skipped',
          message: isHi ? 'आप इन्हें बाद में भी शुरू कर सकते हैं।' : 'You can enable them anytime from settings.',
        });
        localStorage.setItem('kisanai.permissionsDismissed', 'true');
        setTimeout(() => setShowPermissionModal(false), 1400);
      }
    } catch {
      localStorage.setItem('kisanai.permissionsDismissed', 'true');
      setShowPermissionModal(false);
    } finally {
      setRequesting(null);
    }
  };

  const handleAllowSingle = async (type: 'location' | 'microphone' | 'camera') => {
    setRequesting(type);
    try {
      const ok = await requestPermission(type);
      if (ok) {
        pushToast({
          kind: 'success',
          title: type === 'location' ? (isHi ? 'स्थान चालू हुआ' : 'Location Enabled') : type === 'microphone' ? (isHi ? 'माइक्रोफोन चालू हुआ' : 'Microphone Enabled') : (isHi ? 'कैमरा चालू हुआ' : 'Camera Enabled'),
        });
      }
    } finally {
      setRequesting(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('kisanai.permissionsDismissed', 'true');
    setShowPermissionModal(false);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(10, 20, 14, 0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="perm-title"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 560,
            maxHeight: '92vh',
            overflowY: 'auto',
            background: 'var(--surface)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'var(--ink)',
            borderRadius: 24,
            padding: '28px 24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), var(--glassShadow)',
            border: '1.5px solid var(--glassBorder)',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
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
              transition: 'background 0.15s ease',
            }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', paddingBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <PHLogoMark size={44} />
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 900,
                  fontSize: 22,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{ color: 'var(--ink)' }}>Phlora</span>
                <span
                  style={{
                    background: '#ff9900',
                    color: '#000000',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontWeight: 900,
                    fontSize: 19,
                    lineHeight: 1.1,
                    boxShadow: '0 2px 8px rgba(255, 153, 0, 0.4)',
                  }}
                >
                  Helpline
                </span>
              </span>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                borderRadius: 999,
                background: 'var(--leaf-light)',
                color: 'var(--forest)',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.5,
                marginBottom: 12,
                border: '1px solid rgba(46, 107, 69, 0.2)',
              }}
            >
              <Sparkles size={14} /> {t.badge}
            </span>

            <h2
              id="perm-title"
              style={{
                fontSize: 'clamp(22px, 3.8vw, 27px)',
                fontWeight: 800,
                margin: '0 0 8px',
                color: 'var(--ink)',
                lineHeight: 1.25,
              }}
            >
              {t.title}
            </h2>

            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                margin: '0 auto',
                maxWidth: 480,
              }}
            >
              {t.sub}
            </p>

            {userLocation && (
              <div
                style={{
                  marginTop: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: 'var(--sun-light)',
                  color: 'var(--sun-dark)',
                  fontSize: 12.5,
                  fontWeight: 700,
                }}
              >
                <Navigation size={13} /> {isHi ? 'पहचाना गया स्थान:' : 'Detected Location:'}{' '}
                <strong>{userLocation}</strong>
              </div>
            )}
          </div>

          {/* 3 Permission Tiles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '16px 0 20px' }}>
            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 16,
                background: permissions.location === 'granted' ? 'var(--leaf-light)' : 'var(--cream)',
                border: `1.5px solid ${permissions.location === 'granted' ? 'var(--leaf)' : 'var(--line)'}`,
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: permissions.location === 'granted' ? 'var(--forest)' : '#e5f3ff',
                  color: permissions.location === 'granted' ? '#ffffff' : '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <h4 style={{ fontSize: 15.5, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    {t.locTitle}
                  </h4>
                  {permissions.location === 'granted' ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 800,
                        color: 'var(--forest)',
                        background: '#ffffff',
                        padding: '3px 9px',
                        borderRadius: 999,
                        border: '1px solid var(--leaf)',
                      }}
                    >
                      <CheckCircle2 size={13} /> {t.granted}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={requesting !== null}
                      onClick={() => handleAllowSingle('location')}
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#ffffff',
                        background: 'var(--forest)',
                        padding: '5px 12px',
                        borderRadius: 999,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {requesting === 'location' ? <Loader2 size={13} className="animate-spin" /> : t.allowSingle}
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '4px 0 0', lineHeight: 1.45 }}>
                  {t.locDesc}
                </p>
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>
                    {userLocation ? `📍 सक्रिय: ${userLocation}` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPermissionModal(false);
                      setShowLocationModal(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--forest)',
                      fontSize: 11.5,
                      fontWeight: 800,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0,
                    }}
                  >
                    {isHi ? 'स्थान बदलें / खोजें →' : 'Change Location →'}
                  </button>
                </div>
              </div>
            </div>

            {/* Microphone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 16,
                background: permissions.microphone === 'granted' ? 'var(--leaf-light)' : 'var(--cream)',
                border: `1.5px solid ${permissions.microphone === 'granted' ? 'var(--leaf)' : 'var(--line)'}`,
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: permissions.microphone === 'granted' ? 'var(--forest)' : '#fef3c7',
                  color: permissions.microphone === 'granted' ? '#ffffff' : '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mic size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <h4 style={{ fontSize: 15.5, fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                    {t.micTitle}
                  </h4>
                  {permissions.microphone === 'granted' ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 800,
                        color: 'var(--forest)',
                        background: '#ffffff',
                        padding: '3px 9px',
                        borderRadius: 999,
                        border: '1px solid var(--leaf)',
                      }}
                    >
                      <CheckCircle2 size={13} /> {t.granted}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={requesting !== null}
                      onClick={() => handleAllowSingle('microphone')}
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#ffffff',
                        background: 'var(--forest)',
                        padding: '5px 12px',
                        borderRadius: 999,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {requesting === 'microphone' ? <Loader2 size={13} className="animate-spin" /> : t.allowSingle}
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '4px 0 0', lineHeight: 1.45 }}>
                  {t.micDesc}
                </p>
              </div>
            </div>

            {/* Camera On-Demand Notice (Camera is NOT requested upfront) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 14,
                background: 'rgba(46, 107, 69, 0.08)',
                border: '1.5px dashed var(--leaf)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--forest)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Camera size={18} />
              </div>
              <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.45, color: 'var(--ink)' }}>
                <strong>{isHi ? 'कैमरा अनुमति आवश्यकता अनुसार:' : 'Camera Access On-Demand:'}</strong>{' '}
                <span style={{ color: 'var(--ink-soft)' }}>
                  {isHi
                    ? 'कैमरा अनुमति पहले नहीं माँगी जाएगी — यह केवल तब माँगी जाएगी जब आप "फसल रोग निदान" में पौधे की पत्ती स्कैन करेंगे।'
                    : 'Camera permission is never requested upfront. It is only prompted when you take a photo in Crop Disease Scan.'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={requesting !== null}
              onClick={handleAllowAll}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 6px 20px rgba(120, 53, 15, 0.3)',
              }}
            >
              {requesting === 'all' ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  {isHi ? 'अनुमतियाँ जाँची जा रही हैं...' : 'Requesting Access...'}
                </>
              ) : successAll ? (
                <>
                  <CheckCircle2 size={19} />
                  {t.successBanner}
                </>
              ) : (
                <>
                  <ShieldCheck size={19} />
                  {t.allowAllBtn}
                  <ArrowRight size={17} />
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={handleDismiss}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--ink-soft)',
                fontSize: 13.5,
                fontWeight: 600,
                padding: '8px 12px',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              {t.skipBtn}
            </button>
          </div>

          {/* Privacy footer */}
          <p
            style={{
              fontSize: 11.5,
              color: 'var(--ink-soft)',
              opacity: 0.8,
              textAlign: 'center',
              margin: '14px 0 0',
              lineHeight: 1.4,
            }}
          >
            {t.privacyNote}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
