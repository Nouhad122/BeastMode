import React from 'react'
import classes from './Button.module.css'

const Button = ({className, children, onClick, type}) => {
    const btnClasses = `${classes['btn']} ${className}`;
  return (
    <button className={btnClasses} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button
