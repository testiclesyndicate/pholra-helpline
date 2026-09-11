import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  Calendar,
  Sparkles,
  MapPin,
  Search,
  Crosshair,
  Sprout,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
  Info,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { WeatherReport } from '../types';

const POPULAR_AGRO_DISTRICTS = [
  'Nashik, Maharashtra',
  'Ludhiana, Punjab',
  'Indore, Madhya Pradesh',
  'Varanasi, Uttar Pradesh',
  'Guntur, Andhra Pradesh',
  'Karnal, Haryana',
  'Thane, Maharashtra',
];

export const Weather: React.FC = () => {
  const { lang, pushToast, userLocation, setUserLocation, refreshGpsLocation, setShowLocationModal } = useApp();
  const navigate = useNavigate();
  const [data, setData] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationInput, setLocationInput] = useState(userLocation || 'Nashik, Maharashtra');
  const [currentLocation, setCurrentLocation] = useState(userLocation || 'Nashik, Maharashtra');
  const [detectingGps, setDetectingGps] = useState(false);

  useEffect(() => {
    if (userLocation && userLocation !== currentLocation) {
      setCurrentLocation(userLocation);
      setLocationInput(userLocation);
    }
  }, [userLocation, currentLocation]);

  const fetchWeatherData = useCallback(
    async (loc: string) => {
      setLoading(true);
      try {
        const res = await api.get<{ weather: WeatherReport }>(
          `/weather?location=${encodeURIComponent(loc)}&lang=${lang}`
        );
        setData(res.weather);
        setCurrentLocation(res.weather.location);
      } catch (err) {
        pushToast({
          kind: 'error',
          title: lang === 'hi' ? 'मौसम जानकारी लोड नहीं हो सकी' : 'Could not load weather & crop data',
        });
      } finally {
        setLoading(false);
      }
    },
    [lang, pushToast]
  );

  useEffect(() => {
    fetchWeatherData(currentLocation);
  }, [lang, fetchWeatherData, currentLocation]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;
    const clean = locationInput.trim();
    setUserLocation(clean);
    fetchWeatherData(clean);
  };

  const handleDetectGps = async () => {
    setDetectingGps(true);
    try {
      const res = await refreshGpsLocation();
      if (res.success && res.location) {
        setLocationInput(res.location);
        fetchWeatherData(res.location);
        pushToast({
          kind: 'success',
          title: lang === 'hi' ? `📍 स्थान मिला: ${res.location}` : `📍 Location detected: ${res.location}`,
        });
      } else {
        pushToast({
          kind: 'warning',
          title: lang === 'hi' ? 'स्थान अनुमति नहीं मिली' : 'Location permission denied',
          message: res.error,
        });
      }
    } finally {
      setDetectingGps(false);
    }
  };

  const regional = data?.regionalAgro;

  return (
    <div className="page page--wide" style={{ paddingTop: 24, paddingBottom: 40 }}>
      {/* Header & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 16,
        }}
      >
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CloudSun size={28} color="var(--forest)" />
            {d(lang, 'weather.title')}
          </h1>
          <p className="page-sub">
            {lang === 'hi'
              ? 'स्थान दर्ज करें और उस क्षेत्र की प्रमुख फसलें, कटाई कैलेंडर, मौसम व सक्रिय रोग अलर्ट देखें।'
              : lang === 'mr'
              ? 'आपला परिसर टाका आणि त्या भागातील मुख्य पिके, काढणी हंगाम, हवामान व रोग सावधगिरी पहा.'
              : 'Enter any district or location to view local weather, major crops, harvesting calendar, and prevailing crop disease warnings.'}
          </p>
        </div>

        {data && (
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 800,
              background: 'var(--leaf-light)',
              color: 'var(--forest)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <MapPin size={14} />
            {data.location}
          </span>
        )}
      </div>

      {/* Location Search Bar Card */}
      <div className="card" style={{ padding: '18px 20px', marginBottom: 20 }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <MapPin
              size={18}
              color="var(--forest)"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder={
                lang === 'hi'
                  ? 'शहर, जिला या गांव का नाम दर्ज करें (उदा. नासिक, लुधियाना, इंदौर, वाराणसी)...'
                  : 'Enter district, city or state (e.g., Nashik, Ludhiana, Indore, Varanasi)...'
              }
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 12,
                border: '1.5px solid var(--line)',
                background: 'var(--surface)',
                color: 'var(--ink)',
                fontSize: 14.5,
                fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ padding: '0 20px' }}>
            <Search size={16} />
            {lang === 'hi' ? 'मौसम व फसलें देखें' : 'Get Weather & Crops'}
          </button>

          <button
            type="button"
            className="btn btn--outline"
            onClick={handleDetectGps}
            disabled={detectingGps}
            title="Auto-detect location"
          >
            <Crosshair size={16} className={detectingGps ? 'spin' : ''} />
            {detectingGps ? (lang === 'hi' ? 'खोज रहे हैं...' : 'Detecting...') : (lang === 'hi' ? 'मेरा GPS' : 'My GPS')}
          </button>

          <button
            type="button"
            className="btn btn--outline"
            onClick={() => setShowLocationModal(true)}
            title="All India State & District Selector"
          >
            <Compass size={16} />
            {lang === 'hi' ? 'स्थान सूची' : 'Select State/City'}
          </button>
        </form>

        {/* Popular Agricultural District Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>
            {lang === 'hi' ? 'प्रमुख कृषि क्षेत्र:' : 'Quick Districts:'}
          </span>
          {POPULAR_AGRO_DISTRICTS.map((dist, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setLocationInput(dist);
                setUserLocation(dist);
                fetchWeatherData(dist);
              }}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                background: currentLocation === dist ? 'var(--forest)' : 'var(--surfaceSoft)',
                color: currentLocation === dist ? '#ffffff' : 'var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {dist.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ padding: 24, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-soft)' }}>
              {lang === 'hi' ? 'मौसम और क्षेत्रीय फसल जानकारी लोड हो रही है...' : 'Loading regional weather, crops & disease data...'}
            </span>
          </div>
          <div className="card" style={{ padding: 24, height: 220 }} />
        </div>
      ) : data ? (
        <div style={{ display: 'grid', gap: 24 }}>
          {/* SECTION 1: Current Weather Card */}
          <div
            className="card"
            style={{
              padding: '24px 26px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              alignItems: 'center',
            }}
          >
            {/* Left: Temp & condition */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: '1 1 280px' }}>
              <span
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CloudSun size={44} color="var(--sun)" />
              </span>
              <div>
                <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, lineHeight: 1 }}>
                  {data.current.temp}°C
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginTop: 4 }}>
                  {data.current.condition}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>
                  {data.location} · {lang === 'hi' ? 'महसूस' : 'Feels like'} {data.current.feelsLike}°C
                </div>
              </div>
            </div>

            {/* Right: 4 Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: 12,
                flex: '2 1 340px',
              }}
            >
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'var(--surfaceSoft)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 12 }}>
                  <Droplets size={14} color="var(--forest)" /> {d(lang, 'weather.humidity')}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
                  {data.current.humidity}%
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'var(--surfaceSoft)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 12 }}>
                  <CloudRain size={14} color="#3874cb" /> {d(lang, 'weather.rainChance')}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
                  {data.current.rainChance}%
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'var(--surfaceSoft)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 12 }}>
                  <Wind size={14} color="var(--earth)" /> {d(lang, 'weather.wind')}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
                  {data.current.wind} km/h
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background:
                    data.advisory.risk === 'high'
                      ? 'var(--danger-light)'
                      : data.advisory.risk === 'medium'
                      ? 'var(--sun-light)'
                      : 'var(--leaf-light)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 12 }}>
                  <AlertTriangle size={14} /> {lang === 'hi' ? 'मौसम जोखिम' : 'Risk'}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    marginTop: 4,
                    color:
                      data.advisory.risk === 'high'
                        ? 'var(--danger)'
                        : data.advisory.risk === 'medium'
                        ? 'var(--sun-dark)'
                        : 'var(--forest)',
                  }}
                >
                  {data.advisory.risk.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Current Harvesting & Agricultural Season Window */}
          {regional && (
            <div
              className="card"
              style={{
                padding: '22px 24px',
                background: 'linear-gradient(135deg, var(--surface), var(--cream))',
                borderLeft: '5px solid var(--forest)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Clock size={20} color="var(--forest)" />
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: 'var(--forest)' }}>
                  {lang === 'hi'
                    ? `🌾 ${regional.district} का वर्तमान फसल व कटाई कैलेंडर`
                    : `🌾 Current Harvesting & Cropping Window — ${regional.district}`}
                </h3>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: 'var(--ink)' }}>
                {regional.harvestingSeasonNote}
              </p>
            </div>
          )}

          {/* SECTION 3: Major Crops of this Region */}
          {regional && regional.majorCrops && regional.majorCrops.length > 0 && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sprout size={20} color="var(--forest)" />
                    {lang === 'hi'
                      ? `${regional.district} की प्रमुख फसलें (Major Crops)`
                      : `Major Crops Grown in ${regional.district}`}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                    {lang === 'hi'
                      ? 'वर्तमान वृद्धि अवस्था, बुवाई-कटाई का समय और प्रमुख सावधानियां'
                      : 'Growth stages, sowing-harvest timelines, and crop management tips'}
                  </p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--forest)', background: 'var(--leaf-light)', padding: '4px 10px', borderRadius: 999 }}>
                  {regional.majorCrops.length} {lang === 'hi' ? 'प्रमुख फसलें' : 'Crops Tracked'}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 16,
                }}
              >
                {regional.majorCrops.map((crop, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 18,
                      borderRadius: 14,
                      background: 'var(--surfaceSoft)',
                      border: '1px solid var(--line)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 2px', color: 'var(--ink)' }}>
                          {crop.localName || crop.name}
                        </h4>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--forest)', background: 'var(--leaf-light)', padding: '2px 8px', borderRadius: 6 }}>
                          {crop.season}
                        </span>
                      </div>
                    </div>

                    {/* Current Stage */}
                    <div style={{ fontSize: 13, background: 'var(--cream)', padding: '8px 10px', borderRadius: 8 }}>
                      <span style={{ fontWeight: 800, color: 'var(--earth)' }}>
                        🌱 {lang === 'hi' ? 'वर्तमान अवस्था:' : 'Current Stage:'}{' '}
                      </span>
                      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{crop.currentStage}</span>
                    </div>

                    {/* Timeline */}
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', display: 'grid', gap: 4 }}>
                      <div>
                        <strong>{lang === 'hi' ? 'बुवाई (Sowing):' : 'Sowing:'}</strong> {crop.sowingPeriod}
                      </div>
                      <div>
                        <strong>{lang === 'hi' ? 'कटाई (Harvesting):' : 'Harvesting:'}</strong> {crop.harvestingPeriod}
                      </div>
                    </div>

                    {/* Diseases watchlist */}
                    {crop.commonDiseases && crop.commonDiseases.length > 0 && (
                      <div style={{ fontSize: 12, color: 'var(--danger)', background: 'var(--danger-light)', padding: '6px 10px', borderRadius: 8 }}>
                        <strong>⚠️ {lang === 'hi' ? 'संभावित रोग:' : 'Common Diseases:'}</strong>{' '}
                        {crop.commonDiseases.join(', ')}
                      </div>
                    )}

                    {/* Agronomy tip */}
                    {crop.tips && (
                      <div style={{ fontSize: 12, color: 'var(--ink)', fontStyle: 'italic', borderTop: '1px dashed var(--line)', paddingTop: 8 }}>
                        💡 {crop.tips}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: Active Regional Disease Alerts */}
          {regional && regional.activeDiseaseAlerts && regional.activeDiseaseAlerts.length > 0 && (
            <div className="card" style={{ padding: 24, borderLeft: '5px solid var(--danger)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)' }}>
                    <ShieldAlert size={20} />
                    {lang === 'hi'
                      ? `${regional.district} में इस मौसम में सक्रिय रोग अलर्ट`
                      : `Active Crop Disease Alerts for ${regional.district}`}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                    {lang === 'hi'
                      ? 'वर्तमान नमी व तापमान के आधार पर इन फसलों में रोग का खतरा अधिक है'
                      : 'Higher vulnerability predicted due to current humidity, rainfall and temperature conditions'}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => navigate('/disease')}
                >
                  <Stethoscope size={15} />
                  {lang === 'hi' ? 'पत्ती की फोटो से जाँच करें' : 'Diagnose Leaf Photo'}
                </button>
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                {regional.activeDiseaseAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 18px',
                      borderRadius: 12,
                      background: alert.riskLevel === 'high' ? 'var(--danger-light)' : 'var(--sun-light)',
                      border: `1px solid ${alert.riskLevel === 'high' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(234, 179, 8, 0.3)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>
                        🌿 {alert.crop} — <span style={{ color: alert.riskLevel === 'high' ? 'var(--danger)' : 'var(--sun-dark)' }}>{alert.disease}</span>
                      </span>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: 999,
                          background: alert.riskLevel === 'high' ? 'var(--danger)' : 'var(--sun-dark)',
                          color: '#ffffff',
                        }}
                      >
                        {alert.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>

                    <p style={{ fontSize: 13, margin: 0, color: 'var(--ink)', lineHeight: 1.5 }}>
                      <strong>{lang === 'hi' ? 'कारण:' : 'Weather Trigger:'}</strong> {alert.riskReason}
                    </p>

                    <p style={{ fontSize: 13, margin: 0, color: 'var(--ink)', lineHeight: 1.5 }}>
                      <strong>{lang === 'hi' ? 'लक्षण:' : 'Symptoms to Scout:'}</strong> {alert.symptoms}
                    </p>

                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--forest)',
                        background: 'rgba(255,255,255,0.7)',
                        padding: '8px 12px',
                        borderRadius: 8,
                      }}
                    >
                      🛡️ <strong>{lang === 'hi' ? 'रोकथाम छिड़काव:' : 'Preventive Action:'}</strong> {alert.preventiveSpray}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: Farm Advisory for Today */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 12px' }}>
              <Sparkles size={20} color="var(--forest)" />
              {lang === 'hi' ? 'आज के मौसम से कृषि सलाह' : 'Daily Farm Advisory from Weather'}
            </h2>
            <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: 'var(--ink)', margin: '0 0 14px' }}>
              {data.advisory.headline}
            </p>

            <ul style={{ margin: '0 0 20px', paddingLeft: 20, display: 'grid', gap: 8, fontSize: 14.5 }}>
              {data.advisory.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 14,
                paddingTop: 16,
                borderTop: '1px solid var(--line)',
              }}
            >
              <div
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: 'var(--surfaceSoft)',
                  border: '1px solid var(--line)',
                }}
              >
                <h4 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--forest)', margin: '0 0 4px' }}>
                  💧 {lang === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advice'}
                </h4>
                <p style={{ fontSize: 13.5, margin: 0, color: 'var(--ink)' }}>
                  {data.advisory.irrigation}
                </p>
              </div>

              <div
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: 'var(--surfaceSoft)',
                  border: '1px solid var(--line)',
                }}
              >
                <h4 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--earth)', margin: '0 0 4px' }}>
                  🌾 {lang === 'hi' ? 'छिड़काव व खेत कार्य' : 'Spraying & Field Work Window'}
                </h4>
                <p style={{ fontSize: 13.5, margin: 0, color: 'var(--ink)' }}>
                  {data.advisory.spraying}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 6: 5-Day Agricultural Forecast */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="var(--forest)" />
              {lang === 'hi' ? '5-दिवसीय मौसम पूर्वानुमान' : '5-Day Agricultural Forecast'}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: 12,
              }}
            >
              {data.forecast.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 12px',
                    borderRadius: 14,
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>
                    {day.dateLabel}
                  </span>
                  <CloudSun size={28} color="var(--sun)" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
                    {day.condition}
                  </span>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>
                    {day.tempMax}° / <span style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>{day.tempMin}°</span>
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: day.rainChance > 40 ? '#3874cb' : 'var(--ink-soft)',
                    }}
                  >
                    ☔ {day.rainChance}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
