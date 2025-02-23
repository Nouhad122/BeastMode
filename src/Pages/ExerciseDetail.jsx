import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { exercisesOptions, fetchData, fetchExerciseDetail, youtubeOptions } from '../util/http';
import { useParams } from 'react-router';
import Details from '../Components/ExerciseDetail/Details';
import ExerciseVideos from '../Components/ExerciseDetail/ExerciseVideos';

const ExerciseDetail = () => {
  const { id } = useParams();

  const { data: exercise, isLoading, isError, error } = useQuery({
    queryKey: ['exercises', id],
    queryFn: ({ signal }) => fetchExerciseDetail({ id, options: exercisesOptions, signal }),
    staleTime: 1000 * 60 * 60
  });

  const { data: exerciseVideos, isLoading: isLoadingVideos, isError: isVideosError, error: videosError } = useQuery({
    queryKey: ['exercises-videos', exercise?.name],
    queryFn: ({ signal }) => fetchData({
      url: `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise?.name}`,
      options: youtubeOptions,
      signal
    }),
    staleTime: 1000 * 60 * 60,
    enabled: !!exercise?.name
  });

  if (isLoading || isLoadingVideos) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{detailsError?.message || 'Could not load exercise details. Please try again later.'}</p>;
  }
  if (isVideosError) {
    return <p>{videosError?.message || 'Could not load exercise videos. Please try again later.'}</p>;
  }
  

  return (
    <>
      <Details exercise={exercise} />
      <ExerciseVideos exerciseVideos={exerciseVideos} exerciseName={exercise.name} />
    </>
  );
};

export default ExerciseDetail;
