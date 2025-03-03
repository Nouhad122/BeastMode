import React from 'react';
import classes from './SelectInput.module.css';

const SelectInput = ({
  label,
  name,
  options,
  value,
  onChange,
  helpText,
  error
}) => {
  return (
    <div className={classes.formGroup}>
      <label htmlFor={name} className={classes.mainLabel}>{label}</label>
      <select
        id={name}
        name={name}
        className={classes.select}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <span className={classes.helpBlock}>{helpText}</span>}
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default SelectInput;