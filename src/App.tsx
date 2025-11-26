import { Routes, Route, Navigate } from 'react-router-dom'
import TripPage from './pages/TripPage'
import { trip2026 } from './data/trips'

function App() {
  return (
    <Routes>
      {/* Hovedside - viser 2026 direkte */}
      <Route path="/" element={<TripPage trip={trip2026} />} />
      <Route path="/2026" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
