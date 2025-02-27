import React from 'react';
import { useSelector } from 'react-redux';
import ExerciseCard from '../Components/Home/ExerciseCard';
import DaysOfWeek from '../Components/sharedComps/DaysOfWeek';

const MySchedule = () => {
    const schedule = useSelector(state => state.schedule.schedule);
  return (
    <div>
        <DaysOfWeek>
            {
             (day) =>(
              <div key={day}>
                <h2>{day}</h2>
                <div className='list-wrapper'>
                    { 
                     schedule[day.toLowerCase()]?.length > 0 ?
                        schedule[day.toLowerCase()].map(exercise =>
                          <ExerciseCard 
                            key={exercise.id} 
                            {...exercise} 
                            day={day.toLowerCase()} 
                            scheduledExercise
                          />)
                        : <p>No exercises scheduled.</p>
                    }
                </div> 
              </div>
            )}
            
        </DaysOfWeek>
    </div>
  )
}

export default MySchedule
