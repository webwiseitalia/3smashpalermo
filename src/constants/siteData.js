// Dati centralizzati del sito 3 Smash Palermo

export const siteData = {
  // Informazioni aziendali
  name: '3 Smash Palermo',
  legalName: '3 Smash Palermo',
  description: 'Smash burger artigianali al Mercato San Lorenzo di Palermo. Carne fresca, cottura perfetta.',
  foundingYear: 2020,

  // URL
  url: 'https://3smashpalermo.it',

  // Contatti
  contact: {
    email: 'info@3smashpalermo.it',
    phone: '+39 333 123 4567',
    phoneFormatted: '333 123 4567',
  },

  // Indirizzo
  address: {
    street: 'Mercato San Lorenzo',
    city: 'Palermo',
    region: 'Sicilia',
    postalCode: '90133',
    country: 'IT',
    full: 'Mercato San Lorenzo, Palermo',
  },

  // Orari
  openingHours: {
    weekdays: 'Mar-Dom: 11:00-22:00',
    closed: 'Lunedì: Chiuso',
    structured: [
      { days: 'Tu-Su', hours: '11:00-22:00' },
    ],
  },

  // Social
  social: {
    instagram: 'https://instagram.com/3smashpalermo',
    instagramHandle: '@3smashpalermo',
  },

  // Coordinate
  geo: {
    latitude: 38.1157,
    longitude: 13.3623,
  },

  // Cookie
  cookieKey: '3smashpalermo-cookie-consent',

  // Privacy
  lastPolicyUpdate: '2024-01-15',
};

export default siteData;
