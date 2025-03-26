import axios from 'axios'
import { HandlError } from './Endpoints/HandlerError';


const interceptor = (logout, redirectToError) => {

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401 || error.response && error.response.status === 403) {
        const { status, data } = error.response;
        const message = data.message || 'Acceso no autorizado'; // Puedes personalizar el mensaje

        // Llamamos a la función de redirección con el status y message
        redirectToError(status, message);
        // Acceso no autorizado, redirigir al inicio de sesión
        redirectToLogin(logout)
      }
      HandlError(error);
      return Promise.reject(error);
    }
  );
};

const redirectToLogin =(logout)=>{
  setTimeout(()=>{
    logout();
  },4000)
}
export default interceptor