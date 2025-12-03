import { useState, useEffect, useCallback, TouchEvent } from 'react'
import { Trip, DaySchedule, GolfCourse, Photo, Transport, Activity } from '../data/types'

interface TripPageProps {
  trip: Trip
}

export default function TripPage({ trip }: TripPageProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Collect ALL photos into a single array for navigation
  const allPhotos: Photo[] = []
  
  // Add house photos
  if (trip.accommodation.photos) {
    allPhotos.push(...trip.accommodation.photos)
  }
  
  // Add course photos
  trip.schedule.forEach(day => {
    day.courses?.forEach(course => {
      if (course.photos) {
        allPhotos.push(...course.photos)
      }
    })
  })

  // Add activity photos
  trip.schedule.forEach(day => {
    day.activities?.forEach(activity => {
      if (activity.photo) {
        allPhotos.push(activity.photo)
      }
    })
  })

  const openLightbox = useCallback((photo: Photo) => {
    const index = allPhotos.findIndex(p => p.src === photo.src)
    setLightboxIndex(index >= 0 ? index : 0)
  }, [allPhotos])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrevious = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? allPhotos.length - 1 : lightboxIndex - 1)
    }
  }, [lightboxIndex, allPhotos.length])

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === allPhotos.length - 1 ? 0 : lightboxIndex + 1)
    }
  }, [lightboxIndex, allPhotos.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, goToPrevious, goToNext, closeLightbox])

  // Touch swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext()
      else goToPrevious()
    }
    setTouchStart(null)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Toggle functions that preserve scroll position
  const toggleDay = (dayDate: string) => {
    const scrollY = window.scrollY
    setExpandedDay(expandedDay === dayDate ? null : dayDate)
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
    })
  }

  const toggleCourse = (courseName: string) => {
    const scrollY = window.scrollY
    setExpandedCourse(expandedCourse === courseName ? null : courseName)
    // Multiple restoration attempts to handle image loading and layout shifts
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY)
      })
    })
    // Fallback for slower devices/image loading
    setTimeout(() => {
      window.scrollTo(0, scrollY)
    }, 50)
  }

  const colorClasses = {
    amber: { bg: 'from-stone-700/50 to-stone-800/50', border: 'border-stone-600/30', text: 'text-amber-400' },
    emerald: { bg: 'from-emerald-900/30 to-stone-800/50', border: 'border-emerald-800/30', text: 'text-emerald-400' },
    rose: { bg: 'from-rose-900/30 to-stone-800/50', border: 'border-rose-800/30', text: 'text-rose-400' },
    blue: { bg: 'from-blue-900/30 to-stone-800/50', border: 'border-blue-800/30', text: 'text-blue-400' },
    stone: { bg: 'from-stone-700/50 to-stone-800/50', border: 'border-stone-600/30', text: 'text-stone-400' },
  }

  // Collect course photos for gallery section
  const allCoursePhotos: { course: string; photos: Photo[] }[] = []
  trip.schedule.forEach(day => {
    day.courses?.forEach(course => {
      if (course.photos && course.photos.length > 0) {
        allCoursePhotos.push({ course: course.name, photos: course.photos })
      }
    })
  })

  const currentPhoto = lightboxIndex !== null ? allPhotos[lightboxIndex] : null

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Lightbox with navigation */}
      {currentPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-stone-300 z-10 w-12 h-12 flex items-center justify-center"
            onClick={closeLightbox}
          >
            ×
          </button>

          {/* Previous button */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
            onClick={(e) => { e.stopPropagation(); goToPrevious() }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
            onClick={(e) => { e.stopPropagation(); goToNext() }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[90vh] px-16" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentPhoto.src} 
              alt={currentPhoto.alt} 
              className="max-h-[80vh] w-auto object-contain rounded-lg mx-auto"
            />
            <div className="text-center mt-4">
              {currentPhoto.caption && (
                <p className="text-stone-300">{currentPhoto.caption}</p>
              )}
              <p className="text-stone-500 text-sm mt-2">
                {lightboxIndex! + 1} / {allPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)`
        }}></div>

        <div className="relative z-10 text-center px-6">
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
            <StatBadge icon="👥" value={`${trip.info.golfers}`} label="venner" color="emerald" />
            <StatBadge icon="📅" value={`${trip.info.days}`} label="dager" color="amber" />
            <StatBadge icon="⛳" value={`${trip.info.rounds}`} label="runder" color="rose" />
          </div>

          {/* Whisky Logos */}
          <div className="mt-16 space-y-6">
            <img 
              src="/images/whiskyFront.png" 
              alt="Scottish Whisky" 
              className="h-12 md:h-16 w-auto mx-auto opacity-60"
            />
            <img 
              src="/images/whiskyBack.png" 
              alt="Scottish Whisky" 
              className="h-12 md:h-16 w-auto mx-auto opacity-60"
            />
          </div>

          <div className="mt-12 animate-bounce">
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center h-14 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-8 text-sm whitespace-nowrap">
              {['accommodation', 'schedule', 'food', 'transport', 'expenses', 'costs', 'photos'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-stone-400 hover:text-stone-200 transition-colors px-1"
                >
{id === 'accommodation' ? 'Overnatting' : id === 'schedule' ? 'Program' : id === 'photos' ? 'Bilder' : id === 'food' ? 'Mat' : id === 'transport' ? 'Transport' : id === 'expenses' ? 'Utgifter' : 'Kostnader'}
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
            <StatCard icon="🚗" value={trip.accommodation.distanceFromAirport} label="Fra Aberdeen flyplass" />
            <StatCard icon="⭐" value={trip.accommodation.rating.toString()} label="Airbnb Rating" />
            <StatCard icon="🛏️" value={trip.accommodation.bedrooms.toString()} label="Soverom" />
            <StatCard icon="🛁" value={trip.accommodation.bathrooms.toString()} label="Bad" />
          </div>

          {/* House Photos */}
          {trip.accommodation.photos && trip.accommodation.photos.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trip.accommodation.photos.map((photo, i) => (
                  <div 
                    key={i} 
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(photo)}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-sm">{photo.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  className={`bg-gradient-to-r ${colors.bg} rounded-3xl border ${colors.border} overflow-hidden`}
                >
                  {/* Day Header */}
                  <div 
                    className="p-8 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => toggleDay(day.date)}
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
                          <span className="px-3 py-1 bg-stone-700/50 text-stone-300 text-sm rounded-full capitalize">
                            {day.courses.length} {day.courses.length === 1 ? 'runde' : 'runder'}
                          </span>
                        )}
                        <svg className={`w-6 h-6 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                {/* Day Content */}
{isExpanded && (
  <div className="px-8 pb-8 border-t border-stone-700/30">
    {/* Courses - Expandable */}
    {day.courses && day.courses.length > 0 && (
      <div className="pt-6 space-y-4">
        {day.courses.map((course, i) => (
          <CourseCard 
            key={i} 
            course={course} 
            isExpanded={expandedCourse === course.name}
            onToggle={() => toggleCourse(course.name)}
            onPhotoClick={openLightbox}
            color={day.color}
          />
        ))}
      </div>
    )}

    {/* Activities */}
    {day.activities.length > 0 && (
      <div className="pt-6 space-y-4">
        {day.activities.map((activity, i) => {
          const activityKey = `${day.date}-${i}`
          const hasExpandableContent = activity.photo || activity.expandedContent
          const isActivityExpanded = expandedActivity === activityKey

          return (
            <div key={i} className="space-y-3">
              <div 
                className={`flex items-center gap-4 ${hasExpandableContent ? 'cursor-pointer hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors' : ''}`}
                onClick={() => hasExpandableContent && setExpandedActivity(isActivityExpanded ? null : activityKey)}
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-stone-300">{activity.title}</p>
                  {activity.description && <p className="text-stone-500 text-sm">{activity.description}</p>}
                </div>
                {hasExpandableContent && (
                  <svg className={`w-5 h-5 text-stone-400 transition-transform ${isActivityExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              
              {/* Expanded content */}
              {isActivityExpanded && hasExpandableContent && (
                <div className="ml-10 space-y-3 animate-in slide-in-from-top-2">
                  {activity.photo && (
                    <div 
                      className="relative max-w-sm rounded-xl overflow-hidden cursor-pointer group"
                      onClick={(e) => { e.stopPropagation(); openLightbox(activity.photo!) }}
                    >
                      <img 
                        src={activity.photo.src} 
                        alt={activity.photo.alt}
                        className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                      />
                      {activity.photo.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <span className="text-white text-sm">{activity.photo.caption}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {activity.expandedContent && (
                    <p className="text-stone-400 text-sm italic">{activity.expandedContent}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )}

    {/* Dinner */}
    {day.dinner && (
                        <div className="pt-6 mt-6 border-t border-stone-700/30">
                          <div className="flex items-center gap-4">
                            <span className="text-2xl">👨‍🍳</span>
                            <div>
                              <p className="text-stone-300 font-medium">Middag: {day.dinner.chefs.join(' & ')}</p>
                              <p className="text-stone-400">{day.dinner.description}</p>
                              {day.dinner.menu && <p className="text-stone-500 text-sm italic mt-1">{day.dinner.menu}</p>}
                            </div>
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

      {/* Photos Section */}
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

      {/* Expenses Section */}
      {trip.expenses && trip.expenses.length > 0 && (
        <section id="expenses" className="py-24 bg-stone-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-blue-400 text-sm tracking-widest uppercase">Utgifter</span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Forskuddsbetalinger</h2>
              <p className="text-stone-400 mt-4">Betalt før turen</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ExpensesDisplay expenses={trip.expenses} />
            </div>
          </div>
        </section>
      )}

{/* Costs Section */}
      {trip.costs && trip.costs.length > 0 && (
        <section id="costs" className="py-24 bg-stone-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-amber-400 text-sm tracking-widest uppercase">Økonomi</span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Kostnadsestimat</h2>
              <p className="text-stone-400 mt-4">Pris per person</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-stone-900/50 rounded-3xl border border-stone-700/50 overflow-hidden">
                {trip.costs.map((cost, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-6 ${i !== trip.costs!.length - 1 ? 'border-b border-stone-700/30' : ''}`}
                  >
                    <div>
                      <p className="text-stone-100 font-medium">{cost.item}</p>
                      {cost.note && <p className="text-stone-500 text-sm">{cost.note}</p>}
                    </div>
                    <div className="text-emerald-400 font-semibold text-lg">{cost.amount}</div>
                  </div>
                ))}
                
                {/* Total */}
                <div className="bg-emerald-900/30 p-6 border-t border-emerald-800/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-stone-100 font-medium">Totalt estimat</p>
                      <p className="text-stone-500 text-sm">Greenfees: 3 886 NOK + Hus: 5 213 NOK + Mat: ca 600 NOK</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-xl">~10 000 NOK</div>
                      <div className="text-stone-500 text-xs">vs 2024: 13 900 NOK (inkl mat&drikke)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Transport Section */}
      {trip.transport && (
        <section id="transport" className="py-24 bg-gradient-to-b from-stone-800 to-stone-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-blue-400 text-sm tracking-widest uppercase">Logistikk</span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Transport</h2>
            </div>

            {/* Cost summary */}
            {(trip.transport.totalCost || trip.transport.costPerPerson) && (
              <div className="bg-blue-900/20 rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-6 text-sm border border-blue-800/30">
                {trip.transport.totalCost && (
                  <div>
                    <span className="text-stone-400">Total: </span>
                    <span className="font-semibold text-blue-400">{trip.transport.totalCost}</span>
                  </div>
                )}
                {trip.transport.costPerPerson && (
                  <div>
                    <span className="text-stone-400">Per person: </span>
                    <span className="font-semibold text-blue-400">{trip.transport.costPerPerson}</span>
                  </div>
                )}
              </div>
            )}

            {trip.transport.notes && (
              <p className="text-stone-400 mb-8 text-center text-sm italic">{trip.transport.notes}</p>
            )}

            <TransportSchedule transport={trip.transport} />
          </div>
        </section>
      )}

      {/* Photos Section */}
      <section id="photos" className="py-24 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm tracking-widest uppercase">Galleri</span>
            <h2 className="text-4xl md:text-5xl font-light text-stone-100 mt-4">Bilder</h2>
          </div>

          {/* House Photos */}
          {trip.accommodation.photos && trip.accommodation.photos.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-light text-stone-100 mb-6">🏠 {trip.accommodation.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trip.accommodation.photos.map((photo, i) => (
                  <div 
                    key={i} 
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(photo)}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-sm">{photo.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Photos */}
          {allCoursePhotos.map((courseGroup, groupIndex) => (
            <div key={groupIndex} className="mb-16">
              <h3 className="text-2xl font-light text-stone-100 mb-6">⛳ {courseGroup.course}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {courseGroup.photos.map((photo, i) => (
                  <div 
                    key={i} 
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(photo)}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-sm">{photo.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-800 text-center">
            <p className="text-stone-600 text-sm">Arrangert med ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function StatBadge({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 backdrop-blur-sm rounded-lg">
      <span className="text-lg">{icon}</span>
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
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`block bg-gradient-to-br ${colorClasses} rounded-3xl p-8 border transition-all group`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-stone-100 mb-2">{icon} {title}</h3>
          <p className="text-stone-400">{subtitle}</p>
        </div>
        <svg className="w-6 h-6 text-stone-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

// Course Card - Expandable
function CourseCard({ 
  course, 
  isExpanded, 
  onToggle, 
  onPhotoClick,
  color 
}: { 
  course: GolfCourse
  isExpanded: boolean
  onToggle: () => void
  onPhotoClick: (photo: Photo) => void
  color: string
}) {
  const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    amber: { text: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-800/30' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-800/30' },
    rose: { text: 'text-rose-400', bg: 'bg-rose-900/20', border: 'border-rose-800/30' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-800/30' },
    stone: { text: 'text-stone-400', bg: 'bg-stone-900/20', border: 'border-stone-800/30' },
  }
  const colors = colorMap[color] || colorMap.stone

  return (
    <div className={`bg-stone-900/50 rounded-2xl border ${colors.border} overflow-hidden`}>
      {/* Course Header - Clickable */}
      <div 
        className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={onToggle}
      >
        {/* Mobile-friendly layout */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg">{course.timeOfDay === 'morning' ? '☀️' : course.timeOfDay === 'afternoon' ? '🌅' : '⛳'}</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`${colors.text} font-medium leading-tight`}>{course.name}</h4>
              <svg className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Course info row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-stone-400 text-sm mt-1">
              <span className="capitalize">{course.type}</span>
              <span>•</span>
              <span>Par {course.par}</span>
              <span>•</span>
              <span>{course.yards} yards</span>
            </div>
            
            {/* Tee Time - on its own row for visibility */}
            <div className="flex items-start gap-2 mt-2">
              <span className="text-stone-500 text-xs mt-0.5">Tee time:</span>
              <span className={`text-sm font-medium whitespace-pre-line ${course.teeTime === 'TBC' || course.teeTime?.includes('*') ? 'text-amber-400' : 'text-emerald-400'}`}>
                {course.teeTime || 'TBC'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details - Expanded */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-stone-700/30">
          <div className="pt-5 space-y-4">
            {/* Description */}
            <p className="text-stone-300">{course.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {course.established && (
                <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                  <div className={`text-lg font-light ${colors.text}`}>{course.established}</div>
                  <div className="text-stone-500 text-xs">Etablert</div>
                </div>
              )}
              {course.greenfee && (
                <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-light text-stone-100">{course.greenfee}</div>
                  <div className="text-stone-500 text-xs">Greenfee</div>
                </div>
              )}
              {course.ranking && (
                <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-light text-stone-100">{course.ranking}</div>
                  <div className="text-stone-500 text-xs">Ranking</div>
                </div>
              )}
              {course.distanceFromHouse && (
                <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-light text-stone-100">{course.distanceFromHouse}</div>
                  <div className="text-stone-500 text-xs">Fra huset</div>
                </div>
              )}
            </div>

            {/* Designer */}
            {course.designer && (
              <div className={`p-4 ${colors.bg} rounded-xl border ${colors.border}`}>
                <p className={`${colors.text} text-sm`}>
                  <span className="font-medium">🏌️ Designer:</span> {course.designer}
                </p>
              </div>
            )}

            {/* Photos */}
            {course.photos && course.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {course.photos.map((photo, i) => (
                  <div 
                    key={i}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                    onClick={(e) => { e.stopPropagation(); onPhotoClick(photo); }}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Website Link */}
            {course.websiteUrl && (
              <a 
                href={course.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${colors.text} hover:underline text-sm`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>🌐 Besøk nettsiden</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function DinnerCard({ day }: { day: DaySchedule }) {
  if (!day.dinner) return null
  
  const colorMap: Record<string, { gradient: string; border: string; text: string; icon: string }> = {
    amber: { gradient: 'from-stone-800 to-stone-700/50', border: 'border-stone-600/30', text: 'text-amber-400', icon: '🍔' },
    emerald: { gradient: 'from-emerald-900/30 to-stone-800/50', border: 'border-emerald-800/30', text: 'text-emerald-400', icon: '🍽️' },
    rose: { gradient: 'from-rose-900/30 to-stone-800/50', border: 'border-rose-800/30', text: 'text-rose-400', icon: '🍕' },
    blue: { gradient: 'from-blue-900/30 to-stone-800/50', border: 'border-blue-800/30', text: 'text-blue-400', icon: '🍽️' },
    stone: { gradient: 'from-stone-800 to-stone-700/50', border: 'border-stone-600/30', text: 'text-stone-400', icon: '🍽️' },
  }
  
  const colors = colorMap[day.color] || colorMap.stone

  return (
    <div className={`bg-gradient-to-br ${colors.gradient} rounded-3xl p-8 border ${colors.border}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-stone-900/50 rounded-xl flex items-center justify-center text-2xl">{colors.icon}</div>
<div>
  <div className="text-stone-100 font-medium">{day.dayName} kveld</div>
</div>
      </div>
      <div className="space-y-3">
        <p className="text-stone-300">{day.dinner.description}</p>
        {day.dinner.menu && <p className="text-stone-500 text-sm italic">{day.dinner.menu}</p>}
      </div>
      <div className="mt-6 pt-6 border-t border-stone-700/30">
        <div className={`flex items-center gap-2 ${colors.text}`}>
          <span>👨‍🍳</span>
          <span className="font-medium">Kokk{day.dinner.chefs.length > 1 ? 'er' : ''}: {day.dinner.chefs.join(' & ')}</span>
        </div>
      </div>
    </div>
  )
}

// Transport Schedule Component
function TransportSchedule({ transport }: { transport: Transport }) {
  const dayNames: Record<string, string> = {
    '27': 'Torsdag 27. Aug',
    '28': 'Fredag 28. Aug',
    '29': 'Lørdag 29. Aug',
    '30': 'Søndag 30. Aug',
  }

  // Group legs by date
  const legsByDate = transport.legs.reduce((acc, leg) => {
    if (!acc[leg.date]) acc[leg.date] = []
    acc[leg.date].push(leg)
    return acc
  }, {} as Record<string, typeof transport.legs>)

  return (
    <div className="space-y-8">
      {Object.entries(legsByDate).map(([date, legs]) => (
        <div key={date} className="bg-stone-800/50 rounded-2xl border border-stone-700/50 overflow-hidden">
          <div className="bg-stone-800 px-6 py-4 border-b border-stone-700/50">
            <h3 className="text-lg font-medium text-stone-100">{dayNames[date] || `Aug ${date}`}</h3>
          </div>
          
          <div className="divide-y divide-stone-700/30">
            {legs.map((leg, idx) => (
              <div key={idx} className="p-4 md:p-6">
                {/* Top row: Time and Route */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* Time badge */}
                  <div className={`
                    inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium w-fit
                    ${leg.confirmed 
                      ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/30' 
                      : 'bg-amber-900/30 text-amber-400 border border-amber-800/30'}
                  `}>
                    {leg.time}
                  </div>
                  
                  {/* Route */}
                  <div className="flex items-center gap-2 text-stone-200 flex-1 min-w-0">
                    <span className="font-medium truncate">{leg.from}</span>
                    <svg className="w-4 h-4 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="font-medium truncate">{leg.to}</span>
                  </div>

                  {/* Cost badge (if present) */}
                  {leg.cost && (
                    <div className="inline-flex items-center px-3 py-1.5 bg-blue-900/30 text-blue-400 border border-blue-800/30 rounded-lg text-sm font-medium w-fit">
                      {leg.cost}
                    </div>
                  )}
                </div>
                
                {/* Details row */}
                {(leg.provider || leg.vehicleType || leg.contact || leg.notes) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-stone-400">
                    {leg.provider && (
                      <span className="flex items-center gap-1.5">
                        <span>🏢</span> {leg.provider}
                      </span>
                    )}
                    {leg.vehicleType && (
                      <span className="flex items-center gap-1.5">
                        <span>🚐</span> {leg.vehicleType}
                      </span>
                    )}
                    {leg.contact && (
                      <span className="flex items-center gap-1.5">
                        <span>📞</span> {leg.contact}
                      </span>
                    )}
                    {leg.notes && (
                      <span className="italic text-stone-500">{leg.notes}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Expenses Display Component
function ExpensesDisplay({ expenses }: { expenses: { description: string; amount: number; paidBy: string; date?: string }[] }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const perPerson = totalExpenses / 8

  return (
    <div className="bg-stone-900/50 rounded-3xl border border-stone-700/50 overflow-hidden">
      {expenses.map((expense, index) => (
        <div 
          key={index} 
          className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-3 ${index !== expenses.length - 1 ? 'border-b border-stone-700/30' : ''}`}
        >
          <div className="flex-1">
            <p className="text-stone-100 font-medium">{expense.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-stone-400">
              <span>Betalt av: {expense.paidBy}</span>
              {expense.date && <span>{new Date(expense.date).toLocaleDateString('nb-NO')}</span>}
            </div>
          </div>
          <div className="text-blue-400 font-semibold text-lg whitespace-nowrap">{expense.amount.toLocaleString('nb-NO')} NOK</div>
        </div>
      ))}
      
      {/* Total */}
      <div className="bg-blue-900/30 p-6 border-t border-blue-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-stone-100 font-medium text-lg">Totalt betalt</p>
            <p className="text-stone-500 text-sm">Sum av alle forskuddsbetalinger</p>
          </div>
          <div className="text-right">
            <div className="text-blue-400 font-bold text-2xl">{totalExpenses.toLocaleString('nb-NO')} NOK</div>
            <div className="text-stone-400 text-sm mt-1">Per person: <span className="font-semibold text-blue-300">{perPerson.toLocaleString('nb-NO')} NOK</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
