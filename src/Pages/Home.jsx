import Header from "../Components/Header.jsx";
import MediaCarousel from "../Components/MediaCarousel.jsx";
import "./Home.css";

function Home() {
  return (
    <>
  <Header/>
  <div>
  <img src="../../public/eldehoy.svg"></img>
  </div>

  <section className="experiencias">
     <img src="../../public/Experiencias.svg"></img>
    <MediaCarousel />
  </section>

  <section className="nostalgia">
    <img src="../../public/Nostalgia.svg"></img>
  </section>

  <section className="catalogo" id="catalog">
    <img src="../../public/Vamo’ con todo loco.svg"></img>
  </section>

  <section className="contacto">
    <div className="left-column">
      <img src="../../public/No le decimos que no....svg"></img>
    </div>
    <div className="right-column">
      <img src="../../public/a ningún alfajor..svg"></img>
    </div>
  </section>
   

    </>
  )
}

export default Home;