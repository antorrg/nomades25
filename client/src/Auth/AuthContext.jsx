import { createContext, useContext, useState, useEffect } from 'react';
import SessionWarning from './SessionWarning';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expirationTime, setExpirationTime] = useState(null);

  const login = (userData, token) => {
    setAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('validToken', token);

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    setExpirationTime(tokenPayload.exp);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('validToken');
    window.location.reload()
    // Considerar usar navigate en lugar de window.location.reload()
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('validToken');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
          const currentTime = Date.now() / 1000;

          if (tokenPayload.exp > currentTime) {
            setAuthenticated(true);
            setUser(JSON.parse(storedUser));
            setExpirationTime(tokenPayload.exp);

            const timeToExpire = (tokenPayload.exp - currentTime) * 1000;
            //console.log('para expirar', timeToExpire)
            setTimeout(() => {
              logout();
            }, timeToExpire);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error al decodificar el token o al parsear el usuario', error);
          logout();
        }
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // O un componente de carga si lo prefieres
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout, expirationTime }}>
      {children}
      {expirationTime && <SessionWarning expirationTime={expirationTime} />}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

// import {createContext, useContext} from 'react'
// import {useState, useEffect} from 'react'
// import SessionWarning from './SessionWarning'


// const AuthContext = createContext();

// const AuthProvider = ({children,  initialAuthenticated = false, initialUser = null })=>{
//     const [authenticated, setAuthenticated]= useState(initialAuthenticated);
//     const [user, setUser]= useState(initialUser);
//     const [loading, setLoading] = useState(false)
//     const [expirationTime, setExpirationTime] = useState(null);
//    console.log('soy la expiracion: ', expirationTime)
//     const login = (userData, token) => { 
//         setAuthenticated(true);
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData))
//         localStorage.setItem('validToken', token)
//         const tokenPayload = JSON.parse(atob(token.split('.')[1]));// Decodificar el token
//         setExpirationTime(tokenPayload.exp);
//      }

//      const logout = () => { 
//         setAuthenticated(false);
//         setUser(null);
//         //Limpiamos el token y el user
//         localStorage.clear();
//         window.location.reload();
//       }

     
    

// //*Con esta funcion prevenimos el deslogueo por refresh.
//     useEffect(()=>{
//         const storedToken = localStorage.getItem('validToken')
//         const storedUser = localStorage.getItem('user')
//         if (storedToken && storedUser) {
//           const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
            
//             const currentTime = Date.now() / 1000; // Tiempo actual en segundos
//             if (tokenPayload.exp > currentTime) {
//               // Si el token no ha expirado
//               setAuthenticated(true);
//               setUser(JSON.parse(storedUser));
      
//               // Calcular el tiempo restante y programar el logout
//               const timeToExpire = (tokenPayload.exp - currentTime) * 1000; // Diferencia en milisegundos
//               setExpirationTime(tokenPayload.exp)
//               console.log('tiempo para expirar: ', timeToExpire)
//               setTimeout(() => {
//                 logout();
//               }, timeToExpire);
//             } else {
//               logout();
//             }
//           }
//           setLoading(false);
       
//     },[])
      
//     return(
//         <AuthContext.Provider value={{authenticated, user, loading, login, logout, expirationTime}}>
//             {children}
//             {/* {expirationTime && <SessionWarning expirationTime={expirationTime} />} */}
            
//         </AuthContext.Provider>
//     )
// }

// const useAuth = ()=>{
//     return useContext(AuthContext);
// };

// export {AuthProvider, useAuth}