import { useAlfajoresData } from "../Hooks/useAlfajores.jsx";
import { useModalStack } from "../Hooks/useModalStack.js";
import { useBreakpoint } from "../Hooks/useBreakpoint.js";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import MobileFooter from "../Components/General/MobileFooter.jsx";
import Footer from "../Components/General/Footer.jsx";
import Header from "../Components/General/Header.jsx";
import MediaCarousel from "../Components/Groups/MediaCarousel.jsx";
import AlfajorGroup from "../Components/Groups/AlfajorGroup.jsx";
import AlfajorModal from "../Components/Modals/AlfajorModal.jsx";
import EmptyModal from "../Components/Modals/EmptyModal.jsx";
import FavoriteModal from "../Components/Modals/FavoriteModal.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";
import CatalogSection from "../Components/Groups/CatalogSection.jsx";
import MobileCatalog from "../Components/General/MobileCatalog.jsx";
import "./Home.css";

function Home() {
  const { currentModal, pushModal } = useModalStack();
  const { alfajores, loading, error } = useAlfajoresData();
  const { isMobile } = useBreakpoint();

  const featuredAlfajor = alfajores[2] ?? alfajores[0];

  if (loading) {
    return <p className="text">Cargando alfajores...</p>;
  }

  if (error) {
    return <p className="text">Error: {error}</p>;
  }

  return (
    <>
      {isMobile ? (
        <MobileCatalog alfajores={alfajores} />
      ) : (
        <>
          <Header
            onFavoriteClick={() =>
              pushModal(
                <ProtectedPath>
                  <FavoriteModal />
                </ProtectedPath>,
              )
            }
            onSubscribeClick={() => pushModal(<LoginModal />)}
          />

          <div className="body" id="home">
            <section className="card hover">
              <div
                className="header-content-row"
                onClick={() =>
                  featuredAlfajor &&
                  pushModal(<AlfajorModal alfajorId={featuredAlfajor.id} />)
                }
              >
                <div className="header-text-col">
                  <p className="big-title">
                    Un clásico de <br />
                    todos los tiempos
                  </p>
                  <p className="text head-text">
                    Tres capas de dulce de leche, papel que se pega a los dedos,
                    y cero pretensiones. Lleva décadas sin cambiar la receta ni
                    el envoltorio. No tiene community manager.{" "}
                    <strong>No lo necesita.</strong>
                  </p>
                </div>
                <div>
                  <img
                    className="header-image-content"
                    src="/Mockup/Surprise.png"
                    alt="oreo"
                  />
                </div>
              </div>
            </section>

            <section className="group">
              <div className="power-texts">
                <p className="title">
                  Los más <br />
                  <span className="big-title">power</span>
                </p>
                <p className="text power-text">
                  Se necesitan las dos manos y un respirar
                  <br /> pausado.
                  <strong> Alfajores que dejan huella.</strong>
                </p>
              </div>
              <AlfajorGroup amount={3} alfajores={alfajores} />
            </section>

            <section className="group">
              <div className="height-texts">
                <p className="text height-text">
                  <strong>Triple capa para arriba.</strong> Cada piso es <br />{" "}
                  una decisión que alguien tomó bien.
                </p>
                <p className="title">
                  Los más <br />
                  <span className="big-title">altos</span>
                </p>
              </div>
              <AlfajorGroup amount={4} alfajores={alfajores} />
            </section>

            <section className="group">
              <div className="spicy-texts">
                <p className="title">
                  Los más <br />
                  <span className="big-title">picantes</span>
                </p>
                <p className="text spicy-text">
                  <strong>Los que se atreven.</strong> Alfajores que <br />{" "}
                  rompen las reglas y se salen con la suya.
                </p>
              </div>
              <AlfajorGroup amount={4} alfajores={alfajores} />
            </section>
          </div>

        {/* <section className="experiences-section">
            <div className="experiences-content">
              <p className="title white-text experiences-title">Experiencias</p>
              <MediaCarousel isNostalgia={false} />
            </div>
          </section>*/}

          <section className="nostalgia">
            <p className="title nostalgia-title">Nostalgia</p>
            <MediaCarousel isNostalgia={true} />
          </section>

          <CatalogSection alfajores={alfajores} />

          <section className="contacto">
            <div className="contacto-top">
              <p className="small-title white-text">
                Nuestra ambición no tiene freno.
              </p>
            </div>
            <div className="contacto-main">
              <div className="contacto-left">
                <p className="small-title">
                  ¿Falta tu alfajor?
                  <br />
                  Avísanos.
                </p>
                <p className="text">
                  No vamos a parar hasta encontrar
                  <br />
                  <strong>hasta el último alfajor del planeta.</strong>
                </p>
              </div>
              <div className="contacto-right">
                <form className="contacto-form">
                  <div className="contacto-form-row">
                    <input type="text" placeholder="nombre" />
                    <input type="email" placeholder="email" />
                  </div>
                  <textarea placeholder="texto" />
                  <div className="contacto-form-actions">
                    <button type="submit">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      )}

      {isMobile ? (
        <MobileFooter />
      ) : (
        <Footer
          onFavoriteClick={() =>
            pushModal(
              <ProtectedPath>
                <FavoriteModal />
              </ProtectedPath>,
            )
          }
          onSubscribeClick={() => pushModal(<LoginModal />)}
        />
      )}

      {currentModal && <EmptyModal>{currentModal}</EmptyModal>}
    </>
  );
}

export default Home;