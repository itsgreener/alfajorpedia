import Footer from "../Components/Footer.jsx";
import Header from "../Components/Header.jsx";
import MediaCarousel from "../Components/MediaCarousel.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />
      <section className="header-section">
        <p className="title">Un clásico de todos los tiempos</p>
        <p className="text head">
          Tres capas de dulce de leche, papel que se pega a los dedos, y cero
          pretensiones. Lleva décadas sin cambiar la receta ni el envoltorio. No
          tiene community manager. <strong>No lo necesita.</strong>
        </p>
      </section>

      <section className="experiences-section">
        <p className="title experiences">Experiencias</p>
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
          <p className="title">Nuestra ambición tiene freno</p>
        </div>
        <div className="right-column">
          <p className="title">¿Falta tu alfajor? Avísanos.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
