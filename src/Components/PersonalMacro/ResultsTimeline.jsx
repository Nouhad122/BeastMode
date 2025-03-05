import React from 'react';
import classes from './ResultsTimeline.module.css';
import useNutritionData from '../../hooks/useNutritionData';

const ResultsTimeline = () => {
  const { nutritionData } = useNutritionData();

  if (!nutritionData) {
    return null;
  }

  // Dynamic timeline generation based on scientific weight change expectations
  // Research indicates sustainable fat loss of 0.5-1kg/week and muscle gain of 0.25-0.5kg/month
  const getTimelineData = () => {
    const goal = nutritionData.goal;
    const weeks = [1, 4, 8, 12]; // Standard progress checkpoints
    
    if (goal === 'lose_fat') {
      // Standard safe weight loss rate according to nutrition research
      return weeks.map(week => ({
        week,
        result: `-${week} lbs`,
        description: `Estimated fat loss after ${week} week${week > 1 ? 's' : ''}`
      }));
    } else if (goal === 'build_muscle') {
      // Lean mass accrual rates based on sports nutrition studies
      return weeks.map(week => {
        const months = Math.ceil(week / 4);
        // More conservative muscle gain estimate - studies show ~2lbs/month for beginners, less for advanced
        const muscleGain = Math.min(months * 1.5, 12); // Cap at realistic maximum
        return {
          week,
          result: `+${muscleGain.toFixed(1)} lbs`,
          description: `Estimated muscle gain after ${week} week${week > 1 ? 's' : ''}`
        };
      });
    } else {
      // Performance metrics for maintenance phase
      return weeks.map(week => ({
        week,
        result: `Week ${week}`,
        description: 'Maintaining current body composition'
      }));
    }
  };

  const timelineData = getTimelineData();

  // Calculate proportional position for even spacing
  const getPosition = (index, total) => {
    // Using a more precise distribution algorithm
    const padding = 10; // Percentage padding from edges
    const usableSpace = 100 - (padding * 2);
    const step = total > 1 ? usableSpace / (total - 1) : 0;
    return padding + (index * step);
  };

  return (
    <div className={classes.timelineSection}>
      <h2>Expected Results Timeline</h2>
      <div className={classes.timeline}>
        <div className={classes.timelineLine}></div>
        
        {timelineData.map((point, index) => (
          <div 
            key={index} 
            className={classes.timelinePoint} 
            style={{ left: `${getPosition(index, timelineData.length)}%` }}
          >
            <div className={classes.timelineMarker}></div>
            <div className={classes.timelineWeek}>Week {point.week}</div>
            <div className={classes.timelineResult}>{point.result}</div>
          </div>
        ))}
      </div>
      
      <div className={classes.timelineNote}>
        {nutritionData.goal === 'lose_fat' && 
          "Note: Healthy fat loss is typically 1-2 lbs per week. Results may vary based on adherence and individual factors."
        }
        {nutritionData.goal === 'build_muscle' && 
          "Note: Muscle building is a gradual process. Beginners may gain 1-2 lbs per month with proper training and nutrition."
        }
        {nutritionData.goal === 'maintain_weight' && 
          "Focus on performance improvements and body composition changes while maintaining weight."
        }
      </div>
    </div>
  );
};

export default ResultsTimeline;