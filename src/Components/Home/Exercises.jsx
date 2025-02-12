import React, { useEffect, useState } from 'react'
import classes from './Exercises.module.css'
import { useLoaderData } from 'react-router';

const Exercises = () => {  
    // const exercises = useLoaderData();
    const [searchTerms, setSearchTerms] = useState('');  
    // const [searchedExercises, setSearchedExersices] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() =>{
    //   if(searchedExercises){
    //     setTimeout(() => setLoading(false), 1000);
    //   }
    // },[searchedExercises]);

    const handleInputChange = (event) =>{
      setSearchTerms(event.target.value);
    }
    
    // const handleSearchResults = () =>{
    //   if(searchTerms.trim() !== ''){
    //     const filteredExercises = exercises.filter(exercise => JSON.stringify(exercise).includes(searchTerms.toLowerCase()));
    //     setSearchedExersices(filteredExercises)
    //   } 
    // }

    // if(loading){
    //   return <p>Fetching exercises...</p>
    // }

  return (
    <>
      <div className={classes['exercises-search']}>
        <h1 className={classes['header']}>Search For Exercises</h1>
        <div className={classes['search-input']}>
          <input type='text' id='text' name='text' value={searchTerms} onChange={handleInputChange} />
          <button className={classes['btn']}>Search</button>
        </div>
      </div>

      <div className={classes['exercises-list']}>
        {/* {
          searchedExercises.map(exercise =>( */}
            <div className={classes['exercise-card']}>
              <img src="https://v2.exercisedb.io/image/EAZ-j7IevIhqKJ" alt=''/>
              <h5 className={classes['sub-headings']}>
                <span>waist</span>
                <span>abs</span>
              </h5>
              <h3 className={`${classes['exercise-name']} ${classes['header']}`}>exercise name</h3>
            </div>

            <div className={classes['exercise-card']}>
              <img src="https://v2.exercisedb.io/image/EAZ-j7IevIhqKJ" alt=''/>
              <h5 className={classes['sub-headings']}>
                <span>waist</span>
                <span>abs</span>
              </h5>
              <h3 className={`${classes['exercise-name']} ${classes['header']}`}>exercise name</h3>
            </div>

            <div className={classes['exercise-card']}>
              <img src="https://v2.exercisedb.io/image/EAZ-j7IevIhqKJ" alt=''/>
              <h5 className={classes['sub-headings']}>
                <span>waist</span>
                <span>abs</span>
              </h5>
              <h3 className={`${classes['exercise-name']} ${classes['header']}`}>exercise name</h3>
            </div>
          {/* ))
        } */}
      </div>
    </>
  )
}

export default Exercises
