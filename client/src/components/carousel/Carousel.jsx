import './carouselStyle.css'
import { Carousel } from 'react-bootstrap';



const MyCarousel = ({ info }) => {
  return (
    <Carousel>
      {info?.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.landing}
            alt={item.title}
          />
          <Carousel.Caption className='carousel-caption'>
            <h2 className='h3'>{item.title}</h2>
            <p>{item.infoHeader}</p>
            <p>
              <a className="btn btn-lg btn-ligth fw-bold border-white bg-white" href={`/detalle/${item.id}`} rel="noreferrer">
                Vea mas...
              </a>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;