import React, { useContext, useState } from 'react';
import classes from './ExerciseCard.module.css';
import Button from '../sharedComps/Button';
import { Link } from 'react-router';
import ScheduleModal from '../Modals/scheduleModal';
import ModalContext from '../../Context/ModalContext';
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';

const ExerciseCard = ({scheduledExercise, day, ...exercise}) => {
  const { scheduleIsOpen, showSchedule, hideSchedule, selectedExercise } = useContext(ModalContext);
  const dispatch = useDispatch();

  const removeFromSchedule = () =>{
    dispatch(scheduleActions.removeFromSchedule({day, exerciseId: exercise.id}));
  }

  const handleCardBtn = () =>{
    if(scheduledExercise){
      removeFromSchedule();
    }
    else{
      showSchedule(exercise);
    }
  }
  return (
    <>
    <div className={`${classes['exercise-card']} ${scheduledExercise ? classes['scheduled-card'] : undefined}`}>
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
        onClick={handleCardBtn}
      >
        {scheduledExercise ? 'Remove From Schedule' : 'Add To Schedule'}
      </Button>
    </div>

    {scheduleIsOpen && selectedExercise?.id === exercise.id &&(
      <ScheduleModal onClose={hideSchedule} exercise={selectedExercise}/>
    )}
    </>
  )
}

export default ExerciseCard;
