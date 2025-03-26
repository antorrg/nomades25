import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getItem, cleanState} from '../redux/actions'
//import './styles/item.css'


const Item = () => { 
  const dispatch = useDispatch()
  const item = useSelector((state)=>state.Item)
  const {id}=useParams()
  
  useEffect(()=>{
    dispatch(getItem(id))
    return ()=>{dispatch(cleanState())}
  },[id])

  return (
   <div>
     <div
        className="modal modal-tour position-static d-block modal-custom py-5"
        tabIndex="-1"
        role="dialog"
        id="modalTour"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body p-5 text-center">
              <img
                className="d-block.mx-auto mb-4"
                src={item?.img}
                alt="image not found"
              />
              <p className="text-muted">{item?.text}</p>
              <Link
                className="btn btn-md btn-outline-darkgray mt-3 mx-auto w-20"
                to={`/detalle/${item?.ProductId}`}
              >
                Cerrar
              </Link>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}

export default Item
