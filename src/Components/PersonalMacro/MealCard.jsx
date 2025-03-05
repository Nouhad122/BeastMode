import React from 'react';
import classes from './MealCard.module.css';

const MealCard = ({ meal, targetedMeal }) => {
  return (
    <div className={classes.mealCard}>
        <h3>{meal}</h3>
        <p className={classes.calories}>{targetedMeal.calories} calories</p>
        <p className={classes.protein}>{targetedMeal.protein}g protein</p>
        <p className={classes.carbs}>{targetedMeal.carbs}g carbs</p>
        <p className={classes.fat}>{targetedMeal.fat}g fat</p>
    </div>
  )
}

export default MealCard
