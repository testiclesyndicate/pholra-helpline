import translationsData from '../data/translations.json';
import { Language } from '../types';

export interface LanguageMeta {
  label: string;
  native: string;
  locale: string;
  category: 'indian' | 'international';
}

export const LANGUAGES: Record<Language, LanguageMeta> = {
  // Indian Regional Languages
  hi: { label: 'Hindi', native: 'हिन्दी', locale: 'hi-IN', category: 'indian' },
  en: { label: 'English', native: 'English', locale: 'en-IN', category: 'indian' },
  pa: { label: 'Punjabi', native: 'ਪੰਜਾਬੀ', locale: 'pa-IN', category: 'indian' },
  bn: { label: 'Bengali', native: 'বাংলা', locale: 'bn-IN', category: 'indian' },
  te: { label: 'Telugu', native: 'తెలుగు', locale: 'te-IN', category: 'indian' },
  ta: { label: 'Tamil', native: 'தமிழ்', locale: 'ta-IN', category: 'indian' },
  mr: { label: 'Marathi', native: 'मराठी', locale: 'mr-IN', category: 'indian' },
  gu: { label: 'Gujarati', native: 'ગુજરાતી', locale: 'gu-IN', category: 'indian' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ', locale: 'kn-IN', category: 'indian' },
  ml: { label: 'Malayalam', native: 'മലയാളം', locale: 'ml-IN', category: 'indian' },
  or: { label: 'Odia', native: 'ଓଡ଼ିଆ', locale: 'or-IN', category: 'indian' },
  as: { label: 'Assamese', native: 'অসমীয়া', locale: 'as-IN', category: 'indian' },
  ur: { label: 'Urdu', native: 'اردو', locale: 'ur-IN', category: 'indian' },
  ne: { label: 'Nepali', native: 'नेपाली', locale: 'ne-NP', category: 'indian' },
  bho: { label: 'Bhojpuri', native: 'भोजपुरी', locale: 'bho-IN', category: 'indian' },
  mai: { label: 'Maithili', native: 'मैथिली', locale: 'mai-IN', category: 'indian' },
  raj: { label: 'Rajasthani', native: 'राजस्थानी', locale: 'hi-IN', category: 'indian' },
  har: { label: 'Haryanvi', native: 'हरियाणवी', locale: 'hi-IN', category: 'indian' },
  sa: { label: 'Sanskrit', native: 'संस्कृतम्', locale: 'sa-IN', category: 'indian' },
  kok: { label: 'Konkani', native: 'कोंकणी', locale: 'kok-IN', category: 'indian' },
  ks: { label: 'Kashmiri', native: 'कॉशुर', locale: 'ks-IN', category: 'indian' },
  sd: { label: 'Sindhi', native: 'سنڌي / सिंधी', locale: 'sd-IN', category: 'indian' },
  doi: { label: 'Dogri', native: 'डोगरी', locale: 'doi-IN', category: 'indian' },
  sat: { label: 'Santali', native: 'संथाली', locale: 'sat-IN', category: 'indian' },

  // International Languages
  es: { label: 'Spanish', native: 'Español', locale: 'es-ES', category: 'international' },
  fr: { label: 'French', native: 'Français', locale: 'fr-FR', category: 'international' },
  ar: { label: 'Arabic', native: 'العربية', locale: 'ar-SA', category: 'international' },
  pt: { label: 'Portuguese', native: 'Português', locale: 'pt-BR', category: 'international' },
  ru: { label: 'Russian', native: 'Русский', locale: 'ru-RU', category: 'international' },
  de: { label: 'German', native: 'Deutsch', locale: 'de-DE', category: 'international' },
  ja: { label: 'Japanese', native: '日本語', locale: 'ja-JP', category: 'international' },
  zh: { label: 'Chinese', native: '中文', locale: 'zh-CN', category: 'international' },
};

export const ALL_LANGS: Language[] = Object.keys(LANGUAGES) as Language[];

// Quick pick featured languages for prominent buttons
export const FEATURED_LANGS: Language[] = [
  'hi',
  'pa',
  'bn',
  'mr',
  'te',
  'ta',
  'gu',
  'kn',
  'ml',
  'ur',
  'en',
];

export const BUNDLED_LANGS: Language[] = ['en', 'hi', 'mr'];

export function isBundledLanguage(lang: string): boolean {
  return BUNDLED_LANGS.includes(lang as Language);
}

const translations: Record<string, Record<string, string>> = translationsData as unknown as Record<
  string,
  Record<string, string>
>;

// Regional navigation dictionaries
const regionalCommon: Record<string, Record<string, string>> = {
  ml: {
    'nav.home': 'ഹോം',
    'nav.assistant': 'എഐ സഹായി',
    'nav.disease': 'രോഗ നിർണ്ണയം',
    'nav.weather': 'കാലാവസ്ഥ',
    'nav.crop': 'എന്റെ വിള',
    'nav.risk': 'അപകട വിശകലനം',
    'nav.officials': 'ഉദ്യോഗസ്ഥർ',
    'nav.schemes': 'പദ്ധതികൾ',
    'nav.about': 'വിവരം',
    'common.ask': 'ചോദിക്കുക',
  },
  pa: {
    'nav.home': 'ਮੁੱਖ ਪੰਨਾ',
    'nav.assistant': 'AI ਖੇਤੀ ਸਹਾਇਕ',
    'nav.disease': 'ਬਿਮਾਰੀ ਜਾਂਚ',
    'nav.weather': 'ਮੌਸਮ ਜਾਣਕਾਰੀ',
    'nav.crop': 'ਮੇਰੀ ਫ਼ਸਲ',
    'nav.risk': 'ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ',
    'nav.officials': 'ਅਧਿਕਾਰੀ ਸੰਪਰਕ',
    'nav.schemes': 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
    'nav.about': 'ਬਾਰੇ',
    'common.ask': 'ਪੁੱਛੋ',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.assistant': 'এআই কৃষি সহায়ক',
    'nav.disease': 'রোগ নির্ণয়',
    'nav.weather': 'আবহাওয়া',
    'nav.crop': 'আমার ফসল',
    'nav.risk': 'ঝুঁকি বিশ্লেষণ',
    'nav.officials': 'কর্মকর্তা',
    'nav.schemes': 'সরকারি প্রকল্প',
    'nav.about': 'সম্পর্কে',
    'common.ask': 'জিজ্ঞাসা করুন',
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.assistant': 'AI సహాయకుడు',
    'nav.disease': 'తెగులు నిర్ధారణ',
    'nav.weather': 'వాతావరణం',
    'nav.crop': 'నా పంట',
    'nav.risk': 'ప్రమాద విశ్లేషణ',
    'nav.officials': 'అధికారులు',
    'nav.schemes': 'ప్రభుత్వ పథకాలు',
    'nav.about': 'గురించి',
    'common.ask': 'అడగండి',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.assistant': 'AI உதவியாளர்',
    'nav.disease': 'நோய் கண்டறிதல்',
    'nav.weather': 'வானிலை',
    'nav.crop': 'என் பயிர்',
    'nav.risk': 'ஆபத்து பகுப்பாய்வு',
    'nav.officials': 'அதிகாரிகள்',
    'nav.schemes': 'அரசு திட்டங்கள்',
    'nav.about': 'பற்றி',
    'common.ask': 'கேளுங்கள்',
  },
  gu: {
    'nav.home': 'હોમ',
    'nav.assistant': 'AI સહાયક',
    'nav.disease': 'રોગ ઓળખ',
    'nav.weather': 'હવામાન',
    'nav.crop': 'મારો પાક',
    'nav.risk': 'જોખમ વિશ્લેષણ',
    'nav.officials': 'અધિકારીઓ',
    'nav.schemes': 'સરકારી યોજનાઓ',
    'nav.about': 'વિશે',
    'common.ask': 'પૂછો',
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.assistant': 'AI ಕೃಷಿ ಮಿತ್ರ',
    'nav.disease': 'ರೋಗ ಪತ್ತೆ',
    'nav.weather': 'ಹವಾಮಾನ',
    'nav.crop': 'ನನ್ನ ಬೆಳೆ',
    'nav.risk': 'ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ',
    'nav.officials': 'ಅಧಿಕಾರಿಗಳು',
    'nav.schemes': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    'nav.about': 'ಬಗ್ಗೆ',
    'common.ask': 'ಕೇಳಿ',
  },
  or: {
    'nav.home': 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    'nav.assistant': 'AI କୃଷି ସହାୟକ',
    'nav.disease': 'ରୋଗ ଚିହ୍ନଟ',
    'nav.weather': 'ପାଣିପାଗ',
    'nav.crop': 'ମୋ ଫସଲ',
    'nav.risk': 'ବିପଦ ବିଶ୍ଳେଷଣ',
    'nav.officials': 'କୃଷି ଅଧିକାରୀ',
    'nav.schemes': 'ସରକାରୀ ଯୋଜନା',
    'nav.about': 'ବିଷୟରେ',
    'common.ask': 'ପଚାରନ୍ତୁ',
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.assistant': 'زرعی مشیر',
    'nav.disease': 'بیماری کی تشخیص',
    'nav.weather': 'موسم',
    'nav.crop': 'میری فصل',
    'nav.risk': 'رسک تجزیہ',
    'nav.officials': 'افسران',
    'nav.schemes': 'سرکاری اسکیمیں',
    'nav.about': 'کے بارے میں',
    'common.ask': 'پوچھیے',
  },
  bho: {
    'nav.home': 'होम',
    'nav.assistant': 'AI खेती सलाहकार',
    'nav.disease': 'रोग पहचान',
    'nav.weather': 'मौसम',
    'nav.crop': 'हमार फसल',
    'nav.risk': 'जोखिम जांच',
    'nav.officials': 'कृषि अधिकारी',
    'nav.schemes': 'सरकारी योजना',
    'nav.about': 'बारे में',
    'common.ask': 'पूछीं',
  },
};

export function d(lang: Language, key: string, params?: Record<string, string | number>): string {
  let val: string | undefined;

  if (regionalCommon[lang] && regionalCommon[lang][key]) {
    val = regionalCommon[lang][key];
  } else if (translations[lang] && translations[lang][key]) {
    val = translations[lang][key];
  } else if (translations.en && translations.en[key]) {
    val = translations.en[key];
  } else {
    val = key;
  }

  if (params && val) {
    for (const [pKey, pVal] of Object.entries(params)) {
      val = val.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }

  return val;
}
