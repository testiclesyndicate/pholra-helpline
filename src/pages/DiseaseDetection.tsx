import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Stethoscope,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ShieldAlert,
  Leaf,
  Droplets,
  HelpCircle,
  MessageSquare,
  FlaskConical,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { DiseaseResult } from '../types';
import confetti from 'canvas-confetti';

const SAMPLE_DISEASES = [
  {
    name: 'Tomato Early Blight',
    crop: 'Tomato (टमाटर)',
    sampleImg: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Rice Leaf Blast',
    crop: 'Rice / Paddy (धान)',
    sampleImg: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Wheat Rust / Leaf Spot',
    crop: 'Wheat (गेहूँ)',
    sampleImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60',
  },
];

export const DiseaseDetection: React.FC = () => {
  const { lang, pushToast, permissions, requestPermission } = useApp();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Lazy on-demand camera access
  const handleCameraClick = async () => {
    if (permissions.camera !== 'granted') {
      try {
        await requestPermission('camera');
      } catch {}
    }
    cameraInputRef.current?.click();
  };

  // Auto-analysis function
  const executeAnalysis = useCallback(
    async (file: File) => {
      setAnalyzing(true);
      setErrorMsg(null);
      setResult(null);
      setProgress(15);
      setProgressStage(
        lang === 'hi'
          ? 'फोटो अपलोड हो रही है...'
          : lang === 'mr'
          ? 'फोटो अपलोड होत आहे...'
          : 'Uploading leaf photo...'
      );

      const stages = [
        lang === 'hi'
          ? 'एआई विजन मॉडल पत्ती की बनावट का विश्लेषण कर रहा है...'
          : lang === 'mr'
          ? 'एआय व्हिजन मॉडेल पानांच्या स्वरूपाचे विश्लेषण करत आहे...'
          : 'AI Vision Model analyzing leaf tissue & discoloration...',
        lang === 'hi'
          ? 'कवक, कीट व रोग लक्षणों की पहचान की जा रही है...'
          : lang === 'mr'
          ? 'बुरशी, कीड व रोग लक्षणांची पडताळणी सुरू आहे...'
          : 'Cross-referencing 50+ crop pathology patterns...',
        lang === 'hi'
          ? 'जैविक व रासायनिक उपचार तैयार किए जा रहे हैं...'
          : lang === 'mr'
          ? 'सेंद्रिय व रासायनिक उपचारांचे मार्गदर्शन तयार होत आहे...'
          : 'Formulating organic & chemical remedy dosages...',
      ];

      let stepIndex = 0;
      const interval = window.setInterval(() => {
        setProgress((p) => {
          const next = Math.min(94, p + Math.floor(Math.random() * 14 + 8));
          if (stepIndex < stages.length && next > (stepIndex + 1) * 25) {
            setProgressStage(stages[stepIndex]);
            stepIndex++;
          }
          return next;
        });
      }, 500);

      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('lang', lang);

        const res = await api.postForm<{ result: DiseaseResult }>('/disease/analyze', formData);
        setProgress(100);
        setProgressStage(
          lang === 'hi' ? 'निदान पूरा हुआ!' : lang === 'mr' ? 'निदान पूर्ण झाले!' : 'Diagnosis Complete!'
        );
        setResult(res.result);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#b45309', '#d97706', '#f59e0b', '#c2410c'],
          });
        } catch {}
        pushToast({
          kind: 'success',
          title: lang === 'hi' ? 'फसल रोग निदान तैयार है' : 'Crop Disease Diagnosis Complete',
        });
      } catch (err: any) {
        setErrorMsg(err?.message || d(lang, 'disease.errors.generic'));
        pushToast({
          kind: 'warning',
          title: d(lang, 'disease.errors.title'),
          message: err?.message || d(lang, 'disease.errors.generic'),
        });
      } finally {
        window.clearInterval(interval);
        setAnalyzing(false);
      }
    },
    [lang, pushToast]
  );

  // File selection handler - automatically triggers real-time analysis!
  const handleFileSelect = useCallback(
    (file?: File) => {
      setErrorMsg(null);
      setResult(null);
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setErrorMsg(d(lang, 'disease.errors.type'));
        pushToast({ kind: 'error', title: d(lang, 'disease.errors.type') });
        return;
      }

      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg(d(lang, 'disease.errors.size', { size: 15 }));
        pushToast({ kind: 'error', title: d(lang, 'disease.errors.size', { size: 15 }) });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Instantly start real-time analysis
      executeAnalysis(file);
    },
    [lang, pushToast, executeAnalysis]
  );

  // Sample photo click handler
  const loadSample = async (url: string, cropName: string) => {
    try {
      setPreviewUrl(url);
      setResult(null);
      setErrorMsg(null);
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `${cropName.toLowerCase()}-sample.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      executeAnalysis(file);
    } catch {
      pushToast({ kind: 'error', title: 'Could not load sample image' });
    }
  };

  // Clipboard paste listener for immediate photo inspection
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          e.preventDefault();
          handleFileSelect(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileSelect]);

  const resetAll = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMsg(null);
    setProgress(0);
    setProgressStage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="page page--wide" style={{ paddingTop: 24 }}>
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Stethoscope size={28} color="var(--forest)" />
            {d(lang, 'disease.title')}
          </h1>
          <p className="page-sub">
            {lang === 'hi'
              ? 'प्रभावित पत्ती, तने या फल की फोटो अपलोड करें। एआई तुरंत रोग पहचानकर रोकथाम के उपाय बताएगा।'
              : lang === 'mr'
              ? 'रोगट पान किंवा पिकाचा फोटो अपलोड करा. एआय त्वरित रोग ओळखून उपाय सुचवेल.'
              : 'Upload or take a photo of any affected leaf, fruit, or stem. AI instantly diagnoses diseases and prescribes remedies in real time.'}
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleCameraClick}
          >
            <Camera size={16} />
            {lang === 'hi' ? 'कैमरा से फोटो लें' : lang === 'mr' ? 'कॅमेऱ्याने फोटो घ्या' : 'Take Photo'}
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={16} />
            {lang === 'hi' ? 'गैलरी से चुनें' : lang === 'mr' ? 'गॅलरीतून निवडा' : 'Browse Gallery'}
          </button>
        </div>
      </div>

      <div
        className="disease-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: previewUrl || result ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* Left Column: Upload & Live Analysis Preview */}
        <div className="card" style={{ padding: 22 }}>
          {!previewUrl ? (
            <div>
              {/* Drag & drop dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileSelect(e.dataTransfer.files?.[0]);
                }}
                style={{
                  border: '2px dashed var(--line)',
                  borderRadius: 18,
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: 'var(--cream)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all .2s ease',
                }}
              >
                <span
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'var(--leaf-light)',
                    color: 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <UploadCloud size={30} />
                </span>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, margin: '0 0 4px', color: 'var(--ink)' }}>
                    {lang === 'hi' ? 'फसल की फोटो अपलोड करें' : lang === 'mr' ? 'पिकाचा फोटो अपलोड करा' : 'Upload Crop Leaf Photo'}
                  </p>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, margin: 0 }}>
                    {lang === 'hi'
                      ? 'फोटो खींचें, ड्रैग करें या क्लिपबोर्ड से पेस्ट (Ctrl+V) करें — तुरंत विश्लेषण शुरू होगा'
                      : 'Drag & drop photo, or paste from clipboard (Ctrl+V) — real-time analysis starts automatically'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleCameraClick}
                  >
                    <Camera size={16} />
                    {lang === 'hi' ? 'कैमरा खोलें' : 'Use Camera'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon size={16} />
                    {lang === 'hi' ? 'फाइल चुनें' : 'Select Image'}
                  </button>
                </div>
              </div>

              {/* Sample Images */}
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 10 }}>
                  {lang === 'hi' ? 'या इन उदाहरण पत्तियों पर क्लिक करके आज़माएं:' : 'Or test with a sample crop photo:'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {SAMPLE_DISEASES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => loadSample(sample.sampleImg, sample.crop)}
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: 12,
                        padding: 8,
                        background: 'var(--surface)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'transform 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <img
                        src={sample.sampleImg}
                        alt={sample.name}
                        style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 8 }}
                      />
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                        {sample.crop}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Image Preview Box with Real-Time Scanning HUD */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#0e1f14',
                  minHeight: 260,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={previewUrl}
                  alt="Crop specimen"
                  style={{ width: '100%', maxHeight: 380, objectFit: 'contain' }}
                />

                {/* Real-time Scanning HUD Overlay */}
                {analyzing && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(10, 36, 20, 0.78)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 14,
                      color: '#ffffff',
                      padding: 24,
                      textAlign: 'center',
                      backdropFilter: 'blur(3px)',
                    }}
                  >
                    {/* Laser scanning beam */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 3,
                        background: 'linear-gradient(90deg, transparent, #52b788, #74c69d, transparent)',
                        boxShadow: '0 0 15px #52b788',
                        top: `${(progress % 100)}%`,
                        transition: 'top 0.4s ease-in-out',
                      }}
                    />

                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        border: '3px solid rgba(255,255,255,0.2)',
                        borderTopColor: '#52b788',
                        animation: 'spin 1s linear infinite',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Sparkles size={22} color="#52b788" />
                    </div>

                    <div>
                      <p style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px', letterSpacing: 0.2 }}>
                        {lang === 'hi' ? 'रीयल-टाइम रोग विश्लेषण जारी है' : 'Real-time AI Diagnosis in Progress'}
                      </p>
                      <p style={{ fontSize: 13, opacity: 0.9, margin: 0, color: '#b7e4c7' }}>
                        {progressStage || d(lang, 'disease.analyzing')}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        width: '80%',
                        height: 6,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                          transition: 'width .3s ease',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fef3c7' }}>
                      {progress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Buttons under photo */}
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => selectedFile && executeAnalysis(selectedFile)}
                  disabled={analyzing}
                  style={{ flex: 1 }}
                >
                  <RefreshCw size={16} className={analyzing ? 'spin' : ''} />
                  {analyzing ? (lang === 'hi' ? 'जाँच हो रही है...' : 'Diagnosing...') : (lang === 'hi' ? 'दोबारा विश्लेषण करें' : 'Re-analyze Photo')}
                </button>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={resetAll}
                  disabled={analyzing}
                >
                  <Camera size={16} />
                  {lang === 'hi' ? 'नई फोटो लें' : 'Upload Another'}
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div
              style={{
                marginTop: 14,
                padding: '12px 14px',
                borderRadius: 12,
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                fontSize: 13.5,
                fontWeight: 600,
                display: 'flex',
                gap: 8,
              }}
            >
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Useful Farmer Photography Tips */}
          <div
            style={{
              marginTop: 20,
              padding: '14px 16px',
              borderRadius: 12,
              background: 'var(--surfaceSoft)',
              border: '1px solid var(--line)',
            }}
          >
            <h4 style={{ fontSize: 13.5, fontWeight: 800, margin: '0 0 6px', color: 'var(--forest)' }}>
              📸 {lang === 'hi' ? 'सटीक परिणाम के लिए सुझाव' : 'Tips for Best AI Diagnosis'}
            </h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              <li>{lang === 'hi' ? 'पत्ती पर धूप या अच्छी रोशनी में नजदीक से फोटो लें।' : 'Take photo close-up in natural daylight.'}</li>
              <li>{lang === 'hi' ? 'पत्ती के धब्बे और निचली सतह स्पष्ट दिखनी चाहिए।' : 'Capture both upper and lower leaf surfaces if spots exist.'}</li>
              <li>{lang === 'hi' ? 'फोकस साफ रखें ताकि धब्बे और रतुआ साफ दिखे।' : 'Keep camera steady to avoid blurred foliage spots.'}</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Diagnostic Result Card */}
        {result && (
          <div
            className="card"
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderLeft: `5px solid ${
                result.severity === 'high'
                  ? 'var(--danger)'
                  : result.severity === 'medium'
                  ? 'var(--sun-dark)'
                  : result.severity === 'healthy'
                  ? 'var(--leaf)'
                  : 'var(--forest)'
              }`,
            }}
          >
            {/* Header Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: 'var(--leaf-light)',
                  color: 'var(--forest)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Leaf size={14} />
                {result.crop} ({result.cropMatch}% {lang === 'hi' ? 'मैच' : 'match'})
              </span>

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 14px',
                  borderRadius: 999,
                  background:
                    result.severity === 'high'
                      ? 'var(--danger-light)'
                      : result.severity === 'medium'
                      ? 'var(--sun-light)'
                      : 'var(--leaf-light)',
                  color:
                    result.severity === 'high'
                      ? 'var(--danger)'
                      : result.severity === 'medium'
                      ? 'var(--sun-dark)'
                      : 'var(--forest)',
                }}
              >
                {lang === 'hi' ? 'गंभीरता: ' : 'Severity: '}
                {result.severityLocal || result.severity.toUpperCase()} ({result.confidence}% {lang === 'hi' ? 'विश्वसनीयता' : 'confidence'})
              </span>
            </div>

            {/* Disease Heading */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                {result.disease}
              </h2>
              {result.diseaseLocal && result.diseaseLocal !== result.disease && (
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--forest)', margin: 0 }}>
                  {result.diseaseLocal}
                </p>
              )}
              {result.stage && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--ink-soft)',
                    background: 'var(--surfaceSoft)',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  🌱 {lang === 'hi' ? 'फसल की अवस्था:' : 'Crop Stage:'} {result.stage}
                </span>
              )}
            </div>

            {/* Symptoms Observed */}
            <div>
              <h4 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink-soft)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                🔍 {lang === 'hi' ? 'दिखाई देने वाले लक्षण (Symptoms)' : 'Symptoms Observed'}
              </h4>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0, color: 'var(--ink)' }}>
                {result.symptoms}
              </p>
            </div>

            {/* Causes */}
            {result.causes && (
              <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--surfaceSoft)' }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--earth)' }}>
                  ⚠️ {lang === 'hi' ? 'संभावित कारण (Probable Cause):' : 'Probable Cause:'}{' '}
                </span>
                <span style={{ fontSize: 13, color: 'var(--ink)' }}>{result.causes}</span>
              </div>
            )}

            {/* Comprehensive Action & Remedies */}
            <div style={{ display: 'grid', gap: 12 }}>
              {/* Organic Remedy */}
              {result.organicRemedy && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'var(--leaf-light)',
                    border: '1px solid var(--leaf-mid)',
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--forest)', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🌾 {lang === 'hi' ? 'जैविक व प्राकृतिक रोकथाम (Organic / Bio-control)' : 'Organic & Biological Treatment'}
                  </h4>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: 'var(--ink)' }}>
                    {result.organicRemedy}
                  </p>
                </div>
              )}

              {/* Chemical Spray Remedy */}
              {result.chemicalRemedy && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1e40af', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🧪 {lang === 'hi' ? 'रासायनिक दवा व छिड़काव खुराक (Recommended Chemical Spray)' : 'Recommended Chemical Spray & Dosage'}
                  </h4>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: '#1e3a8a' }}>
                    {result.chemicalRemedy}
                  </p>
                </div>
              )}

              {/* General Action Overview */}
              {result.action && !result.organicRemedy && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'var(--surfaceSoft)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--forest)', margin: '0 0 6px' }}>
                    ⚡ {d(lang, 'disease.action')}
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                    {result.action}
                  </p>
                </div>
              )}
            </div>

            {/* Prevention for Next Cycle */}
            {result.prevention && (
              <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--ink)' }}>🛡️ {d(lang, 'disease.prevention')}:</strong>{' '}
                {result.prevention}
              </div>
            )}

            {/* Helpline and Next Step */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 12,
                background: 'var(--cream)',
                border: '1px solid var(--line)',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--forest)' }}>
                  📞 {lang === 'hi' ? 'विशेषज्ञ सलाह (टोल-फ्री किसान कॉल सेंटर):' : 'Kisan Call Centre Toll-Free:'}
                </span>
                <p style={{ fontSize: 15, fontWeight: 800, margin: '2px 0 0', color: 'var(--ink)' }}>
                  1800-180-1551
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <a
                  href="tel:18001801551"
                  className="btn btn--outline btn--sm"
                  style={{ textDecoration: 'none' }}
                >
                  <PhoneCall size={14} /> {lang === 'hi' ? 'कॉल करें' : 'Call KVK'}
                </a>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() => navigate('/assistant')}
                >
                  <MessageSquare size={14} /> {lang === 'hi' ? 'AI सहायक से पूछें' : 'Ask AI'}
                </button>
              </div>
            </div>

            <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: 0, fontStyle: 'italic' }}>
              ℹ️ {result.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
