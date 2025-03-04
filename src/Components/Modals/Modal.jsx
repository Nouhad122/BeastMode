import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../sharedComps/Button';
import classes from './Modal.module.css';

const Modal = ({ header, onClose, children }) => {
  const modalContent = (
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal']} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes['modal-title']}>{header}</h2>
        {children}
        <Button type="button" onClick={onClose}>Close</Button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal'));
};

export default Modal;
