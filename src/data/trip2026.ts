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
      { icon: '🍕', name: 'Pizza-ovn' },
      { icon: '🛁', name: 'Boblebad (6 pers)' },
      { icon: '🎱', name: 'Biljard' },
      { icon: '🎯', name: 'Dart' },
      { icon: '🏓', name: 'Bordtennis' },
    ],
    highlights: [
      '8 romslige soverom med utsikt',
      'Ett soverom på bakkeplan med tilgjengelig bad',
      'Landskapsformet hage med utendørs spiseplass',
      'Oppvarmet sommerhus med biljard',
    ],
    townDescription: 'Brechin er en historisk katedralby i Angus, nordøst i Skottland. Byen har en sjarmerende middelaldersk arkitektur med Brechin Cathedral fra 1100-tallet og det unike irsk-stilte rundtårnet fra år 1000 som ble bygget for å redde munkene fra vikingene. Byen ligger mellom Dundee og Aberdeen langs A90, med gode restauranter, puber og den berømte Caledonian Railway – en veteranjernbane som kjører om sommeren. I Brechin har du et tårn bygget for å gjemme seg fra vikinger, og en viking-gravstein inne i katedralen, og en by som faktisk var under okkupasjon av vikingene.',
    // =========================================================================
    // BILDER AV HUSET - Endre src og caption etter behov
    // =========================================================================
    photos: [
      { src: '/images/home-entrance.jpg', alt: 'Airlie House', caption: 'Inngangspartiet' },
      { src: '/images/home-kitchen.jpg', alt: 'Kjøkken', caption: 'Kjøkken' },
      { src: '/images/home-dining.jpg', alt: 'Spisestue', caption: 'Spisestue' },
      { src: '/images/home-coffee.jpg', alt: 'Kaffehjørne', caption: 'Kaffehjørne' },
            { src: '/images/Home - 5.png', alt: 'Hage', caption: 'Hage / Pitching Green' },
            { src: '/images/Home - 6.png', alt: 'Jacuzzi', caption: 'Jacuzzi' },
            { src: '/images/Home - 7.jpg', alt: 'Furtebu', caption: 'Furtebu etter 36 Double Bogey' },
            { src: '/images/Home - 8.jpg', alt: 'Ute', caption: 'Ute' },
    ],
  },

  // ===========================================================================
  // PROGRAM - DAG FOR DAG
  // ===========================================================================
  schedule: [
    // =========================================================================
    // TORSDAG 27. AUGUST - ANKOMST
    // =========================================================================
    {
      date: '27',
      month: 'Aug',
      dayName: 'Torsdag',
      title: 'Ankomst',
      subtitle: 'Fly til Aberdeen • Innsjekking • Middag',
      color: 'amber',
      activities: [
        { icon: '✈️', title: 'Fly - Stavanger til Aberdeen', description: 'SK 4615 - SVG-ABZ - Avgang 1805 - Ankomst 1810' },
        { icon: '🚗', title: 'Kjøretur til Brechin (~55 minutter)', description: 'Vi blir plukket opp på flyplassen, for å høyne utfordringen fra ifjor så har jeg bestilt en Nissan Micra' },
        { icon: '🏠', title: 'Innsjekking Airlie House' },
      ],
      dinner: {
        chefs: ['Tor'],
        description: 'Enkel foodtruck-mat etter reisen',
        menu: 'Med mindre noen føler sin indre Gordon Ramsay så tar undertegnede seg av oppgaven...',
      },
    },

    // =========================================================================
    // FREDAG 28. AUGUST - MONTROSE LINKS
    // =========================================================================
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
          greenfee: '£130 - Buggy: £35 - Golfamore hverdager',
          description: 'En av verdens eldste golfbaner der golf har vært spilt siden 1562. Open Championship qualifying venue.',
          distanceFromHouse: '~25 min',
          timeOfDay: 'morning',
          teeTime: 'Flight 1: 09:08 / Flight 2: 09:16', // Endre til f.eks. "08:30" når bekreftet
          websiteUrl: 'https://montrosegolflinks.com/',
          photos: [
            { src: '/images/montrose1562---1.jpeg', alt: 'Montrose 1562', caption: 'Historisk links' },
            { src: '/images/montrose1562---2.jpeg', alt: 'Montrose 1562', caption: 'Kystlinje' },
            { src: '/images/montrose1562---3.jpeg', alt: 'Montrose 1562', caption: 'Fairway' },
          ],
        },
        {
          name: 'Montrose Broomfield Course',
          type: 'links',
          par: 66,
          yards: 4822,
          established: 1915,
          designer: 'Harry Colt',
          greenfee: '£30 - Buggy: £35 - Golfamore hverdager',
          description: 'Kortere men utfordrende linksbane. Små, vanskelige greens.',
          distanceFromHouse: '~25 min',
          timeOfDay: 'afternoon',
          teeTime: '14:30 - ish', // Endre til f.eks. "13:30" når bekreftet
          websiteUrl: 'https://montrosegolflinks.com/',
          photos: [
            { src: '/images/montrose-broomfield-1.jpg', alt: 'Broomfield', caption: 'Broomfield Course' },
            { src: '/images/montrose-broomfield-2.jpg', alt: 'Broomfield', caption: 'Utfordrende greens' },
            { src: '/images/montrose-broomfield-3.jpg', alt: 'Broomfield', caption: 'Links terreng' },
          ],
        },
      ],
      dinner: {
        chefs: ['Truls', 'Roar'],
        description: 'Meny avsløres nærmere turen!',
        menu: 'Etter 36 hull på Montrose Links fortjener vi noe spesielt. Truls or Roar disker opp.',
      },
    },

    // =========================================================================
    // LØRDAG 29. AUGUST - BRECHIN GC
    // =========================================================================
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
          greenfee: '£70 for 36 hull - Buggy: £40 for 36 hull - Ikke golfamore i helg',
          description: 'Fantastisk parklandbane midt i Angus. Hullene 10-17 er hovedsakelig James Braids verk. Berømt for noen av de beste puttingflatene i østlige Skottland. Utsikt mot Grampian-fjellene.',
          distanceFromHouse: '~5 min med bil / 30 min gange',
          timeOfDay: 'morning',
          teeTime: 'Flight 1: 10:07 / Flight 2: 10:14',
          websiteUrl: 'http://brechingolfclub.co.uk/',
          photos: [
            { src: '/images/brechin1.jpg', alt: 'Brechin GC', caption: 'Parkland perle' },
            { src: '/images/brechin2.jpg', alt: 'Brechin GC', caption: 'James Braid design' },
            { src: '/images/Brechin - 4.jpg', alt: 'Brechin GC', caption: 'James Braid design' },
                        { src: '/images/Brechin - 5.jpg', alt: 'Brechin GC', caption: 'James Braid design' },
                        { src: '/images/Brechin - 6.jpg', alt: 'Brechin GC', caption: 'James Braid design' },
          ],
        },
        {
          name: 'Brechin Golf Club (Runde 2)',
          type: 'parkland',
          par: 72,
          yards: 6096,
          description: 'Andre runde på Brechin - kanskje revansje? Kanskje scramble?',
          distanceFromHouse: '~5 min med bil / 30 min gange',
          timeOfDay: 'afternoon',
          teeTime: '*Kommer*',
          websiteUrl: 'http://brechingolfclub.co.uk/',
        },
      ],
      dinner: {
        chefs: ['Klaus', 'Tor'],
        description: 'Pizzakveld!',
        menu: 'Hjemmelaget pizza fra pizzaovnen.',
      },
    },
    // =========================================================================
    // SØNDAG 30. AUGUST - FORFAR GC & HJEMREISE
    // =========================================================================
    {
      date: '30',
      month: 'Aug',
      dayName: 'Søndag',
      title: 'Forfar GC & Hjemreise',
      subtitle: '1 runde før fly tilbake til Stavanger',
      color: 'blue',
      activities: [
        { icon: '✈️', title: 'Fly hjem til Stavanger', description: 'Kort kjøretur til Aberdeen flyplass etter runden' },
      ],
      courses: [
        {
          name: 'Forfar Golf Club',
          type: 'parkland',
          par: 69,
          yards: 6052,
          established: 1871,
          designer: 'Old Tom Morris',
          greenfee: '£45 - Ikke golfamore i helg',
          ranking: 'Første purpose-built 18-hulls bane',
          description: 'Historisk bane designet av Old Tom Morris i 1871. En av Skottlands eldste 18-hulls baner, med vakker parkland-setting og utfordrende layout.',
          distanceFromHouse: '~15 min',
          teeTime: '*Kommer*', // Endre til f.eks. "09:00" når bekreftet
          websiteUrl: 'https://www.forfargolfclub.co.uk/',
          photos: [
            { src: '/images/forfar1.jpg', alt: 'Forfar GC', caption: 'Old Tom Morris design' },
            { src: '/images/forfar2.jpg', alt: 'Forfar GC', caption: 'Parkland klassiker' },
          ],
        },
      ],
    },
  ],

  // ===========================================================================
  // RESTAURANTER I BRECHIN
  // ===========================================================================
  restaurants: [
],
  // ===========================================================================
  // KOSTNADER
  // ===========================================================================
  costs: [
    { item: 'Overnatting (Airlie House)', amount: '5 213 NOK', note: '41 700 NOK / 8 personer' },
    { item: 'Montrose Links (1562 + Broomfield)', amount: '£160', note: '+ £35 buggy' },
    { item: 'Brechin GC (36 hull)', amount: '£70', note: '+ £40 buggy' },
    { item: 'Forfar GC', amount: 'TBA', note: '' },
  ],
}
