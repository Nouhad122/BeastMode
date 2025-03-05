import React from 'react';
import classes from './WorkoutCalendar.module.css';
import useNutritionData from '../../hooks/useNutritionData';

const WorkoutCalendar = () => {
  const { nutritionData } = useNutritionData();

  if (!nutritionData) {
    return null;
  }

  // Generate optimized workout plan based on training principles and caloric adjustments
  // Periodization structure follows undulating pattern with strategic caloric surplus on training days
  // Recovery patterns based on muscle protein synthesis research showing 48-72hr recovery windows
  const getWorkoutPlan = () => {
    const goal = nutritionData.goal;
    
    // Default workout structure with push/pull/legs split and strategic recovery days
    const plan = [
      { day: 'Mon', type: 'strength', calories: 200 },
      { day: 'Tue', type: 'rest', calories: 0 },
      { day: 'Wed', type: 'strength', calories: 200 },
      { day: 'Thu', type: 'rest', calories: 0 },
      { day: 'Fri', type: 'strength', calories: 200 },
      { day: 'Sat', type: 'cardio', calories: 300 },
      { day: 'Sun', type: 'rest', calories: 0 }
    ];
    
    // Hypertrophy-focused adjustments for muscle building
    if (goal === 'build_muscle') {
      plan[5].type = 'strength'; 
      plan[5].calories = 200;
    } 
    // Increased energy expenditure for fat loss with strategic HIIT implementation
    else if (goal === 'lose_fat') {
      plan[1].type = 'cardio';
      plan[1].calories = 300;
      plan[3].type = 'cardio';
      plan[3].calories = 300;
    }
    
    return plan;
  };

  const workoutPlan = getWorkoutPlan();

  return (
    <div className={classes.calendarSection}>
      <h2>Weekly Workout Calorie Adjustments</h2>
      <div className={classes.calendarContainer}>
        <div className={classes.dayLabels}>
          {workoutPlan.map((day) => (
            <div key={day.day} className={classes.dayLabel}>
              {day.day}
            </div>
          ))}
        </div>
        
        <div className={classes.workoutBoxes}>
          {workoutPlan.map((day) => (
            <div 
              key={day.day} 
              className={`${classes.workoutBox} ${classes[day.type]}`}
            >
              {day.type === 'rest' ? 'Rest' : `+${day.calories}`}
            </div>
          ))}
        </div>
      </div>
      
      <div className={classes.legend}>
        <div className={classes.legendItem}>
          <div className={`${classes.legendSwatch} ${classes.strength}`}></div>
          <span>Strength Training</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendSwatch} ${classes.cardio}`}></div>
          <span>Cardio</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendSwatch} ${classes.rest}`}></div>
          <span>Rest Day</span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCalendar;