import React from 'react';
import classes from './MacroCard.module.css';

const MacroCard = ({ macronutrient, macroValue, macroPercent, subInfo, macroSubInfo }) => {
  return (
    <div className={classes.macroCard}>
        <div className={classes.macroHeader}>{macronutrient}</div>
        <div className={classes.macroValue}>{macroValue}g</div>
        <div className={classes.macroPercent}>{macroPercent}%</div>
        {subInfo &&
            <div className={classes.macroSubInfo}>
                <span>Limit {subInfo} to: {macroSubInfo}g</span>
            </div>
        }
        
    </div>
  )
}

export default MacroCard
