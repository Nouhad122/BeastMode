import classes from './Slider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NextArrow = ({ onClick }) => {
     return <div className={classes.nextArrow} onClick={onClick}>›</div>;
  };
  
    const PrevArrow = ({ onClick }) => {
      return <div className={classes.prevArrow} onClick={onClick}>‹</div>;
    };
  
  export var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />, 
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 825,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

   const SliderComp = ({children}) =>{
    return(
      <div className={`slider-container ${classes['slider-all']}`}>
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    )
    
  }

  export default SliderComp