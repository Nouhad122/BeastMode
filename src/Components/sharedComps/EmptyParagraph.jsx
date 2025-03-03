import React from 'react';
import classes from './EmptyParagraph.module.css';

const EmptyParagraph = ({children}) => {
  return (
    <p className={classes['empty-paragraph']}>{children}</p>
  )
}

export default EmptyParagraph
