import React from 'react';
import classes from './ScheduledCard.module.css';
import { BsTrash } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import { Link } from 'react-router';

const ScheduledCard = ({ exercise, day }) => {
  const dispatch = useDispatch();

  const removeFromSchedule = () => {
    dispatch(scheduleActions.removeFromSchedule({ day, exerciseId: exercise.id }));
  };

  return (
        <div className={classes['scheduled-card']}>
            <Link to={`/exercises/${exercise.name}/${exercise.id}`} className={classes['card-link']}>
                <img src={exercise.gifUrl} alt={exercise.name} className={classes['exercise-image']} />
                <div className={classes['exercise-info']}>
                    <h3 className={classes['exercise-name']}>{exercise.name}</h3>
                    <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                    <p><strong>Equipment:</strong> {exercise.equipment}</p>
                </div>
            </Link>
            <button className={classes['delete-btn']} onClick={removeFromSchedule}>
                    <BsTrash />
            </button>
        </div>
  );
};

export default ScheduledCard;
