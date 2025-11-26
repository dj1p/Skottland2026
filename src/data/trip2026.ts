// =============================================================================
// GOLFTUR 2026 - BRECHIN, SKOTTLAND
// =============================================================================
// REDIGER DENNE FILEN FOR Å OPPDATERE 2026-TUREN
// =============================================================================

import { Trip } from './types'

export const trip2026: Trip = {
  year: 2026,
  title: 'Skottland',
  location: 'Brechin, Angus',
  country: 'Scotland',
  isUpcoming: true,

  info: {
    dates: '27. – 30. August',
    golfers: 8,
    days: 4,
    rounds: 5,
  },

  // ===========================================================================
  // OVERNATTING
  // ===========================================================================
  accommodation: {
    name: 'Airlie House',
    location: 'Brechin, Angus, Skottland',
    airbnbUrl: 'https://www.airbnb.com/rooms/49733088',
    mapsUrl: 'https://maps.app.goo.gl/7M289TvXT8qfkSL89',
    rating: 4.97,
    bedrooms: 8,
    bathrooms: 3,
    distanceFromAirport: '55 min',
    description: 'Airlie House er et fantastisk familiehus med muromgitt hage, kun 20 minutter fra Skottlands fineste strender. Perfekt for større grupper med tilgang til naturskjønne utendørsaktiviteter og førsteklasses golfbaner.',
    amenities: [
      { icon: '🔥', name: 'Vedovn' },
      { icon: '🎬', name: 'Kino/TV-rom' },
      { icon: '🍕', name: 'Ooni Pizza-ovn' },
      { icon: '🛁', name: 'Boblebad (6 pers)' },
      { icon: '🎱', name: 'Biljard' },
      { icon: '🎯', name: 'Dart' },
      { icon: '🏓', name: 'Bordtennis' },
    ],
    highlights: [
      '8 romslige soverom med vakker utsikt',
      'Ett soverom på bakkeplan med tilgjengelig bad',
      'Landskapsformet hage med utendørs spiseplass',
      'Oppvarmet sommerhus med biljard',
    ],
    townDescription: 'Brechin er en historisk katedralby i Angus, nordøst i Skottland. Byen har en sjarmerende middelaldersk arkitektur med Brechin Cathedral fra 1100-tallet og det unike irsk-stilte rundtårnet fra år 1000. Byen ligger mellom Dundee og Aberdeen langs A90, med gode restauranter, puber og den berømte Caledonian Railway – en veteranjernbane som kjører om sommeren.',
  },

  // ===========================================================================
  // PROGRAM - DAG FOR DAG
  // ===========================================================================
  schedule: [
    // TORSDAG 27. AUGUST
    {
      date: '27',
      month: 'Aug',
      dayName: 'Torsdag',
      title: 'Ankomst',
      subtitle: 'Fly til Aberdeen • Innsjekking • Middag',
      color: 'amber',
      activities: [
        { icon: '✈️', title: 'Fly fra Stavanger til Aberdeen', description: 'SK 4615 - SVG-ABZ - Avgang 1805 - Ankomst 1810' },
        { icon: '🚗', title: 'Kjør til Brechin (~55 minutter)', description: 'Vi blir plukket opp på flyplassen, for å høyne utfordringen fra ifjor så har jeg bestilt en Nissan Micra' },
        { icon: '🏠', title: 'Innsjekking Airlie House' },
      ],
      dinner: {
        chefs: ['Tor'],
        description: 'Enkel foodtruck-mat etter reisen',
        menu: 'Med mindre noen føler sin indre Gordon Ramsay...',
      },
    },

    // FREDAG 28. AUGUST
    {
      date: '28',
      month: 'Aug',
      dayName: 'Fredag',
      title: 'Montrose Links',
      subtitle: '2 runder på verdens 5. eldste golfbane',
      color: 'emerald',
      activities: [],
      courses: [
        {
          name: 'Montrose 1562 Course',
          type: 'links',
          par: 71,
          yards: 6585,
          established: 1562,
          designer: 'Old Tom Morris, Willie Park Jr., Harry Colt',
          ranking: '#43 Scotland',
          greenfee: '£130 - Buggy: £35',
          description: 'En av verdens eldste golfbaner der golf har vært spilt siden 1562. Open Championship qualifying venue.',
          distanceFromHouse: '~25 min',
          timeOfDay: 'morning',
        },
        {
          name: 'Montrose Broomfield Course',
          type: 'links',
          par: 66,
          yards: 4822,
          established: 1915,
          designer: 'Harry Colt',
          greenfee: '£30 - Buggy: £35',
          description: 'Kortere men utfordrende linksbane. Små, vanskelige greens.',
          distanceFromHouse: '~25 min',
          timeOfDay: 'afternoon',
        },
      ],
      dinner: {
        chefs: ['Truls', 'Roar'],
        description: 'Meny avsløres nærmere turen!',
        menu: 'Etter 36 hull på Montrose Links fortjener vi noe spesielt.',
      },
    },

    // LØRDAG 29. AUGUST
    {
      date: '29',
      month: 'Aug',
      dayName: 'Lørdag',
      title: 'Brechin GC',
      subtitle: '2 runder • James Braid design fra 1926',
      color: 'rose',
      activities: [],
      courses: [
        {
          name: 'Brechin Golf Club',
          type: 'parkland',
          par: 72,
          yards: 6096,
          established: 1893,
          designer: 'James Braid (1926)',
          greenfee: '£70 for 36 hull - Buggy: £40 for 36 hull',
          description: 'Fantastisk parklandbane midt i Angus. Hullene 10-17 er hovedsakelig James Braids verk. Berømt for noen av de beste puttingflatene i østlige Skottland. Utsikt mot Grampian-fjellene.',
          distanceFromHouse: '~5 min',
        },
      ],
      dinner: {
        chefs: ['Klaus', 'Tor'],
        description: 'Pizza-kveld!',
        menu: 'Hjemmelaget pizza fra Ooni Karu 16 pizza-ovnen.',
      },
    },

    // SØNDAG 30. AUGUST
    {
      date: '30',
      month: 'Aug',
      dayName: 'Søndag',
      title: 'Newmachar & Hjemreise',
      subtitle: '1 runde før fly tilbake til Stavanger',
      color: 'blue',
      activities: [
        { icon: '✈️', title: 'Fly hjem til Stavanger', description: 'Kort kjøretur til Aberdeen Airport etter runden' },
      ],
      courses: [
        {
          name: 'Newmachar GC – Hawkshill Course',
          type: 'heathland',
          par: 72,
          yards: 6573,
          established: 1990,
          designer: 'Dave Thomas',
          greenfee: '£60-80',
          ranking: 'SSS 74',
          description: 'Championship-bane designet av Dave Thomas. Sølvbjørk og skotsk furu langs smale fairways. Vannhinder på 7 hull gjør dette til en av de tøffeste testene i området. Har arrangert European Tour og Challenge Tour.',
          distanceFromHouse: '~10 min fra Aberdeen Airport',
        },
      ],
    },
  ],

  // ===========================================================================
  // RESTAURANTER I BRECHIN
  // ===========================================================================
  restaurants: [
    { name: 'The Hickory Restaurant', description: 'På Brechin Golf Club' },
    { name: 'The Stables Lounge', description: 'Pub med god mat' },
    { name: 'Shimla Indian Restaurant', description: 'Indisk kjøkken' },
    { name: 'City Royal Bar', description: 'Tradisjonell pub' },
  ],
}
