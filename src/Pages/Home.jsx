import Footer from "../Components/Footer.jsx";
import Header from "../Components/Header.jsx";
import MediaCarousel from "../Components/MediaCarousel.jsx";
import AlfajorGroup from "../Components/AlfajorGroup.jsx";
import ContactForm from "../Components/ContactForm.jsx";
import "./Home.css";

function Home() {
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
        <section className="power">
          <div className="power-texts">
            <p className="title power-title">Los más power</p>
            <p className="text power-text">
              Se necesitan las dos manos y un respirar pausado.{" "}
              <strong>Alfajores que dejan huella.</strong>
            </p>
          </div>
          <AlfajorGroup />
        </section>
        <section className="height">
          <div className="height-texts">
            <p className="text height-text">
              <strong>Triple capa para arriba.</strong> Cada piso es una
              decisión que alguien tomó bien.
            </p>
            <p className="title height-title">Los más altos</p>
          </div>
          <AlfajorGroup />
        </section>
        <section className="spicy">
          <p className="title">Los más picantes</p>
          <p className="text">
            <strong>Los que se atreven.</strong> Alfajores que rompen las reglas
            y se salen con la suya.
          </p>
          <AlfajorGroup />
        </section>

        <section className="experiences-section">
          <p className="title white-text">Experiencias</p>
          <MediaCarousel />
        </section>

        <section className="nostalgia">
          <p className="title">Nostalgia</p>
        </section>

        <section className="catalogo">
          <p className="title">Catálogo</p>
          <input type="text" placeholder="Buscar..." className="search-bar" />
        </section>

        <section className="contacto">
          <div className="left-column">
            <p className="title white-text">Nuestra ambición tiene freno</p>
          </div>
          <div className="right-column">
            <ContactForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
