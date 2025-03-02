import React from 'react'
import classes from './Title.module.css';
const Title = ({title, subText}) => {
  return (
    <div className={classes['title-wrapper']}>
        <h1 className={classes['title']}>{title}</h1>
        {subText && <p className={classes['sub-text']}>{subText}</p>}
    </div>
  )
}

export default Title
