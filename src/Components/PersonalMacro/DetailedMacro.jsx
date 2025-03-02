import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateNutrition } from '../../util/nutritionCalculator';
import Button from '../sharedComps/Button';
import { FaArrowLeft, FaCalculator, FaTrash } from 'react-icons/fa';
import classes from './DetailedMacro.module.css';
import NutritionBar from './NutritionBar';
import MacroSwatch from './MacroSwatch';
import MacroCard from './MacroCard';
import GoalCard from './GoalCard';
import InfoItem from './InfoItem';

const DetailedMacro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to get formData from location state (from direct navigation)
    let formData = location.state;
    
    // If no data in state, try to get from localStorage
    if (!formData) {
      const savedData = localStorage.getItem('nutritionFormData');
      if (savedData) {
        formData = JSON.parse(savedData);
      }
    } else {
      // Save the new form data to localStorage
      localStorage.setItem('nutritionFormData', JSON.stringify(formData));
    }
    
    if (formData) {
      // Ensure all values are proper numbers
      const parsedData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      };

      // Calculate nutrition data
      const data = calculateNutrition(parsedData);
      setNutritionData(data);
    }
    
    setLoading(false);
  }, [location]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleDeleteData = () => {
    // Remove data from localStorage
    localStorage.removeItem('nutritionFormData');
    
    // Reset state
    setNutritionData(null);
  };

  if (loading) {
    return <div className={classes.loading}>Loading your personalized nutrition plan...</div>;
  }

  // Show empty state when no data is available
  if (!nutritionData) {
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Welcome to Nutrition Calculator</h1>
        <div className={classes.emptyState}>
          <p>You haven't entered your information yet. Please complete the form to see your personalized nutrition plan.</p>
          <Button 
            className={classes.startButton} 
            onClick={() => navigate('/macro-calculator')}
          >
            <FaCalculator /> Start Calculator
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>  
      <div className={classes.summary}>
        <div className={classes.goalSection}>
          <h2>Your Goal: {nutritionData.goal.replace('_', ' ').toUpperCase()}</h2>
          <div className={classes.calorieBox}>
            <h3>Daily Calories: {nutritionData.calories.currentGoal}</h3>
          </div>
        </div>

        <div className={classes.macroChart}>
          <h2>Macronutrient Breakdown</h2>
          <div className={classes.chartContainer}>
            <NutritionBar
             macronutrient={nutritionData.macros.protein.percentage} 
             className='proteinBar'
            />
            <NutritionBar
             macronutrient={nutritionData.macros.carbs.percentage} 
             className='carbBar'
            />
            <NutritionBar
             macronutrient={nutritionData.macros.fat.percentage} 
             className='fatBar'
            />
          </div>
          <div className={classes.legend}>
            <MacroSwatch
             className='proteinSwatch' 
             swatchMacro='Protein'
            />
            <MacroSwatch
             className='carbSwatch' 
             swatchMacro='Carbs'
            />
            <MacroSwatch
             className='fatSwatch' 
             swatchMacro='Fat'
            />
          </div>
        </div>
      </div>

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
          onClick={handleDeleteData}
        >
          <FaTrash /> Delete My Data
        </Button>
      </div>
    </div>
  );
};

export default DetailedMacro
