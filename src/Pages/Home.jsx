import { useEffect, useState } from "react";
import { filtrarAlfajoresConImagenReal } from "../Helpers/alfajoresDisplay.js";
import { useAlfajoresData } from "../Hooks/useAlfajores.jsx";
import { useModalStack } from "../Hooks/useModalStack.js";
import { useBreakpoint } from "../Hooks/useBreakpoint.js";
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
import Contact from "../Components/General/Contact.jsx";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import "./Home.css";

function Home() {
  const { currentModal, pushModal } = useModalStack();
  const { alfajores, loading, error } = useAlfajoresData();
  const { isMobile } = useBreakpoint();

  const [hourTick, setHourTick] = useState(Date.now());
  const [alfajoresConImagenReal, setAlfajoresConImagenReal] = useState([]);
  const [imagenesLoading, setImagenesLoading] = useState(true);

  useEffect(() => {
    function scheduleNextHourUpdate() {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setMinutes(0, 0, 0);
      nextHour.setHours(now.getHours() + 1);

      const msUntilNextHour = nextHour.getTime() - now.getTime();

      return setTimeout(() => {
        setHourTick(Date.now());
      }, msUntilNextHour);
    }

    const timeoutId = scheduleNextHourUpdate();

    return () => clearTimeout(timeoutId);
  }, [hourTick]);

  const imageSignature = alfajores
    .map((a) => `${a.id}:${a.foto_url}`)
    .join("|");

  useEffect(() => {
    let cancelled = false;

    async function validarImagenes() {
      try {
        setImagenesLoading(true);
        const validos = await filtrarAlfajoresConImagenReal(alfajores);
        if (!cancelled) {
          setAlfajoresConImagenReal(validos);
        }
      } finally {
        if (!cancelled) {
          setImagenesLoading(false);
        }
      }
    }

    if (alfajores.length > 0) {
      validarImagenes();
    } else {
      setAlfajoresConImagenReal([]);
      setImagenesLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [imageSignature]);

  function filterByUrl(fotoUrl) {
    return alfajores.filter((item) => item.foto_url === fotoUrl);
  }

  const featuredAlfajor = filterByUrl("alfajorpedia-0060");

  const alfajoresPower = [
    ...filterByUrl("alfajorpedia-0208"),
    ...filterByUrl("alfajorpedia-0209"),
    ...filterByUrl("alfajorpedia-0303"),
  ];

  const alfajoresAltos = [
    ...filterByUrl("alfajorpedia-0074"),
    ...filterByUrl("alfajorpedia-0075"),
    ...filterByUrl("alfajorpedia-0092"),
    ...filterByUrl("alfajorpedia-0093"),
  ];

  const alfajoresPistacho = [
    ...filterByUrl("alfajorpedia-0165"),
    ...filterByUrl("alfajorpedia-0243"),
    ...filterByUrl("alfajorpedia-0261"),
    ...filterByUrl("alfajorpedia-1014"),
  ];

  if (loading || imagenesLoading) {
    return <p className="text loading">Cargando alfajores...</p>;
  }

  if (error) {
    return <p className="text">Error: {error}</p>;
  }

  return (
    <>
      {isMobile ? (
        <MobileCatalog alfajores={alfajoresConImagenReal} />
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
                  pushModal(<AlfajorModal alfajorId={featuredAlfajor[0].id} />)
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
                    src={`https://res.cloudinary.com/dnvp65swm/image/upload/f_auto,q_auto/v1774009977/${featuredAlfajor[0].foto_url}.webp`}
                    alt="featured alfajor"
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
              <AlfajorGroup
                amount={alfajoresPower.length}
                alfajores={alfajoresPower}
              />
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
              <AlfajorGroup
                amount={alfajoresAltos.length}
                alfajores={alfajoresAltos}
              />
            </section>

            <section className="group">
              <div className="spicy-texts">
                <p className="title">
                  Los más <br />
                  <span className="big-title">pistacho</span>
                </p>
                <p className="text spicy-text">
                  <strong>Los que van de frente.</strong> Alfajores con pistacho
                  <br /> para quien no quiere lo de siempre.
                </p>
              </div>
              <AlfajorGroup
                amount={alfajoresPistacho.length}
                alfajores={alfajoresPistacho}
              />
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

          <CatalogSection alfajores={alfajoresConImagenReal} />

          <Contact />
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
