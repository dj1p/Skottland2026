import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trip, DaySchedule, GolfCourse } from '../data/types'

interface TripPageProps {
  trip: Trip
}

export default function TripPage({ trip }: TripPageProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const colorClasses = {
    amber: { bg: 'from-stone-700/50 to-stone-800/50', border: 'border-stone-600/30', hover: 'hover:border-amber-500/30', text: 'text-amber-400', dinnerBorder: 'border-stone-600/30' },
    emerald: { bg: 'from-emerald-900/30 to-stone-800/50', border: 'border-emerald-800/30', hover: 'hover:border-emerald-500/30', text: 'text-emerald-400', dinnerBorder: 'border-emerald-800/30' },
    rose: { bg: 'from-rose-900/30 to-stone-800/50', border: 'border-rose-800/30', hover: 'hover:border-rose-500/30', text: 'text-rose-400', dinnerBorder: 'border-rose-800/30' },
    blue: { bg: 'from-blue-900/30 to-stone-800/50', border: 'border-blue-800/30', hover: 'hover:border-blue-500/30', text: 'text-blue-400', dinnerBorder: 'border-blue-800/30' },
    stone: { bg: 'from-stone-700/50 to-stone-800/50', border: 'border-stone-600/30', hover: 'hover:border-stone-500/30', text: 'text-stone-400', dinnerBorder: 'border-stone-600/30' },
  }

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)`
        }}></div>

        <div className="relative z-10 text-center px-6">
          <Link to="/" className="inline-block mb-6 px-4 py-2 bg-stone-800/50 backdrop-blur-sm rounded-full text-stone-400 text-sm hover:text-stone-200 transition-colors">
            ← Alle turer
          </Link>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-emerald-800/50 backdrop-blur-sm rounded-full text-emerald-300 text-sm tracking-widest uppercase">
              Årlig Golftur
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">
            <span className="block text-stone-300">{trip.title}</span>
            <span className="block text-5xl md:text-7xl mt-2 gradient-text font-medium">
              {trip.year}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-400 mt-8 font-light tracking-wide">
            {trip.info.dates} • {trip.location}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <StatBadge icon="👥" value={`${trip.info.golfers}`} label="golfere" color="emerald" />
            <StatBadge icon="📅" value={`${trip.info.days}`} label="dager" color="amber" />
            <StatBadge icon="⛳" value={`${trip.info.rounds}`} label="runder" color="rose" />
          </div>

          <div className="mt-16 animate-bounce">
            <button onClick={() => scrollToSection('accommodation')} className="text-stone-500 hover:text-stone-300 transition-colors">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-900/98 shadow-lg' : 'bg-stone-900/95'} backdrop-blur-md border-b border-stone-800`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-emerald-400 font-medium tracking-wide hover:text-emerald-300 transition-colors">
              🏌️ {trip.year}
            </Link>
            <div className="flex gap-6 text-sm">
              {['accommodation', 'schedule', 'courses', 'food'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-stone-400 hover:text-stone-200 transition-colors capitalize"
                >
                  {id === 'accommodation' ? 'Overnatting' : id === 'schedule' ? 'Program' : id === 'courses' ? 'Golfbaner' : 'Mat'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Accommodation Section */}
      <section id="accommodation" className="py-24 bg-gradient-to-b from-stone-900 to-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm tracking-widest uppercase">Vår Base</span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">{trip.accommodation.name}</h2>
            <p className="text-stone-400 mt-4 text-lg">{trip.accommodation.location}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon="🚗" value={trip.accommodation.distanceFromAirport} label="Fra Aberdeen Airport" />
            <StatCard icon="⭐" value={trip.accommodation.rating.toString()} label="Airbnb Rating" />
            <StatCard icon="🛏️" value={trip.accommodation.bedrooms.toString()} label="Soverom" />
            <StatCard icon="🛁" value={trip.accommodation.bathrooms.toString()} label="Bad" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-900/30 to-stone-800/50 rounded-3xl p-8 border border-emerald-800/30">
                <h3 className="text-xl font-medium text-emerald-400 mb-4">Om Huset</h3>
                <p className="text-stone-300 leading-relaxed">{trip.accommodation.description}</p>
              </div>

              <div className="bg-stone-800/50 rounded-3xl p-8 border border-stone-700/50">
                <h3 className="text-xl font-medium text-amber-400 mb-4">Fasiliteter</h3>
                <div className="grid grid-cols-2 gap-4">
                  {trip.accommodation.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-stone-300">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ExternalLink href={trip.accommodation.mapsUrl} icon="📍" title={trip.location.split(',')[0]} subtitle="Se lokasjon på Google Maps" color="emerald" />
              <ExternalLink href={trip.accommodation.airbnbUrl} icon="🏠" title="Se på Airbnb" subtitle="Alle bilder og detaljer" color="rose" />
              
              <div className="bg-stone-800/50 rounded-3xl p-8 border border-stone-700/50">
                <h3 className="text-xl font-medium text-emerald-400 mb-4">Om Byen</h3>
                <p className="text-stone-300 leading-relaxed">{trip.accommodation.townDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 bg-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm tracking-widest uppercase">Dag for dag</span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Program</h2>
          </div>

          <div className="space-y-6">
            {trip.schedule.map((day, index) => {
              const colors = colorClasses[day.color]
              const isExpanded = expandedDay === day.date
              
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${colors.bg} rounded-3xl p-8 border ${colors.border} cursor-pointer ${colors.hover} transition-all`}
                  onClick={() => setExpandedDay(isExpanded ? null : day.date)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-3xl font-light ${colors.text}`}>{day.date}</div>
                        <div className="text-stone-500 text-sm uppercase">{day.month}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-stone-100">{day.dayName} – {day.title}</h3>
                        <p className="text-stone-400">{day.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {day.courses && day.courses.length > 0 && (
                        <span className={`px-3 py-1 bg-${day.color}-800/50 text-${day.color}-300 text-sm rounded-full capitalize`}>
                          {day.courses[0].type}
                        </span>
                      )}
                      <svg className={`w-6 h-6 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={`mt-6 pt-6 border-t ${colors.dinnerBorder} space-y-4`}>
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <span className="text-2xl">{activity.icon}</span>
                          <div>
                            <p className="text-stone-300">{activity.title}</p>
                            {activity.description && <p className="text-stone-500 text-sm">{activity.description}</p>}
                          </div>
                        </div>
                      ))}

                      {day.courses && day.courses.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6 pt-2">
                          {day.courses.map((course, i) => (
                            <div key={i} className="bg-stone-800/50 rounded-xl p-5">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-lg">{course.timeOfDay === 'morning' ? '☀️' : course.timeOfDay === 'afternoon' ? '🌅' : '⛳'}</span>
                                <span className="text-stone-300 font-medium">{course.timeOfDay === 'morning' ? 'Morgen' : course.timeOfDay === 'afternoon' ? 'Ettermiddag' : ''}</span>
                              </div>
                              <h4 className={`${colors.text} font-medium`}>{course.name}</h4>
                              <p className="text-stone-400 text-sm mt-1">Par {course.par} • {course.yards} yards • {course.type}</p>
                              {course.distanceFromHouse && <p className="text-stone-500 text-sm">{course.distanceFromHouse}</p>}
                            </div>
                          ))}
                        </div>
                      )}

                      {day.dinner && (
                        <div className="flex items-center gap-4 pt-4">
                          <span className="text-2xl">👨‍🍳</span>
                          <div>
                            <p className="text-stone-300 font-medium">Middag: {day.dinner.chefs.join(' & ')}</p>
                            <p className="text-stone-500 text-sm">{day.dinner.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-gradient-to-b from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm tracking-widest uppercase">Våre baner</span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Golfbanene</h2>
          </div>

          <div className="space-y-8">
            {trip.schedule.filter(day => day.courses && day.courses.length > 0).map((day, dayIndex) => (
              <div key={dayIndex}>
                {day.courses!.map((course, courseIndex) => (
                  <CourseCard key={courseIndex} course={course} day={day} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section id="food" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-rose-400 text-sm tracking-widest uppercase">Kulinarisk</span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Mat & Drikke</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trip.schedule.filter(day => day.dinner).map((day, index) => (
              <DinnerCard key={index} day={day} />
            ))}
          </div>

          {trip.restaurants.length > 0 && (
            <div className="mt-12 bg-stone-800/50 rounded-3xl p-8 border border-stone-700/50">
              <h3 className="text-xl font-medium text-stone-100 mb-4">🍻 Restauranter i området</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {trip.restaurants.map((restaurant, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-amber-400">•</span>
                    <div>
                      <span className="text-stone-300">{restaurant.name}</span>
                      <span className="text-stone-500 text-sm block">{restaurant.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-950 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-medium text-stone-100">🏌️ {trip.title} {trip.year}</h3>
              <p className="text-stone-500 mt-1">{trip.info.dates} • {trip.location}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={trip.accommodation.airbnbUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors text-sm">🏠 Airbnb</a>
              <a href={trip.accommodation.mapsUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors text-sm">📍 Kart</a>
              <Link to="/" className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors text-sm">🏠 Alle turer</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-800 text-center">
            <p className="text-stone-600 text-sm">Arrangert med ❤️ for golfgutta</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper Components
function StatBadge({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  const colorClass = color === 'emerald' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : 'text-rose-400'
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 backdrop-blur-sm rounded-lg">
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
      </svg>
      <span className="text-stone-300">{value} {label}</span>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="bg-stone-800/50 rounded-2xl p-6 text-center border border-stone-700/50">
      <span className="text-3xl">{icon}</span>
      <div className="text-2xl font-semibold text-stone-100 mt-2">{value}</div>
      <div className="text-stone-500 text-sm">{label}</div>
    </div>
  )
}

function ExternalLink({ href, icon, title, subtitle, color }: { href: string; icon: string; title: string; subtitle: string; color: string }) {
  const colorClasses = color === 'emerald' 
    ? 'from-stone-800 to-stone-700 border-stone-600/50 hover:border-emerald-500/50' 
    : 'from-rose-900/30 to-stone-800/50 border-rose-800/30 hover:border-rose-500/50'
  const hoverColor = color === 'emerald' ? 'group-hover:text-emerald-400' : 'group-hover:text-rose-400'
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`block bg-gradient-to-br ${colorClasses} rounded-3xl p-8 border transition-all group`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-stone-100 mb-2">{icon} {title}</h3>
          <p className="text-stone-400">{subtitle}</p>
        </div>
        <svg className={`w-6 h-6 text-stone-400 ${hoverColor} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

function CourseCard({ course, day }: { course: GolfCourse; day: DaySchedule }) {
  const typeColors = {
    links: 'emerald',
    parkland: 'amber', 
    heathland: 'rose',
    coastal: 'blue',
  }
  const color = typeColors[course.type] || 'stone'

  return (
    <div className="bg-gradient-to-br from-stone-800 to-stone-700/50 rounded-3xl overflow-hidden border border-stone-600/30 mb-6">
      <div className="p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 bg-${color}-800/50 text-${color}-300 text-xs rounded-full uppercase tracking-wider`}>{course.type}</span>
              <span className="px-3 py-1 bg-stone-700/50 text-stone-300 text-xs rounded-full uppercase tracking-wider">{day.dayName}</span>
            </div>
            <h3 className="text-2xl font-medium text-stone-100">{course.name}</h3>
            <p className="text-stone-400">{course.distanceFromHouse}</p>
          </div>
          {course.established && (
            <div className="text-right">
              <div className={`text-${color}-400 text-3xl font-light`}>{course.established}</div>
              <div className="text-stone-500 text-sm">{typeof course.established === 'number' && course.established < 1900 ? 'Etablert' : 'Åpnet'}</div>
            </div>
          )}
        </div>

        <div className="bg-stone-900/50 rounded-2xl p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-light text-stone-100">{course.par}</div>
              <div className="text-stone-500 text-xs">PAR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-stone-100">{course.yards}</div>
              <div className="text-stone-500 text-xs">YARDS</div>
            </div>
            {course.greenfee && (
              <div className="text-center">
                <div className="text-2xl font-light text-stone-100">{course.greenfee}</div>
                <div className="text-stone-500 text-xs">Greenfee</div>
              </div>
            )}
            {course.ranking && (
              <div className="text-center">
                <div className="text-2xl font-light text-stone-100">{course.ranking}</div>
                <div className="text-stone-500 text-xs">Ranking</div>
              </div>
            )}
          </div>
          <p className="text-stone-400 text-sm">{course.description}</p>
        </div>

        {course.designer && (
          <div className={`mt-6 p-4 bg-${color}-900/20 rounded-xl border border-${color}-800/30`}>
            <p className={`text-${color}-300 text-sm`}>
              <span className="font-medium">🏌️ Designer:</span> {course.designer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function DinnerCard({ day }: { day: DaySchedule }) {
  if (!day.dinner) return null
  
  const colorMap = {
    amber: { gradient: 'from-stone-800 to-stone-700/50', border: 'border-stone-600/30', icon: '🍔', dinnerBorder: 'border-stone-700/50', text: 'text-amber-400' },
    emerald: { gradient: 'from-emerald-900/30 to-stone-800/50', border: 'border-emerald-800/30', icon: '🍽️', dinnerBorder: 'border-emerald-800/30', text: 'text-emerald-400' },
    rose: { gradient: 'from-rose-900/30 to-stone-800/50', border: 'border-rose-800/30', icon: '🍕', dinnerBorder: 'border-rose-800/30', text: 'text-rose-400' },
    blue: { gradient: 'from-blue-900/30 to-stone-800/50', border: 'border-blue-800/30', icon: '🍽️', dinnerBorder: 'border-blue-800/30', text: 'text-blue-400' },
    stone: { gradient: 'from-stone-800 to-stone-700/50', border: 'border-stone-600/30', icon: '🍽️', dinnerBorder: 'border-stone-700/50', text: 'text-stone-400' },
  }
  
  const colors = colorMap[day.color]

  return (
    <div className={`bg-gradient-to-br ${colors.gradient} rounded-3xl p-8 border ${colors.border}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-stone-900/50 rounded-xl flex items-center justify-center text-2xl">{colors.icon}</div>
        <div>
          <div className="text-stone-500 text-sm">{day.dayName} kveld</div>
          <div className="text-stone-100 font-medium">{day.dinner.description.split(' ')[0]}...</div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-stone-300">{day.dinner.description}</p>
        {day.dinner.menu && <p className="text-stone-500 text-sm italic">{day.dinner.menu}</p>}
      </div>
      <div className={`mt-6 pt-6 border-t ${colors.dinnerBorder}`}>
        <div className={`flex items-center gap-2 ${colors.text}`}>
          <span>👨‍🍳</span>
          <span className="font-medium">Kokk{day.dinner.chefs.length > 1 ? 'er' : ''}: {day.dinner.chefs.join(' & ')}</span>
        </div>
      </div>
    </div>
  )
}
