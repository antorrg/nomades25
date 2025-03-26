import React from 'react';
import { Nav, Container, Row } from 'react-bootstrap';


const TabsLayout = ({ activeTab, handleTabChange, sessionCleaner, children }) => {
 
  return (
    <div>
      <div className="coverBack">
        <Container className="colorAdmin pb-3">
          <Row>
            {/* Navegación por tabs */}
            <Nav variant="tabs" className="ms-2 mb-0" id="nav-tab" role="tablist">
            <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('producto')} active={activeTab === 'producto'}>
                  Productos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('portada')} active={activeTab === 'portada'}>
                  Portada
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('work')} active={activeTab === 'work'}>
                  Nuestro trabajo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('about')} active={activeTab === 'about'}>
                  Acerca
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('users')} active={activeTab === 'users'}>
                  Usuarios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('imagenes')} active={activeTab === 'imagenes'}>
                  Imágenes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('videos')} active={activeTab === 'videos'}>
                  Videos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange('config')} active={activeTab === 'config'}>
                  Configuración
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link onClick={() => handleTabChange('ayuda')} active={activeTab === 'ayuda'}>
                  Ayuda
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={sessionCleaner} active={activeTab === 'logout'}>
                  Cerrar sesión
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Container fluid className="d-flex flex-nowrap colorTab ">
            {/* Contenido dinámico */}
            {children}
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default TabsLayout;
