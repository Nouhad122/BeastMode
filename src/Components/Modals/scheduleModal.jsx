import React, { useEffect } from 'react';
import classes from './ScheduleModal.module.css';
import { createPortal } from 'react-dom';
import Button from '../sharedComps/Button';
import { BsPlusCircleFill } from "react-icons/bs";

const ScheduleModal = ({ onClose }) => {
    useEffect(() =>{
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    })
  return createPortal(
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal']} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes['modal-title']}>Select a Day to Schedule This Exercise</h2>
        <ul className={classes['day-list']}>
          <li className={classes['day-item']}>Monday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Tuesday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Wednesday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Thursday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Friday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Saturday <BsPlusCircleFill /></li>
          <li className={classes['day-item']}>Sunday <BsPlusCircleFill /></li>
        </ul>
        <Button type="button" onClick={onClose}>Close</Button>
      </div>
    </div>
  , document.getElementById('modal'));
};

export default ScheduleModal;

