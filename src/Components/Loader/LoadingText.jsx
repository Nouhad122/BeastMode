import React from 'react';
import classes from './Loader.module.css';

const LoadingText = ({ text }) => {
  return (
    <p className={classes['loading-text']}>{text}</p>
  )
}

export default LoadingText
