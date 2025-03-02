import React from 'react';
import classes from './MacroSummary.module.css';
import NutritionBar from './NutritionBar';
import MacroSwatch from './MacroSwatch';

const MacroSummary = ({ nutritionData }) => {
  return (
    <div className={classes.summary}>
          <div className={classes.goalSection}>
            <h2>Your Goal: {nutritionData.goal.replace('_', ' ').toUpperCase()}</h2>
            <div className={classes.calorieBox}>
              <h3>Daily Calories: {nutritionData.calories.currentGoal}</h3>
            </div>
          </div>

          <div className={classes.macroChart}>
            <h2>Macronutrient Breakdown</h2>

            <div className={classes.chartContainer}>
              <NutritionBar
              macronutrient={nutritionData.macros.protein.percentage} 
              className='proteinBar'
              />
              <NutritionBar
              macronutrient={nutritionData.macros.carbs.percentage} 
              className='carbBar'
              />
              <NutritionBar
              macronutrient={nutritionData.macros.fat.percentage} 
              className='fatBar'
              />
            </div>

            <div className={classes.legend}>
              <MacroSwatch
              className='proteinSwatch' 
              swatchMacro='Protein'
              />
              <MacroSwatch
              className='carbSwatch' 
              swatchMacro='Carbs'
              />
              <MacroSwatch
              className='fatSwatch' 
              swatchMacro='Fat'
              />
            </div>
          </div>
        </div>
  )
}

export default MacroSummary
