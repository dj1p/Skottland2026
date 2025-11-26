// =============================================================================
// ALLE GOLFTURER
// =============================================================================
// Legg til nye turer her ved å:
// 1. Kopier trip2026.ts og gi den nytt navn (f.eks. trip2027.ts)
// 2. Oppdater innholdet
// 3. Importer og legg til i trips-arrayet under
// =============================================================================

import { Trip } from './types'
import { trip2025 } from './trip2025'
import { trip2026 } from './trip2026'

// Sorter turene med nyeste først
export const trips: Trip[] = [
  trip2026,
  trip2025,
].sort((a, b) => b.year - a.year)

// Eksporter individuelle turer for direkte tilgang
export { trip2025, trip2026 }

// Hjelpefunksjoner
export const getTrip = (year: number): Trip | undefined => {
  return trips.find(trip => trip.year === year)
}

export const getUpcomingTrips = (): Trip[] => {
  return trips.filter(trip => trip.isUpcoming)
}

export const getPastTrips = (): Trip[] => {
  return trips.filter(trip => !trip.isUpcoming)
}

export const getLatestTrip = (): Trip => {
  return trips[0]
}
