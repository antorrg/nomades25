import { useAuth } from "./Auth/AuthContext";
import { Navigate } from "react-router-dom";

// Componente de protección para rutas de admin
const ProtectedRoute = ({ children }) => {
    const { authenticated } = useAuth();
    //console.log('soy el auth ',authenticated)
    if(authenticated===undefined){
        return null;
    }

    return authenticated ? children : <Navigate to="/" replace />;
  };

  export default ProtectedRoute