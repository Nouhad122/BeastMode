import React, { useContext } from 'react';
import Modal from './Modal';
import Button from '../sharedComps/Button';
import classes from './Modal.module.css';
import ModalContext from '../../Context/ModalContext';

const InsuranceModal = ({text, action}) => {
  const { hideInsurance } = useContext(ModalContext);
  return (
    <Modal header={text} onClose={hideInsurance} onlyText>
      <Button onClick={action} className={classes['green-button']}>Yes</Button>
    </Modal>
  )
}

export default InsuranceModal
