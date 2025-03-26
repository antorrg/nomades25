import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import { showSuccess } from "../../Endpoints/HandlerError";
import showConfirmationDialog from "../../Endpoints/sweetAlert";
import TabsLayout from "./TabsLayout";
import * as Comp from "./Index";
import Usuario from "./TabsComponents/User";
import Portada from "./TabsComponents/Portada";
import Config from "./TabsComponents/Config";

const TabsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Lee el parámetro "tab" de la URL. Si no existe, usa un valor predeterminado.
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "producto";

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (activeTab) => {
    activeTab === "videos"
      ? navigate(`/admin?tab=videos&subtab=facebook`)
      : navigate(`/admin?tab=${activeTab}`); // Actualiza la URL.
    setActiveTab(activeTab);
  };

  const sessionCleaner = async () => {
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de cerrar sesión?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      showSuccess("Sesión cerrada");
      navigate("/");
      setTimeout(() => {
        logout();
      }, 1000);
    }
  };

  return (
    <>
      <TabsLayout
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sessionCleaner={sessionCleaner}
      >
        {activeTab === "producto" && <Comp.Producto />}
        {activeTab === "portada" && <Comp.LandingView />}
        {activeTab === "work" && <Comp.AdminAlbumWork />}
        {activeTab === "about" && <Portada />}
        {activeTab === "users" && <Usuario />}
        {activeTab === "imagenes" && <Comp.ImagesComponent />}
        {activeTab === "videos" && <Comp.Videos />}
        {activeTab === "config" && <Config />}
        {activeTab === "ayuda" && <Comp.HelpView />}
      </TabsLayout>
    </>
  );
};

export default TabsPage;
