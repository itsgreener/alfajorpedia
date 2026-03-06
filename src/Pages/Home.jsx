import { useState } from "react";
import { alfajores } from "../Assets/Data.js";
import Footer from "../Components/Footer.jsx";
import Header from "../Components/Header.jsx";
import MediaCarousel from "../Components/MediaCarousel.jsx";
import AlfajorGroup from "../Components/AlfajorGroup.jsx";
import ContactForm from "../Components/ContactForm.jsx";
import AlfajorModal from "../Components/AlfajorModal.jsx";
import EmptyModal from "../Components/EmptyModal.jsx";
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
      <Header />
      <div className="body">
        <section className="card">
          <div className="header-content-row">
            <div className="header-text-col">
              <p className="title head-title">
                Un clásico de todos los tiempos
              </p>
              <p className="text head-text">
                Tres capas de dulce de leche, papel que se pega a los dedos, y
                cero pretensiones. Lleva décadas sin cambiar la receta ni el
                envoltorio. No tiene community manager.{" "}
                <strong>No lo necesita.</strong>
              </p>
            </div>
            <p className="text">¡Imagen de alfajor!</p>
          </div>
        </section>
        <section className="group">
          <div className="power-texts">
            <p className="title power-title">Los más power</p>
            <p className="text power-text">
              Se necesitan las dos manos y un respirar pausado.{" "}
              <strong>Alfajores que dejan huella.</strong>
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
              <strong>Triple capa para arriba.</strong> Cada piso es una
              decisión que alguien tomó bien.
            </p>
            <p className="title height-title">Los más altos</p>
          </div>
          <AlfajorGroup
            amount={4}
            data={alfajores}
            onClick={(alfajor) => openAlfajorModal(alfajor)}
          />
        </section>
        <section className="group">
          <div className="spicy-texts">
            <p className="title spicy-title">Los más picantes</p>
            <p className="text spicy-text">
              <strong>Los que se atreven.</strong> Alfajores que rompen las
              reglas y se salen con la suya.
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

        <section className="catalogo">
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
