import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="p-1" style={{ borderBottom: '1px solid #ddd' }}>
        <Link to="/planets" style={{ marginRight: 12 }}>Planets</Link>
        <Link to="/characters" style={{ marginRight: 12 }}>Characters</Link>
        <Link to="/starships">Starships</Link>
    </header>
  );
}
