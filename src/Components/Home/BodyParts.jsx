import { useQuery } from '@tanstack/react-query'
import React from 'react'
import classes from './BodyParts.module.css';
import { exercisesOptions, fetchData } from '../../util/http'

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

    const bodyPartList = data && ['all', ...data] || [];

    const handleBodyPartSelection = (bodyPart) =>{
        setSelectedBodyPart(bodyPart);
        refetch();
    }

  return (
    <div className={classes['bodyParts-container']}>
      {bodyPartList.map(bodyPart =>
        <p
          key={bodyPart} 
          className={`${classes['bodyParts-title']} ${selectedBodyPart === bodyPart ? `${classes['active']}` : ''}`}
          onClick={() => handleBodyPartSelection(bodyPart)}
        >
        { bodyPart }
        </p>)}
    </div>
  )
}

export default BodyParts
