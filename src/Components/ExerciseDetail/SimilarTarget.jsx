import React from 'react'
import ExerciseCard from '../Exercises/ExerciseCard';
import SliderComp from '../sharedComps/Slider';
import classes from './ExerciseVideos.module.css';

const SimilarTarget = ({ similarExercises, similarity, headerContent }) => {
  return (
    <section>
        <h1 className={classes['exercise-title-wrapper']}>
            similar exercises {headerContent}  <span className={classes['exercise-name']}>
            {similarity}
            </span>
        </h1>
        <SliderComp>
            {
                similarExercises.map(exercise =>(
                    <ExerciseCard key={exercise.id} {...exercise}/>
                ))
            }
        </SliderComp>
    </section>
  )
}

export default SimilarTarget
