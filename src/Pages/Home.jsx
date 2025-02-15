import React, { useState } from 'react'
import ImageBox from '../Components/Home/ImageBox'
import Exercises from '../Components/Home/Exercises'
import SearchInput from '../Components/Home/SearchInput'
import { useQuery } from '@tanstack/react-query';
import { exercisesOptions, fetchData } from '../util/http';
import BodyParts from '../Components/Home/BodyParts';

const Home = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [searchTerm, setSearchTerm] = useState(null);

  const url = selectedBodyPart === 'all' ?
        'https://exercisedb.p.rapidapi.com/exercises':
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`;

  const { data: exercises, isFetching, isError, error, refetch} = useQuery({
      queryKey: ['exercises', selectedBodyPart],
      queryFn: ({ signal }) => fetchData(
        { 
          url,
          options: exercisesOptions,
          signal
        }),
      staleTime: 1000 * 60 * 60
  });

  return (
    <>
      <ImageBox />

      <section>
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
    </>
  )
}

export default Home

