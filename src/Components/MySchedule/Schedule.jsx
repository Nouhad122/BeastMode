import React from 'react';
import { useSelector } from 'react-redux';
import ScheduledCard from '../MySchedule/ScheduledCard';
import DaysOfWeek from '../sharedComps/DaysOfWeek';
import classes from './Schedule.module.css';

const Schedule = () => {
    const schedule = useSelector(state => state.schedule.schedule);

    return (
      <section className={classes['schedule-container']}>
        <DaysOfWeek>
            { (day) => (
             <div key={day} className={classes['day-container']}>
              <h2 className={classes['day-title']}>{day}</h2>
              <div className={classes['list-wrapper']}>
                { 
                schedule[day.toLowerCase()]?.length > 0 ? 
                    schedule[day.toLowerCase()].map(exercise =>
                    <ScheduledCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        day={day.toLowerCase()} 
                    />)
                    : <p className={classes['no-exercises']}>No exercises scheduled.</p>
                }
              </div> 
             </div>
            )}
        </DaysOfWeek>
      </section>
    )
}

export default Schedule;
