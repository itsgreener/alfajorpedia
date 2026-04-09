import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import styles from "./Footer.module.css";
import { useHeaderFooterActions } from "../../Hooks/useHeaderFooterActions";

function Footer() {
  const { onFavoriteClick, onSubscribeClick, isHome } =
    useHeaderFooterActions();
  return (
    <footer className={styles.footerBg}>
      <div className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerLeft}>
            <div className={`${styles.footerBrand} white-text`}>
              <img src="/logo-blanco.svg" /> <p>Contenido del que importa.</p>
            </div>

            <Newsletter />

            <div className={styles.footerSocial}>
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
          <div className={styles.footerRight}>
            <div className={styles.footerCol}>
              <p className="white-text">
                <strong>Menú</strong>
              </p>
              <a href={isHome ? "#catalog" : "/#catalog"}>Catálogo</a>
              <button
                className={styles.footerLinkBtn}
                onClick={onFavoriteClick}
              >
                Favoritos
              </button>
              <a href={isHome ? "#contact" : "/#contact"}>Contacto</a>
              <button
                className={styles.footerLinkBtn}
                onClick={onSubscribeClick}
              >
                Regístrate
              </button>
            </div>
            <div className={styles.footerCol}>
              <p className="white-text">
                <strong>Información</strong>
              </p>
              <Link
                to={isHome && "/privacy"}
                onClick={() => window.scrollTo(0, 0)}
              >
                Condiciones Generales
              </Link>
              <Link
                to={isHome && "/privacy"}
                onClick={() => window.scrollTo(0, 0)}
              >
                Aviso Legal
              </Link>
              <Link
                to={isHome && "/privacy"}
                onClick={() => window.scrollTo(0, 0)}
              >
                Política de Cookies
              </Link>
              <Link
                to={isHome && "/privacy"}
                onClick={() => window.scrollTo(0, 0)}
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <a
            className={styles.footerBottomLogo}
            href="https://itsgreener.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/logoGreener.gif" alt="Logo Greener" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
