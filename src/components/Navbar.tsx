import { NavLink } from 'react-router-dom';

export function Navbar() {
  const link =
    "px-2 py-1 rounded hover:bg-gray-100 hover:text-gray-700";
  const active = "text-yellow-600";

  return (
    <header className="flex items-center gap-3 p-2 border-b border-gray-200">
      <NavLink to="/planets" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
        Planets
      </NavLink>
      <NavLink to="/characters" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
        Characters
      </NavLink>
      <NavLink to="/starships" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
        Starships
      </NavLink>
    </header>
  );
}






