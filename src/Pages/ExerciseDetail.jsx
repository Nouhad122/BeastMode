import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { exercisesOptions, fetchExerciseDetail } from '../util/http';
import { useParams } from 'react-router';
import classes from './ExerciseDetail.module.css'

const ExerciseDetail = () => {
    const { id } = useParams();
    const { data: exercise, isPending, isError, error} = useQuery({
        queryKey: ['exercises', id],
        queryFn: ({signal}) => fetchExerciseDetail({id, options: exercisesOptions, signal}),
        staleTime: 1000 * 60 * 60
    });
    if(isPending){
      return <p>Loading...</p>
    }
    if(isError){
      return <p>{error.message || 'Something went wrong'}</p>
    }
  return (
    <section className={classes['exercise-detail']}>
      <div className={classes['exercise-image']}>
        <img
         src={exercise.gifUrl} 
         alt={exercise.name}
       /> 
      </div>
      
      <div className={classes['exercise-text']}>
        <h1 className={classes['exercise-name']}>{exercise.name}</h1>
        <h5 className={classes['sub-headings']}>
            <span>{exercise.bodyPart}</span>
            <span>{exercise.target}</span>
        </h5>
        <p className={classes['sub-headings']}>
            <strong>secondary muscles:</strong>
            {
              exercise.secondaryMuscles.map(muscle => <span key={muscle}>{muscle}</span>)
            }
        </p>
        <ul className={classes['instructions-wrapper']}>
          {
            exercise.instructions.map(instruction => <li key={instruction}>{instruction}</li>)
          }
        </ul>
      </div>
    </section>
  )
}

export default ExerciseDetail
