import React from 'react'
import classes from './ExerciseCard.module.css'
import Button from '../sharedComps/Button'
import { Link } from 'react-router'

const ExerciseCard = ({...exercise}) => {
  return (
    <Link to={`/exercises/${exercise.name}/${exercise.id}`} className={classes['card-link']}>
      <div className={classes['exercise-card']}>
          <img src={exercise.gifUrl} alt={exercise.name}/>
          <h5 className={classes['sub-headings']}>
          <span>{exercise.bodyPart}</span>
          <span>{exercise.target}</span>
          </h5>
          <h3 className={`${classes['exercise-name']} ${classes['header']}`}>{exercise.name}</h3>
          <p className={classes['exercise-equipment']}>Equipment: <span>{exercise.equipment}</span></p>
          <Button type="button" className={classes['card-btn']}>Add To Favorite</Button>
      </div>
    </Link>
  )
}

export default ExerciseCard
