import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "../Hooks/useBreakpoint";
import Footer from "../Components/General/Footer";
import MobileFooter from "../Components/General/MobileFooter";
import Header from "../Components/General/Header";
import "./Privacy.css";

function Privacy() {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      {!isMobile && (
        <Header
          onFavoriteClick={() => navigate("/")}
          onSubscribeClick={() => navigate("/")}
        />
      )}
      <main className="legal-main">
        <section id="s1" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">01</span>
            <h2 className="legal-section__title">Información general</h2>
          </div>
          <div className="legal-section__body">
            <p>
              En cumplimiento con el deber de información establecido en la
              normativa vigente, se informa que el presente sitio web, accesible
              a través de la URL{" "}
              <a
                href="http://www.alfajorpedia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.alfajorpedia.com
              </a>{" "}
              (en adelante, el <em>"Sitio Web"</em>), es titularidad de:
            </p>
            <div className="legal-infobox">
              <span className="legal-infobox__label">Titular</span>
              <span className="legal-infobox__value">
                XAGA CREATIVIDAD INTERACTIVA, S.A. · CIF: A64652639
              </span>
            </div>
            <p>
              El acceso y uso del Sitio Web atribuye la condición de usuario (en
              adelante, el <em>"Usuario"</em>) e implica la aceptación plena y
              sin reservas de las presentes Condiciones Generales de Uso.
            </p>
          </div>
        </section>

        <section id="s2" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">02</span>
            <h2 className="legal-section__title">Objeto</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El Sitio Web tiene como finalidad ofrecer contenido informativo y
              editorial relacionado con alfajores, incluyendo, entre otros,
              descripciones de productos, marcas, valoraciones, recopilaciones y
              posibles rankings.
            </p>
            <p>
              El contenido publicado tiene carácter meramente informativo,
              divulgativo y/o de opinión.
            </p>
          </div>
        </section>

        <section id="s3" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">03</span>
            <h2 className="legal-section__title">
              Condiciones de acceso y uso
            </h2>
          </div>
          <div className="legal-section__body">
            <p>
              El acceso al Sitio Web es gratuito, salvo en lo relativo al coste
              de la conexión a través de la red de telecomunicaciones
              suministrada por el proveedor de acceso contratado por el Usuario.
            </p>
            <p>
              El Usuario se compromete a utilizar el Sitio Web, sus contenidos y
              servicios de conformidad con la ley, las presentes condiciones, la
              moral, las buenas costumbres y el orden público.
            </p>
            <p>Queda expresamente prohibido:</p>
            <ul className="legal-list">
              <li className="legal-list__item">
                Utilizar el Sitio Web con fines ilícitos o lesivos.
              </li>
              <li className="legal-list__item">
                Provocar daños en los sistemas físicos o lógicos del titular o
                de terceros.
              </li>
              <li className="legal-list__item">
                Introducir o difundir virus informáticos o cualquier otro
                sistema susceptible de causar daños.
              </li>
            </ul>
          </div>
        </section>

        <section id="s4" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">04</span>
            <h2 className="legal-section__title">Registro de usuarios</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El Sitio Web puede requerir el registro del Usuario para acceder a
              determinadas funcionalidades (como guardar favoritos).
            </p>
            <p>
              El Usuario se compromete a proporcionar información veraz y
              actualizada, así como a mantener la confidencialidad de sus
              credenciales de acceso.
            </p>
            <p>
              El titular del Sitio Web no se responsabiliza del uso indebido de
              las cuentas por parte de terceros.
            </p>
          </div>
        </section>

        <section id="s5" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">05</span>
            <h2 className="legal-section__title">
              Propiedad intelectual e industrial
            </h2>
          </div>
          <div className="legal-section__body">
            <p>
              Todos los contenidos del Sitio Web (textos, imágenes, diseños,
              estructura, código fuente, etc.) son titularidad del titular del
              Sitio Web o de terceros que han autorizado su uso, y están
              protegidos por la normativa de propiedad intelectual e industrial.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, transformación o
              comunicación pública de dichos contenidos sin autorización
              expresa.
            </p>
            <p>
              Las marcas, nombres comerciales y signos distintivos de terceros
              que puedan aparecer en el Sitio Web pertenecen a sus respectivos
              titulares y se utilizan únicamente con fines informativos.
            </p>
          </div>
        </section>

        <section id="s6" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">06</span>
            <h2 className="legal-section__title">Responsabilidad</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El titular del Sitio Web no garantiza la exactitud, integridad o
              actualidad de los contenidos.
            </p>
            <p>
              El contenido puede incluir opiniones, valoraciones o
              interpretaciones, que no deben considerarse como hechos objetivos
              ni como recomendaciones de consumo.
            </p>
            <p>El titular no se hace responsable de:</p>
            <ul className="legal-list">
              <li className="legal-list__item">
                Errores u omisiones en los contenidos.
              </li>
              <li className="legal-list__item">
                Decisiones tomadas por el Usuario basadas en la información del
                Sitio Web.
              </li>
              <li className="legal-list__item">
                Daños derivados del uso del Sitio Web.
              </li>
            </ul>
            <p>
              Asimismo, el titular se reserva el derecho de modificar los
              contenidos en cualquier momento sin previo aviso.
            </p>
          </div>
        </section>

        <section id="s7" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">07</span>
            <h2 className="legal-section__title">Enlaces externos</h2>
          </div>
          <div className="legal-section__body">
            <p>El Sitio Web puede contener enlaces a páginas de terceros.</p>
            <p>
              El titular no se responsabiliza del contenido, políticas o
              prácticas de dichos sitios externos.
            </p>
          </div>
        </section>

        <section id="s8" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">08</span>
            <h2 className="legal-section__title">Protección de datos</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El tratamiento de los datos personales del Usuario se regirá por
              lo dispuesto en la correspondiente Política de Privacidad.
            </p>
          </div>
        </section>

        <section id="s9" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">09</span>
            <h2 className="legal-section__title">Uso de cookies</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El Sitio Web utiliza cookies propias y/o de terceros con fines
              técnicos y de análisis. El Usuario puede consultar más información
              en la Política de Cookies.
            </p>
          </div>
        </section>

        <section id="s10" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">10</span>
            <h2 className="legal-section__title">Modificaciones</h2>
          </div>
          <div className="legal-section__body">
            <p>
              El titular se reserva el derecho de modificar en cualquier momento
              las presentes condiciones, siendo debidamente publicadas en el
              Sitio Web.
            </p>
          </div>
        </section>

        <section id="s11" className="legal-section">
          <div className="legal-section__header">
            <span className="legal-section__num">11</span>
            <h2 className="legal-section__title">
              Legislación aplicable y jurisdicción
            </h2>
          </div>
          <div className="legal-section__body">
            <p>
              Las presentes condiciones se rigen por la legislación española.
            </p>
            <p>
              Para la resolución de cualquier conflicto que pudiera derivarse
              del acceso o uso del Sitio Web, las partes se someten a los
              juzgados y tribunales que correspondan conforme a la normativa
              aplicable.
            </p>
          </div>
        </section>
      </main>
      {isMobile ? (
        <MobileFooter />
      ) : (
        <Footer
          onFavoriteClick={() => navigate("/")}
          onSubscribeClick={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default Privacy;
