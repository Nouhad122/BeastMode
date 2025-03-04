import React from 'react';
import classes from './MealPlanSection.module.css';
import useNutritionData from '../../hooks/useNutritionData';

const MealPlanSection = () => {
  const { nutritionData } = useNutritionData();

  if (!nutritionData || !nutritionData.mealPlan) {
    return null;
  }

  const { meals } = nutritionData.mealPlan;

  return (
    <div className={classes.mealPlanSection}>
      <h2>Daily Meal Distribution</h2>
      <div className={classes.mealCards}>
        <div className={classes.mealCard}>
          <h3>Breakfast</h3>
          <p className={classes.calories}>{meals.breakfast.calories} calories</p>
          <p className={classes.protein}>{meals.breakfast.protein}g protein</p>
          <p className={classes.carbs}>{meals.breakfast.carbs}g carbs</p>
          <p className={classes.fat}>{meals.breakfast.fat}g fat</p>
        </div>
        
        <div className={classes.mealCard}>
          <h3>Lunch</h3>
          <p className={classes.calories}>{meals.lunch.calories} calories</p>
          <p className={classes.protein}>{meals.lunch.protein}g protein</p>
          <p className={classes.carbs}>{meals.lunch.carbs}g carbs</p>
          <p className={classes.fat}>{meals.lunch.fat}g fat</p>
        </div>
        
        <div className={classes.mealCard}>
          <h3>Dinner</h3>
          <p className={classes.calories}>{meals.dinner.calories} calories</p>
          <p className={classes.protein}>{meals.dinner.protein}g protein</p>
          <p className={classes.carbs}>{meals.dinner.carbs}g carbs</p>
          <p className={classes.fat}>{meals.dinner.fat}g fat</p>
        </div>
        
        <div className={classes.mealCard}>
          <h3>Snacks</h3>
          <p className={classes.calories}>{meals.snacks.calories} calories</p>
          <p className={classes.protein}>{meals.snacks.protein}g protein</p>
          <p className={classes.carbs}>{meals.snacks.carbs}g carbs</p>
          <p className={classes.fat}>{meals.snacks.fat}g fat</p>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSection;