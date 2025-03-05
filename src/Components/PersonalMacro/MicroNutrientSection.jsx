import React from 'react';
import classes from './MicronutrientSection.module.css';
import useNutritionData from '../../hooks/useNutritionData';
import InfoItem from './InfoItem';

const MicronutrientSection = () => {
  const { nutritionData } = useNutritionData();

  // Ensure we have nutrition data before rendering
  if (!nutritionData) {
    return null;
  }

  // Micronutrient recommendations based on dietary reference intakes (DRIs)
  // and adjusted for activity level and training goals according to ISSN guidelines
  return (
    <div className={classes.microSection}>
      <h2>Daily Micronutrient Focus</h2>
      <div className={classes.microCards}>
        <InfoItem infoLabel="Water Intake" infoValue={`${nutritionData.hydration?.waterLiters || '2.5-3.0'} liters daily`}/>
        <InfoItem infoLabel="Dietary Fiber" infoValue={`${nutritionData.macros.carbs.fiber.grams}g daily minimum`}/>
        <InfoItem infoLabel="Sodium" infoValue={nutritionData.micronutrients?.sodium || 'Less than 2300mg daily'}/>
        <InfoItem infoLabel="Calcium" infoValue={nutritionData.micronutrients?.calcium || '1000mg daily'}/>
      </div>
    </div>
  );
};

export default MicronutrientSection;