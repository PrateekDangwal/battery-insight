import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AnalyzeBattery from './pages/AnalyzeBattery'
import Batteries from './pages/Batteries'
import BatteryDetails from './pages/BatteryDetails'
import AnalysisHistory from './pages/AnalysisHistory'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeBattery />} />
        <Route path="/batteries" element={<Batteries />} />
        <Route path="/batteries/:id" element={<BatteryDetails />} />
        <Route path="/history" element={<AnalysisHistory />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
