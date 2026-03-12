import { useEffect, useMemo, useRef, useState } from "react";
import { alfajoresData, socialPosts } from "../Assets/Data.js";
import { useAuth } from "../Hooks/useAuth.js";
import { useFilteredData } from "../Hooks/useFilteredData.js";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import Footer from "../Components/General/Footer.jsx";
import Header from "../Components/General/Header.jsx";
import MediaCarousel from "../Components/Groups/MediaCarousel.jsx";
import AlfajorGroup from "../Components/Groups/AlfajorGroup.jsx";
import AlfajorModal from "../Components/Modals/AlfajorModal.jsx";
import EmptyModal from "../Components/Modals/EmptyModal.jsx";
import FavoriteModal from "../Components/Modals/FavoriteModal.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";
import Catalog from "../Components/Groups/Catalog.jsx";
import SearchInput from "../Components/Groups/SearchInput.jsx";
import "./Home.css";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const [alfajores, setAlfajores] = useState(alfajoresData);
  const modalOpenRef = useRef(false);
  const { user } = useAuth();
  const filtered = useFilteredData(alfajores, searchContent);
  const favorites = useMemo(
    () => alfajores.filter((a) => a.isFav),
    [alfajores],
  );

  useEffect(() => {
    modalOpenRef.current = modalOpen;
  }, [modalOpen]);

  function onModalOpen(content) {
    setModalOpen(true);
    setModalContent(content);
  }

  function setFavAlfajor(id, like) {
    if (user) {
      setAlfajores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isFav: like } : a)),
      );
      return true;
    } else {
      if (modalOpenRef.current) {
        onModalOpen(
          <ProtectedPath onModalOpen={onModalOpen} closeModal={setModalOpen}>
            <AlfajorModal alfajor={alfajores[id]} onFavChange={setFavAlfajor} />
          </ProtectedPath>,
        );
      } else {
        onModalOpen(
          <LoginModal onModalOpen={onModalOpen} closeModal={setModalOpen} />,
        );
      }
      return false;
    }
  }

  return (
    <>
      <Header
        onFavoriteClick={() =>
          onModalOpen(
            <ProtectedPath onModalOpen={onModalOpen} closeModal={setModalOpen}>
              <FavoriteModal
                alfajores={favorites}
                setFavAlfajor={setFavAlfajor}
                onModalOpen={onModalOpen}
              />
            </ProtectedPath>,
          )
        }
        onSubscribeClick={() =>
          onModalOpen(
            <LoginModal onModalOpen={onModalOpen} closeModal={setModalOpen} />,
          )
        }
      />
      <div className="body" id="home">
        <section className="card hover">
          <div
            className="header-content-row"
            onClick={() =>
              onModalOpen(
                <AlfajorModal
                  alfajor={alfajores[2]}
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
            <div className="header-image">
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
            onClick={(alfajor) =>
              onModalOpen(
                <AlfajorModal alfajor={alfajor} onFavChange={setFavAlfajor} />,
              )
            }
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
            onClick={(alfajor) =>
              onModalOpen(
                <AlfajorModal alfajor={alfajor} onFavChange={setFavAlfajor} />,
              )
            }
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
            onClick={(alfajor) =>
              onModalOpen(
                <AlfajorModal alfajor={alfajor} onFavChange={setFavAlfajor} />,
              )
            }
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

      <section>
        <div className="catalogo" id="catalog">
          <p className="big-title white-text catalogo-title">
            {alfajores.length} alfajores
          </p>
          <SearchInput onChange={setSearchContent} />
        </div>
        <div className="catalog-content">
          <Catalog
            alfajores={filtered}
            onClick={(alfajor) =>
              onModalOpen(
                <AlfajorModal alfajor={alfajor} onFavChange={setFavAlfajor} />,
              )
            }
            onFavChange={setFavAlfajor}
            items={20}
          />
        </div>
      </section>

      <section className="contacto">
        <div className="contacto-top">
          <p className="small-title white-text">Nuestra ambición no tiene freno.</p>
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
          onModalOpen(
            <ProtectedPath onModalOpen={onModalOpen} closeModal={setModalOpen}>
              <FavoriteModal
                alfajores={favorites}
                setFavAlfajor={setFavAlfajor}
                onModalOpen={onModalOpen}
              />
            </ProtectedPath>,
          )
        }
        onSubscribeClick={() =>
          onModalOpen(
            <LoginModal onModalOpen={onModalOpen} closeModal={setModalOpen} />,
          )
        }
      />
      {modalOpen && (
        <EmptyModal onClose={() => setModalOpen(false)}>
          {modalContent}
        </EmptyModal>
      )}
    </>
  );
}

export default Home;
