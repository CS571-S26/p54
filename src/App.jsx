import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ForecastPage from './pages/ForecastPage'
import ScenarioSimulatorPage from './pages/ScenarioSimulatorPage'
import DataUploadPage from './pages/DataUploadPage'
import { CommerceDataProvider } from './context/CommerceDataContext'

export default function App() {
  return (
    <CommerceDataProvider>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <AppNavbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/simulator" element={<ScenarioSimulatorPage />} />
            <Route path="/data" element={<DataUploadPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CommerceDataProvider>
  )
}