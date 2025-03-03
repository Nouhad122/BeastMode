import { useQuery } from '@tanstack/react-query'
import React from 'react'
import classes from './BodyParts.module.css'
import { exercisesOptions, fetchData } from '../../util/http'
import { GiMuscularTorso } from "react-icons/gi";
import SliderComp from '../sharedComps/Slider.jsx';
import LoadingText from '../Loader/LoadingText.jsx';

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
      return <LoadingText text="Please wait. This may take a few seconds..."/>
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
    <SliderComp>
        {
          bodyPartList.map(bodyPart =>(
            <div className={classes['bodyPart-wrapper']} key={bodyPart}>
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
      
      </SliderComp>
  )
}

export default BodyParts
