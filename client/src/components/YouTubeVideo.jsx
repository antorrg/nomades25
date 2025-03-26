import React, { useState, useEffect } from "react";
import { Container, Row, Col, Ratio, Button } from "react-bootstrap";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Arr from "../utils/SlickCarousel";

const YouTubeVideo = ({ media }) => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const videoList = media.filter((video) => video.type === "youtube");
  let videos = videoList[0] || {
    id: "0",
    title: "Videos de you tube",
    text: "Aguarde un momento...",
    url: "",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [mainVideo, setMainVideo] = useState(videos);

  useEffect(() => {
    if (isLoading && videoList.length > 0) {
      setMainVideo(videoList[0]);
      setIsLoading(false); // Marcar que ya no estamos cargando
    }
  }, [videoList, isLoading]);
  const showCarousel = videoList.length > 1 ? true : false;

  const handleVideoSelect = (video) => {
    setMainVideo(video);
  };

  const videoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/))([^\s&]+)/
    );
    return match ? match[1] : null;
  };

  return (
    <Container>
      {/* Video principal */}
      <Row className="featurette mt-5">
        <Col xs={12} md={5}>
          {authenticated ? (
            <Button
              className="mt-2 me-3 w-20"
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/admin/media/create?type=youtube")}
            >
              Crear
            </Button>
          ) : null}
          <h2 className="featurette-heading fw-normal lh-1">
            {mainVideo.title}
          </h2>
          <p className="lead">{mainVideo.text}</p>
        </Col>
        <Col xs={12} md={7}>
          <Ratio aspectRatio="16x9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId(mainVideo.url)}`}
              title={mainVideo.title}
              allowFullScreen
            />
          </Ratio>
        </Col>
      </Row>

      {/* Carrusel de miniaturas */}
      {showCarousel ? (
        <Row className="mt-4">
          <Slider {...Arr.sliderSettings}>
            {videoList.map((video) => (
              <div key={video.id} className="p-2">
                <Ratio aspectRatio="16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId(video.url)}`}
                    title={`Miniatura ${video.id}`}
                    allowFullScreen
                  />
                </Ratio>
                <Button
                  className="mt-2 w-20"
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleVideoSelect(video)}
                >
                  Ver video
                </Button>
              </div>
            ))}
          </Slider>
        </Row>
      ) : null}
    </Container>
  );
};

export default YouTubeVideo;

// const videoList = [
//   {
//     id: '6',
//     title: 'Video 1',
//     description: 'Descripción del video 1.',
//     url: 'https://youtu.be/oRH5lH7F7TY',
//   },
//   {
//     id: '7',
//     title: 'Video 2',
//     description: 'Descripción del video 2.',
//     url: 'https://youtu.be/AHzxeA2aEk0',
//   },
//   {
//     id: '8',
//     title: 'Video 3',
//     description: 'Descripción del video 3.',
//     url: 'https://youtu.be/0apXgMZ52nM?si=2rnv_tCySeZ8RoPD',
//   },
// ];
