import React, { useMemo } from 'react';
import classes from './ExerciseVideos.module.css';

const ExerciseVideos = ({ exerciseVideos, exerciseName }) => {
  const videos = useMemo(() => exerciseVideos?.contents?.filter((item) => item.video) || [], [exerciseVideos]);

  return (
    <section>
        <h1 className={classes['exercise-title-wrapper']}>
            Watch <span className={classes['exercise-name']}>
            {exerciseName}
            </span> exercise videos
        </h1>
        <div className={`list-wrapper ${classes['videos-wrapper']}`}>
            {videos.length === 0 && (
                    <p>No videos found for this exercise. Try searching on YouTube.</p>
                )}

            {videos.slice(0, 8).map((item, index) => (
                <a
                key={index}
                className={classes['exercise-video']}
                aria-label={`Watch ${item.video.title} on YouTube`}
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                target='_blank'
                rel='noreferrer'
                >
                <img src={item.video.thumbnails[0].url} alt={`Thumbnail for ${item.video.title}`} />
                <p className={classes['video-title']}>{item.video.title}</p>
                <p className={classes['video-channelName']}>{item.video.channelName}</p>
                </a>
            ))}
        </div>
      
    </section>
  );
};

export default ExerciseVideos;
