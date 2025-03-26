import { Header } from "../components/IndexComponents";
import { Link } from "react-router-dom";

//import "./styles/about.css";

const About = () => {
 

  return (
    <div className="imageBack">
      <Header />
      <div className="container coverAbout">
        <div className="caption-nav">
          <h1 className="about-h1">Quienes somos:</h1>
        </div>
          <div className="modal-content p-2">
          <div className="container-lg modal-content colorBack contactContainer rounded-4 shadow">
            <div className="container mt-5">
               <p className='cover-p'>
               Somos "Nomades, Cabañas de Pastores", un emprendimiento que comenzo hace algun tiempo y fue tomando forma con los años.
             </p>
              <Link className="btn btn-md btn-outline-darkgray mb-3" to={'/'}>Volver</Link>
            </div>
            <hr></hr>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;

