import "./Footer.css";

function Footer({ onSubscribeClick, onFavoriteClick }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-logo">
          <img src="/logoGreener.gif" alt="Logo Greener" />
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-brand-bold">Alfajorpedia.</span>
            <span className="footer-brand-light">
              {" "}
              Contenido del que importa.
            </span>
          </div>

          <div className="footer-newsletter">
            <p>Recibe nuestra newsletter</p>

            <div className="footer-newsletter-input">
              <input type="email" placeholder="Introduce tu email" />
              <button type="button">&gt;</button>
            </div>
          </div>

          <div className="footer-social">
              <a
                href="https://www.instagram.com/itsgreenerhere/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--white)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="var(--white)" />
                </svg>
              </a>
            
              <a
                href="https://www.tiktok.com/@itsgreenernow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="var(--white)"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>

              <a
                href="https://x.com/itsgreenernow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="var(--white)"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.988l4.26 5.632 4.746-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-col">
            <p className="footer-col-title">Menú</p>
            <a href="#catalog">Catálogo</a>

            <button className="footer-link-btn" onClick={onFavoriteClick}>
              Favoritos
            </button>

            <a href="#contact">Contacto</a>

            <button className="footer-link-btn" onClick={onSubscribeClick}>
              Regístrate
            </button>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Información</p>
            <a href="#terms">Condiciones Generales</a>
            <a href="#legal">Aviso Legal</a>
            <a href="#cookies">Política de Cookies</a>
            <a href="#privacy">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
