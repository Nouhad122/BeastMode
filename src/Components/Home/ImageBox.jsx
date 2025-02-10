import React from 'react'
import classes from './ImageBox.module.css'
import { Link } from 'react-router-dom'

const ImageBox = () => {
  return (
    <section className={classes['box-container']}>
      <div className={classes['text-box']}>
        <h1 className={classes['primary-header']}>
            <span>fitness club</span>
            <span>sweet, smile and repeat</span>
            <span>checkout the most effective exercises personalized to you</span>
        </h1>
        <div className={classes.linkContainer}>
            <Link className={classes.linkBtn}>Explore Exercises</Link>
        </div>
        
      </div>
    </section>
  )
}

export default ImageBox
