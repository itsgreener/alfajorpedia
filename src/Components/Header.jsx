import "./Header.css";
import { useState } from "react";

function Header() {
 const [menuOpen, setMenuOpen] = useState(false);

  function handleClick() {
    setMenuOpen(!menuOpen);
  }

  return (
     <nav>
  <span className="nav-brand">alfajorpedia</span>
  <span className="nav-tagline">El universo del alfajor en un solo lugar.</span>

  <div className="nav-right">
     <button className="nav-menu-btn" onClick={handleClick} aria-label="Menú">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

   {menuOpen && (
          <div className="dropdown">
            <a href="#">Catálogo</a>
            <a href="#">Favoritos</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header