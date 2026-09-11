import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Theme, ToastItem, CropProfile, RecentQuery, AppPermissions } from '../types';

export const LIGHT_THEME: Record<string, string> = {
  forest: '#b45309', // Warm Golden Harvest Ochre / Amber Bronze
  forestDark: '#78350f', // Deep Fertile Soil Bronze
  forestLight: '#d97706', // Golden Wheat Amber
  leaf: '#c2410c', // Terracotta Clay Soil / Rust Earth
  leafLight: '#fff7ed', // Warm Amber-Wheat Tint
  leafMid: '#fed7aa', // Soft Harvest Glow
  cream: '#faf6f0', // Natural Sun-Warmed Harvest Canvas
  creamDark: '#ede6db', // Earthen Stone Divider
  earth: '#92400e', // Deep Fertile Loam
  earthDark: '#573307', // Deepest Clay
  earthLight: '#fdf4e8', // Light Seed Tint
  sun: '#ff9900', // Signature Helpline Golden Badge
  sunDark: '#d97706', // Golden Honey
  sunLight: '#fffbeb', // Sunlight Glow
  danger: '#b91c1c',
  dangerLight: '#fee2e2',
  ink: '#24180f', // High-contrast deep dark fertile loam ink
  inkSoft: '#5c4230', // Rich warm brown-grey
  line: 'rgba(217, 185, 155, 0.55)',
  white: '#ffffff',
  surface: 'rgba(255, 255, 255, 0.88)',
  surfaceGlass: 'rgba(255, 255, 255, 0.76)',
  surfaceSoft: 'rgba(255, 255, 255, 0.55)',
  headerBg: 'rgba(250, 246, 240, 0.88)',
  bottomnavBg: 'rgba(255, 255, 255, 0.9)',
  heroBg: 'linear-gradient(175deg, rgba(254, 243, 199, 0.7) 0%, rgba(255, 247, 237, 0.9) 50%, rgba(254, 237, 215, 0.65) 120%)',
  canvasBg: 'radial-gradient(circle at 12% 18%, rgba(217, 119, 6, 0.08) 0%, transparent 40%), radial-gradient(circle at 88% 14%, rgba(255, 153, 0, 0.1) 0%, transparent 45%), radial-gradient(circle at 50% 55%, rgba(194, 65, 12, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 85%, rgba(146, 64, 14, 0.06) 0%, transparent 45%), #faf6f0',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassBorderHover: 'rgba(180, 83, 9, 0.35)',
  glassShadow: '0 8px 30px 0 rgba(36, 24, 15, 0.07), inset 0 1px 0 0 rgba(255, 255, 255, 0.95)',
  glassShadowHover: '0 16px 40px 0 rgba(36, 24, 15, 0.12), inset 0 1px 0 0 #ffffff',
  skeletonA: '#e8decb',
  skeletonB: '#f3eada',
  gaugeTrack: '#ecd8bf',
  shadowSoft: '0 4px 16px 0 rgba(36, 24, 15, 0.06)',
  shadowCard: '0 8px 28px 0 rgba(36, 24, 15, 0.08)',
  shadowFloat: '0 16px 45px rgba(36, 24, 15, 0.15)',
};

export const DARK_THEME: Record<string, string> = {
  forest: '#f59e0b', // Luminous Harvest Gold / Wheat
  forestDark: '#1a1109', // Dark Midnight Soil
  forestLight: '#fbbf24', // Sunburst Amber
  leaf: '#fb923c', // Warm Terracotta Ochre
  leafLight: '#2a1708', // Dark Amber Pit
  leafMid: '#45250c',
  cream: '#160f0a', // Deep Midnight Earth
  creamDark: '#0f0a06',
  earth: '#d97706', // Amber Grain
  earthDark: '#92400e',
  earthLight: '#261408',
  sun: '#ff9900',
  sunDark: '#f59e0b',
  sunLight: '#331c04',
  danger: '#ef4444',
  dangerLight: '#33100f',
  ink: '#fef3c7', // Warm Golden Wheat Glow
  inkSoft: '#d5beab', // Warm Sand
  line: 'rgba(180, 83, 9, 0.35)',
  white: '#1c130c',
  surface: 'rgba(26, 18, 12, 0.82)',
  surfaceGlass: 'rgba(20, 14, 9, 0.75)',
  surfaceSoft: 'rgba(15, 10, 6, 0.55)',
  headerBg: 'rgba(18, 12, 8, 0.9)',
  bottomnavBg: 'rgba(20, 14, 9, 0.92)',
  heroBg: 'linear-gradient(175deg, rgba(32, 20, 12, 0.95) 0%, rgba(18, 12, 8, 0.96) 55%, rgba(40, 24, 14, 0.92) 130%)',
  canvasBg: 'radial-gradient(circle at 10% 18%, rgba(245, 158, 11, 0.18) 0%, transparent 42%), radial-gradient(circle at 88% 12%, rgba(255, 153, 0, 0.15) 0%, transparent 45%), radial-gradient(circle at 50% 60%, rgba(194, 65, 12, 0.14) 0%, transparent 50%), radial-gradient(circle at 80% 85%, rgba(120, 53, 15, 0.18) 0%, transparent 45%), #140e09',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassBorderHover: 'rgba(245, 158, 11, 0.45)',
  glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
  glassShadowHover: '0 16px 45px 0 rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
  skeletonA: '#251910',
  skeletonB: '#352317',
  gaugeTrack: '#301f13',
  shadowSoft: '0 4px 16px 0 rgba(0, 0, 0, 0.4)',
  shadowCard: '0 8px 28px 0 rgba(0, 0, 0, 0.5)',
  shadowFloat: '0 16px 45px rgba(0, 0, 0, 0.65)',
};

function applyThemeVariables(theme: Theme) {
  const vars = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(`--${key}`, value);
  }
}

function inferIndianStateFromCoords(lat: number, lon: number): string | null {
  if (lat >= 15.6 && lat <= 22.0 && lon >= 72.6 && lon <= 80.9) return 'Maharashtra';
  if (lat >= 23.8 && lat <= 30.4 && lon >= 77.0 && lon <= 84.6) return 'Uttar Pradesh';
  if (lat >= 23.0 && lat <= 30.2 && lon >= 69.5 && lon <= 78.3) return 'Rajasthan';
  if (lat >= 21.1 && lat <= 26.9 && lon >= 74.0 && lon <= 82.8) return 'Madhya Pradesh';
  if (lat >= 29.5 && lat <= 32.5 && lon >= 73.8 && lon <= 76.9) return 'Punjab';
  if (lat >= 24.3 && lat <= 27.5 && lon >= 83.3 && lon <= 88.3) return 'Bihar';
  if (lat >= 20.1 && lat <= 24.7 && lon >= 68.1 && lon <= 74.5) return 'Gujarat';
  if (lat >= 27.6 && lat <= 30.9 && lon >= 74.4 && lon <= 77.6) return 'Haryana';
  if (lat >= 11.5 && lat <= 18.5 && lon >= 74.0 && lon <= 78.6) return 'Karnataka';
  if (lat >= 8.3 && lat <= 12.8 && lon >= 74.8 && lon <= 77.5) return 'Kerala';
  if (lat >= 8.1 && lat <= 13.6 && lon >= 76.2 && lon <= 80.3) return 'Tamil Nadu';
  if (lat >= 12.6 && lat <= 19.9 && lon >= 76.7 && lon <= 84.8) return 'Andhra Pradesh';
  if (lat >= 15.8 && lat <= 19.9 && lon >= 77.2 && lon <= 81.8) return 'Telangana';
  if (lat >= 21.5 && lat <= 27.2 && lon >= 85.8 && lon <= 89.9) return 'West Bengal';
  if (lat >= 17.8 && lat <= 22.6 && lon >= 81.4 && lon <= 87.5) return 'Odisha';
  return null;
}

export async function reverseGeocodeCoords(lat: number, lon: number): Promise<string> {
  // Method 1: BigDataCloud Reverse Geocode Client API
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const place = data.city || data.locality || data.principalSubdivision;
      const state = data.principalSubdivision;
      if (place && state) {
        return place === state ? place : `${place}, ${state}`;
      } else if (place) {
        return place;
      }
    }
  } catch (e) {
    console.warn('BigDataCloud geocode failed, trying OpenStreetMap:', e);
  }

  // Method 2: OpenStreetMap Nominatim
  try {
    const nomRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12&addressdetails=1`
    );
    if (nomRes.ok) {
      const nomData = await nomRes.json();
      const addr = nomData.address;
      if (addr) {
        const cityOrDistrict = addr.city || addr.town || addr.village || addr.county || addr.state_district;
        const state = addr.state;
        if (cityOrDistrict && state) {
          return `${cityOrDistrict}, ${state}`;
        } else if (state) {
          return state;
        }
      }
    }
  } catch (e) {
    console.warn('Nominatim geocode failed:', e);
  }

  // Method 3: State bounding box coordinates mapping
  const inferred = inferIndianStateFromCoords(lat, lon);
  if (inferred) {
    return `${inferred}`;
  }

  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
}

export function extractStateFromLocation(loc: string | null): string {
  if (!loc) return 'Maharashtra';
  const lower = loc.toLowerCase();
  if (lower.includes('maharashtra') || lower.includes('nashik') || lower.includes('pune') || lower.includes('mumbai') || lower.includes('nagpur') || lower.includes('kolhapur') || lower.includes('solapur') || lower.includes('thane')) return 'Maharashtra';
  if (lower.includes('uttar pradesh') || lower.includes('up') || lower.includes('lucknow') || lower.includes('kanpur') || lower.includes('varanasi') || lower.includes('agra') || lower.includes('meerut') || lower.includes('prayagraj') || lower.includes('gorakhpur')) return 'Uttar Pradesh';
  if (lower.includes('madhya pradesh') || lower.includes('mp') || lower.includes('indore') || lower.includes('bhopal') || lower.includes('gwalior') || lower.includes('jabalpur') || lower.includes('ujjain')) return 'Madhya Pradesh';
  if (lower.includes('punjab') || lower.includes('ludhiana') || lower.includes('amritsar') || lower.includes('jalandhar') || lower.includes('patiala') || lower.includes('bathinda')) return 'Punjab';
  if (lower.includes('haryana') || lower.includes('karnal') || lower.includes('hisar') || lower.includes('panipat') || lower.includes('ambala') || lower.includes('rohtak') || lower.includes('gurugram')) return 'Haryana';
  if (lower.includes('rajasthan') || lower.includes('jaipur') || lower.includes('jodhpur') || lower.includes('kota') || lower.includes('bikaner') || lower.includes('udaipur') || lower.includes('alwar')) return 'Rajasthan';
  if (lower.includes('bihar') || lower.includes('patna') || lower.includes('gaya') || lower.includes('muzaffarpur') || lower.includes('bhagalpur') || lower.includes('darbhanga')) return 'Bihar';
  if (lower.includes('gujarat') || lower.includes('ahmedabad') || lower.includes('surat') || lower.includes('vadodara') || lower.includes('rajkot')) return 'Gujarat';
  if (lower.includes('karnataka') || lower.includes('bengaluru') || lower.includes('mysuru') || lower.includes('hubballi') || lower.includes('belagavi')) return 'Karnataka';
  if (lower.includes('kerala') || lower.includes('kochi') || lower.includes('thiruvananthapuram') || lower.includes('kozhikode') || lower.includes('thrissur') || lower.includes('palakkad')) return 'Kerala';
  if (lower.includes('andhra') || lower.includes('guntur') || lower.includes('vijayawada') || lower.includes('visakhapatnam')) return 'Andhra Pradesh';
  if (lower.includes('telangana') || lower.includes('hyderabad') || lower.includes('warangal')) return 'Telangana';
  if (lower.includes('tamil nadu') || lower.includes('chennai') || lower.includes('coimbatore')) return 'Tamil Nadu';
  if (lower.includes('west bengal') || lower.includes('kolkata') || lower.includes('siliguri')) return 'West Bengal';
  if (lower.includes('odisha') || lower.includes('bhubaneswar') || lower.includes('cuttack')) return 'Odisha';
  
  if (loc.includes(',')) {
    const parts = loc.split(',');
    const potential = parts[parts.length - 1].trim();
    if (potential.length > 2) return potential;
  }
  return 'Maharashtra';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  toasts: ToastItem[];
  pushToast: (toast: Omit<ToastItem, 'id'>) => void;
  dismissToast: (id: number) => void;
  demoBanner: boolean;
  setDemoBanner: (show: boolean) => void;
  cropProfile: CropProfile | null;
  setCropProfile: (profile: CropProfile) => void;
  recentQueries: RecentQuery[];
  addRecentQuery: (query: RecentQuery) => void;
  // Permissions & Geo
  permissions: AppPermissions;
  userLocation: string | null;
  setUserLocation: (loc: string) => void;
  userState: string;
  userCoords: { lat: number; lon: number } | null;
  showPermissionModal: boolean;
  setShowPermissionModal: (show: boolean) => void;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
  refreshGpsLocation: () => Promise<{ success: boolean; location?: string; error?: string }>;
  requestPermission: (type: 'location' | 'microphone' | 'camera') => Promise<boolean>;
  requestAllPermissions: () => Promise<{ location: boolean; microphone: boolean; camera: boolean }>;
}

const AppContext = createContext<AppContextType | null>(null);

let toastSeq = 1;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kisanai.lang');
      if (saved === 'hi' || saved === 'mr' || saved === 'ml' || saved === 'en') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('kisanai.theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  const [demoBanner, setDemoBanner] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [cropProfile, setCropProfileState] = useState<CropProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kisanai.cropProfile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>(() => {
    try {
      const saved = localStorage.getItem('kisanai.recentQueries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User location & coordinates
  const [userLocation, setUserLocation] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kisanai.userLocation') || null;
    } catch {
      return null;
    }
  });

  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);

  // App Permissions State
  const [permissions, setPermissions] = useState<AppPermissions>(() => {
    try {
      const saved = localStorage.getItem('kisanai.permissions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      location: 'prompt',
      microphone: 'prompt',
      camera: 'prompt',
    };
  });

  // Modal prompt visible on start
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(() => {
    try {
      const dismissed = localStorage.getItem('kisanai.permissionsDismissed');
      return dismissed !== 'true';
    } catch {
      return true;
    }
  });

  // Dedicated Location Selector & GPS update dialog
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);

  useEffect(() => {
    applyThemeVariables(theme);
  }, [theme]);

  // Robust live GPS location refresh without cached position
  const refreshGpsLocation = useCallback(async (): Promise<{ success: boolean; location?: string; error?: string }> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setPermissions(prev => ({ ...prev, location: 'denied' }));
        resolve({ success: false, error: 'Geolocation is not supported by your browser' });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserCoords({ lat, lon });
          setPermissions(prev => {
            const next = { ...prev, location: 'granted' as const };
            try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
            return next;
          });
          const detected = await reverseGeocodeCoords(lat, lon);
          setUserLocation(detected);
          try {
            localStorage.setItem('kisanai.userLocation', detected);
          } catch {}
          resolve({ success: true, location: detected });
        },
        (err) => {
          console.warn('Location refresh error:', err);
          setPermissions(prev => {
            const next = { ...prev, location: 'denied' as const };
            try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
            return next;
          });
          resolve({ success: false, error: err.message || 'Location permission denied' });
        },
        { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
      );
    });
  }, []);

  // Request single permission
  const requestPermission = useCallback(async (type: 'location' | 'microphone' | 'camera'): Promise<boolean> => {
    if (type === 'location') {
      return new Promise<boolean>((resolve) => {
        if (!navigator.geolocation) {
          setPermissions(prev => ({ ...prev, location: 'denied' }));
          resolve(false);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            setUserCoords({ lat, lon });
            setPermissions(prev => {
              const next = { ...prev, location: 'granted' as const };
              try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
              return next;
            });
            const detected = await reverseGeocodeCoords(lat, lon);
            setUserLocation(detected);
            try {
              localStorage.setItem('kisanai.userLocation', detected);
            } catch {}
            resolve(true);
          },
          (err) => {
            console.warn('Location error:', err);
            setPermissions(prev => {
              const next = { ...prev, location: 'denied' as const };
              try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
              return next;
            });
            resolve(false);
          },
          { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
        );
      });
    } else if (type === 'microphone') {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
          return false;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setPermissions(prev => {
          const next = { ...prev, microphone: 'granted' as const };
          try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
          return next;
        });
        return true;
      } catch (err) {
        console.warn('Microphone error:', err);
        setPermissions(prev => {
          const next = { ...prev, microphone: 'denied' as const };
          try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
          return next;
        });
        return false;
      }
    } else if (type === 'camera') {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setPermissions(prev => ({ ...prev, camera: 'denied' }));
          return false;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setPermissions(prev => {
          const next = { ...prev, camera: 'granted' as const };
          try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
          return next;
        });
        return true;
      } catch (err) {
        console.warn('Camera error:', err);
        setPermissions(prev => {
          const next = { ...prev, camera: 'denied' as const };
          try { localStorage.setItem('kisanai.permissions', JSON.stringify(next)); } catch {}
          return next;
        });
        return false;
      }
    }
    return false;
  }, []);

  // Request all initial permissions (LOCATION + MICROPHONE ONLY - NEVER CAMERA UPFRONT)
  const requestAllPermissions = useCallback(async () => {
    const locResult = await requestPermission('location');
    const micResult = await requestPermission('microphone');
    // Camera is strictly requested on-demand when the farmer enters disease diagnosis.
    return {
      location: locResult,
      microphone: micResult,
      camera: permissions.camera === 'granted',
    };
  }, [requestPermission, permissions.camera]);

  // Check existing permissions or auto-trigger on start
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' as any })
        .then(res => {
          setPermissions(prev => ({ ...prev, location: res.state as any }));
          if (res.state === 'granted' && !userLocation) {
            requestPermission('location');
          }
        })
        .catch(() => {});

      navigator.permissions.query({ name: 'microphone' as any })
        .then(res => {
          setPermissions(prev => ({ ...prev, microphone: res.state as any }));
        })
        .catch(() => {});

      navigator.permissions.query({ name: 'camera' as any })
        .then(res => {
          setPermissions(prev => ({ ...prev, camera: res.state as any }));
        })
        .catch(() => {});
    }

    // Auto-prompt location natively on start if not already dismissed
    const dismissed = localStorage.getItem('kisanai.permissionsDismissed');
    if (dismissed !== 'true' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserCoords({ lat, lon });
          setPermissions(prev => ({ ...prev, location: 'granted' }));
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            const detected =
              geoData.city || geoData.locality || geoData.principalSubdivision
                ? `${geoData.city || geoData.locality}, ${geoData.principalSubdivision}`
                : `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
            setUserLocation(detected);
            localStorage.setItem('kisanai.userLocation', detected);
          } catch {}
        },
        () => {},
        { timeout: 8000 }
      );
    }
  }, [requestPermission, userLocation]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('kisanai.theme', next);
      } catch {
        // no-op
      }
      applyThemeVariables(next);
      return next;
    });
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    try {
      localStorage.setItem('kisanai.lang', nextLang);
    } catch {
      // no-op
    }
    setLangState(nextLang);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const pushToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = toastSeq++;
    const ttl = toast.ttl ?? 4200;
    setToasts(prev => [...prev.slice(-3), { ...toast, id, ttl }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, ttl);
  }, []);

  const setCropProfile = useCallback((profile: CropProfile) => {
    try {
      localStorage.setItem('kisanai.cropProfile', JSON.stringify(profile));
    } catch {
      // no-op
    }
    setCropProfileState(profile);
  }, []);

  const addRecentQuery = useCallback((query: RecentQuery) => {
    setRecentQueries(prev => {
      const next = [query, ...prev.filter(q => q.text !== query.text)].slice(0, 6);
      try {
        localStorage.setItem('kisanai.recentQueries', JSON.stringify(next));
      } catch {
        // no-op
      }
      return next;
    });
  }, []);

  const setUserLocationHandler = useCallback((loc: string) => {
    setUserLocation(loc);
    try {
      localStorage.setItem('kisanai.userLocation', loc);
    } catch {}
  }, []);

  const userState = useMemo(() => {
    return extractStateFromLocation(userLocation);
  }, [userLocation]);

  const value = useMemo(() => ({
    lang,
    setLang,
    theme,
    toggleTheme,
    toasts,
    pushToast,
    dismissToast,
    demoBanner,
    setDemoBanner,
    cropProfile,
    setCropProfile,
    recentQueries,
    addRecentQuery,
    permissions,
    userLocation,
    setUserLocation: setUserLocationHandler,
    userState,
    userCoords,
    showPermissionModal,
    setShowPermissionModal,
    showLocationModal,
    setShowLocationModal,
    refreshGpsLocation,
    requestPermission,
    requestAllPermissions,
  }), [
    lang,
    setLang,
    theme,
    toggleTheme,
    toasts,
    pushToast,
    dismissToast,
    demoBanner,
    cropProfile,
    setCropProfile,
    recentQueries,
    addRecentQuery,
    permissions,
    userLocation,
    setUserLocationHandler,
    userState,
    userCoords,
    showPermissionModal,
    setShowPermissionModal,
    showLocationModal,
    setShowLocationModal,
    refreshGpsLocation,
    requestPermission,
    requestAllPermissions,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside an AppProvider');
  }
  return context;
}
