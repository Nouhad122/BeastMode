import React from 'react';
import classes from './GoalCard.module.css';

const GoalCard = ({ goal, energyAmount}) => {
  return (
    <div className={classes.goalCard}>
        <h3>{goal}</h3>
        <div className={classes.goalValue}>{energyAmount} calories</div>
    </div>
  )
}

export default GoalCard
