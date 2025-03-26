import {useEffect} from 'react'
import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getInfo, getProduct, getMedia} from '../redux/actions'
import {Header, Footer, MyCarousel,Marketing, SocialNetworks} from '../components/IndexComponents'



const Landing = ({theme, toggleTheme}) => {
  const dispatch = useDispatch()
  const info = useSelector((state)=>state.Landing)
  const products = useSelector((state)=>state.Products)
  const media = useSelector((state)=>state.Media)
  const uri = import.meta.env.VITE_URL
  useEffect(()=>{
    dispatch(getInfo())
    dispatch(getProduct())
    dispatch(getMedia())
  },[])
  

  return (
    <>
     <Helmet>
        <title>Nomades Cabañas de pastores</title>
        <meta name="description" content={info.info_header} />
        <meta name="keywords" content="cabañas, pastores, vagon" />
        <meta name="author" content="Nomades Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Nomades Cabañas de pastores" />
        <meta property="og:description" content={info.info_header} />
        <meta property="og:image" content={info.image} />
        <meta property="og:url" content={uri} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nomades Cabañas de pastores" />
        <meta name="twitter:description" content={info.info_header} />
        <meta name="twitter:image" content={info.image}/>
        {/* Puedes agregar más etiquetas meta aquí */}
      </Helmet>
    <div className='min-vh-100 cover-container1 d-flex w-100 p-3 mx-auto flex-column' style={{backgroundImage:`url(${info.image}||https://img.freepik.com/foto-gratis/cascada-barco-limpio-china-natural_1417-1356.jpg)`}}>
    <Header theme={theme} toggleTheme={toggleTheme}/>
    <section className='px-3'>
      <div className='caption-title'>
        <h1>{info?.title}</h1>
        <p className='cover-p'>{info?.description}</p>
        <p className='lead'>
          <Link className='btn btn-lg btn-ligth fw-bold border-white bg-white ' to='/nuestro-trabajo'  state={{ status: 404, message: "Página no encontrada" }}>
            Nuestro trabajo...
        </Link>
        </p>
      </div>
      <br/>
      <br/>
    </section>
    </div>
    <div className='my-2'></div>
    <section>
    <MyCarousel info={products}/>
    <Marketing products = {products} param={'detalle'}/>
    <hr></hr>
    </section>
    <section>
      <SocialNetworks/>
      <hr></hr>
    </section>
    <Footer/>
    
    </> 
    
  )
}

export default Landing
