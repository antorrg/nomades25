import {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import {getInfo, getStoredImgs} from '../../redux/actions'
//import "../../../views/styles/item.css"



const LandingView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const info = useSelector((state)=>state.Landing)
  const isAdmin = true

 useEffect(()=>{
   dispatch(getInfo(isAdmin))
   dispatch(getStoredImgs())
 },[])

  return (
    <section className="container">
    <div className=" py-5 bg-light row py-lg-5">
      <div className="col-lg-6 col-md-8 col-sm-12 mx-auto text-center">
        <h2 className="fw-light">Gestion de portada:</h2>
        <div className=''>
          {(!info.id)?
        <Link className="btn btn-sm btn-outline-danger me-3 mb-3" to='/admin/land/create'>Crear</Link>
        :
        <Link className="btn btn-sm btn-outline-success mb-3" to={`/admin/land/update/${info.id}`}>Editar</Link>
          }
        </div>
        <h4>Titulo:</h4>
            <p className="lead text-muted">{info?.title}</p>
        <img
              className="bd-placeholder-img-fluid mb-3"
              src={info?.image}
              alt="Imagen"
              style={{ maxWidth: "100%", height:'auto' }}
            />
            <h4>Info posicionamiento:</h4>
            <p className="lead text-muted">{info?.info_header}</p>
            <hr></hr>
            <h4>Descripcion:</h4>
        <p className="lead text-muted">{info?.description}</p>
      </div>
    </div>
  </section>
  );
};

export default LandingView;