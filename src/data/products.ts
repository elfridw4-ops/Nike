/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types/product';

// Curated high-fidelity Nike performance sportswear & sneaker photography
const SNEAKER_IMAGE_SETS = [
  // 01 - Nike Tempo 400
  [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
  ],
  // 02 - Nike Vireur Trail
  [
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
  ],
  // 03 - Nike AeroPulse Elite
  [
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
  ],
  // 04 - Nike Strata Glide
  [
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
  ],
  // 05 - Nike Rebound Recovery
  [
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
  ],
  // 06 - Nike Piste Master Pro
  [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
  ],
];

// Community & Editorial Lookbook images for Nike Home and Catalog
export const LOOKBOOK_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1483721074577-7e616335010b?auto=format&fit=crop&w=1200&q=80',
    title: 'Sortie Seuil au Lever du Jour',
    tag: 'Nike Route & Rythme',
    location: 'Marina Cotonou'
  },
  {
    url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    title: 'Ascension Sentiers & Dénivelé',
    tag: 'Nike Trail Sauvage',
    location: 'Collines de Dassa'
  },
  {
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    title: 'Fractionné Court & VMA Pure',
    tag: 'Nike Track & Field',
    location: 'Stade de l’Amitié'
  },
  {
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    title: 'Endurance Fondamentale & Souffle',
    tag: 'Nike Long Run',
    location: 'Route des Pêches'
  },
  {
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    title: 'Préparation Physique & Relance',
    tag: 'Nike Training Club',
    location: 'Nike Performance Lab'
  },
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    title: 'Peloton Urbain & Communauté',
    tag: 'Nike Run Club',
    location: 'Boulevard de la Marina'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'tempo-400',
    name: 'Nike Tempo 400',
    tagline: 'Dynamisme franc pour séances rythmées et compétitions sur route.',
    category: 'Running',
    usage: 'route',
    gender: 'unisexe',
    price: 65000,
    originalPrice: 75000,
    isNew: true,
    isPopular: true,
    seriesNumber: '01',
    rating: 4.9,
    reviewsCount: 48,
    descriptionShort: 'Conçue pour transformer chaque foulée en propulsion immédiate. Un amorti ultra-réactif allié à une tige en Flyknit respirant texturé.',
    descriptionLong: {
      benefits: [
        'Propulsion franche dès la phase d’impulsion grâce à la plaque Pebax intégrée.',
        'Maintien médio-pied chirurgical sans points de compression.',
        'Semelle d’usure en caoutchouc renforcé haute traction sur sol sec et humide.',
        'Poids plume pour conserver votre fréquence de foulée sur la durée.'
      ],
      technical: 'Mousse Zoom double densité à restitution d’énergie dynamique. Tige en mono-filament Flyknit à aération sélective.',
      usageNote: 'Idéal pour vos sorties fractionnées, tempo runs de 10 km et semi-marathons rapides.'
    },
    specs: {
      drop: '8 mm',
      weight: '215 g (en taille 42)',
      cushioning: 'Ferme & Dynamique',
      surface: 'Route & Asphalte',
      distance: '5 km à 21 km'
    },
    sizes: [
      { size: 38, inStock: true },
      { size: 39, inStock: true },
      { size: 40, inStock: true },
      { size: 41, inStock: true },
      { size: 42, inStock: true, stockCount: 3 },
      { size: 43, inStock: true },
      { size: 44, inStock: true },
      { size: 45, inStock: false },
      { size: 46, inStock: true }
    ],
    colors: [
      { name: 'Total Orange / Noir', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][0] },
      { name: 'Blanc Pur / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[0][2] },
      { name: 'Triple Noir', hex: '#111111', image: SNEAKER_IMAGE_SETS[0][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [
      {
        id: 'rev-01',
        author: 'Koffi A.',
        rating: 5,
        date: '14 Mars 2026',
        verified: true,
        sport: 'Semi-marathonien (Cotonou)',
        title: 'Retour d’énergie spectaculaire',
        comment: 'Testée sur mes sorties seuil le long de la marina. La relance est instantanée, le Total Orange Nike claque avec force.'
      },
      {
        id: 'rev-02',
        author: 'Sarah M.',
        rating: 5,
        date: '02 Mars 2026',
        verified: true,
        sport: 'Coureuse 10k',
        title: 'Légèreté et maintien parfaits',
        comment: 'Aucune ampoule dès la première sortie. Le chaussant Flyknit est ultra-précis.'
      },
      {
        id: 'rev-03',
        author: 'Jean-Luc D.',
        rating: 4,
        date: '28 Février 2026',
        verified: true,
        sport: 'Entraînement quotidien',
        title: 'Excellente chaussure de tempo',
        comment: 'Très réactive comme attendu chez Nike, parfait pour accélérer la cadence.'
      }
    ],
    faq: [
      {
        question: 'Comment taille la Nike Tempo 400 ?',
        answer: 'La Nike Tempo 400 taille fidèlement aux standards de running Nike. Nous vous conseillons de sélectionner votre pointure habituelle.'
      },
      {
        question: 'Quelle est la durée de vie estimée de la semelle ?',
        answer: 'Conçue avec notre composé de caoutchouc haute résistance, elle conserve son dynamisme optimal entre 600 et 800 kilomètres.'
      },
      {
        question: 'Est-elle adaptée pour courir sous la pluie ?',
        answer: 'Oui, les rainures directionnelles de la semelle externe évacuent l’eau pour garantir une adhérence franche sur bitume mouillé.'
      }
    ]
  },
  {
    id: 'prod-02',
    slug: 'vireur-trail',
    name: 'Nike Vireur Trail',
    tagline: 'Accroche agressive et stabilité sur terrains meubles et rochers.',
    category: 'Running',
    usage: 'trail',
    gender: 'homme',
    price: 72000,
    originalPrice: 80000,
    isNew: false,
    isPopular: true,
    seriesNumber: '02',
    rating: 4.8,
    reviewsCount: 35,
    descriptionShort: 'Parée pour affronter les dénivelés, la boue et les sentiers techniques avec une accroche multidirectionnelle sans compromis.',
    descriptionLong: {
      benefits: [
        'Crampons chevronnés de 5 mm assurant une traction chirurgicale en montée comme en descente.',
        'Plaque de protection anti-roche intégrée à l’avant-pied.',
        'Tige renforcée en TPU anti-déchirure et pare-pierres enveloppant.'
      ],
      technical: 'Semelle externe en caoutchouc Vibram Megagrip avec mousse amortissante haute densité.',
      usageNote: 'Idéale pour vos entraînements trail moyenne et longue distance sur sentiers rocailleux.'
    },
    specs: {
      drop: '6 mm',
      weight: '275 g',
      cushioning: 'Équilibré & Protecteur',
      surface: 'Sentiers, Terre & Rochers',
      distance: '20 km à 80+ km'
    },
    sizes: [
      { size: 40, inStock: true },
      { size: 41, inStock: true },
      { size: 42, inStock: true },
      { size: 43, inStock: true, stockCount: 2 },
      { size: 44, inStock: true },
      { size: 45, inStock: true }
    ],
    colors: [
      { name: 'Noir / Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[1][0] },
      { name: 'Gris Platine / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[1][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[1],
    reviews: [
      {
        id: 'rev-21',
        author: 'Marc O.',
        rating: 5,
        date: '10 Mars 2026',
        verified: true,
        sport: 'Traileur passionné',
        title: 'Grip impressionnant',
        comment: 'Sur terre humide et dévers, les crampons font un travail incroyable. Zéro glissade.'
      }
    ],
    faq: [
      { question: 'Convient-elle pour la boue épaisse ?', answer: 'Les crampons espacés facilitent le débourrage automatique pendant la course.' }
    ]
  },
  {
    id: 'prod-03',
    slug: 'aeropulse-elite',
    name: 'Nike AeroPulse Elite',
    tagline: 'Vitesse pure et réactivité maximale pour records personnels sur piste et route.',
    category: 'Running',
    usage: 'piste',
    gender: 'unisexe',
    price: 85000,
    originalPrice: 95000,
    isNew: true,
    isPopular: true,
    seriesNumber: '03',
    rating: 5.0,
    reviewsCount: 62,
    descriptionShort: 'La quintessence de l’ingénierie vitesse Nike. Plaque intégrale en fibre de carbone Flyplate et mousse ZoomX supercritique ultra-légère.',
    descriptionLong: {
      benefits: [
        'Efficacité énergétique augmentée de 4% sur les allures de course.',
        'Structure géométrique favorisant une attaque médio-pied tranchante.',
        'Mesh respirant ultra-fin sans coutures pour zéro frottement.'
      ],
      technical: 'Mousse supercritique Nike ZoomX avec plaque carbone Flyplate 3D incurvée et inserts de traction avant-pied.',
      usageNote: 'Réservée aux jours de course et aux séances de vitesse spécifiques.'
    },
    specs: {
      drop: '10 mm',
      weight: '185 g',
      cushioning: 'Maximal Réactif',
      surface: 'Route & Piste synthétique',
      distance: '5 km au Marathon'
    },
    sizes: [
      { size: 39, inStock: true },
      { size: 40, inStock: true },
      { size: 41, inStock: true },
      { size: 42, inStock: true, stockCount: 1 },
      { size: 43, inStock: true },
      { size: 44, inStock: false },
      { size: 45, inStock: true }
    ],
    colors: [
      { name: 'Total Orange Vif', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[2][0] },
      { name: 'Noir Furtif / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[2][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[2],
    reviews: [
      { id: 'rev-31', author: 'Bakary S.', rating: 5, date: '18 Mars 2026', verified: true, sport: 'Sprinteur & 10k', title: 'Une fusée aux pieds', comment: 'Le boost de la plaque carbone ZoomX est bluffant.' }
    ],
    faq: [{ question: 'Combien de kilomètres dure la plaque carbone ?', answer: 'Le rendement maximal est garanti sur 350 à 450 km de compétition.' }]
  },
  {
    id: 'prod-04',
    slug: 'strata-glide',
    name: 'Nike Strata Glide',
    tagline: 'Confort absolu et absorption des impacts pour sorties longues d’endurance.',
    category: 'Running',
    usage: 'route',
    gender: 'femme',
    price: 58000,
    isNew: false,
    isPopular: true,
    seriesNumber: '04',
    rating: 4.7,
    reviewsCount: 41,
    descriptionShort: 'Le partenaire de vos kilomètres quotidiens. Un coussin d’amorti protecteur Nike Air qui préserve vos articulations sans alourdir la foulée.',
    descriptionLong: {
      benefits: [
        'Absorption supérieure des vibrations à chaque impact.',
        'Collier molletonné et languette ergonomique pour un confort enveloppant.',
        'Transitions talon-pointe soyeuses et fluides.'
      ],
      technical: 'Mousse React haute durabilité infusée avec coussin Nike Air au talon.',
      usageNote: 'Idéale pour vos footings d’assimilation et vos sorties longues du dimanche.'
    },
    specs: {
      drop: '8 mm',
      weight: '240 g',
      cushioning: 'Moelleux & Protecteur',
      surface: 'Route & Chemins stabilisés',
      distance: '10 km à 42 km'
    },
    sizes: [
      { size: 37, inStock: true },
      { size: 38, inStock: true },
      { size: 39, inStock: true },
      { size: 40, inStock: true },
      { size: 41, inStock: true }
    ],
    colors: [
      { name: 'Blanc Pur & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[3][0] },
      { name: 'Triple Noir', hex: '#111111', image: SNEAKER_IMAGE_SETS[3][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[3],
    reviews: [
      { id: 'rev-41', author: 'Chloé B.', rating: 5, date: '11 Mars 2026', verified: true, sport: 'Marathonienne', title: 'Fini le mal aux genoux', comment: 'Sortie de 25 km effectuée sans aucune gêne articulaire. Amorti très doux.' }
    ],
    faq: [{ question: 'Convient-elle aux coureurs pronateurs ?', answer: 'C’est une foulée neutre avec un renfort géométrique stabilisateur au talon.' }]
  },
  {
    id: 'prod-05',
    slug: 'rebound-recovery',
    name: 'Nike Rebound Recovery',
    tagline: 'Soulagement myofascial et régénération active post-effort intense.',
    category: 'Running',
    usage: 'recuperation',
    gender: 'unisexe',
    price: 42000,
    isNew: false,
    isPopular: false,
    seriesNumber: '05',
    rating: 4.9,
    reviewsCount: 29,
    descriptionShort: 'Chausson de récupération biomécanique Nike conçu pour stimuler le retour veineux et détendre la voûte plantaire après vos séances les plus dures.',
    descriptionLong: {
      benefits: [
        'Semelle anatomique à double berceau favorisant le relâchement musculaire.',
        'Matière respirante lavable et zéro contrainte d’enfilage.',
        'Voûte plantaire soutenue avec micro-reliefs d’acupression.'
      ],
      technical: 'Mousse thermoformée à mémoire d’empreinte et tige extensible sans lacet.',
      usageNote: 'À enfiler immédiatement après l’entraînement ou en journée de repos actif.'
    },
    specs: {
      drop: '4 mm',
      weight: '160 g',
      cushioning: 'Ultra Moelleux',
      surface: 'Intérieur & Post-course',
      distance: 'Récupération'
    },
    sizes: [
      { size: 38, inStock: true },
      { size: 39, inStock: true },
      { size: 40, inStock: true },
      { size: 41, inStock: true },
      { size: 42, inStock: true },
      { size: 43, inStock: true },
      { size: 44, inStock: true },
      { size: 45, inStock: true }
    ],
    colors: [
      { name: 'Gris Platine / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[4][0] },
      { name: 'Noir Carbone', hex: '#111111', image: SNEAKER_IMAGE_SETS[4][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[4],
    reviews: [
      { id: 'rev-51', author: 'David L.', rating: 5, date: '05 Mars 2026', verified: true, sport: 'Ultra-trail', title: 'Indispensable après 50k', comment: 'Le soulagement est direct dès qu’on retire ses chaussures de trail.' }
    ],
    faq: [{ question: 'Peut-on marcher en ville avec ?', answer: 'Oui, la semelle possède un revêtement antidérapant résistant aux sols extérieurs.' }]
  },
  {
    id: 'prod-06',
    slug: 'piste-master-pro',
    name: 'Nike Piste Master Pro',
    tagline: 'Légèreté radicale et accroche sur piste d’athlétisme synthétique.',
    category: 'Running',
    usage: 'piste',
    gender: 'homme',
    price: 68000,
    isNew: true,
    isPopular: false,
    seriesNumber: '06',
    rating: 4.8,
    reviewsCount: 19,
    descriptionShort: 'Châssis minimaliste Nike calibré pour les séances de fractionné court, 400m et travail de fréquence pure.',
    descriptionLong: {
      benefits: [
        'Traction explosive sur tartan sans perte d’adhérence.',
        'Poids inférieur à 190 grammes pour une vélocité maximale.',
        'Empeigne aérodynamique seconde peau.'
      ],
      technical: 'Semelle fine en polymère réactif et tige thermo-soudée ultra-fine.',
      usageNote: 'Séances VMA sur piste et compétitions sur 800m à 5000m.'
    },
    specs: {
      drop: '4 mm',
      weight: '190 g',
      cushioning: 'Ferme Course',
      surface: 'Piste synthétique',
      distance: '400 m à 5 000 m'
    },
    sizes: [
      { size: 40, inStock: true },
      { size: 41, inStock: true },
      { size: 42, inStock: true, stockCount: 4 },
      { size: 43, inStock: true },
      { size: 44, inStock: true }
    ],
    colors: [
      { name: 'Noir & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[5][0] },
      { name: 'Blanc Pur / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[5][1] }
    ],
    gallery: SNEAKER_IMAGE_SETS[5],
    reviews: [
      { id: 'rev-61', author: 'Gérard K.', rating: 5, date: '21 Février 2026', verified: true, sport: 'Athlétisme 800m', title: 'Précision chirurgicale', comment: 'On sent la piste à chaque appui sans se faire mal aux métatarses.' }
    ],
    faq: [{ question: 'Les pointes sont-elles amovibles ?', answer: 'C’est un modèle sans pointes métalliques, autorisé sur toutes les pistes modernes.' }]
  },

  // 18 Additional Sportswear items with Nike theme
  {
    id: 'prod-07',
    slug: 'pulse-matrix-300',
    name: 'Nike Pulse Matrix 300',
    tagline: 'Polyvalence route et entraînement fractionné.',
    category: 'Running',
    usage: 'route',
    gender: 'unisexe',
    price: 52000,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviewsCount: 22,
    descriptionShort: 'Un modèle équilibré qui s’adapte à tous vos rythmes d’entraînement quotidiens.',
    descriptionLong: {
      benefits: ['Polyvalence absolue pour débutants comme coureurs confirmés.', 'Mousse endurante et tige respirante.'],
      technical: 'Mousse Nike React thermo-compressée et renforts latéraux TPU.',
      usageNote: 'Entraînements généraux 3 fois par semaine.'
    },
    specs: { drop: '10 mm', weight: '245 g', cushioning: 'Moyen', surface: 'Route', distance: '5 km à 15 km' },
    sizes: [{ size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Triple Noir', hex: '#111111', image: SNEAKER_IMAGE_SETS[0][1] }, { name: 'Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][0] }],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-08',
    slug: 'apex-ridge-trail',
    name: 'Nike Apex Ridge Trail',
    tagline: 'Grip maximal pour roches humides et sentiers escarpés.',
    category: 'Trail',
    usage: 'trail',
    gender: 'homme',
    price: 76000,
    isNew: true,
    isPopular: false,
    rating: 4.9,
    reviewsCount: 15,
    descriptionShort: 'Conçue pour les sorties techniques en milieu montagneux et sentiers escarpés.',
    descriptionLong: {
      benefits: ['Stabilité latérale renforcée sur pierriers.', 'Empeigne anti-abrasion imperméable.'],
      technical: 'Crampons 6mm en gomme haute adhérence Nike All-Conditions.',
      usageNote: 'Trails techniques et courses en montagne.'
    },
    specs: { drop: '6 mm', weight: '290 g', cushioning: 'Protecteur', surface: 'Montagne & Roches', distance: '15 km à 60 km' },
    sizes: [{ size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Noir & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[1][0] }],
    gallery: SNEAKER_IMAGE_SETS[1],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-09',
    slug: 'strata-tempo-w',
    name: 'Nike Strata Tempo W',
    tagline: 'Vitesse fluide et ajustement morphologique féminin.',
    category: 'Running',
    usage: 'route',
    gender: 'femme',
    price: 62000,
    originalPrice: 70000,
    isNew: true,
    isPopular: true,
    rating: 4.8,
    reviewsCount: 31,
    descriptionShort: 'Légère et incisive, pensée spécifiquement pour le coup de pied féminin.',
    descriptionLong: {
      benefits: ['Talon affiné évitant tout glissement.', 'Amorti dynamique réactif.'],
      technical: 'Mousse double densité optimisée avec amorti Zoom Air.',
      usageNote: 'Courses 10k et sorties rapides.'
    },
    specs: { drop: '8 mm', weight: '205 g', cushioning: 'Dynamique', surface: 'Route', distance: '5 km à 21 km' },
    sizes: [{ size: 36, inStock: true }, { size: 37, inStock: true }, { size: 38, inStock: true }, { size: 39, inStock: true }, { size: 40, inStock: true }],
    colors: [{ name: 'Blanc Pur & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[2][0] }],
    gallery: SNEAKER_IMAGE_SETS[2],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-10',
    slug: 'carbon-strike-x',
    name: 'Nike Carbon Strike X',
    tagline: 'Arme de précision pour marathoniens en quête du record.',
    category: 'Running',
    usage: 'route',
    gender: 'unisexe',
    price: 92000,
    isNew: true,
    isPopular: true,
    rating: 5.0,
    reviewsCount: 54,
    descriptionShort: 'Plaque carbone profilée Flyplate et mousse explosive ZoomX pour les compétitions sur route.',
    descriptionLong: {
      benefits: ['Effet ressort maximal à chaque foulée.', 'Tige monobrin ventilée Atomknit.'],
      technical: 'Plaque carbone intégrale et mousse ZoomX supercritique.',
      usageNote: 'Compétition marathon et semi-marathon.'
    },
    specs: { drop: '8 mm', weight: '195 g', cushioning: 'Maximal Réactif', surface: 'Route', distance: '21 km à 42 km' },
    sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Noir Carbone / Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][0] }],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-11',
    slug: 'zenith-cushion-500',
    name: 'Nike Zenith Cushion 500',
    tagline: 'Amorti suprême pour footings de régénération.',
    category: 'Running',
    usage: 'route',
    gender: 'homme',
    price: 59000,
    isNew: false,
    isPopular: false,
    rating: 4.7,
    reviewsCount: 18,
    descriptionShort: 'Protection articulaire totale pour les coureurs à la recherche de douceur.',
    descriptionLong: {
      benefits: ['Absorption des chocs à 100%.', 'Confort durable.'],
      technical: 'Mousse Nike Invincible haute épaisseur 36mm au talon.',
      usageNote: 'Footings de récupération et sorties longues tranquilles.'
    },
    specs: { drop: '10 mm', weight: '280 g', cushioning: 'Ultra Moelleux', surface: 'Route', distance: '10 km à 30 km' },
    sizes: [{ size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Triple Noir', hex: '#111111', image: SNEAKER_IMAGE_SETS[3][1] }],
    gallery: SNEAKER_IMAGE_SETS[3],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-12',
    slug: 'nomad-sand-runner',
    name: 'Nike Nomad Sand Runner',
    tagline: 'Spécialement conçue pour sols meubles, sable et pistes littorales.',
    category: 'Trail',
    usage: 'trail',
    gender: 'unisexe',
    price: 64000,
    isNew: true,
    isPopular: true,
    rating: 4.8,
    reviewsCount: 27,
    descriptionShort: 'Gaiter intégré anti-intrusion de sable et semelle plate-forme large.',
    descriptionLong: {
      benefits: ['Ne s’enfonce pas dans le sable meuble.', 'Empêche les grains d’entrer dans la chaussure.'],
      technical: 'Chausson stretch pare-sable et semelle large stabilisée.',
      usageNote: 'Plages, dunes et pistes de sable côtier.'
    },
    specs: { drop: '6 mm', weight: '260 g', cushioning: 'Équilibré', surface: 'Sable & Latérite', distance: '10 km à 30 km' },
    sizes: [{ size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }],
    colors: [{ name: 'Gris Platine & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[1][1] }],
    gallery: SNEAKER_IMAGE_SETS[1],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-13',
    slug: 'velocity-spike-speed',
    name: 'Nike Velocity Spike Speed',
    tagline: 'Vitesse pure pour le sprint et le 800m.',
    category: 'Running',
    usage: 'piste',
    gender: 'homme',
    price: 54000,
    isNew: false,
    isPopular: false,
    rating: 4.5,
    reviewsCount: 12,
    descriptionShort: 'Profil agressif courbé vers l’avant pour un départ explosif en starting-blocks.',
    descriptionLong: {
      benefits: ['Rigidité maximale pour zéro perte de puissance.'],
      technical: 'Plaque Pebax rigide avant-pied.',
      usageNote: 'Sprint 100m à 400m.'
    },
    specs: { drop: '0 mm', weight: '150 g', cushioning: 'Minimal', surface: 'Piste', distance: '100m à 800m' },
    sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
    colors: [{ name: 'Noir & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[5][0] }],
    gallery: SNEAKER_IMAGE_SETS[5],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-14',
    slug: 'pulse-light-w',
    name: 'Nike Pulse Light W',
    tagline: 'Ultra-légère et ventilée pour les journées chaudes.',
    category: 'Running',
    usage: 'route',
    gender: 'femme',
    price: 49000,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviewsCount: 23,
    descriptionShort: 'Tissu ajouré haute aération pour courir au frais même par climat tropical.',
    descriptionLong: {
      benefits: ['Évacuation immédiate de l’humidité.', 'Chaussant doux sans frottements.'],
      technical: 'Mesh Flyknit 3D respirant thermo-ventilé.',
      usageNote: 'Courses urbaines par temps chaud.'
    },
    specs: { drop: '8 mm', weight: '190 g', cushioning: 'Dynamique', surface: 'Route', distance: '5 km à 15 km' },
    sizes: [{ size: 37, inStock: true }, { size: 38, inStock: true }, { size: 39, inStock: true }, { size: 40, inStock: true }],
    colors: [{ name: 'Blanc Pur / Volt', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[4][0] }],
    gallery: SNEAKER_IMAGE_SETS[4],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-15',
    slug: 'vanguard-trainer',
    name: 'Nike Vanguard Trainer',
    tagline: 'Hybride gym, cross-training et sprints courts.',
    category: 'Training',
    usage: 'route',
    gender: 'unisexe',
    price: 47000,
    isNew: false,
    isPopular: false,
    rating: 4.7,
    reviewsCount: 16,
    descriptionShort: 'Stabilité latérale pour sauts, burpees et courses navettes rapides.',
    descriptionLong: {
      benefits: ['Semelle plate antidérapante Nike Metcon.', 'Empeigne renforcée aux orteils.'],
      technical: 'Caoutchouc haute friction et renforts latéraux.',
      usageNote: 'Séances de préparation physique générale.'
    },
    specs: { drop: '4 mm', weight: '260 g', cushioning: 'Ferme Stable', surface: 'Gym & Bitume', distance: 'Training' },
    sizes: [{ size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }],
    colors: [{ name: 'Noir & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[3][0] }],
    gallery: SNEAKER_IMAGE_SETS[3],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-16',
    slug: 'delta-ultra-trail',
    name: 'Nike Delta Ultra Trail',
    tagline: 'Conçue pour franchir 100 kilomètres d’autonomie en nature.',
    category: 'Trail',
    usage: 'trail',
    gender: 'homme',
    price: 88000,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviewsCount: 38,
    descriptionShort: 'Mousse haute résilience qui ne s’affaisse pas après 12 heures de course continue.',
    descriptionLong: {
      benefits: ['Préservation musculaire sur ultra-distances.', 'Poche à lacets intégrée.'],
      technical: 'Double plaque carbone trail et crampons 4.5mm.',
      usageNote: 'Courses d’ultra-endurance et raids nature.'
    },
    specs: { drop: '6 mm', weight: '270 g', cushioning: 'Maximal Trail', surface: 'Tous sentiers', distance: '50 km à 160 km' },
    sizes: [{ size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }, { size: 45, inStock: true }],
    colors: [{ name: 'Noir & Volt Fluo', hex: '#CCFF00', image: SNEAKER_IMAGE_SETS[1][0] }],
    gallery: SNEAKER_IMAGE_SETS[1],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-17',
    slug: 'urban-fleet-runner',
    name: 'Nike Urban Fleet Runner',
    tagline: 'L’élégance minimaliste pour les kilomètres urbains nocturnes.',
    category: 'Lifestyle',
    usage: 'route',
    gender: 'unisexe',
    price: 51000,
    isNew: false,
    isPopular: false,
    rating: 4.4,
    reviewsCount: 14,
    descriptionShort: 'Détails réfléchissants 360° pour courir en ville en toute sécurité après le coucher du soleil.',
    descriptionLong: {
      benefits: ['Visibilité nocturne accrue.', 'Amorti souple pour trottoirs et béton.'],
      technical: 'Éléments rétro-réfléchissants haute intensité.',
      usageNote: 'Courses nocturnes en environnement urbain.'
    },
    specs: { drop: '8 mm', weight: '235 g', cushioning: 'Confort', surface: 'Béton & Trottoirs', distance: '5 km à 15 km' },
    sizes: [{ size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }],
    colors: [{ name: 'Noir Nuit & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][1] }],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-18',
    slug: 'flow-glide-w',
    name: 'Nike Flow Glide W',
    tagline: 'Foulée aérienne et souplesse de torsion naturelle.',
    category: 'Running',
    usage: 'route',
    gender: 'femme',
    price: 46000,
    isNew: false,
    isPopular: false,
    rating: 4.7,
    reviewsCount: 19,
    descriptionShort: 'Rainures de flexion profondes Nike Free permettant au pied de bouger en totale liberté.',
    descriptionLong: {
      benefits: ['Flexibilité naturelle du pied.', 'Empeigne douce comme une chaussette.'],
      technical: 'Rainures multidirectionnelles et mesh tricoté sans coutures.',
      usageNote: 'Footings faciles et tapis de course.'
    },
    specs: { drop: '6 mm', weight: '185 g', cushioning: 'Naturel Souple', surface: 'Route & Tapis', distance: '3 km à 10 km' },
    sizes: [{ size: 36, inStock: true }, { size: 37, inStock: true }, { size: 38, inStock: true }, { size: 39, inStock: true }],
    colors: [{ name: 'Blanc Pur / Platine', hex: '#FFFFFF', image: SNEAKER_IMAGE_SETS[4][0] }],
    gallery: SNEAKER_IMAGE_SETS[4],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-19',
    slug: 'fast-track-sprint',
    name: 'Nike Fast Track Sprint',
    tagline: 'Plaque rigide et zéro déperdition sur 200m et 400m.',
    category: 'Running',
    usage: 'piste',
    gender: 'unisexe',
    price: 61000,
    isNew: true,
    isPopular: false,
    rating: 4.8,
    reviewsCount: 11,
    descriptionShort: 'Châssis haute tension pour virages serrés et relances puissantes.',
    descriptionLong: {
      benefits: ['Maintien du pied en virage sans torsion.', 'Matériaux ultralégers.'],
      technical: 'Plaque composite carbone-nylon.',
      usageNote: 'Athlétisme compétition piste.'
    },
    specs: { drop: '0 mm', weight: '145 g', cushioning: 'Compétition', surface: 'Piste synthétique', distance: '200 m à 400 m' },
    sizes: [{ size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
    colors: [{ name: 'Total Orange Vif', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[5][0] }],
    gallery: SNEAKER_IMAGE_SETS[5],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-20',
    slug: 'mud-claw-trail',
    name: 'Nike Mud Claw Trail',
    tagline: 'Pénétration maximale dans la boue et la terre meuble.',
    category: 'Trail',
    usage: 'trail',
    gender: 'homme',
    price: 69000,
    isNew: false,
    isPopular: false,
    rating: 4.6,
    reviewsCount: 17,
    descriptionShort: 'Crampons agressifs taillés pour les parcours boueux d’hivernage.',
    descriptionLong: {
      benefits: ['Débourrage automatique garanti.', 'Matériau hydrophobe.'],
      technical: 'Crampons 7mm espacés en gomme ultra-tendre.',
      usageNote: 'Cross-country et trails boueux.'
    },
    specs: { drop: '8 mm', weight: '285 g', cushioning: 'Ferme Accroche', surface: 'Boue & Forêt', distance: '10 km à 30 km' },
    sizes: [{ size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Triple Noir & Terre', hex: '#111111', image: SNEAKER_IMAGE_SETS[1][0] }],
    gallery: SNEAKER_IMAGE_SETS[1],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-21',
    slug: 'kinetic-prime-800',
    name: 'Nike Kinetic Prime 800',
    tagline: 'Le compromis parfait entre amorti long et relance rythmée.',
    category: 'Running',
    usage: 'route',
    gender: 'homme',
    price: 67000,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviewsCount: 26,
    descriptionShort: 'Double couche d’amorti pour enchaîner les semaines à haut kilométrage.',
    descriptionLong: {
      benefits: ['Durabilité supérieure à 1000 km.', 'Confort constant du premier au dernier kilomètre.'],
      technical: 'Mousse hybride double densité avec semelle carbone partielle.',
      usageNote: 'Préparation marathon et sorties biquotidiennes.'
    },
    specs: { drop: '8 mm', weight: '230 g', cushioning: 'Équilibré Plus', surface: 'Route', distance: '10 km à 42 km' },
    sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }, { size: 45, inStock: true }],
    colors: [{ name: 'Anthracite / Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][0] }],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-22',
    slug: 'chill-slide-recovery',
    name: 'Nike Chill Slide Recovery',
    tagline: 'Mule anatomique pour relaxation immédiate des pieds fatigués.',
    category: 'Running',
    usage: 'recuperation',
    gender: 'unisexe',
    price: 28000,
    isNew: false,
    isPopular: false,
    rating: 4.8,
    reviewsCount: 33,
    descriptionShort: 'Mousse à mémoire de forme moulée Nike Calm pour bercer la plante de vos pieds après la ligne d’arrivée.',
    descriptionLong: {
      benefits: ['Décompression des arches plantaires.', 'Séchage rapide et imperméable.'],
      technical: 'Monobloc EVA ultra-souple hypoallergénique.',
      usageNote: 'Directement après l’effort et au vestiaire.'
    },
    specs: { drop: '0 mm', weight: '120 g', cushioning: 'Max Soft', surface: 'Détente', distance: 'Récupération' },
    sizes: [{ size: 38, inStock: true }, { size: 39, inStock: true }, { size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Blanc Pur', hex: '#FFFFFF', image: SNEAKER_IMAGE_SETS[4][0] }, { name: 'Triple Noir', hex: '#111111', image: SNEAKER_IMAGE_SETS[4][1] }],
    gallery: SNEAKER_IMAGE_SETS[4],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-23',
    slug: 'pulse-endurance-365',
    name: 'Nike Pulse Endurance 365',
    tagline: 'La référence indestructible pour vos 365 jours de course.',
    category: 'Running',
    usage: 'route',
    gender: 'homme',
    price: 56000,
    isNew: false,
    isPopular: false,
    rating: 4.7,
    reviewsCount: 20,
    descriptionShort: 'Conçue pour durer saison après saison avec une empeigne renforcée et une semelle inusable.',
    descriptionLong: {
      benefits: ['Résistance exceptionnelle aux abrasions.', 'Amorti fiable par tous les temps.'],
      technical: 'Caoutchouc carbone soufflé et mesh tressé haute ténacité.',
      usageNote: 'Entraînement toute l’année.'
    },
    specs: { drop: '10 mm', weight: '265 g', cushioning: 'Protecteur', surface: 'Route', distance: '10 km à 25 km' },
    sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }, { size: 43, inStock: true }, { size: 44, inStock: true }],
    colors: [{ name: 'Noir & Total Orange', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[2][0] }],
    gallery: SNEAKER_IMAGE_SETS[2],
    reviews: [],
    faq: []
  },
  {
    id: 'prod-24',
    slug: 'aero-speed-w-elite',
    name: 'Nike Aero Speed W Elite',
    tagline: 'Formule compétition ultralégère pour coureuses exigeantes.',
    category: 'Running',
    usage: 'route',
    gender: 'femme',
    price: 89000,
    originalPrice: 99000,
    isNew: true,
    isPopular: true,
    rating: 5.0,
    reviewsCount: 42,
    descriptionShort: 'Plaque carbone profilée adaptée aux cadences de foulée élevées.',
    descriptionLong: {
      benefits: ['Restitution d’énergie instantanée.', 'Poids record sous les 175 grammes.'],
      technical: 'Plaque carbone customisée et mousse supercritique ultralégère ZoomX.',
      usageNote: 'Compétitions 10k, semi et marathon.'
    },
    specs: { drop: '8 mm', weight: '175 g', cushioning: 'Maximal Compétition', surface: 'Route', distance: '10 km à 42 km' },
    sizes: [{ size: 36, inStock: true }, { size: 37, inStock: true }, { size: 38, inStock: true }, { size: 39, inStock: true }, { size: 40, inStock: true }],
    colors: [{ name: 'Total Orange & Blanc', hex: '#FA5400', image: SNEAKER_IMAGE_SETS[0][0] }],
    gallery: SNEAKER_IMAGE_SETS[0],
    reviews: [],
    faq: []
  }
];

export const SERIES_PRODUCTS = PRODUCTS.slice(0, 6);

export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')}\u00A0FCFA`;
}
