import React from 'react'
import classes from './Exercises.module.css'
import ExerciseCard from './ExerciseCard';

const Exercises = ({ searchTerm, exercises, isFetching, isError, error }) => { 
    let targetedExercises = [];

    if(exercises && searchTerm !== null){
      targetedExercises = exercises.filter(
              exercise =>
              exercise.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              exercise.bodyPart.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              exercise.equipment.toLowerCase().includes(searchTerm?.toLowerCase())||
              exercise.target.toLowerCase().includes(searchTerm?.toLowerCase())
            )
    }
    else{
      targetedExercises = exercises;
    }
    

  return (
      <div className={classes['exercises-list']}>
        {isFetching && <p>Fetching exercises...</p>}
        {isError && <p>{error.message || "Something Went Wrong!"}</p>}
        {
          !isFetching && !isError && targetedExercises.map(exercise =>(
            <ExerciseCard key={exercise.id} {...exercise}/>
          ))
        } 
      </div>
  )
}

export default Exercises
