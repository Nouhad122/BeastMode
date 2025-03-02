import React from 'react';
import { FaCalculator } from 'react-icons/fa';
import Button from '../sharedComps/Button';
import { useNavigate } from 'react-router-dom';
import classes from './EmptyData.module.css';

const EmptyData = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
        <div className={classes.emptyState}>
            <p>You haven't entered your information yet. Please complete the form to see your personalized nutrition plan.</p>
            <Button 
             className={classes.startButton} 
             onClick={() => navigate('/macro-calculator')}
            >
            <FaCalculator /> Start Calculator
            </Button>
        </div>
    </div>
  )
}

export default EmptyData
