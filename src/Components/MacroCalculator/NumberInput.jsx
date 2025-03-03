import React from 'react';
import classes from './NumberInput.module.css';

const NumberInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error
}) => {

  return (
    <div className={classes.formGroup}>
      <label htmlFor={name} className={classes.mainLabel}>{label}</label>
      <input
        type="number"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default NumberInput;