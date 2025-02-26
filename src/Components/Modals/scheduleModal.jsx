import React from 'react';
import classes from './ScheduleModal.module.css';
import { createPortal } from 'react-dom';

const ScheduleModal = ({ onClose }) => {
  return createPortal(
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal']} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes['modal-title']}>Choose a Day</h2>
        <ul className={classes['day-list']}>
          <li className={classes['day-item']}>Monday</li>
          <li className={classes['day-item']}>Tuesday</li>
          <li className={classes['day-item']}>Wednesday</li>
          <li className={classes['day-item']}>Thursday</li>
          <li className={classes['day-item']}>Friday</li>
          <li className={classes['day-item']}>Saturday</li>
          <li className={classes['day-item']}>Sunday</li>
        </ul>
        <button className={classes['close-btn']} onClick={onClose}>Close</button>
      </div>
    </div>
  , document.getElementById('modal'));
};

export default ScheduleModal;

