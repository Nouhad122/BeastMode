import React, { useContext } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import DaysOfWeek from '../sharedComps/DaysOfWeek';
import Modal from './Modal';
import ModalContext from '../../Context/ModalContext';

const ScheduleModal = ({ exercise }) => {
  const { hideSchedule } = useContext(ModalContext);

  const dispatch = useDispatch();
  const addExerciseToSchedule = (day) =>{
    dispatch(scheduleActions.addToSchedule({day, newExercise: exercise}));
    hideSchedule();
  }

  return createPortal(
    <Modal header="Select a Day to Schedule This Exercise" onClose={hideSchedule}>
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

