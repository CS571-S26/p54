import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import HomePage from './pages/HomePage'
import ForecastPage from './pages/ForecastPage'

export default function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Routes>
    </div>
  )
}