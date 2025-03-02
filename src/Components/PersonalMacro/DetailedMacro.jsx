import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../sharedComps/Button';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import classes from './DetailedMacro.module.css';
import MacroCard from './MacroCard';
import GoalCard from './GoalCard';
import InfoItem from './InfoItem';
import useNutritionData from '../../hooks/useNutritionData';
import EmptyData from './EmptyData';
import MacroSummary from './MacroSummary';

const DetailedMacro = () => {
  const navigate = useNavigate();
  const {nutritionData, loading, clearNutritionData} = useNutritionData();
  
  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return <div className={classes.loading}>Loading your personalized nutrition plan...</div>;
  }


  return (
    <div className={classes.container}>
      {!nutritionData && <EmptyData />}
      {nutritionData && 
      <>
        <MacroSummary nutritionData={nutritionData}/>

        <div className={classes.detailedResults}>
          <div className={classes.macroDetails}>
            <h2>Daily Macro Targets</h2>
            <MacroCard
            macronutrient="Protein" 
            macroValue={nutritionData.macros.protein.grams} 
            macroPercent={nutritionData.macros.protein.percentage}
            />
            <MacroCard
            macronutrient="Carbohydrates" 
            macroValue={nutritionData.macros.carbs.grams} 
            macroPercent={nutritionData.macros.carbs.percentage}
            subInfo="Sugar"
            macroSubInfo={nutritionData.macros.carbs.sugar.maxGrams}
            />
            <MacroCard
            macronutrient="Fat" 
            macroValue={nutritionData.macros.fat.grams} 
            macroPercent={nutritionData.macros.fat.percentage}
            subInfo="Saturated Fat"
            macroSubInfo={nutritionData.macros.fat.saturatedFat.maxGrams}
            />
          </div>

          <div className={classes.alternativeGoals}>
            <h2>Alternative Calorie Goals</h2>
            <div className={classes.goalCards}>
              <GoalCard goal="Maintain Weight" energyAmount={nutritionData.calories.maintain}/>
              <GoalCard goal="Lose Fat" energyAmount={nutritionData.calories.loseFat}/>
              <GoalCard goal="Build Muscle" energyAmount={nutritionData.calories.buildMuscle}/>
            </div>
          </div>

          <div className={classes.infoSection}>
            <h2>Your Metabolism Information</h2>
            <div className={classes.infoGrid}>
              <InfoItem infoLabel="Basal Metabolic Rate (BMR)" infoValue={nutritionData.bmr}/>
              <InfoItem infoLabel="Activity Level" infoValue={nutritionData.activityLevel}/>
            </div>
          </div>
        </div>

        <div className={classes.actionButtons}>
          <Button 
            className={classes.backButton} 
            onClick={handleGoBack}
          >
            <FaArrowLeft /> Back to Calculator
          </Button>
          <Button 
            className={classes.deleteButton} 
            onClick={clearNutritionData}
          >
            <FaTrash /> Delete My Data
          </Button>
        </div>
      </>
      }  
    </div>
  );
};

export default DetailedMacro
