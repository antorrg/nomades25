import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMediaById, cleanState } from "../../redux/actions";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import InfoFormField from "../InfoFormField";
import * as val from "../utils/videoValidate";
import { updateMedia } from "../utils/landingPageEndpoints";
import Loading from "../../components/Loading";

const MediaUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [load, setLoad] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const videoType = queryParams.get("type"); // Obtener el tipo de video
  const id = location.pathname.split("/").pop(); // Obtener el ID de la URL

  const item1 = useSelector((state) => state.MediaById);

  const validator = {
    youtube: val.youtube,
    facebook: val.facebook,
    instagram: val.instagram,
  };

  const onClose = () => {
    navigate(-1);
    setLoad(false);
  };
  const onRetry = () => {
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const [item, setItem] = useState({
    title: "",
    url: "",
    type: videoType || "",
    text: "",
    enable: true,
  });

  const [error, setError] = useState({
    url: "",
  });

  // Petición para obtener los datos del elemento
  useEffect(() => {
    dispatch(getMediaById(id));
    return () => {
      dispatch(cleanState());
    };
  }, [id]);

  // Cargar los datos en el formulario
  useEffect(() => {
    if (item1) {
      setItem({
        title: item1.title || "",
        url: item1.url || "",
        type: videoType,
        text: item1.text || "",
        enable: item1.enable || true,
      });
    }
  }, [item1]);

  // Manejar cambios en los campos del formulario
  const handleItemChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));

    if (name === "url") {
      const validate = validator[videoType]; // Obtener el validador adecuado
      const errors = validate({ ...item, [name]: value });
      setError((prevError) => ({ ...prevError, url: errors.url || "" }));
    }
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de actualizar el item?"
    );
    if (confirmed) {
      // Aquí iría la lógica para actualizar el elemento
      //console.log("Elemento actualizado:", item);
      await updateMedia(id, item, onClose, onRetry);
      setLoad(true);
    }
  };

  const permit =
    !item.url.trim() || !item.title.trim() || !item.text.trim() || error.url;

  return (
    <div className="imageBack">
      {load ? (
        <Loading />
      ) : (
        <div className="coverBack">
          <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow">
            <div className="container mt-5">
              <h3>Modificar video de {videoType}:</h3>
              <form className="needs-validation" id="createForm" noValidate>
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
                    />
                    <InfoFormField
                      place={"left"}
                      action={"hover"}
                      info={`Copie y pegue aquí la URL de ${videoType} que desea guardar`}
                    />
                  </div>
                  {error.url && <p className="errorMsg">{error.url}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título:
                  </label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={item.title}
                    onChange={handleItemChange}
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
                    Actualizar
                  </button>
                  <button
                    className="btn btn-md btn-secondary mb-3 me-2"
                    type="button"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpdate;
