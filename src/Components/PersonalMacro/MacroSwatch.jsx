import React from 'react';
import classes from './MacroSwatch.module.css';

const MacroSwatch = ({ className, swatchMacro }) => {
  return (
    <div className={classes.legendItem}>
        <div className={classes[className]}></div>
        <span>{swatchMacro}</span>
    </div>
  )
}

export default MacroSwatch
