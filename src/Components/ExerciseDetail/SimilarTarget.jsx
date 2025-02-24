import React from 'react'
import ExerciseCard from '../Home/ExerciseCard';
import SliderComp from '../sharedComps/Slider';
import classes from './ExerciseVideos.module.css';

const SimilarTarget = ({ similarTargetExercises, exerciseTarget }) => {
  return (
    <section>
        <h1 className={classes['exercise-title-wrapper']}>
            Watch <span className={classes['exercise-name']}>
            {exerciseTarget}
            </span> exercise videos
        </h1>
        <SliderComp>
            {
                similarTargetExercises.map(exercise =>(
                    <ExerciseCard key={exercise.id} {...exercise}/>
                ))
            }
        </SliderComp>
    </section>
  )
}

export default SimilarTarget
