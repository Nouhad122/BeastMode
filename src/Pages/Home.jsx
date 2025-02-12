import React from 'react'
import ImageBox from '../Components/Home/ImageBox'
import Exercises from '../Components/Home/Exercises'
import { exercisesOptions, fetchData } from '../util/http'

const Home = () => {
  return (
    <>
      <ImageBox />
      <section>
        <Exercises />
      </section>
    </>
  )
}

export default Home

export const loader = async () =>{
  const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1324',
   exercisesOptions);

   return exercisesData;
}
