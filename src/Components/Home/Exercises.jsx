import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import usePagination from '../../hooks/usePagination';
import Pagination from '../sharedComps/Pagination';

const Exercises = ({ searchTerm, selectedBodyPart, exercises, isFetching, isError, error }) => { 
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedBodyPart]);

  const targetedExercises = searchTerm ?
    exercises?.filter(exercise =>
      ["name", "bodyPart", "equipment", "target"]
      .some(key => exercise[key].toLowerCase().includes(searchTerm.toLowerCase()))
    ) : exercises;

  const { currentItems, pageCount, handlePageClick } = usePagination({
    items: targetedExercises,
    itemsPerPage,
    currentPage,
    setCurrentPage
  });

  if (isFetching) {
    return <p>Fetching exercises...</p>;
  }

  if (isError) {
    return <p>{error.message || "Something Went Wrong!"}</p>;
  }

  if (targetedExercises && targetedExercises.length === 0) {
    return <p>Your search doesn't match any exercise for the chosen body part</p>;
  }

  return (
    <>
      <div className='list-wrapper'>
        {currentItems.map(exercise => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
      </div>
      {
        targetedExercises.length > itemsPerPage && 
        (
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        )
      }
      
    </>
  );
};

export default Exercises;
