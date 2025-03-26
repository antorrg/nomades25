import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getStoredImgs } from "../../redux/actions";
import InfoFormField from "../InfoFormField";
import { imageSelector } from "./infoHelpers";

const ImageSelector = ({ onImageSelect }) => {
  const dispatch = useDispatch();
  const storedImages = useSelector((state) => state.Images); // Accede a las imágenes almacenadas en Redux
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(getStoredImgs());
  }, []);

  // Función que maneja la selección de imagen
  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl); // Actualiza el estado con la imagen seleccionada
    onImageSelect(imageUrl); // Llama al callback con la URL seleccionada
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-start align-items-center">
        <label className="form-label">Selecciona una imagen almacenada</label>
        <InfoFormField info={imageSelector} place={"bottom"} action={"hover"} />
      </div>

      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="imageDropdown">
          {selectedImage ? "Imagen seleccionada" : "Seleccionar..."}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {storedImages?.map((image) => (
            <Dropdown.Item
              key={image.id}
              onClick={() => handleImageSelect(image.imageUrl)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={image.imageUrl}
                alt="preview"
                style={{ maxWidth: "6rem", marginRight: "10px" }}
              />
              <span>Imagen guardada Nº: {image.id}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedImage && (
        <img
          src={selectedImage}
          alt="Imagen seleccionada"
          style={{ maxWidth: "20rem", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageSelector;
