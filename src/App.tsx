import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Planets from './pages/Planet';
import PlanetDetails from './pages/PlanetDetails';
import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/planets" replace />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:id" element={<PlanetDetails />} />
        <Route path="/characters" element={<div>Characters</div>} />
        <Route path="/characters/:id" element={<div>Character Details</div>} />
        <Route path="/starships" element={<div>Starships</div>} />
        <Route path="/starships/:id" element={<div>Starship Details</div>} />
      </Routes>
    </Router>
  )
}

export default App
