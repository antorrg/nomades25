import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GenericButton from "../../components/generalComponents/GenericButton/GenericButton";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import ImageUploader from "../utils/ImageUploader";
import ImageSelector from "../utils/ImageSelector";
import Loading from "../../components/Loading";
import { Form } from "react-bootstrap";
import { createItem } from "../../Endpoints/endpoints";
//import "./productstyle.css";

const ItemCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const itemOnClose = () => {
    navigate(-1);
    setLoad(false);
  };
  const onRetry = () => {
    setTimeout(() => {
      itemOnClose();
    }, 3000);
  };
  const [imgUrl, setImgUrl] = useState(false);
  const [item, setItem] = useState({
    img: "",
    text: "",
    id: id,
    useImg: false,
  });

  const handleItemImageChange = (url) => {
    setItem((prevItem) => ({ ...prevItem, img: url }));
  };

  const handleItemChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleImgUrlSwitchChange = () => {
    setImgUrl((prev) => {
      const newValue = !prev; // Invertir el estado actual de imgUrl

      // Actualizar useImg según el nuevo valor de imgUrl
      setItem((prevItem) => ({
        ...prevItem,
        useImg: newValue, // Establecer useImg en true o false
      }));

      return newValue; // Retornar el nuevo valor de imgUrl
    });
  };

  const handleSubmit = async (e) => {
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de crear el item?"
    );
    if (confirmed) {
      // Aquí iría la lógica para crear el producto
      await createItem(item, itemOnClose, onRetry);
      setLoad(true);
      //console.log('soy el nuevo item: ',item);
    }
  };
  const permit = !item.text.trim();

  return (
    <div className="imageBack">
      {load ? (
        <Loading />
      ) : (
        <div className="coverBack">
          <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow">
            <div className="container mt-5">
              <h3>Creación de Item: </h3>
              <section className="needs-validation" id="updateForm" noValidate>
                {imgUrl ? (
                  <div className="col-md-6 mb-3">
                    <ImageSelector onImageSelect={handleItemImageChange} />
                  </div>
                ) : (
                  <div className="col-md-6 mb-3">
                    <ImageUploader
                      titleField="Imagen:"
                      imageValue={item.img}
                      onImageUpload={handleItemImageChange}
                    />
                  </div>
                )}
                <div className="mb-3 form-check form-switch">
                  <Form.Check
                    type="switch"
                    id="imgUrlSwitch"
                    checked={imgUrl}
                    label="Active para elegir imagen guardada"
                    onChange={handleImgUrlSwitchChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">
                    Texto:
                  </label>
                  <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    rows="3"
                    value={item.text}
                    onChange={handleItemChange}
                    required
                  />
                </div>
                <div className="d-flex flex-row me-3">
                  <GenericButton
                    className="btn btn-md btn-secondary mb-3 me-2"
                    buttonText="Cancelar"
                    onClick={itemOnClose}
                  />
                  <GenericButton
                    className="btn btn-md btn-primary mb-3 me-2"
                    type="button"
                    onClick={handleSubmit}
                    buttonText="Crear"
                    disabled={permit}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCreate;
