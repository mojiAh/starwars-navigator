import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import Planets from './pages/Planets';
import Characters from './pages/Characters';
import Starships from './pages/Starships';
import PlanetDetails from './pages/PlanetDetails';
import CharacterDetails from './pages/CharacterDetails';
import StarshipDetails from './pages/StarshipDetails';
import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/planets" replace />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:id" element={<PlanetDetails />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<StarshipDetails />} />
      </Routes>
    </Router>
  )
}

export default App
