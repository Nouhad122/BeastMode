import React from 'react';
import classes from './InfoItem.module.css';

const InfoItem = ({ infoLabel, infoValue }) => {
  return (
    <div className={classes.infoItem}>
        <div className={classes.infoLabel}>{infoLabel}</div>
        <div className={classes.infoValue}>{infoValue}</div>
    </div>
  )
}

export default InfoItem
