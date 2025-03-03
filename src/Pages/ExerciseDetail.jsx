import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { exercisesOptions, fetchData, youtubeOptions } from '../util/http';
import { useParams } from 'react-router';
import Details from '../Components/ExerciseDetail/Details';
import ExerciseVideos from '../Components/ExerciseDetail/ExerciseVideos';
import SimilarTarget from '../Components/ExerciseDetail/SimilarTarget';
import Loader from '../Components/Loader/Loader';

const ExerciseDetail = () => {
  const { id } = useParams();

  const { data: exercise, isLoading, isError, error: detailsError } = useQuery({
    queryKey: ['exercises', id],
    queryFn: ({ signal }) => fetchData({ url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, options: exercisesOptions, signal }),
    staleTime: 1000 * 60 * 60
  });

  const { data: exerciseVideos, isLoading: isLoadingVideos, isError: isVideosError, error: videosError } = useQuery({
    queryKey: ['exercise-videos', exercise?.name],
    queryFn: ({ signal }) => fetchData({
      url: `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise?.name}`,
      options: youtubeOptions,
      signal
    }),
    staleTime: 1000 * 60 * 60,
    enabled: !!exercise?.name
  });

  const { data: similarTargetExercises, isLoading: isLoadingTarget, isError: isTargetError, error: targetError } = useQuery({
    queryKey: ['similarTargetExercises', exercise?.target],
    queryFn: ({signal}) => fetchData({
      url:`https://exercisedb.p.rapidapi.com/exercises/target/${exercise.target}?limit=10&offset=0`,
      options: exercisesOptions,
      signal
    }),
    staleTime: 1000 * 60 * 60,
    enabled: !!exercise?.target
  });

  const { data: similarEquipmentExercises, isLoading: isLoadingEquipment, isError: isEquipmentError, error: equipmentError } = useQuery({
    queryKey: ['similarEquipmentExercises', exercise?.equipment],
    queryFn: ({signal}) => fetchData({
      url:`https://exercisedb.p.rapidapi.com/exercises/equipment/${exercise.equipment}?limit=10&offset=0`,
      options: exercisesOptions,
      signal
    }),
    staleTime: 1000 * 60 * 60,
    enabled: !!exercise?.equipment
  });

  if (isLoading || isLoadingVideos || isLoadingTarget || isLoadingEquipment) {
    return <Loader />;
  }

  if (isError) {
    return <p>{detailsError?.message || 'Could not load exercise details. Please try again later.'}</p>;
  }
  if (isVideosError) {
    return <p>{videosError?.message || 'Could not load exercise videos. Please try again later.'}</p>;
  }
  if(isTargetError){
    return <p>{targetError?.message || 'Could not load similar target exercises. Please try again later.'}</p>;
  }
  if(isEquipmentError){
    return <p>{equipmentError?.message || 'Could not load similar equipment exercises. Please try again later.'}</p>;
  }
  

  return (
    <>
      <Details exercise={exercise} />
      <ExerciseVideos exerciseVideos={exerciseVideos} exerciseName={exercise.name} />
      <SimilarTarget
       similarExercises={similarTargetExercises} 
       similarity={exercise.target}
       headerContent="to target"
      />
      <SimilarTarget 
        similarExercises={similarEquipmentExercises} 
        similarity={exercise.equipment}
        headerContent="using"
      />
    </>
  );
};

export default ExerciseDetail;
