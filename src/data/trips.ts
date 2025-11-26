// =============================================================================
// ALLE GOLFTURER
// =============================================================================

import { Trip } from './types'
import { trip2026 } from './trip2026'

export const trips: Trip[] = [trip2026]

export { trip2026 }

export const getTrip = (year: number): Trip | undefined => {
  return trips.find(trip => trip.year === year)
}

export const getLatestTrip = (): Trip => {
  return trip2026
}
