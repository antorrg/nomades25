import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import InfoFormField from "../InfoFormField";
import * as val from "../utils/videoValidate";
import { createMedia } from "../utils/landingPageEndpoints";
import Loading from "../../components/Loading";

const MediaCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [load, setLoad] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const videoType = queryParams.get("type"); //Obtener el type

  const validator = {
    youtube: val.youtube,
    facebook: val.facebook,
    instagram: val.instagram,
  };
  console.log(validator);

  const onClose = () => {
    navigate(-1);
    setLoad(false);
  };

  const [item, setItem] = useState({
    title: "",
    url: "",
    type: `${videoType}`,
    text: "",
    enable: true,
  });
  const [error, setError] = useState({
    url: "",
  });

  const handleItemChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
    // Validar solo la URL
    if (name === "url") {
      const validate = validator[videoType]; // Obtener el validador adecuado
      const errors = validate({ ...item, [name]: value });
      setError(errors);
    }
  };

  const handleSubmit = async (e) => {
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de crear el item?"
    );
    if (confirmed) {
      // Aquí iría la lógica para crear el producto
      await createMedia(item, onClose);
      setLoad(true);
    }
  };
  const permit =
    !item.url.trim() || !item.title.trim() || !item.text.trim() || error.url
      ? true
      : false;
  return (
    <div className="imageBack">
      {load ? (
        <Loading />
      ) : (
        <div className="coverBack">
          <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow">
            <div className="container mt-5">
              <h3>Video de {videoType}: </h3>
              <section className="needs-validation" id="createForm" noValidate>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    Url de {videoType}:
                  </label>
                  <div className="d-flex flex-row me-3">
                    <input
                      className="form-control"
                      id="url"
                      name="url"
                      value={item.url}
                      onChange={handleItemChange}
                      required
                    />
                    <InfoFormField
                      place={"left"}
                      action={"hover"}
                      info={`Copie y pegue aquí la url de ${videoType} que desea guardar`}
                    />
                  </div>
                  {error.url && <p className="errorMsg">{error.url}</p>}
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titulo:
                  </label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={item.title}
                    onChange={handleItemChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">
                    Descripción:
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
                <label htmlFor="enable" className="form-label">
                  Mostrar al publico
                </label>
                <select
                  className="form-select mb-2"
                  id="enable"
                  name="enable"
                  value={item.enable}
                  onChange={handleItemChange}
                >
                  <option value="true">Mostrar</option>
                  <option value="false">No mostrar</option>
                </select>
                <div className="d-flex flex-row me-3">
                  <button
                    className="btn btn-md btn-primary mb-3 me-2"
                    type="button"
                    onClick={handleSubmit}
                    disabled={permit}
                  >
                    Crear
                  </button>
                  <button
                    className="btn btn-md btn-secondary mb-3 me-2"
                    onClick={onClose}
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

export default MediaCreate;
