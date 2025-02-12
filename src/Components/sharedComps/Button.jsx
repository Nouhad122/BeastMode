import React from 'react'
import classes from './Button.module.css'

const Button = ({className, children, type}) => {
    const btnClasses = `${classes['btn']} ${className}`;
  return (
    <button className={btnClasses} type={type}>{children}</button>
  )
}

export default Button
