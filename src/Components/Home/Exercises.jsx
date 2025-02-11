import React, { useEffect, useState } from 'react'
import classes from './Exercises.module.css'
import { useLoaderData } from 'react-router';

const Exercises = () => {  
    const exercises = useLoaderData();
    const [searchTerms, setSearchTerms] = useState('');  
    const [searchedExercises, setSearchedExersices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
      if(searchedExercises){
        setTimeout(() => setLoading(false), 1000);
      }
    },[searchedExercises]);

    const handleInputChange = (event) =>{
      setSearchTerms(event.target.value);
    }
    
    const handleSearchResults = () =>{
      if(searchTerms.trim() !== ''){
        const filteredExercises = exercises.filter(exercise => JSON.stringify(exercise).includes(searchTerms.toLowerCase()));
        setSearchedExersices(filteredExercises)
      } 
    }

    if(loading){
      return <p>Fetching exercises...</p>
    }

  return (
    <>
      <div className={classes['exercises-search']}>
        <h1>Search For Exercises</h1>
        <div className={classes['search-input']}>
          <input type='text' id='text' name='text' value={searchTerms} onChange={handleInputChange} />
          <button onClick={handleSearchResults}>Search</button>
        </div>
      </div>

      <div className={classes['exercises-list']}>
        {
          searchedExercises.map(exercise =>(
            <div className={classes['exercices-card']} key={exercise.id}>
              {/* <img src={exercise.gifUrl} alt={exercise.name}/> */}
              <h5>
                <span>{exercise.bodyPart}</span>
                <span>{exercise.target}</span>
              </h5>
              <h3>{exercise.name}</h3>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Exercises
