import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Carousel as Slider } from "react-bootstrap";
import "./Carousel.css";

const Carousel = () => {
  const { webData } = useSelector((state) => state.web);
  return (
    <Fragment>
      <Slider controls={false}>
        <Slider.Item>
          <img
            className="d-block w-100"
            src={webData && webData.loginCarouselImage1}
            alt="First slide"
          />
        </Slider.Item>
        <Slider.Item>
          <img
            className="d-block w-100"
            src={webData && webData.loginCarouselImage2}
            alt="Second slide"
          />
        </Slider.Item>
        <Slider.Item>
          <img
            className="d-block w-100"
            src={webData && webData.loginCarouselImage3}
            alt="Third slide"
          />
        </Slider.Item>
      </Slider>
      <div className="overlay"></div>
    </Fragment>
  );
};

export default Carousel;
