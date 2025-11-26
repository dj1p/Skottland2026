// =============================================================================
// GOLFTUR 2025 - SKOTTLAND
// =============================================================================
// REDIGER DENNE FILEN FOR Å OPPDATERE 2025-TUREN
// Fyll inn detaljene fra golf2025.austheim.app
// =============================================================================

import { Trip } from './types'

export const trip2025: Trip = {
  year: 2025,
  title: 'Skottland',
  location: 'Aberdeen-området', // OPPDATER MED RIKTIG LOKASJON
  country: 'Scotland',
  isUpcoming: false, // Sett til false når turen er gjennomført

  info: {
    dates: 'August 2025', // OPPDATER MED EKSAKTE DATOER
    golfers: 8,
    days: 4,
    rounds: 5, // OPPDATER
  },

  // ===========================================================================
  // OVERNATTING - OPPDATER MED 2025-DATA
  // ===========================================================================
  accommodation: {
    name: 'TBD', // OPPDATER
    location: 'Aberdeen-området, Skottland',
    airbnbUrl: '', // OPPDATER
    mapsUrl: '', // OPPDATER
    rating: 0,
    bedrooms: 8,
    bathrooms: 3,
    distanceFromAirport: 'TBD',
    description: 'Legg til beskrivelse her.',
    amenities: [
      { icon: '🏠', name: 'TBD' },
    ],
    highlights: [],
    townDescription: 'Legg til beskrivelse av byen her.',
  },

  // ===========================================================================
  // PROGRAM - DAG FOR DAG - OPPDATER MED 2025-DATA
  // ===========================================================================
  schedule: [
    {
      date: 'XX',
      month: 'Aug',
      dayName: 'Torsdag',
      title: 'Ankomst',
      subtitle: 'Fly til Aberdeen',
      color: 'amber',
      activities: [
        { icon: '✈️', title: 'Fly fra Stavanger til Aberdeen' },
      ],
    },
    {
      date: 'XX',
      month: 'Aug',
      dayName: 'Fredag',
      title: 'Golf Dag 1',
      subtitle: 'TBD',
      color: 'emerald',
      activities: [],
      courses: [],
    },
    {
      date: 'XX',
      month: 'Aug',
      dayName: 'Lørdag',
      title: 'Golf Dag 2',
      subtitle: 'TBD',
      color: 'rose',
      activities: [],
      courses: [],
    },
    {
      date: 'XX',
      month: 'Aug',
      dayName: 'Søndag',
      title: 'Golf & Hjemreise',
      subtitle: 'TBD',
      color: 'blue',
      activities: [],
      courses: [],
    },
  ],

  restaurants: [],
}
