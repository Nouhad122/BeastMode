import React from 'react';
import classes from './RadioGroup.module.css';

const RadioGroup = ({
  label,
  name,
  options,
  selected,
  onChange,
  helpText
}) => {
    
  return (
    <div className={classes.formGroup}>
      <label className={classes.mainLabel}>{label}</label>
      <div className={classes.option}>
        {options.map(option => (
          <React.Fragment key={option.id}>
            <input
              type="radio"
              name={name}
              id={option.id}
              value={option.value}
              checked={selected === option.value}
              onChange={() => onChange(name, option.value)}
            />
            <label className={classes.radio} htmlFor={option.id}>
              {option.label}
            </label>
          </React.Fragment>
        ))}
      </div>
      {helpText && <span className={classes.helpBlock}>{helpText}</span>}
    </div>
  );
};

export default RadioGroup;