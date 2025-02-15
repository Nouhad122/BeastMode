import React, { useRef } from 'react'
import classes from './SearchInput.module.css'
import Button from '../sharedComps/Button'

const SearchInput = ({ refetch, setSearchTerm}) => {
    const searchElement = useRef(); 

    const handleSearchResults = (event) =>{
        event.preventDefault();
        if(searchElement.current.value.trim() !== ''){
          setSearchTerm(searchElement.current.value);
          refetch();
        }
      }

  return (
    <div className={classes['exercises-search']}>
        <h1 className={classes['header']}>Search For Exercises</h1>
        <form onSubmit={handleSearchResults} className={classes['search-input']}>
            <input type='text' id='text' name='text' ref={searchElement} />
            <Button type='submit' className={classes['search-btn']}>Search</Button>
        </form>
    </div>
  )
}

export default SearchInput
