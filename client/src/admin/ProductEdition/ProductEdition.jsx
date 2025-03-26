import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, getStoredImgs } from "../../redux/actions";
import { updateProduct } from "../../Endpoints/endpoints";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import { Form } from "react-bootstrap";
import InfoFormField from "../InfoFormField";
//import "./productstyle.css";
import ImageUploader from "../utils/ImageUploader";
import ImageSelector from "../utils/ImageSelector";
import Loading from "../../components/Loading";
import * as Inf from "../utils/infoHelpers";

const ProductEdition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const page = useSelector((state) => state.ProductId);
  const [imgUrl, setImgUrl] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getStoredImgs());
  }, [id]);

  const onClose = () => {
    navigate(-1);
    setLoad(false);
  };
  const onRetry = () => {
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const [product, setProduct] = useState({
    title: "",
    landing: "",
    info_header: "",
    info_body: "",
    enable: false,
    saver: false,
    useImg: false,
  });

  useEffect(() => {
    if (page.info) {
      setProduct({
        title: page.info.title || "",
        landing: page.info.landing || "",
        info_header: page.info.infoHeader || "",
        info_body: page.info.infoBody || "",
        enable: page.info.enable || false,
        saver: page.info.saver || false,
        useImg: page.info.useImg || false,
      });
    }
  }, [page.info]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleImageChange = (imageUrl) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      landing: imageUrl,
    }));
  };
  const handleSwitchChange = (e) => {
    const { checked, id } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: checked,
    }));
  };

  const handleImgUrlSwitchChange = () => {
    setImgUrl((prev) => {
      const newValue = !prev; // Invertir el estado actual de imgUrl

      // Actualizar useImg según el nuevo valor de imgUrl
      setProduct((prevProduct) => ({
        ...prevProduct,
        useImg: newValue, // Establecer useImg en true o false
      }));

      return newValue; // Retornar el nuevo valor de imgUrl
    });
  };

  const handleSubmit = async () => {
    // Lógica para actualizar el producto
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de actualizar el producto?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      console.log('actualizo...', product)
      await updateProduct(id, product, onClose, onRetry);
      setLoad(true);
    }
  };
  return (
    <div className="imageBack">
      {load ? (
        <Loading />
      ) : (
        <div className="coverBack">
          <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow">
            <div className="container mt-5">
              <h1>Actualizacion de producto</h1>
              <section className="needs-validation" id="updateForm" noValidate>
                <div className="row">
                  {imgUrl ? (
                    <div className="col-md-6 mb-3">
                      <ImageSelector onImageSelect={handleImageChange} />
                    </div>
                  ) : (
                    <div className="col-md-6 mb-3">
                      <ImageUploader
                        titleField={"Imagen portada:"}
                        imageValue={product.landing}
                        onImageUpload={handleImageChange}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3 form-check form-switch">
                  <Form.Check
                    type="switch"
                    id="imgUrlSwitch"
                    checked={imgUrl}
                    label="Active para elegir imagen guardada"
                    onChange={handleImgUrlSwitchChange}
                  />
                </div>
                <div className="col-md-6 mb-3"></div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titulo:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="info_header" className="form-label">
                    Info posicionamiento:
                  </label>
                  <InfoFormField action={"hover"} info={Inf.aboutSeo} />
                  <textarea
                    className="form-control"
                    type="text"
                    id="info_header"
                    name="info_header"
                    rows="3"
                    value={product.info_header}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="info_body" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="info_body"
                    name="info_body"
                    rows="3"
                    value={product.info_body}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enable" className="form-label">
                    Mostrar al publico
                  </label>
                  <select
                    className="form-select"
                    id="enable"
                    name="enable"
                    value={product.enable ? "true" : "false"}
                    onChange={handleInputChange}
                  >
                    <option value="true">Mostrar</option>
                    <option value="false">No mostrar</option>
                  </select>
                </div>
                <div className="mb-3 form-check form-switch">
                  <Form.Check
                    type="switch"
                    id="saver"
                    checked={product.saver}
                    label="Active para conservar imagen antigua"
                    onChange={handleSwitchChange}
                  />
                </div>
                <div className="d-flex flex-row me-3">
                  <button
                    className="btn btn-md btn-primary mb-3 me-2"
                    type="button"
                    id="submitButton"
                    onClick={handleSubmit}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-md btn-secondary mb-3"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEdition;
