import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoredImgs } from "../../redux/actions";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import { deleteImage } from "../utils/productEndPoints";
import Loading from "../../components/Loading";

const ImagesComponent = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.Images);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getStoredImgs());
  }, [load]);

  const onClose = () => {
    setLoad(false);
  };
  const onRetry = () => {
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const delImage = async (id) => {
    const confirmed = await showConfirmationDialog(
      "¿Quiere eliminar esta imagen?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      setLoad(true);
      await deleteImage(id, onClose, onRetry);
      //console.log('soy la imagen a borrar: ',id)
    }
  };

  return (
    <>
      <section className="album py-5 bg-light mb-3">
        <div className="container ">
          {load ? (
            <Loading />
          ) : (
            <>
              <div className="col-lg-6 col-md-8 mx-auto">
                <h2 className="fw-light">Imagenes guardadas</h2>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {images?.map((img, index) => (
                  <div className="col" key={img.id}>
                    <div className="card shadow-sm">
                      <img
                        className="card-img-top"
                        src={img.imageUrl}
                        alt="Card image"
                      />
                      <div className="card-body">
                        <p className="card-text">
                          Esta es la imagen guardada Nª: {index + 1}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-danger me-3"
                              onClick={() => delImage(`${img.id}`)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ImagesComponent;
