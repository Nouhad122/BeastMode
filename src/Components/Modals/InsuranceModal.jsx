import React, { useContext } from 'react';
import Modal from './Modal';
import useNutritionData from '../../hooks/useNutritionData';
import ModalContext from '../../Context/ModalContext';
import Button from '../sharedComps/Button';
import classes from './Modal.module.css';

const InsuranceModal = () => {
  const { hideInsurance } = useContext(ModalContext);
  const { clearNutritionData } = useNutritionData();
  
  const handleYesButton = () =>{
    hideInsurance();
    clearNutritionData();
  }
  
  return (
    <Modal header="Are You Sure You Want to Delete Your Plan?" onClose={hideInsurance} onlyText>
      <Button onClick={handleYesButton} className={classes['green-button']}>Yes</Button>
    </Modal>
  )
}

export default InsuranceModal
