import React from 'react';
import classes from './NutritionBar.module.css';

const NutritionBar = ({macronutrient, className}) => {
  return (
    <div 
     className={classes[className]} 
     style={{ width: `${macronutrient}%` }}
    >
        {macronutrient}%
    </div>
  )
}

export default NutritionBar
