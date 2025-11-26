import { Link } from 'react-router-dom'
import { trips, getUpcomingTrips, getPastTrips } from '../data/trips'

export default function HomePage() {
  const upcomingTrips = getUpcomingTrips()
  const pastTrips = getPastTrips()

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Hero */}
      <header className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)`
        }}></div>

        <div className="relative z-10 text-center px-6">
          <div className="text-6xl mb-6">🏌️</div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
            <span className="block text-stone-300">Skottland 2026</span>
          </h1>
          <p className="text-xl text-stone-400 mt-4 font-light">
            27. Aug - 30. Aug 2026
          </p>
        </div>
      </header>

      {/* Upcoming Trips */}
      {upcomingTrips.length > 0 && (
        <section className="py-16 bg-stone-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-sm tracking-widest uppercase text-emerald-400 mb-8">Kommende turer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.year} trip={trip} isUpcoming />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Trips */}
      {pastTrips.length > 0 && (
        <section className="py-16 bg-stone-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-sm tracking-widest uppercase text-stone-500 mb-8">Tidligere turer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.map((trip) => (
                <TripCard key={trip.year} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Footer */}
      <footer className="py-8 bg-stone-950 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-stone-600 text-sm">
            Arrangert med ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}

// Trip Card Component
import { Trip } from '../data/types'

function TripCard({ trip, isUpcoming = false }: { trip: Trip; isUpcoming?: boolean }) {
  const colorMap = {
    emerald: 'from-emerald-900/50 to-stone-800 border-emerald-800/50 hover:border-emerald-600/50',
    amber: 'from-amber-900/50 to-stone-800 border-amber-800/50 hover:border-amber-600/50',
    rose: 'from-rose-900/50 to-stone-800 border-rose-800/50 hover:border-rose-600/50',
    stone: 'from-stone-800 to-stone-700 border-stone-700 hover:border-stone-600',
  }

  const colors = isUpcoming ? colorMap.emerald : colorMap.stone

  return (
    <Link
      to={`/${trip.year}`}
      className={`block bg-gradient-to-br ${colors} rounded-2xl p-6 border transition-all group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-4xl font-light text-stone-100">{trip.year}</div>
          <div className="text-stone-400">{trip.title}</div>
        </div>
        {isUpcoming && (
          <span className="px-2 py-1 bg-emerald-800/50 text-emerald-300 text-xs rounded-full">
            Kommende
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm text-stone-400">
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{trip.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{trip.info.dates}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⛳</span>
          <span>{trip.info.rounds} runder</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-700/50 flex items-center justify-between">
        <span className="text-stone-500 text-sm">{trip.info.golfers} golfere</span>
        <span className="text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">
          Se detaljer →
        </span>
      </div>
    </Link>
  )
}
