import { useCallback, useEffect, useRef } from "react";
import { socialPosts } from "../Assets/Data.js";
import { useAuthData } from "../Hooks/useAuth.js";
import {
  useAlfajoresActions,
  useAlfajoresData,
} from "../Hooks/useAlfajores.js";
import { useModalStack } from "../Hooks/useModalStack.js";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import Footer from "../Components/General/Footer.jsx";
import Header from "../Components/General/Header.jsx";
import MediaCarousel from "../Components/Groups/MediaCarousel.jsx";
import AlfajorGroup from "../Components/Groups/AlfajorGroup.jsx";
import AlfajorModal from "../Components/Modals/AlfajorModal.jsx";
import EmptyModal from "../Components/Modals/EmptyModal.jsx";
import FavoriteModal from "../Components/Modals/FavoriteModal.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";
import CatalogSection from "../Components/Groups/CatalogSection.jsx";
import "./Home.css";

function Home() {
  const { stack, pushModal } = useModalStack();
  const currentModal = stack[stack.length - 1] ?? null;
  const currentModalRef = useRef(currentModal);
  const { toggleFavoriteAlfajor } = useAlfajoresActions();
  const { alfajores } = useAlfajoresData();
  const { user } = useAuthData();
  const userRef = useRef(null);
  const favAlfajorRef = useRef(null);

  const setFavAlfajor = useCallback(
    (id, like) => {
      if (userRef.current) {
        toggleFavoriteAlfajor(id, like);
      } else {
        if (currentModalRef.current) {
          pushModal(
            <ProtectedPath>
              <AlfajorModal
                alfajorId={id}
                onFavChange={favAlfajorRef.current}
              />
            </ProtectedPath>,
          );
        } else {
          pushModal(<LoginModal />);
        }
      }
    },
    [pushModal, toggleFavoriteAlfajor],
  );

  useEffect(() => {
    favAlfajorRef.current = setFavAlfajor;
    currentModalRef.current = currentModal;
  }, [setFavAlfajor, currentModal]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  return (
    <>
      <Header
        onFavoriteClick={() =>
          pushModal(
            <ProtectedPath>
              <FavoriteModal
                setFavAlfajor={setFavAlfajor}
                onModalOpen={pushModal}
              />
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
              pushModal(
                <AlfajorModal
                  alfajorId={alfajores[2].id}
                  onFavChange={setFavAlfajor}
                />,
              )
            }
          >
            <div className="header-text-col">
              <p className="big-title">
                Un clásico de <br />
                todos los tiempos
              </p>
              <p className="text head-text">
                Tres capas de dulce de leche, papel que se pega a los dedos, y
                cero pretensiones. Lleva décadas sin cambiar la receta ni el
                envoltorio. No tiene community manager.{" "}
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
          <AlfajorGroup
            amount={3}
            data={alfajores}
            onFavChange={setFavAlfajor}
          />
        </section>
        <section className="group">
          <div className="height-texts">
            <p className="text height-text">
              <strong>Triple capa para arriba.</strong> Cada piso es <br /> una
              decisión que alguien tomó bien.
            </p>
            <p className="title">
              Los más <br />
              <span className="big-title">altos</span>
            </p>
          </div>
          <AlfajorGroup
            amount={4}
            data={alfajores}
            onFavChange={setFavAlfajor}
          />
        </section>
        <section className="group">
          <div className="spicy-texts">
            <p className="title">
              Los más <br />
              <span className="big-title">picantes</span>
            </p>
            <p className="text spicy-text">
              <strong>Los que se atreven.</strong> Alfajores que <br /> rompen
              las reglas y se salen con la suya.
            </p>
          </div>
          <AlfajorGroup
            amount={4}
            data={alfajores}
            onFavChange={setFavAlfajor}
          />
        </section>
      </div>

      <section className="experiences-section">
        <div className="experiences-content">
          <p className="title white-text experiences-title">Experiencias</p>
          <MediaCarousel posts={socialPosts} />
        </div>
      </section>

      <section className="nostalgia">
        <p className="title">Nostalgia</p>
      </section>

      <CatalogSection alfajores={alfajores} setFavAlfajor={setFavAlfajor} />

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

      <Footer
        onFavoriteClick={() =>
          pushModal(
            <ProtectedPath>
              <FavoriteModal
                setFavAlfajor={setFavAlfajor}
                onModalOpen={pushModal}
              />
            </ProtectedPath>,
          )
        }
        onSubscribeClick={() => pushModal(<LoginModal />)}
      />
      {currentModal && <EmptyModal>{currentModal}</EmptyModal>}
    </>
  );
}

export default Home;
