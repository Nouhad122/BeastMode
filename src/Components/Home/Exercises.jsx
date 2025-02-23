import React from 'react'
import ExerciseCard from './ExerciseCard';

const Exercises = ({ searchTerm, exercises, isFetching, isError, error }) => { 
    const targetedExercises = searchTerm ?
      exercises?.filter(exercise =>
      ["name", "bodyPart", "equipment", "target"]
      .some(key => exercise[key].toLowerCase().includes(searchTerm.toLowerCase()))
      ) : exercises ;

      if(targetedExercises && targetedExercises.length === 0){
        return <p>Your search doesn't match any exercise for the chosen body part</p>
      }
    

  return (
      <div className='list-wrapper'>
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
