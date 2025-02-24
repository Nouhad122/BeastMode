import React from 'react'
import classes from './Details.module.css'

const Details = ({ exercise }) => {
    return (
      <section className={classes['exercise-detail-section']}>
        <div className={classes['exercise-image']}>
          <img
           src={exercise.gifUrl} 
           alt={exercise.name}
         /> 
        </div>
        
        <div className={classes['exercise-text']}>
          <h1 className={classes['exercise-name']}>{exercise.name}</h1>
          <h5 className={classes['sub-headings']}>
              <span>{exercise.bodyPart}</span>
              <span>{exercise.target}</span>
          </h5>
          <p className={classes['sub-headings']}>
              <strong>secondary muscles:</strong>
              {
                exercise.secondaryMuscles.map(muscle =>
                   <span key={muscle} className={classes['exercise-muscle']}>{muscle}</span>)
              }
          </p>
          <p className={classes['sub-headings']}>
              <strong>Equipment:</strong>
              <span className={classes['exercise-equipment']}>{exercise.equipment}</span>
          </p>
          <ul className={classes['instructions-wrapper']}>
            {
              exercise.instructions.map(instruction => <li key={instruction}>{instruction}</li>)
            }
          </ul>
        </div>
      </section>
    )
  }

export default Details
