import React from 'react';
import classes from './MealPlanSection.module.css';
import useNutritionData from '../../hooks/useNutritionData';
import MealCard from './MealCard';

const MealPlanSection = () => {
  const { nutritionData } = useNutritionData();

  // Check for valid nutrition data before rendering
  if (!nutritionData || !nutritionData.mealPlan) {
    return null;
  }

  const { meals } = nutritionData.mealPlan;

  // Implementing the meal distribution pattern based on nutrient timing research
  // Protein distribution follows the optimal ~0.4g/kg per meal model from protein synthesis studies
  // Carb distribution prioritizes workout timing and recovery windows
  return (
    <div className={classes.mealPlanSection}>
      <h2>Daily Meal Distribution</h2>
      <div className={classes.mealCards}>
        <MealCard meal="Breakfast" targetedMeal= {meals.breakfast}/>
        <MealCard meal="Lunch" targetedMeal= {meals.lunch}/>
        <MealCard meal="Dinner" targetedMeal= {meals.dinner}/>
        <MealCard meal="Snacks" targetedMeal= {meals.snacks}/>
      </div>
    </div>
  );
};

export default MealPlanSection;