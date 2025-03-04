import React, { useContext } from 'react';
import classes from './ActionButtons.module.css';
import Button from '../sharedComps/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import ModalContext from '../../Context/ModalContext';
import InsuranceModal from '../Modals/InsuranceModal';

const ActionButtons = () => {
  const navigate = useNavigate();
  const { insuranceIsOpen, showInsurance } = useContext(ModalContext);

  const handleGoBack = () => {
    navigate('/macro-calculator');
  };
  return (
    <>
      <div className={classes.actionButtons}>
          <Button 
          className={classes.backButton} 
          onClick={handleGoBack}
          >
          <FaArrowLeft /> Back to Calculator
          </Button>

          <Button 
          className={classes.deleteButton} 
          onClick={showInsurance}
          >
          <FaTrash /> Delete My Plan
          </Button>
      </div>

      {insuranceIsOpen && <InsuranceModal />}
    </>
    
  )
}

export default ActionButtons
