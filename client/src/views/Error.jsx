import {useEffect} from 'react'
import {useLocation, Link, useNavigate} from 'react-router-dom'
//import './styles/error.css'

const Error = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
      setTimeout(()=>{
        navigate('/')
      },5000)
    },[])
    
    const error = location.state || { status: 'Desconocido', message: 'Ha ocurrido un error inesperado' };
  return (
    <div className='error-page'>
    <h1>Error {error.status}</h1>
    <p>{error.message}</p>
    <Link to={'/'}>Volver a inicio...</Link>
    </div>
  )
}

export default Error
