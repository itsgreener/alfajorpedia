import { useState } from "react";
import { alfajores } from "../Assets/Data.js";
import Footer from "../Components/Footer.jsx";
import Header from "../Components/Header.jsx";
import MediaCarousel from "../Components/MediaCarousel.jsx";
import AlfajorGroup from "../Components/AlfajorGroup.jsx";
import ContactForm from "../Components/ContactForm.jsx";
import AlfajorModal from "../Components/AlfajorModal.jsx";
import EmptyModal from "../Components/EmptyModal.jsx";
import FavoriteModal from "../Components/FavoriteModal.jsx";
import LoginModal from "../Components/LoginModal.jsx";
import "./Home.css";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function openAlfajorModal(alfajor) {
    setModalContent(<AlfajorModal alfajor={alfajor} />);
    setModalOpen(true);
  }

  return (
    <>
      <Header
        onFavoriteClick={() => {
          setModalContent(<FavoriteModal />);
          setModalOpen(true);
        }}
        onSubscribeClick={() => {
          setModalContent(<LoginModal />);
          setModalOpen(true);
        }}
      />
      <div className="body" id="home">
        <section className="card hover">
          <div
            className="header-content-row"
            onClick={() => openAlfajorModal(alfajores[2])}
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
            onClick={(alfajor) => openAlfajorModal(alfajor)}
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
            onClick={(alfajor) => openAlfajorModal(alfajor)}
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
            onClick={(alfajor) => openAlfajorModal(alfajor)}
          />
        </section>
      </div>

      <section className="experiences-section">
        <div className="experiences-content">
          <div className="experiences-title">
            <p className="title white-text">Experiencias</p>
          </div>
          <MediaCarousel />
        </div>
      </section>
      <div className="body">
        <section className="nostalgia">
          <p className="title">Nostalgia</p>
        </section>

        <section className="catalogo" id="catalogo">
          <p className="title">Catálogo</p>
          <input type="text" placeholder="Buscar..." className="search-bar" />
        </section>
      </div>

      <section className="contacto">
        <div className="left-column">
          <p className="title white-text left-title">
            Nuestra ambición no tiene freno
          </p>
        </div>
        <div className="right-column">
          <ContactForm />
        </div>
      </section>
      <Footer />
      {modalOpen && (
        <EmptyModal onClose={() => setModalOpen(false)}>
          {modalContent}
        </EmptyModal>
      )}
    </>
  );
}

export default Home;
