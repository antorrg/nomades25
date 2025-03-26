import React, { useState, useEffect } from "react";
import { Container, Row, Col, Ratio, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Arr from "../../utils/SlickCarousel";
import { booleanState } from "../utils/generalHelpers";
import { deleteMedia } from "../utils/landingPageEndpoints";
import showConfirmationDialog from "../../Endpoints/sweetAlert";

const InstVideoView = ({ media }) => {
  const navigate = useNavigate();
  const videoList = media.filter((video) => video.type === "instagram");
  let videos = videoList[0] || {
    id: "02",
    type: "instagram",
    title: "Instagram",
    text: "Aguarde un momento...",
    url: "",
    enable: true,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [mainVideo, setMainVideo] = useState(videos);

  useEffect(() => {
    if (isLoading && videoList.length > 0) {
      setMainVideo(videoList[0]);
      setIsLoading(false); // Marcar que ya no estamos cargando
    }
  }, [videoList, isLoading]);

  const handleVideoSelect = (video) => {
    setMainVideo(video);
  };

  const getEmbedUrl = (url) => {
    const parts = url.split("/");
    const videoId = parts[parts.length - 2];
    return `https://www.instagram.com/reel/${videoId}/embed`;
  };

  //Borrar video:
  const deleteVideo = async (id) => {
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de eliminar el item?"
    );
    if (confirmed) {
      // Aquí iría la lógica para actualizar el elemento
      await deleteMedia(id);
    }
  };

  return (
    <Container>
      {/* Video Principal */}
      <Row className="featurette mt-5">
        <Col xs={12} md={5}>
          <Button
            className="mt-2 me-3 w-20"
            variant="outline-primary"
            size="sm"
            onClick={() => navigate("/admin/media/create?type=facebook")}
          >
            Crear
          </Button>
          <h2 className="featurette-heading fw-normal lh-1">
            {mainVideo.title}
          </h2>
          <p className="lead">{mainVideo.text}</p>
          <p className="lead">
            <strong>Estado: </strong> {booleanState(mainVideo.enable)}
          </p>
        </Col>
        <Col xs={12} md={7}>
          <Ratio aspectRatio="16x9">
            <iframe
              src={getEmbedUrl(mainVideo.url)}
              title="Instagram Reel"
              frameBorder="0"
              allowFullScreen
            />
          </Ratio>
        </Col>
      </Row>

      {/* Lista de Miniaturas */}
      <Row className="mt-4">
        <Slider {...Arr.sliderSettings}>
          {videoList.map((video) => (
            <div key={video.id} xs={5} md={3} lg={3} className="p-2">
              <Ratio aspectRatio="16x9">
                <iframe
                  src={getEmbedUrl(video.url)}
                  title={`Miniatura ${video.id}`}
                  frameBorder="0"
                  allowFullScreen
                />
              </Ratio>
              <Button
                className="mt-2 me-3 w-20"
                variant="outline-success"
                size="sm"
                onClick={() => handleVideoSelect(video)}
              >
                Ver video
              </Button>
              <Button
                className="mt-2 me-3 w-20"
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate(`/admin/media/update/${video.id}?type=instagram`)
                }
              >
                Editar
              </Button>
              <Button
                className="mt-2 me-3 w-20"
                variant="outline-danger"
                size="sm"
                onClick={() => deleteVideo(video.id)}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default InstVideoView;
