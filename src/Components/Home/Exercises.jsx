import React, { useRef, useState } from 'react'
import classes from './Exercises.module.css'
import { useQuery } from '@tanstack/react-query';
import { exercisesOptions, fetchExercises } from '../../util/http';
import ExerciseCard from './ExerciseCard';
import Button from '../sharedComps/Button';

const Exercises = () => {
    const searchElement = useRef();  
    const [searchTerm, setSearchTerm] = useState(null);
    
    const { data: exercises, isFetching, isError, error, refetch} = useQuery({
      queryKey: ['exercises'],
      queryFn: ({ signal }) => fetchExercises(
        { 
          url: 'https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0',
          options: exercisesOptions,
          signal
         }),
      enabled: searchTerm !== undefined,
      staleTime: 1000 * 60 * 60
    });

    const searchedExercises = exercises && exercises.filter(
      exercise =>
      exercise.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm?.toLowerCase())||
      exercise.target.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    
    const handleSearchResults = (event) =>{
      event.preventDefault();
      if(searchElement.current.value.trim() !== ''){
        setSearchTerm(searchElement.current.value);
        refetch();
      }
    }

  return (
    <section>
      <div className={classes['exercises-search']}>
        <h1 className={classes['header']}>Search For Exercises</h1>
        <form onSubmit={handleSearchResults} className={classes['search-input']}>
          <input type='text' id='text' name='text' ref={searchElement} />
          <Button type='submit' className={classes['search-btn']}>Search</Button>
        </form>
      </div>

      <div className={classes['exercises-list']}>
        {!searchTerm && <p>Please search for exercises</p>}
        {searchTerm && isFetching && <p>Fetching exercises...</p>}
        {isError && <p>{error.message || "Something Went Wrong!"}</p>}
        {
          !isFetching && !isError && searchedExercises && searchedExercises.map(exercise =>(
            <ExerciseCard {...exercise}/>
          ))
        } 
      </div>
    </section>
  )
}

export default Exercises
