import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductById } from "../redux/actions";
import GenericButton from "../components/generalComponents/GenericButton/GenericButton";
import * as Comp from "../components/IndexComponents";
import * as Ad from "./AdminIndex";

const ProductComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const response = useSelector((state) => state.ProductId);
  const info = response.info;
  const items = response.items;
  const { id } = useParams();
  const goBack = () => navigate(-1);
  const isAdmin = true;
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id, isAdmin));
    } else {
      dispatch(getProduct(isAdmin));
    }
  }, [id]);
  //console

  return (
    <div>
      <div className="container marketing">
        {id ? (
          <Ad.AlbumAdmin info={info} items={items} />
        ) : (
          <>
            <div className="featurette-divider"></div>
            <Comp.Marketing products={products} param={"admin/product"} />
          </>
        )}
        <GenericButton
          className="btn btn-secondary mt-3 mb-3"
          onClick={() => {
            navigate(-1);
          }}
          buttonText={"Volver"}
        />
      </div>
    </div>
  );
};

export default ProductComp;
