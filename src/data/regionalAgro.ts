import { RegionalAgroInsight } from '../types';

export const REGIONAL_AGRO_DATABASE: Record<string, RegionalAgroInsight> = {
  maharashtra: {
    district: 'Nashik & Western Maharashtra',
    state: 'Maharashtra',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Kharif crops like Soybean, Bajra, and Groundnut are reaching maturity or early harvesting. Kharif Onion harvest is starting while Rabi onion nursery beds are being prepared. In vineyards (Grapes), post-monsoon pruning and disease monitoring are active.',
    majorCrops: [
      {
        name: 'Onion (कांदा)',
        localName: 'कांदा / Onion',
        season: 'Kharif, Late Kharif & Rabi',
        currentStage: 'Late Vegetative / Bulbing & Rabi Nursery',
        sowingPeriod: 'June-July (Kharif), Oct-Nov (Rabi)',
        harvestingPeriod: 'Oct-Nov (Kharif), March-May (Rabi)',
        commonDiseases: ['Purple Blotch (जांभळा करपा)', 'Stemphylium Blight', 'Thrips Infestation (थ्रिप्स)', 'Basal Rot'],
        tips: 'Avoid excessive nitrogen late in vegetative stage. Spray Mancozeb (2.5g/L) or neem oil for thrips control after light rains.',
      },
      {
        name: 'Grapes (द्राक्षे)',
        localName: 'द्राक्षे / Grapes',
        season: 'Annual Commercial',
        currentStage: 'Forward Pruning (छाटणी) & New Shoot Emergence',
        sowingPeriod: 'Perennial Vineyards (Pruning in Sept-Oct)',
        harvestingPeriod: 'January to April',
        commonDiseases: ['Downy Mildew (केवडा)', 'Powdery Mildew (भुरी)', 'Anthracnose (करपा)', 'Flea Beetle'],
        tips: 'Keep canopy aerated. Spray 1% Bordeaux mixture or Metalaxyl + Mancozeb (2.5g/L) immediately after rain spells.',
      },
      {
        name: 'Soybean (सोयाबीन)',
        localName: 'सोयाबीन / Soybean',
        season: 'Kharif',
        currentStage: 'Pod Filling & Physiological Maturity (कापणीची वेळ)',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'Late September - October',
        commonDiseases: ['Yellow Mosaic Virus', 'Rust (तांबेरा)', 'Pod Blight (शेंगा करपा)', 'Spodoptera Caterpillar'],
        tips: 'Harvest when 95% pods turn golden brown and moisture drops below 14% to avoid pod shattering.',
      },
      {
        name: 'Sugarcane (ऊस)',
        localName: 'ऊस / Sugarcane',
        season: 'Annual (Adsali / Pre-seasonal)',
        currentStage: 'Grand Growth & Internode Elongation',
        sowingPeriod: 'July-August (Adsali), Oct-Nov (Pre-seasonal)',
        harvestingPeriod: 'November to March',
        commonDiseases: ['Red Rot (लाल कुज)', 'Wilt', 'Early Shoot Borer', 'White Grub (हुमणी)'],
        tips: 'Apply earthing up. Drench Metarhizium anisopliae bio-control for white grub management.',
      },
      {
        name: 'Cotton (कापूस)',
        localName: 'कापूस / Cotton',
        season: 'Kharif',
        currentStage: 'Boll Formation & First Picking (वेचणी)',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'October to January',
        commonDiseases: ['Pink Bollworm (गुलाबी बोंडअळी)', 'Bacterial Blight', 'Grey Mildew (दहिया)', 'Sucking Pests'],
        tips: 'Install 5 pheromone traps per acre to monitor pink bollworm moths. Pick only dry, fully opened bolls.',
      },
      {
        name: 'Pomegranate (डाळिंब)',
        localName: 'डाळिंब / Pomegranate',
        season: 'Haste / Mrig Bahar',
        currentStage: 'Fruit Development & Color Break',
        sowingPeriod: 'Perennial Orchard',
        harvestingPeriod: 'December to March (Haste Bahar)',
        commonDiseases: ['Bacterial Blight / Telya (तेल्या)', 'Anthracnose', 'Fruit Borer (फळ पोखरणारी अळी)'],
        tips: 'Strict orchard sanitation: remove affected fruits immediately. Spray Streptocycline 50g + Copper Oxychloride 2.5kg per 1000L.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Grapes & Vegetables',
        disease: 'Downy Mildew & Blight (केवडा व करपा)',
        riskLevel: 'high',
        riskReason: 'Cloudy conditions, morning dew, and humidity above 75% favor rapid fungal sporulation.',
        symptoms: 'Yellowish oily spots on upper leaf surfaces turning brown, white powdery or fuzzy fungal growth underneath.',
        preventiveSpray: 'Spray Metalaxyl-M + Mancozeb (2.5 g/L water) or Potassium Salt of Active Phosphorus (3 g/L).',
      },
      {
        crop: 'Cotton (कापूस)',
        disease: 'Pink Bollworm & Sucking Pests (गुलाबी बोंडअळी)',
        riskLevel: 'medium',
        riskReason: 'Boll formation stage is critical window for larval entry into green bolls.',
        symptoms: 'Rosetted flowers, pinpoint bore holes on developing green bolls with staining.',
        preventiveSpray: 'Spray Neem Seed Kernel Extract (NSKE 5%) or Emamectin Benzoate 5% SG @ 4g/10L water.',
      },
      {
        crop: 'Onion (कांदा)',
        disease: 'Purple Blotch & Thrips (जांभळा करपा व थ्रिप्स)',
        riskLevel: 'medium',
        riskReason: 'Intermittent sunshine and showers accelerate thrips feeding and fungal entry.',
        symptoms: 'Sunken purple-centered oval lesions on leaves with yellow halos.',
        preventiveSpray: 'Spray Difenoconazole 25% EC (1 ml/L) mixed with a sticker (spreader) agent.',
      },
    ],
    advisoryNote:
      'Ensure clear drainage in low-lying crop rows. Complete Kharif harvesting on sunny days and dry produce on tarpaulins to avoid moisture spoilage. Start field preparation for Rabi wheat and gram (chana).',
  },

  punjab: {
    district: 'Ludhiana & Central Punjab',
    state: 'Punjab & Haryana',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Kharif Paddy / Basmati is in heading, grain filling, and early harvesting stages. Farmers are preparing for upcoming Rabi Wheat (Kanak) and Mustard (Raya) sowing scheduled for October-November.',
    majorCrops: [
      {
        name: 'Rice / Paddy (ਝੋਨਾ / धान)',
        localName: 'Paddy / Basmati (ਝੋਨਾ)',
        season: 'Kharif',
        currentStage: 'Milking, Dough & Early Harvest',
        sowingPeriod: 'June (transplanting)',
        harvestingPeriod: 'October - November',
        commonDiseases: ['Sheath Blight', 'Bacterial Panicle Blight', 'False Smut (ਹਲਦੀ ਰੋਗ)', 'Plant Hoppers (BPH)'],
        tips: 'Stop irrigation 10-14 days before harvest. Scout base of tillers for Brown Plant Hopper colonies.',
      },
      {
        name: 'Wheat (ਕਣਕ / गेहूँ)',
        localName: 'Wheat / Kanak (ਕਣਕ)',
        season: 'Rabi (Upcoming)',
        currentStage: 'Field Prep & Seed Treatment Planning',
        sowingPeriod: 'Late October - November',
        harvestingPeriod: 'April',
        commonDiseases: ['Yellow / Stripe Rust (ਪੀਲੀ ਕੁੰਗੀ)', 'Karnal Bunt', 'Powdery Mildew', 'Aphids'],
        tips: 'Procure certified PBW 826, HD 3086 or DBW 187 seeds. Treat seed with Carboxin + Thiram before sowing.',
      },
      {
        name: 'Cotton (ਨਰਮਾ / कपास)',
        localName: 'Bt Cotton (ਨਰਮਾ)',
        season: 'Kharif',
        currentStage: 'Boll Opening & 1st Picking (ਚੁਗਾਈ)',
        sowingPeriod: 'April - May',
        harvestingPeriod: 'October - December',
        commonDiseases: ['Cotton Leaf Curl Virus (CLCuV)', 'Whitefly', 'Pink Bollworm', 'Para-wilt'],
        tips: 'Pick clean cotton after morning dew has evaporated. Avoid storing moist seed cotton.',
      },
      {
        name: 'Mustard / Raya (ਸਰ੍ਹੋਂ)',
        localName: 'Raya / Sarson (ਸਰ੍ਹੋਂ)',
        season: 'Rabi (Early Sowing)',
        currentStage: 'Sowing Window Starting (October)',
        sowingPeriod: 'October (1st fortnight)',
        harvestingPeriod: 'March',
        commonDiseases: ['White Rust (ਚਿੱਟੀ ਕੁੰਗੀ)', 'Downy Mildew', 'Mustard Aphid (ਚੇਪਾ)'],
        tips: 'Opt for RLC 3 or PBR 357. Ensure good moisture at sowing for uniform germination.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Rice / Paddy (ਝੋਨਾ)',
        disease: 'False Smut & Sheath Blight (ਹਲਦੀ ਰੋਗ)',
        riskLevel: 'high',
        riskReason: 'High relative humidity (>85%) and temperature fluctuations during panicle emergence.',
        symptoms: 'Individual grains transformed into large green-yellow velvety spore balls.',
        preventiveSpray: 'Spray Propiconazole 25% EC (Tilt @ 200 ml/acre) at boot leaf stage before flowering.',
      },
      {
        crop: 'Cotton (ਨਰਮਾ)',
        disease: 'Pink Bollworm Infestation',
        riskLevel: 'medium',
        riskReason: 'Late season resurgence inside unpicked green bolls.',
        symptoms: 'Rosetted flowers, stained lint, premature opening of bolls.',
        preventiveSpray: 'Spray Prophenophos 50 EC @ 500 ml/acre or Chlorantraniliprole 18.5 SC @ 60 ml/acre.',
      },
    ],
    advisoryNote:
      'Manage paddy straw in-situ with Happy Seeder or Super Seeder instead of stubble burning to conserve soil carbon and earn carbon benefits. Calibrate combine harvesters with SMS attachment.',
  },

  uttarpradesh: {
    district: 'Varanasi, Eastern & Central UP',
    state: 'Uttar Pradesh',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Kharif Paddy is in grain maturation stage. Sugarcane grand growth is peaking. Farmers are actively preparing land for Rabi Potato, Mustard (Lahi), and Wheat sowing.',
    majorCrops: [
      {
        name: 'Paddy / Rice (धान)',
        localName: 'धान / Dhan',
        season: 'Kharif',
        currentStage: 'Grain Filling & Early Harvest',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'October - November',
        commonDiseases: ['Bacterial Leaf Blight (BLB)', 'Rice Blast (झोंका)', 'Brown Spot', 'Stem Borer (तना छेदक)'],
        tips: 'Drain excess water 12 days prior to harvest. Avoid nitrogen top-dressing at this late stage.',
      },
      {
        name: 'Sugarcane (गन्ना)',
        localName: 'गन्ना / Ganna',
        season: 'Annual',
        currentStage: 'Maturation & Sugar Accumulation',
        sowingPeriod: 'Feb-March (Spring), Oct-Nov (Autumn)',
        harvestingPeriod: 'November to April',
        commonDiseases: ['Red Rot (लाल सड़न)', 'Smut (कंडुआ)', 'Pyrilla (पायरीला कीट)'],
        tips: 'Prop up tall canes to avoid lodging in case of late rains. Treat autumn planting sets with Carbendazim.',
      },
      {
        name: 'Potato (आलू)',
        localName: 'आलू / Potato',
        season: 'Rabi (Early Sowing)',
        currentStage: 'Field Preparation & Seed Tuber Chitting',
        sowingPeriod: 'Late October - November',
        harvestingPeriod: 'January - March',
        commonDiseases: ['Late Blight (पिछेता झुलसा)', 'Early Blight', 'Black Scurf'],
        tips: 'Use certified Kufri Pukhraj or Kufri Jyoti. Pre-germinate tubers in cool, diffused daylight.',
      },
      {
        name: 'Mustard (सरसों / लाही)',
        localName: 'सरसों / Lahi',
        season: 'Rabi',
        currentStage: 'Land Preparation & Early Sowing',
        sowingPeriod: 'October',
        harvestingPeriod: 'February - March',
        commonDiseases: ['Alternaria Blight', 'White Rust', 'Aphids (माहू)'],
        tips: 'Sow Varuna or Pitambari in 30cm rows with 10cm plant spacing for optimal branching.',
      },
      {
        name: 'Wheat (गेहूँ)',
        localName: 'गेहूँ / Gehun',
        season: 'Rabi (Upcoming)',
        currentStage: 'Seed Arrangement & Field Preparation',
        sowingPeriod: 'November',
        harvestingPeriod: 'April',
        commonDiseases: ['Brown Rust', 'Loose Smut', 'Termites'],
        tips: 'Select varieties: HD-2967, DBW-187, or PBW-502. Ensure deep summer plowing residues are decomposed.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Paddy (धान)',
        disease: 'Bacterial Leaf Blight & Neck Blast (झुलसा व झोंका)',
        riskLevel: 'high',
        riskReason: 'Warm days with intermittent cloudy humidity favor bacterial and blast proliferation.',
        symptoms: 'Wavy yellow-to-white lesions drying down the leaf edges; blackened neck at the base of the panicle.',
        preventiveSpray: 'Spray Streptocycline (15g) + Copper Oxychloride (500g) per 200L water per acre.',
      },
      {
        crop: 'Potato & Vegetables (आलू व सब्जियाँ)',
        disease: 'Damping Off & Early Blight (झुलसा)',
        riskLevel: 'medium',
        riskReason: 'Warm soil with residual moisture during early seed tuber planting.',
        symptoms: 'Concentric ring spots on leaves; rotting of emerging sprouts.',
        preventiveSpray: 'Treat seed tubers with Trichoderma viride (10g/kg) or Mancozeb (2.5g/L water dip).',
      },
    ],
    advisoryNote:
      'Prepare nursery and seedbeds with well-rotted FYM. Avoid stagnant water in early vegetable plots. For mustard, finish sowing by mid-October to escape severe aphid attack.',
  },

  madhyapradesh: {
    district: 'Indore, Malwa & Central MP',
    state: 'Madhya Pradesh',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Soybean pods have turned golden-yellow and harvesting is in peak progress across Malwa. Farmers are prepping black cotton soils for Rabi Gram (Chana) and Sharbati Wheat.',
    majorCrops: [
      {
        name: 'Soybean (सोयाबीन)',
        localName: 'सोयाबीन / Soybean',
        season: 'Kharif',
        currentStage: 'Maturity & Peak Harvesting (कटाई)',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'Late September - October',
        commonDiseases: ['Yellow Mosaic Virus (पीला मोजेक)', 'Charcoal Rot', 'Girdle Beetle', 'Semilooper'],
        tips: 'Harvest immediately when leaves shed and pods rattle. Thresh at lower RPM (350-400) to avoid seed cracking.',
      },
      {
        name: 'Gram / Chickpea (चना)',
        localName: 'चना (देसी व डॉलर) / Chana',
        season: 'Rabi',
        currentStage: 'Pre-sowing Land Preparation',
        sowingPeriod: 'October - November',
        harvestingPeriod: 'February - March',
        commonDiseases: ['Fusarium Wilt (उकठा)', 'Ascochyta Blight', 'Helicoverpa Pod Borer (इल्ली)'],
        tips: 'Select wilt-resistant varieties like JG-11, JG-14, or RVG-202. Treat seed with Trichoderma (5g/kg).',
      },
      {
        name: 'Wheat (गेहूँ - शरबती)',
        localName: 'Sharbati Wheat (शरबती गेहूँ)',
        season: 'Rabi',
        currentStage: 'Soil Moisture Conservation & Seed Procurement',
        sowingPeriod: 'November',
        harvestingPeriod: 'March - April',
        commonDiseases: ['Stem & Leaf Rust', 'Karnal Bunt', 'Aphids'],
        tips: 'Conserve residual moisture after soybean harvest by shallow planking/harrowing.',
      },
      {
        name: 'Garlic & Onion (लहसुन व प्याज)',
        localName: 'लहसुन (Garlic) - G2 / Amleta',
        season: 'Rabi',
        currentStage: 'Nursery & Cloves Sowing Preparation',
        sowingPeriod: 'October',
        harvestingPeriod: 'March',
        commonDiseases: ['Purple Blotch', 'Stemphylium', 'Thrips'],
        tips: 'Plant healthy, firm outer cloves. Dip cloves in Carbendazim (2g/L) for 15 minutes before sowing.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Soybean (सोयाबीन)',
        disease: 'Pod Blight & Charcoal Rot (शुकन व सड़न)',
        riskLevel: 'medium',
        riskReason: 'Sudden dry spells following monsoon withdrawal stress maturing roots.',
        symptoms: 'Ashy gray discoloration of lower stems, premature drying of plants with attached leaves.',
        preventiveSpray: 'Prompt harvesting and safe storage in aerated bags below 12% moisture.',
      },
      {
        crop: 'Chickpea (चना)',
        disease: 'Fusarium Wilt Risk (उकठा रोग)',
        riskLevel: 'high',
        riskReason: 'Warm soil temperature during early sowing favors soil-borne fungal infection.',
        symptoms: 'Drooping and yellowing of seedlings, internal brown vascular ring in split taproots.',
        preventiveSpray: 'Delay sowing until day temperatures fall below 30°C. Seed treatment with Carbendazim + Mancozeb.',
      },
    ],
    advisoryNote:
      'Store harvested soybean on wooden platforms away from damp walls. For Dollar chana or Malwi wheat, test soil for zinc and sulfur before applying basal DAP/NPK fertilizer.',
  },

  andhra_telangana: {
    district: 'Guntur, Warangal & Deccan Agro-Zone',
    state: 'Andhra Pradesh & Telangana',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Kharif Cotton is entering boll formation and early picking; Chilli transplanting is completed and vegetative flowering is beginning. Kharif Paddy is in reproductive phase.',
    majorCrops: [
      {
        name: 'Chilli (మిర్చి / मिर्च)',
        localName: 'Chilli (మిర్చి / Mirchi)',
        season: 'Kharif / Rabi Commercial',
        currentStage: 'Vegetative Growth, Branching & First Flowering',
        sowingPeriod: 'July-August (Nursery), Aug-Sept (Transplanting)',
        harvestingPeriod: 'December to March',
        commonDiseases: ['Chilli Leaf Curl Virus (జెమిని వైరస్)', 'Dieback & Anthracnose', 'Black Thrips (నల్ల తామర పురుగులు)', 'Powdery Mildew'],
        tips: 'Install yellow and blue sticky traps (20 per acre). Spray Spinetoram or Fipronil for black thrips management.',
      },
      {
        name: 'Cotton (పత్తి / कपास)',
        localName: 'Cotton (పత్తి / Patti)',
        season: 'Kharif',
        currentStage: 'Square & Boll Development, Early Picking',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'October - January',
        commonDiseases: ['Pink Bollworm', 'Leaf Spot (ఆకుమచ్చ తెగులు)', 'Boll Rot', 'Whitefly'],
        tips: 'Scout regularly for pink bollworm. Spray Spinosad 45 SC (0.3 ml/L) or Neem oil (5 ml/L).',
      },
      {
        name: 'Paddy / Rice (వరి / धान)',
        localName: 'Paddy (వరి / Vari)',
        season: 'Kharif (Sarva) & Rabi (Dalwa)',
        currentStage: 'Panicle Initiation & Flowering',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'November - December',
        commonDiseases: ['Neck Blast (మెడ విరుపు తెగులు)', 'Sheath Blight', 'Stem Borer (కాండం తొలిచే పురుగు)'],
        tips: 'Maintain 2-3 cm shallow water level during flowering. Avoid excess urea in overcast weather.',
      },
      {
        name: 'Red Gram / Pigeon Pea (కందులు / अरहर)',
        localName: 'Red Gram (కందులు)',
        season: 'Kharif (Intercrop / Sole)',
        currentStage: 'Vegetative Branching & Bud Initiation',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'December - January',
        commonDiseases: ['Sterility Mosaic Virus', 'Phytophthora Blight', 'Helicoverpa Pod Borer'],
        tips: 'Nip terminal shoots at 45-50 days to stimulate heavy lateral branching and pod yield.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Chilli (మిర్చి)',
        disease: 'Black Thrips & Leaf Curl Complex (నల్ల తామర పురుగులు)',
        riskLevel: 'high',
        riskReason: 'Dry winds with warm temperatures facilitate high reproduction of invasive black thrips.',
        symptoms: 'Upward curling of leaves, blackened flower buds dropping prematurely, bronze leaf undersides.',
        preventiveSpray: 'Spray Neem oil 10,000 ppm (3 ml/L) alternating with Diafenthiuron 50 WP (1.25 g/L).',
      },
      {
        crop: 'Paddy (వరి)',
        disease: 'Neck Blast & Bacterial Leaf Streak',
        riskLevel: 'medium',
        riskReason: 'Dew formation and high nitrogen applications accelerate blast infection.',
        symptoms: 'Diamond-shaped spots with gray centers on foliage; brown lesions on panicle base.',
        preventiveSpray: 'Spray Tricyclazole 75% WP @ 0.6 g/L water at panicle emergence.',
      },
    ],
    advisoryNote:
      'Practice Integrated Pest Management (IPM) in chilli and cotton. Avoid unrecommended chemical cocktails that cause resurgence of secondary pests. Maintain bunds to store late monsoon runoff.',
  },

  rajasthan: {
    district: 'Jaipur, Shekhawati & Marwar',
    state: 'Rajasthan',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Pearl Millet (Bajra) harvesting is peaking across Marwar and Shekhawati. Moong and Guar pods are drying. Sowing of Mustard (Toria/Rai) and Gram (Chana) is starting with early moisture conservation.',
    agroClimateZone: 'Arid & Semi-Arid Western Plain Zone',
    soilTypes: ['Sandy Loam', 'Desert Alluvial', 'Saline Silt'],
    majorCrops: [
      {
        name: 'Mustard (सरसों / राई)',
        localName: 'सरसों (Mustard)',
        season: 'Rabi',
        currentStage: 'Field Prep & Sowing Window',
        sowingPeriod: 'October - November',
        harvestingPeriod: 'February - March',
        commonDiseases: ['White Rust', 'Alternaria Leaf Spot', 'Aphids / चेपा'],
        tips: 'Treat seed with Apron 35 SD (6g/kg) and ensure 30cm row-to-row spacing.',
      },
      {
        name: 'Pearl Millet / Bajra (बाजरा)',
        localName: 'बाजरा (Bajra)',
        season: 'Kharif',
        currentStage: 'Maturity & Grain Drying',
        sowingPeriod: 'July',
        harvestingPeriod: 'Late September - October',
        commonDiseases: ['Downy Mildew / Green Ear', 'Ergot', 'Smut'],
        tips: 'Dry harvested cobs to under 12% moisture before storage in kothis.',
      },
      {
        name: 'Chickpea / Gram (चना)',
        localName: 'चना (Desi / Kabuli Gram)',
        season: 'Rabi',
        currentStage: 'Early Sowing Window',
        sowingPeriod: 'October - November',
        harvestingPeriod: 'March - April',
        commonDiseases: ['Fusarium Wilt', 'Dry Root Rot', 'Helicoverpa Pod Borer'],
        tips: 'Seed inoculation with Rhizobium and PSB bio-fertilizer increases yield by 15%.',
      },
      {
        name: 'Wheat (गेहूँ)',
        localName: 'गेहूँ (Wheat)',
        season: 'Rabi',
        currentStage: 'Field Prep & Seed Arrangement',
        sowingPeriod: 'November',
        harvestingPeriod: 'March - April',
        commonDiseases: ['Yellow Rust', 'Loose Smut', 'Termites / दीमक'],
        tips: 'In sandy soils, treat seeds with Chlorpyriphos to prevent termite damage.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Mustard (सरसों)',
        disease: 'Aphids (चेपा) & White Rust',
        riskLevel: 'medium',
        riskReason: 'Cloudy weather and rising humidity encourage early aphid colonies.',
        symptoms: 'Curling of tender shoot tips, honeydew secretion, white blisters under leaves.',
        preventiveSpray: 'Dimethoate 30 EC (1.5 ml/L) or Neem seed kernel extract (5%).',
      },
    ],
    advisoryNote:
      'In canal command areas, optimize pre-sowing irrigation (rauni). Check micro-irrigation lines and solar pump filters before Rabi season.',
  },
  bihar: {
    district: 'Patna & Middle Gangetic Plains',
    state: 'Bihar',
    harvestingSeasonNote:
      'Current Window (Sept - Oct): Medium duration Paddy varieties are reaching physiological maturity. Harvesting of early Aghani paddy has started. Farmers are preparing fields for early Rabi Maize and Potato.',
    agroClimateZone: 'Middle Gangetic Plains (Zone I, II, III)',
    soilTypes: ['Gangetic Alluvium', 'Sandy Loam', 'Clayey Silt'],
    majorCrops: [
      {
        name: 'Paddy / Rice (धान)',
        localName: 'धान (Paddy)',
        season: 'Kharif',
        currentStage: 'Maturity & Harvesting',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'October - November',
        commonDiseases: ['Bacterial Leaf Blight', 'Brown Spot', 'Stem Borer'],
        tips: 'Drain standing water 10-12 days before planned harvesting.',
      },
      {
        name: 'Wheat (गेहूँ)',
        localName: 'गेहूँ (Wheat)',
        season: 'Rabi',
        currentStage: 'Zero Tillage Field Preparation',
        sowingPeriod: 'November - December',
        harvestingPeriod: 'March - April',
        commonDiseases: ['Loose Smut', 'Foliar Blight', 'Termites'],
        tips: 'Adopt Zero Tillage sowing immediately after paddy harvest to save ₹3,000/ha.',
      },
      {
        name: 'Maize / Makka (मक्का)',
        localName: 'मक्का (Maize)',
        season: 'Kharif / Rabi',
        currentStage: 'Cobs Development / Rabi Sowing',
        sowingPeriod: 'October - November (Rabi Maize)',
        harvestingPeriod: 'April - May',
        commonDiseases: ['Fall Armyworm (FAW)', 'Maydis Leaf Blight'],
        tips: 'Monitor whorls for FAW frass; apply Emamectin Benzoate 5 SG if >5% plants damaged.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Maize (मक्का)',
        disease: 'Fall Armyworm (फ़ॉल आर्मीवॉर्म)',
        riskLevel: 'medium',
        riskReason: 'Warm humid post-monsoon conditions favor noctuid moth egg-laying.',
        symptoms: 'Pinholes in leaves and sawdust-like fecal matter inside central whorl.',
        preventiveSpray: 'Spinetoram 11.7 SC (0.5 ml/L) directly directed into the leaf whorl.',
      },
    ],
    advisoryNote:
      'Utilize Zero-Tillage seed drills for Rabi wheat. Take advantage of Bihar Diesel Anudan and Zero-Premium Fasal Sahayata schemes.',
  },
  default: {
    district: 'Indian Agro-Climatic Belt',
    state: 'India',
    harvestingSeasonNote:
      'Current Window (September - October): Pan-India Kharif harvesting of Pulses, Soybean, Maize, Bajra, and Early Paddy is underway. Field preparation and seed procurement for the Rabi winter season (Wheat, Mustard, Gram, Potato, Barley) are in full swing.',
    majorCrops: [
      {
        name: 'Paddy / Rice (धान)',
        localName: 'Paddy (धान)',
        season: 'Kharif',
        currentStage: 'Grain Filling to Maturation',
        sowingPeriod: 'June - July',
        harvestingPeriod: 'October - November',
        commonDiseases: ['Blast', 'Sheath Blight', 'Bacterial Blight', 'Brown Plant Hopper'],
        tips: 'Withhold irrigation 10-14 days before harvest for even ripening.',
      },
      {
        name: 'Wheat (गेहूँ)',
        localName: 'Wheat (गेहूँ)',
        season: 'Rabi (Upcoming)',
        currentStage: 'Pre-sowing Planning & Seed Arrangement',
        sowingPeriod: 'Late October to November',
        harvestingPeriod: 'March - April',
        commonDiseases: ['Rusts (Yellow, Brown)', 'Loose Smut', 'Powdery Mildew'],
        tips: 'Use certified seeds and treat with fungicides before sowing.',
      },
      {
        name: 'Mustard / Rapeseed (सरसों)',
        localName: 'Mustard (सरसों)',
        season: 'Rabi',
        currentStage: 'Early Sowing Window',
        sowingPeriod: 'October',
        harvestingPeriod: 'February - March',
        commonDiseases: ['White Rust', 'Alternaria Blight', 'Aphids'],
        tips: 'Maintain 30cm row spacing for optimal branch development.',
      },
      {
        name: 'Chickpea / Gram (चना)',
        localName: 'Gram (चना)',
        season: 'Rabi',
        currentStage: 'Field Preparation',
        sowingPeriod: 'October - November',
        harvestingPeriod: 'March',
        commonDiseases: ['Wilt', 'Root Rot', 'Pod Borer'],
        tips: 'Treat seed with Trichoderma viride to prevent fungal wilt.',
      },
      {
        name: 'Cotton (कपास)',
        localName: 'Cotton (कपास)',
        season: 'Kharif',
        currentStage: 'Boll Development & Picking',
        sowingPeriod: 'May - June',
        harvestingPeriod: 'October - January',
        commonDiseases: ['Pink Bollworm', 'Leaf Curl', 'Bacterial Blight'],
        tips: 'Monitor pheromone traps and pick clean dry bolls.',
      },
      {
        name: 'Vegetables (सब्जियाँ - Tomato/Chilli/Onion)',
        localName: 'Vegetables (सब्जियाँ)',
        season: 'Year-Round / Rabi',
        currentStage: 'Transplanting & Vegetative Growth',
        sowingPeriod: 'September - October (Winter nursery)',
        harvestingPeriod: 'Dec onwards',
        commonDiseases: ['Early Blight', 'Damping Off', 'Fruit Borer'],
        tips: 'Prepare raised beds for winter seedlings to prevent waterlogging.',
      },
    ],
    activeDiseaseAlerts: [
      {
        crop: 'Paddy (धान)',
        disease: 'Blast & Bacterial Blight',
        riskLevel: 'medium',
        riskReason: 'High morning humidity and dew favor spore germination.',
        symptoms: 'Spindle-shaped lesions on leaves, brown rot on panicle necks.',
        preventiveSpray: 'Spray Tricyclazole 75 WP (0.6g/L) or Copper Oxychloride.',
      },
      {
        crop: 'Vegetables (टमाटर / मिर्च)',
        disease: 'Leaf Curl & Blight',
        riskLevel: 'medium',
        riskReason: 'Sucking pests like whitefly and thrips spread viral complexes.',
        symptoms: 'Upward or downward leaf curling, stunting, yellow mosaic.',
        preventiveSpray: 'Spray Neem oil 5ml/L or Imidacloprid (0.5ml/L) to control vector insects.',
      },
    ],
    advisoryNote:
      'Plan harvesting around weather windows. Clean and calibrate sprayers. Contact your district Krishi Vigyan Kendra (KVK) or Kisan Call Centre (1800-180-1551) for district-specific seed and subsidy advisories.',
  },
};

export function getRegionalAgroForLocation(locationQuery: string): RegionalAgroInsight {
  const query = (locationQuery || '').toLowerCase().trim();

  if (
    query.includes('nashik') ||
    query.includes('pune') ||
    query.includes('thane') ||
    query.includes('maharashtra') ||
    query.includes('mumbai') ||
    query.includes('nagpur') ||
    query.includes('aurangabad') ||
    query.includes('sambhajinagar') ||
    query.includes('ahmednagar') ||
    query.includes('kolhapur') ||
    query.includes('solapur') ||
    query.includes('jalgaon') ||
    query.includes('satara') ||
    query.includes('sangli') ||
    query.includes('latur')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.maharashtra,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Nashik',
    };
  }

  if (
    query.includes('punjab') ||
    query.includes('haryana') ||
    query.includes('ludhiana') ||
    query.includes('amritsar') ||
    query.includes('jalandhar') ||
    query.includes('karnal') ||
    query.includes('hisar') ||
    query.includes('bathinda') ||
    query.includes('patiala') ||
    query.includes('chandigarh') ||
    query.includes('ambala') ||
    query.includes('rohtak')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.punjab,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Ludhiana',
    };
  }

  if (
    query.includes('rajasthan') ||
    query.includes('jaipur') ||
    query.includes('jodhpur') ||
    query.includes('kota') ||
    query.includes('bikaner') ||
    query.includes('udaipur') ||
    query.includes('alwar') ||
    query.includes('sriganganagar') ||
    query.includes('ajmer') ||
    query.includes('bharatpur') ||
    query.includes('sikar')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.rajasthan,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Jaipur',
    };
  }

  if (
    query.includes('bihar') ||
    query.includes('patna') ||
    query.includes('gaya') ||
    query.includes('muzaffarpur') ||
    query.includes('bhagalpur') ||
    query.includes('darbhanga') ||
    query.includes('purnia') ||
    query.includes('nalanda')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.bihar,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Patna',
    };
  }

  if (
    query.includes('uttar pradesh') ||
    query.includes('up') ||
    query.includes('varanasi') ||
    query.includes('lucknow') ||
    query.includes('kanpur') ||
    query.includes('meerut') ||
    query.includes('gorakhpur') ||
    query.includes('agra') ||
    query.includes('prayagraj') ||
    query.includes('allahabad') ||
    query.includes('bareilly') ||
    query.includes('aligarh')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.uttarpradesh,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Varanasi',
    };
  }

  if (
    query.includes('madhya pradesh') ||
    query.includes('mp') ||
    query.includes('indore') ||
    query.includes('bhopal') ||
    query.includes('ujjain') ||
    query.includes('jabalpur') ||
    query.includes('gwalior') ||
    query.includes('sagar') ||
    query.includes('dewas') ||
    query.includes('ratlam')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.madhyapradesh,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Indore',
    };
  }

  if (
    query.includes('andhra') ||
    query.includes('telangana') ||
    query.includes('guntur') ||
    query.includes('hyderabad') ||
    query.includes('warangal') ||
    query.includes('kurnool') ||
    query.includes('vijayawada') ||
    query.includes('visakhapatnam') ||
    query.includes('karimnagar') ||
    query.includes('nizamabad') ||
    query.includes('khammam')
  ) {
    return {
      ...REGIONAL_AGRO_DATABASE.andhra_telangana,
      district: locationQuery.includes(',') ? locationQuery.split(',')[0].trim() : locationQuery || 'Guntur',
    };
  }

  // Fallback default
  return {
    ...REGIONAL_AGRO_DATABASE.default,
    district: locationQuery || 'India',
  };
}
