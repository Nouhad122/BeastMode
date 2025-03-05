import React, {useContext} from 'react';
import classes from './ScheduledCard.module.css';
import { BsTrash } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import { Link } from 'react-router';
import ModalContext from '../../Context/ModalContext';
import InsuranceModal from '../Modals/InsuranceModal';

const ScheduledCard = ({ exercise, day }) => {
  const { insuranceIsOpen, scheduledId, showInsurance, hideInsurance } = useContext(ModalContext);
  const dispatch = useDispatch();

  const removeFromSchedule = () => {
    dispatch(scheduleActions.removeFromSchedule({ day, exerciseId: exercise.id }));
    hideInsurance();
  };

  return (
    <>
      <div className={classes['scheduled-card']}>
          <Link to={`/exercises/${exercise.name}/${exercise.id}`} className={classes['card-link']}>
              <img src={exercise.gifUrl} alt={exercise.name} className={classes['exercise-image']} />
              <div className={classes['exercise-info']}>
                  <h3 className={classes['exercise-name']}>{exercise.name}</h3>
                  <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                  <p><strong>Equipment:</strong> {exercise.equipment}</p>
              </div>
          </Link>
          <button className={classes['delete-btn']} onClick={() => showInsurance(exercise.id)}>
              <BsTrash />
          </button>
      </div>

        {insuranceIsOpen && scheduledId && scheduledId === exercise.id && ( 
        <InsuranceModal 
         text="Are You Sure You Want to Remove Exercise From Schedule?"
         action={removeFromSchedule}
        />)}
    </>
  );
};

export default ScheduledCard;
