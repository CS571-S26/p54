import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ForecastPage from './pages/ForecastPage'
import ScenarioSimulatorPage from './pages/ScenarioSimulatorPage'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AppNavbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/simulator" element={<ScenarioSimulatorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}