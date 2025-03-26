import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";
import { useEffect, useCallback, useState, lazy, Suspense } from "react";
import interceptor from "./Interceptor";
import ProtectedRoute from "./ProtectedRoutes";
import {About, Contact, Detail, Item, Landing, Login, Error, OurWork, Videos,} from "./views/Index";
import Loading from './components/Loading'

import SessionWarning from "./Auth/SessionWarning";
import CookieConsent from "react-cookie-consent";
//* Importaciones con lazy (fragmentacion de build)

const AdminRoutes = lazy(() => import("./admin/AppAdmin"));

function App() {
  const { authenticated, logout, expirationTime } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  //Cambiar tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Guardar preferencia en localStorage
    //localStorage.setItem('theme', newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const redirectToError = useCallback(
    (status, message) => {
      navigate("/error", { state: { status, message } });
    },
    [navigate]
  );

  useEffect(() => {
    interceptor(
      logout,
      redirectToError //(status, message) => navigate('/error', { state: { status, message }})
    );
  }, [logout, redirectToError]);

  return (
    <div>
      {/* <div>
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="userConsent"
        style={{ background: "#2B373B", color: "#fff" }}
        buttonStyle={{ background: "#4CAF50", color: "#fff", fontSize: "13px" }}
        expires={365}
      >
        Este sitio utiliza cookies para mejorar tu experiencia.{" "}
        <span style={{ fontSize: "10px" }}>Lee más en nuestra Política de Cookies.</span>
      </CookieConsent>
    </div> */}

      <SessionWarning expirationTime={expirationTime} />

      <Routes>
        <Route
          path="/"
          element={<Landing theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route path="/detalle/:id" element={<Detail />} />
        <Route path="/detalle/item/:id" element={<Item />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/nuestro-trabajo" element={<OurWork />} />
        <Route path="/videos" element={<Videos />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loading cover= {true}/>}>
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="*"
          element={
            <Error state={{ status: 404, message: "Página no encontrada" }} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
