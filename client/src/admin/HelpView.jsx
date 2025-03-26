import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import * as text from "./utils/infoHelpers";

const HelpView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-sm">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Productos:</Accordion.Header>
            <Accordion.Body>
              <strong>Elemento principal en importancia. </strong>
              {text.helpProducto}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Portada:</Accordion.Header>
            <Accordion.Body>
              <strong>
                Esta es la segunda pestaña que hallamos en admin.{" "}
              </strong>
              {text.helpPortada}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Nuestro trabajo:</Accordion.Header>
            <Accordion.Body>
              <strong>
                Damos detalles a los clientes acerca de lo que hacemos, su
                calidad, etc.{" "}
              </strong>
              {text.helpWork}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Acerca de: (Quienes somos)</Accordion.Header>
            <Accordion.Body>
              <strong>Queda pendiente para hacerla dinamica. </strong>
              {text.helpAbout}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Usuarios</Accordion.Header>
            <Accordion.Body>
              <strong>Tipos de usuarios. </strong>
              {text.helpUser}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Imagenes</Accordion.Header>
            <Accordion.Body>
              <strong>Seccion imagenes guardadas. </strong>
              {text.helpImages}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Videos</Accordion.Header>
            <Accordion.Body>
              <strong>Videos de Facebook, Instagram y YouTube. </strong>
              {text.helpVideos}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>Configuracion</Accordion.Header>
            <Accordion.Body>
              <strong>Queda preparada para posible ampliacion. </strong>
              {text.helpConfig}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default HelpView;
