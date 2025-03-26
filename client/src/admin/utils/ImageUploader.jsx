import React, { useState, useEffect } from "react";
import axios from "axios";
import { showSuccess, showError } from "../../Endpoints/HandlerError";
import InfoFormField from "../InfoFormField";
import { imageUpladmessage } from "./infoHelpers";

const ImageUploader = ({ titleField, imageValue, onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageValue || ""); // Inicializa con imageValue
  const [previewUrl, setPreviewUrl] = useState(imageValue || ""); // Inicializa con imageValue
  const [alert, setAlert] = useState(false);

  // Actualiza previewUrl si el prop imageValue cambia
  useEffect(() => {
    if (imageValue) {
      setPreviewUrl(imageValue);
    }
  }, [imageValue]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setPreviewUrl(e.target.result); // Previsualiza imagen seleccionada
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewUrl(imageValue); // Restaura la imagen original si la hay
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("validToken");
    try {
      // Simulación del envío del formulario
      console.log("formData:", formData);
      const response = await axios.post("/api/v1/imgupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": `${token}`,
        },
      });
      // Simular la respuesta para la demo
      if (response.status === 200) {
        setImageUrl(response.data.url); // Actualiza imageUrl con la URL de la imagen cargada
        onImageUpload(response.data.url);
        showSuccess("Imagen Cargada exitosamente");
        setAlert(true);
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  return (
    <div className="row">
      <div className="co-md-8 mb-3 me2">
        <section>
          <div className="d-flex justify-content-start align-items-center">
            <label className="form-label">{titleField}</label>
            <InfoFormField
              info={imageUpladmessage}
              place={"bottom"}
              action={"hover"}
            />
          </div>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
          {previewUrl && (
            <>
              {alert ? (
                <p className="text-success">Imagen cargada exitosamente</p>
              ) : (
                <p className="text-success">Imagen existente:</p>
              )}
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
              {file && (
                <button
                  type="button"
                  className="btn btn-outline-danger mr-3"
                  onClick={handleDelete}
                >
                  Borrar selección
                </button>
              )}
            </>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-outline-primary"
            disabled={!file}
          >
            Subir
          </button>
        </section>

        {imageUrl && !file && (
          <div>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "20rem" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
