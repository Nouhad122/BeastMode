import React from 'react';
import classes from './Loader.module.css';

const Loader = ({ 
  color = '#d11a23',
  secondaryColor = '#ebf8ff',
  text = 'Loading...',
  size = 'medium',
  fullScreen = false 
}) => {
  const containerClass = `${classes.loaderContainer} ${fullScreen ? classes.fullScreen : ''}`;
  
  return (
    <div className={containerClass}>
      {fullScreen && <div className={classes.overlay}></div>}
      
      <div className={classes.content}>
        <div className={`${classes.barLoader} ${classes[size]}`}>
          <div 
            className={classes.barBackground} 
            style={{ backgroundColor: secondaryColor }}
          >
            <div 
              className={classes.barForeground} 
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
        
        {text && <p className={classes.text}>{text}</p>}
      </div>
    </div>
  );
};

export default Loader;