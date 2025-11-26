// =============================================================================
// TRIP DATA TYPES - Definer strukturen for turdata
// =============================================================================

export interface Photo {
  src: string
  alt: string
  caption?: string
}

export interface GolfCourse {
  name: string
  type: 'links' | 'parkland' | 'heathland' | 'coastal'
  par: number
  yards: number
  established?: number | string
  designer?: string
  greenfee?: string
  ranking?: string
  description: string
  distanceFromHouse?: string
  timeOfDay?: 'morning' | 'afternoon'
  teeTime?: string // e.g. "09:00" or "TBC"
  websiteUrl?: string
  photos?: Photo[]
}

export interface Activity {
  icon: string
  title: string
  description?: string
}

export interface DinnerInfo {
  chefs: string[]
  description: string
  menu?: string
}

export interface DaySchedule {
  date: string
  month: string
  dayName: string
  title: string
  subtitle: string
  color: 'amber' | 'emerald' | 'rose' | 'stone' | 'blue'
  activities: Activity[]
  dinner?: DinnerInfo
  courses?: GolfCourse[]
}

export interface Amenity {
  icon: string
  name: string
}

export interface Accommodation {
  name: string
  location: string
  airbnbUrl: string
  mapsUrl: string
  rating: number
  bedrooms: number
  bathrooms: number
  distanceFromAirport: string
  description: string
  amenities: Amenity[]
  highlights: string[]
  townDescription: string
  photos?: Photo[]
}

export interface Restaurant {
  name: string
  description: string
}

export interface TripInfo {
  dates: string
  golfers: number
  days: number
  rounds: number
}

export interface Trip {
  year: number
  title: string
  location: string
  country: string
  info: TripInfo
  accommodation: Accommodation
  schedule: DaySchedule[]
  restaurants: Restaurant[]
  isUpcoming: boolean
}
