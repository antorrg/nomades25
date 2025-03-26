import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const Header = ({ theme, toggleTheme }) => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="mb-auto">
      <div>
        <h1 className="h3 float-md-start mb-0 caption-nav colon-link">
          Nomades
          <a className="nav-link" href="/login">
            :{" "}
          </a>
          Cabañas de pastores
        </h1>
        <nav className="nav nav-masthead justify-content-center float-md-end caption-nav">
          <Link className="nav-link fw-bold py-1 px-0 active" to="/">
            Inicio
          </Link>
          {authenticated ? (
            <button
              className="nav-link fw-bold py-1 px-0 active"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Admin
            </button>
          ) : null}
          <Link className="nav-link fw-bold py-1 px-0 active" to="/videos">
            Videos
          </Link>
          <Link className="nav-link fw-bold py-1 px-0 active" to="/contacto">
            Contacto
          </Link>
          <Link className="nav-link fw-bold py-1 px-0 active" to="/acerca">
            Acerca de{" "}
          </Link>
          {/* <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline-secondary position-fixed top-0 end-0 m-3"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
