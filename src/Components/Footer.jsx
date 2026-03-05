import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <img src="/Logo Greener.svg" alt="Greener logo" />
          <img src="/staylucid.gif" alt="Stay Lucid" />
        </div>

        <div className="footer-brand">
          <h2>alfajorpedia</h2>
          <p>
            Contenido del que <strong>importa.</strong>
          </p>

           <div className="footer-newsletter">
          <p>
            <strong>Recibe nuestra newsletter</strong>
          </p>
          <div className="footer-newsletter-input">
            <input type="email" placeholder="Introduce tu email" />
            <button>&gt;</button>
          </div>
        </div>
        </div>

       
      </div>

      <div className="footer-right">
        <div className="footer-col">
          <p className="footer-col-title">Menú</p>
          <a href="#">Catálogo</a>
          <a href="#">Favoritos</a>
          <a href="#">Contacto</a>
          <a href="#">Regístrate</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Información</p>
          <a href="#">Condiciones Generales</a>
          <a href="#">Aviso Legal</a>
          <a href="#">Política de Cookies</a>
          <a href="#">Política de Privacidad</a>
          <div className="footer-social">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="#111" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#111"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#111"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.988l4.26 5.632 4.746-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
