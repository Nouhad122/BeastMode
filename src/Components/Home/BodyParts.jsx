import { useQuery } from '@tanstack/react-query'
import React from 'react'
import classes from './BodyParts.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { exercisesOptions, fetchData } from '../../util/http'
import { GiMuscularTorso } from "react-icons/gi";

const NextArrow = ({ onClick }) => {
  return <div className={classes.nextArrow} onClick={onClick}>›</div>;
};

const PrevArrow = ({ onClick }) => {
  return <div className={classes.prevArrow} onClick={onClick}>‹</div>;
};

var settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />, 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const BodyParts = ({ selectedBodyPart, setSelectedBodyPart, refetch}) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['bodyPartList'],
        queryFn: ({ signal }) => fetchData({
            url:'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
            options: exercisesOptions,
            signal
        }),
        staleTime: 1000 * 60 * 60
    })

    if(isPending){
      return <p>Fetching body part list...</p>
    }

    if(isError){
      return <p>{error.message || "Something Went Wrong!"}</p>
    }

    const bodyPartList = ['all', ...data];

    const handleBodyPartSelection = (bodyPart) =>{
      if(selectedBodyPart !== bodyPart){
        setSelectedBodyPart(bodyPart);
        refetch();
      }
        
    }
  

  return (
    <div className={`slider-container ${classes['bodyPart-container']}`}>
      <Slider {...settings}>
        {
          bodyPartList.map(bodyPart =>(
            <div className={classes['bodyPart-wrapper']}>
              <div className={`${classes['bodyPart-box']}
               ${selectedBodyPart === bodyPart ? `${classes['active']}` : ''}`}
               onClick={() => handleBodyPartSelection(bodyPart)}
              >
                <GiMuscularTorso className={classes['bodyPart-icon']}/>

                <h3 className={classes['bodyPart-header']}>{bodyPart}</h3>
                
              </div>
            </div>
          ))
        }
      
      </Slider>
    </div>
  )
}

export default BodyParts
