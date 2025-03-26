import Slider from 'react-slick'


export const CustomPrevArrow = ({ onClick }) => (
    <button
      className="custom-arrow prev-arrow"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        position: "absolute",
        left: "-30px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <i className="bi bi-chevron-left" style={{ fontSize: "3rem", color: "black" }}></i>
    </button>
  );
  
 export const CustomNextArrow = ({ onClick }) => (
    <button
      className="custom-arrow next-arrow"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        position: "absolute",
        right: "-30px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <i className="bi bi-chevron-right" style={{ fontSize: "3rem", color: "black", backgroundColor:'transparent' }}></i>
    </button>
  );
  
  export const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // Phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };