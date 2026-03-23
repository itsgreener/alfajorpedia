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
import { useEffect, useMemo, useState } from "react";
import {
  filtrarAlfajoresConImagenReal,
  getAlfajoresConImagenAleatoriosPorHora,
} from "../Helpers/alfajoresDisplay.js";
import Contact from "../Components/General/Contact.jsx";
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
}, [alfajores]);

const alfajoresAleatorios = useMemo(() => {
  return getAlfajoresConImagenAleatoriosPorHora(alfajoresConImagenReal, hourTick);
}, [alfajoresConImagenReal, hourTick]);

const featuredAlfajor = alfajoresAleatorios[0];

 const alfajoresPower = useMemo(() => {
    return [...alfajores]
      .filter((a) => a.calorias != null || a.gramos != null)
      .sort((a, b) => {
        const caloriasA = a.calorias ?? -1;
        const caloriasB = b.calorias ?? -1;
        const gramosA = a.gramos ?? -1;
        const gramosB = b.gramos ?? -1;

        if (caloriasB !== caloriasA) return caloriasB - caloriasA;
        return gramosB - gramosA;
      });
  }, [alfajores]);

const alfajoresAltos = useMemo(() => {
  return alfajores.filter((a) => {
    const texto =
      `${a.nombre || ""} ${a.tagline || ""} ${a.descripcion || ""} ${a.categorias || ""}`.toLowerCase();

    return (
      texto.includes("triple") ||
      texto.includes("3 capas") ||
      texto.includes("tres capas")
    );
  });
}, [alfajores]);

  // Pistachos = detectar texto
  const alfajoresPistacho = useMemo(() => {
    return alfajores.filter((a) => {
      const texto =
        `${a.nombre || ""} ${a.tagline || ""} ${a.descripcion || ""} ${a.categorias || ""}`.toLowerCase();

      return (
        texto.includes("pistacho") ||
        texto.includes("pistacchio") ||
        texto.includes("pistachio")
      );
    });
  }, [alfajores]);

  if (loading  || imagenesLoading) {
    return <p className="text loading">Cargando alfajores YA!...</p>;
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
             <AlfajorGroup amount={3} alfajores={alfajoresPower} />
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
              <AlfajorGroup amount={4} alfajores={alfajoresAltos} />
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
              <AlfajorGroup amount={4} alfajores={alfajoresPistacho} />
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
