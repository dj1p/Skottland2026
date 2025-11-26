import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TripPage from './pages/TripPage'
import { trips, getLatestTrip } from './data/trips'

function App() {
  const latestTrip = getLatestTrip()
  
  return (
    <Routes>
      {/* Hovedside - viser alle turer */}
      <Route path="/" element={<HomePage />} />
      
      {/* Individuelle turer */}
      {trips.map((trip) => (
        <Route
          key={trip.year}
          path={`/${trip.year}`}
          element={<TripPage trip={trip} />}
        />
      ))}
      
      {/* Redirect ukjente paths til forsiden */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
