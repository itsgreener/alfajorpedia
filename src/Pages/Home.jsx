import Header from "../Components/Header.jsx";

function Home() {
  return (
    <>
  <Header/>
  <div>
  <img src="../../public/eldehoy.svg"></img>
  </div>

  <section className="experiencias">
    <MediaCarrusel/>
  </section>
    </>
  );
}

export default Home;