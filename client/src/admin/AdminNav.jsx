//import "../styles/admin.css";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AdminNav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profile = () => {
    navigate(`/admin/users/profile/${user.id}`);
    cerrarOffcanvas();
  };

  return (
    <>
      <nav
        className="navbar navbar-dark bg-dark"
        aria-label="Dark offcanvas navbar"
      >
        <div className="container-fluid">
          <p className="navbar-brand text-start ms-1">Panel Administrador</p>
          <div className="d-flex justify-content-start">
            <Dropdown align="end" className="">
              <Dropdown.Toggle
                as="a"
                className="d-flex align-items-center text-white text-decoration-none nav-link"
              >
                <img
                  src={user.picture}
                  alt="Not found"
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>
                  {user.given_name ? user.given_name : user.nickname}
                </strong>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
                <Dropdown.Item onClick={profile}>Perfil</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Link className="navbar-brand text-start ms-5" to="/">
            Ir a página principal
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
