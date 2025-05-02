export const COLORS = {
  turquoise: {
    light: '#7FDBDB',
    DEFAULT: '#05B3B6',
    dark: '#038789',
  },
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  grey: {
    light: '#E9ECEF',
    medium: '#ADB5BD',
    dark: '#495057',
  },
  black: '#212529',
};

export const TRANSITIONS = {
  default: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};

export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

export const ROOMS_DATA = [
  {
    id: 1,
    type: 'accommodation',
    name: 'Camera matrimoniala',
    description: 'Cameră confortabilă cu pat matrimonial, perfectă pentru cupluri. Include baie privată și toate facilitățile necesare pentru o ședere plăcută.',
    images: [
      '/assets/3DDD1722-2313-4D5E-A34A-F6D52B8ADFBE.jpg', 
      '/assets/B849A984-3003-4A63-9F17-3712E415B6FC.PNG',
      '/assets/IMG_1046.png'
    ],
    amenities: ['Pat Matrimonial', 'Baie Privată', 'Aer Condiționat', 'Wi-Fi Gratuit', 'TV Smart', 'Balcon']
  },
  {
    id: 2,
    type: 'accommodation',
    name: 'Camera tripla economy',
    description: 'Cameră spațioasă cu pat matrimonial și pat single, perfectă pentru familii sau grupuri mici. Oferă confort la un preț accesibil.',
    images: ['/assets/CC8C095B-DA0C-47BD-B359-EBBDD1189991.png', '/assets/IMG_1046.png'],
    amenities: ['Pat Matrimonial', 'Pat Single', 'Aer Condiționat', 'Wi-Fi Gratuit', 'TV', 'Baie Privată']
  },
  {
    id: 3,
    type: 'accommodation',
    name: 'Camera tripla superioara',
    description: 'Cameră premium cu pat matrimonial și canapea extensibilă, oferind spațiu generos și facilități superioare pentru un sejur de lux.',
    images: [
      '/assets/9ed85025-222b-47c3-aa98-e3f16d10771d.JPG',
      '/assets/IMG_1047.png',
      '/assets/2bec5277-7dcd-4830-a606-4019bd7754f5.png'
    ],
    amenities: ['Pat Matrimonial', 'Canapea Extensibilă', 'Aer Condiționat', 'Wi-Fi Gratuit', 'Smart TV', 'Balcon Mare']
  },
  {
    id: 4,
    type: 'accommodation',
    name: 'Terasă în aer liber',
    description: 'Spațiu relaxant în aer liber, perfect pentru momente de răgaz și socializare. Bucurați-vă de atmosfera plăcută și priveliștea încântătoare.',
    image: '/assets/IMG_0502 3.png',
    amenities: ['Mobilier de exterior', 'Umbrele de soare', 'Priveliște frumoasă', 'Spațiu de relaxare']
  },
  {
    id: 5,
    type: 'studio',
    name: 'Studio cu pat matrimonial si canapea extensibila',
    description: 'Studio modern și spațios cu pat matrimonial confortabil și canapea extensibilă, perfect pentru familii sau grupuri mici.',
    images: [
      '/assets/IMG_0505 3.JPG',
      '/assets/IMG_0504 3.png',
      '/assets/IMG_0508 3.png',
      '/assets/IMG_0509 3.png',
      '/assets/IMG_0506 3.png'
    ],
    amenities: ['Pat Matrimonial', 'Canapea Extensibilă', 'Bucătărie Complet Utilată', 'Aer Condiționat', 'Wi-Fi Gratuit', 'Smart TV']
  }
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    url: '/assets/3DDD1722-2313-4D5E-A34A-F6D52B8ADFBE.jpg',
    alt: 'Camera matrimonială cu design modern'
  },
  {
    id: 2,
    url: '/assets/IMG_1043.JPG',
    alt: 'Camera triplă economy'
  },
  {
    id: 3,
    url: '/assets/9ed85025-222b-47c3-aa98-e3f16d10771d.JPG',
    alt: 'Camera triplă superioară'
  },
  {
    id: 4,
    url: '/assets/IMG_0505 3.JPG',
    alt: 'Studio spațios cu pat matrimonial'
  },
  {
    id: 5,
    url: '/assets/IMG_0503 3.JPG',
    alt: 'Vedere panoramică studio'
  },
  {
    id: 6,
    url: '/assets/IMG_0494 3.JPG',
    alt: 'Facilități moderne studio'
  }
];

export const AMENITIES = [];