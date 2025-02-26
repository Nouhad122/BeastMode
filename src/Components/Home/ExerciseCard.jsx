import React, { useState } from 'react';
import classes from './ExerciseCard.module.css';
import Button from '../sharedComps/Button';
import { Link } from 'react-router';
import ScheduleModal from '../Modals/scheduleModal';

const ExerciseCard = ({...exercise}) => {
  
  return (
    <>
    <div className={classes['exercise-card']}>
      <Link to={`/exercises/${exercise.name}/${exercise.id}`} className={classes['card-link']}>
        <img src={exercise.gifUrl} alt={exercise.name}/>
        <h5 className={classes['sub-headings']}>
          <span>{exercise.bodyPart}</span>
          <span>{exercise.target}</span>
        </h5>
        <h3 className={`${classes['exercise-name']} ${classes['header']}`}>{exercise.name}</h3>
        <p className={classes['exercise-equipment']}>
          Equipment: <span>{exercise.equipment}</span>
        </p>
      </Link>

      <Button 
        type="button" 
        className={classes['card-btn']}
        onClick={showScheduleModal}
      >
        Add To Schedule
      </Button>
    </div>

    {isOpenSchduleModal && <ScheduleModal />}
    </>
  )
}

export default ExerciseCard;
