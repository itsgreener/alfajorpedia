import "./MobileFooter.css";

function MobileFooter() {
  return (
    <footer className="mobile-footer">
      <a href="/" className="mobile-footer-item">
        <img src="/vector.svg"/>
        <span className="mobile-footer-label">EXPERIENCIAS</span>
      </a>

      <a href="/" className="mobile-footer-item">
       <img src="/cor.svg"/>
        <span className="mobile-footer-label">FAVORITOS</span>
      </a>

      <a href="/" className="mobile-footer-item">
        <img src="/buscar.svg"/>
        <span className="mobile-footer-label">BUSCAR</span>
      </a>

      <a href="/" className="mobile-footer-logo-link">
        <img
          src="/logoAlfajorpedia.svg"
          alt="Alfajorpedia"
          className="mobile-footer-logo"
        />
      </a>
    </footer>
  );
}

export default MobileFooter;