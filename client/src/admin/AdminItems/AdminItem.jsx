import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../redux/actions";
import Edition from "../../components/generalComponents/Edition/Edition";
import { booleanState } from "../utils/generalHelpers";
//import "../../../views/styles/item.css"

const AdminItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.Item);

  useEffect(() => {
    dispatch(getItem(id));
  }, [id]);

  return (
    <div>
      <div
        className="modal modal-tour position-static d-block modal-custom py-5"
        tabIndex="-1"
        role="dialog"
        id="modalTour"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body p-5 text-center">
              <img
                className="d-block.mx-auto mb-4"
                src={item?.img}
                alt="image not found"
              />
              <p className="text-muted">
                <strong>Texto: </strong>
                {item?.text}
              </p>
              <p className="text-muted">
                <strong>Estado: </strong> {booleanState(item?.enable)}
              </p>
              <Link
                className="btn btn-md btn-secondary mt-3 mx-auto w-25"
                to={`/admin/product/${item?.ProductId}`}
              >
                Cerrar
              </Link>
              <Edition
                allowedRoles={["Super Admin", "Administrador"]}
                onClick={() => {
                  navigate(`/admin/product/item/update/${item.id}`);
                }}
                text={"Editar"}
                className={"btn btn-md btn-primary mt-3 ms-2 mx-auto w-25"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
