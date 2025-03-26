import {Link} from 'react-router-dom'

const Marketing = ({products, param}) => {
  return (
    <div className='container marketing'>
      <div className='row'>
        {products?.map((info)=>
        <div className='col-lg-4' key={info?.id}>
          <img className='bd-placeholder-img-fluid'  src={info?.landing} alt='Imagen' style={{maxWidth:'20rem'}}/>
          <h3 className='fw-normal mt-1'>{info?.title}</h3>
          <p>{info?.infoHeader}</p>
          <p><Link className='btn btn-md btn-outline-darkgray' to={`/${param}/${info?.id}`}>Ver detalles</Link></p>
        </div>
        )}
      </div>
      </div>
  )
}

export default Marketing