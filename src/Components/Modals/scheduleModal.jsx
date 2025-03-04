import React, { useEffect } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import DaysOfWeek from '../sharedComps/DaysOfWeek';
import Modal from './Modal';

const ScheduleModal = ({ onClose, exercise }) => {
    useEffect(() =>{
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    },[]);

    const dispatch = useDispatch();
    const addExerciseToSchedule = (day) =>{
      dispatch(scheduleActions.addToSchedule({day, newExercise: exercise}));
      onClose();
    }

  return createPortal(
    <Modal header="Select a Day to Schedule This Exercise" onClose={onClose}>
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
    </Modal>
  , document.getElementById('modal'));
};

export default ScheduleModal;

