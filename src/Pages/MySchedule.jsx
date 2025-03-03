import React from 'react';
import Schedule from '../Components/MySchedule/Schedule';
import Title from '../Components/sharedComps/Title';
const MySchedule = () => {
  return (
    <section>
    <Title
     title="My Schedule"
     subText="Plan your success — organize your meals and workouts for consistent results."
    />
       <Schedule />
    </section>
  )
}

export default MySchedule
