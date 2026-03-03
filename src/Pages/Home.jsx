import { Link } from "react-router-dom";
import Header from "../Components/Header.jsx";

function Home() {
  return (
    <>
  <Header/>
    <div className="home">
    </div>
    <Link to="/catalog"></Link>
    <Link to="/login"></Link>
    </>
  );
}

export default Home;