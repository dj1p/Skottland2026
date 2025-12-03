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

export interface Expense {
  description: string;
  amount: number;
  paidBy: string;
  date?: string;
}

export interface Activity {
  icon: string
  title: string
  description?: string
  photo?: Photo              // Optional photo for expandable content
  expandedContent?: string   // Optional expanded description/joke
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
  costs?: { item: string; amount: string; note?: string }[]
  expenses?: Expense[]
  isUpcoming: boolean
  transport?: Transport
}

export interface TransportLeg {
  date: string;           // e.g., "27" for August 27
  time: string;           // e.g., "14:30"
  from: string;           // e.g., "Aberdeen Airport"
  to: string;             // e.g., "Airlie House, Brechin"
  provider?: string;      // e.g., "VIP Taxis" or "Black's of Brechin"
  contact?: string;       // Phone number or booking ref
  vehicleType?: string;   // e.g., "8-seater minibus", "16-seater coach"
  cost?: string;          // e.g., "£120" or "£15 per person"
  notes?: string;         // Additional notes
  confirmed: boolean;     // Shows green/yellow status like tee times
}

export interface Transport {
  legs: TransportLeg[];
  totalCost?: string;     // e.g., "£480" - total for all transport
  costPerPerson?: string; // e.g., "£60" - split between 8
  notes?: string;         // General transport notes
}
