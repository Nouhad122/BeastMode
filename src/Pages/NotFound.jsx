import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';
import Button from '../Components/sharedComps/Button';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.notFoundContainer}>
      <div className={classes.content}>
        <h1 className={classes.title}>404</h1>
        <p className={classes.message}>Couldn't find page</p>
        <Button onClick={handleGoHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;