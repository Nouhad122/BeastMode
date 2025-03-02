import React from 'react';
import classes from './ActionButtons.module.css';
import Button from '../sharedComps/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import useNutritionData from '../../hooks/useNutritionData';

const ActionButtons = () => {
  const navigate = useNavigate();
  const { clearNutritionData } = useNutritionData();

  const handleGoBack = () => {
    navigate('/');
  };
  return (
    <div className={classes.actionButtons}>
        <Button 
         className={classes.backButton} 
         onClick={handleGoBack}
        >
        <FaArrowLeft /> Back to Calculator
        </Button>

        <Button 
         className={classes.deleteButton} 
         onClick={clearNutritionData}
        >
        <FaTrash /> Delete My Data
        </Button>
     </div>
  )
}

export default ActionButtons
