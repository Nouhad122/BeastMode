import React, { useContext, useEffect } from 'react';
import classes from './ScheduleModal.module.css';
import { createPortal } from 'react-dom';
import Button from '../sharedComps/Button';
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import DaysOfWeek from '../sharedComps/DaysOfWeek';

const ScheduleModal = ({ onClose, exercise }) => {
    useEffect(() =>{
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    },[]);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const dispatch = useDispatch();
    const addExerciseToSchedule = (day) =>{
      dispatch(scheduleActions.addToSchedule({day, newExercise: exercise}));
      onClose();
    }

  return createPortal(
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal']} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes['modal-title']}>Select a Day to Schedule This Exercise</h2>
        <ul className={classes['day-list']}>
          <DaysOfWeek>
            {
              (day) =>(
                <li key={day} className={classes['day-item']}
                 onClick={() => addExerciseToSchedule(day.toLowerCase())}
                >
                  {day} <BsPlusCircleFill />
                </li>
              )
            }
          </DaysOfWeek>  
        </ul>
        <Button type="button" onClick={onClose}>Close</Button>
      </div>
    </div>
  , document.getElementById('modal'));
};

export default ScheduleModal;

