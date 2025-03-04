import React, { useState } from 'react';
import Exercises from '../Components/Exercises/Exercises';
import SearchInput from '../Components/Exercises/SearchInput';
import { useQuery } from '@tanstack/react-query';
import { exercisesOptions, fetchData } from '../util/http';
import BodyParts from '../Components/Exercises/BodyParts';

const ExercisesPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [searchTerm, setSearchTerm] = useState(null);

  const url = selectedBodyPart === 'all' ?
          'https://exercisedb.p.rapidapi.com/exercises?limit=1323&offset=0':
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}?limit=1323&offset=0`;

  const { data: exercises, isFetching, isError, error, refetch} = useQuery({
      queryKey: ['exercises', selectedBodyPart, searchTerm],
      queryFn: ({ signal }) => fetchData(
        { 
            url,
            options: exercisesOptions,
            signal
        }),
      staleTime: 1000 * 60 * 60
  });
  return (
    <section style={{minHeight: '100vh'}}>
        <SearchInput
         setSearchTerm={setSearchTerm}
         refetch={refetch}
        />
        
        <BodyParts
         selectedBodyPart={selectedBodyPart} 
         setSelectedBodyPart={setSelectedBodyPart}
         refetch={refetch}
        />

        <Exercises
         selectedBodyPart={selectedBodyPart}
         searchTerm={searchTerm} 
         exercises={exercises} 
         isFetching={isFetching} 
         isError={isError} 
         error={error}
        />  
    </section>
  )
}

export default ExercisesPage
