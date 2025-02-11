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
            <Link className={`${classes['btn']} ${classes['btn-red']} ${classes['btn-animation']}`}>Explore Exercises</Link>
      </div>
    </section>
  )
}

export default ImageBox
