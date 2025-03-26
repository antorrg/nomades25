import { useEffect } from "react";
import {Helmet} from 'react-helmet-async'
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProductById} from "../redux/actions";
import * as Cmt from "../components/IndexComponents";

const Detail = () => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.ProductId);
  const info = response.info;
  const items = response.items;
  const { id } = useParams();

  const headerTitle = info? info.title :'Nombre de producto'
  const headerDescription = info? info.infoHeader : 'Descripcion del producto'
   
  useEffect(() => {
    dispatch(getProductById(id));
   
  }, [id, dispatch]);
  return (
    <>
    <Helmet>
        <title>{headerTitle}</title>
        <meta name="description" content={headerDescription} />
        <meta name="keywords" content="cabañas, pastores, vagon" />
        {/* Puedes agregar más etiquetas meta aquí */}
      </Helmet>
    <div>
      <Cmt.Header />
     <Cmt.Album info={info} items={items}/>
      <Cmt.Footer />
    </div>
    </>
  );
};

export default Detail;
