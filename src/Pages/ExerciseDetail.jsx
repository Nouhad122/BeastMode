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
         alt='exercise name' 
       /> 
        </div>
      
      <div className={classes['exercise-text']}>
        <h1 className={classes['exercise-name']}>Exercise Name</h1>
        <h5 className={classes['sub-headings']}>
            <span>bodyPart</span>
            <span>target</span>
        </h5>
        <p className={classes['sub-headings']}>
            <strong>secondary muscles:</strong>
            <span>waist</span>
            <span>biceps</span>
        </p>
        <div className={classes['instructions-wrapper']}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
            <p>The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
      </div>
    </section>
  )
}

export default ExerciseDetail
