import React from 'react'
import classes from './Exercises.module.css'
import ExerciseCard from './ExerciseCard';

const Exercises = ({ searchTerm, exercises, isFetching, isError, error }) => { 

    const searchedExercises = exercises && exercises.filter(
      exercise =>
      exercise.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm?.toLowerCase())||
      exercise.target.toLowerCase().includes(searchTerm?.toLowerCase())
    )

  return (
      <div className={classes['exercises-list']}>
        {isFetching && <p>Fetching exercises...</p>}
        {isError && <p>{error.message || "Something Went Wrong!"}</p>}
        {
          !isFetching && !isError && (searchedExercises.length > 0 ? searchedExercises : exercises).map(exercise =>(
            <ExerciseCard {...exercise}/>
          ))
        } 
      </div>
  )
}

export default Exercises
