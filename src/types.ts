export type Language =
  // Major Indian Languages
  | 'hi'
  | 'en'
  | 'pa'
  | 'bn'
  | 'te'
  | 'ta'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'or'
  | 'as'
  | 'ur'
  | 'ne'
  | 'bho'
  | 'mai'
  | 'sa'
  | 'kok'
  | 'ks'
  | 'sd'
  | 'doi'
  | 'sat'
  | 'raj'
  | 'har'
  // International Languages
  | 'es'
  | 'fr'
  | 'ar'
  | 'pt'
  | 'ru'
  | 'de'
  | 'ja'
  | 'zh';

export type Theme = 'light' | 'dark';

export interface ToastItem {
  id: number;
  kind: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  ttl?: number;
}

export interface ChatReplyPart {
  kind: 'p' | 'heading' | 'ul' | 'tip';
  text?: string;
  title?: string;
  items?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  ts: number;
  thinking?: boolean;
  parts?: ChatReplyPart[];
  disclaimer?: boolean;
  sources?: string[];
  risk?: RiskResult;
  contacts?: OfficialContact[];
}

export interface CropProfile {
  crop: string;
  state: string;
  soil: string;
  sowingDate: string;
  stage: string;
  irrigation: string;
  area: string;
  areaUnit: string;
}

export interface CropAdvisorySection {
  key: string;
  title: string;
  icon: string;
  content: string;
}

export interface CropAdvisoryAlert {
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
}

export interface CropAdvisory {
  cropLabel: string;
  growthStage: string;
  sections: CropAdvisorySection[];
  alerts: CropAdvisoryAlert[];
  disclaimer: string;
}

export interface DiseaseResult {
  crop: string;
  cropMatch: number;
  disease: string;
  diseaseLocal: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'healthy' | 'none';
  severityLocal: string;
  stage?: string;
  symptoms: string;
  causes?: string;
  action: string;
  organicRemedy?: string;
  chemicalRemedy?: string;
  prevention: string;
  nextStep: string;
  disclaimer: string;
}

export interface RegionalCropInfo {
  name: string;
  localName?: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual' | string;
  currentStage: string;
  sowingPeriod: string;
  harvestingPeriod: string;
  commonDiseases: string[];
  tips?: string;
}

export interface RegionalDiseaseAlert {
  crop: string;
  disease: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskReason: string;
  symptoms: string;
  preventiveSpray: string;
}

export interface RegionalAgroInsight {
  district: string;
  state: string;
  majorCrops: RegionalCropInfo[];
  harvestingSeasonNote: string;
  activeDiseaseAlerts: RegionalDiseaseAlert[];
  advisoryNote: string;
  regionKey?: string;
  agroClimateZone?: string;
  soilTypes?: string[];
  primaryCrops?: RegionalCropInfo[];
}

export interface WeatherConditionCurrent {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  condition: string;
  conditionKey: string;
  rainChance: number;
  icon: string;
}

export interface WeatherForecastDay {
  dateLabel: string;
  condition: string;
  conditionKey: string;
  tempMax: number;
  tempMin: number;
  rainChance: number;
  wind: number;
  icon: string;
}

export interface WeatherAdvisory {
  headline: string;
  points: string[];
  irrigation: string;
  spraying: string;
  risk: 'low' | 'medium' | 'high';
}

export interface WeatherReport {
  mode: 'demo' | 'live';
  location: string;
  sourceNote: string | null;
  fetchedAt: string;
  current: WeatherConditionCurrent;
  forecast: WeatherForecastDay[];
  advisory: WeatherAdvisory;
  regionalAgro?: RegionalAgroInsight;
}

export interface RiskResult {
  score: number;
  level: 'low' | 'medium' | 'high';
  label: string;
  est: string;
  basis: string;
  basisLabel: string;
  actionLabel: string;
  action: string;
  disclaimer: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameLocal?: string;
  summary: string;
  category: string;
  categories: string[];
  state: string;
  states: string[];
  eligibility: string;
  benefits: string;
  howToApply: string;
  portalUrl: string;
  imageUrl?: string;
  subsidyHighlight?: string;
  ministry?: string;
  documentsRequired?: string[];
  applicationSteps?: string[];
  targetFarmers?: string;
  tags?: string[];
}

export interface OfficialContact {
  id: string;
  name: string;
  kind: string;
  region: string;
  contact: string;
  timings: string;
  notes: string;
}

export interface MetaQuestion {
  id: string;
  en: string;
  hi: string;
  mr: string;
}

export interface RecentQuery {
  id: string;
  text: string;
  lang: string;
  ts: number;
  crop?: string;
}

export interface AppPermissions {
  location: 'granted' | 'denied' | 'prompt';
  microphone: 'granted' | 'denied' | 'prompt';
  camera: 'granted' | 'denied' | 'prompt';
}
