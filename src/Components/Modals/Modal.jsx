import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Button from '../sharedComps/Button';
import classes from './Modal.module.css';

const Modal = ({ header, onClose, onlyText, children }) => {
   useEffect(() =>{
       document.body.style.overflow = "hidden";
       return () => document.body.style.overflow = "unset";
   },[]);

  const modalContent = (
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal']} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${classes['modal-title']} ${onlyText ? classes['additional-padding']: undefined}`}>{header}</h2>
        {children}
        <Button type="button" onClick={onClose}>Close</Button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal'));
};

export default Modal;
