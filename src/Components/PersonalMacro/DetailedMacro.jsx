import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateNutrition } from '../../util/nutritionCalculator';
import Button from '../sharedComps/Button';
import { FaArrowLeft, FaCalculator, FaTrash } from 'react-icons/fa';
import classes from './DetailedMacro.module.css';

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
      <h1 className={classes.title}>Your Personal Nutrition Plan</h1>
      
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
            <div 
              className={classes.proteinBar} 
              style={{ width: `${nutritionData.macros.protein.percentage}%` }}
            >
              {nutritionData.macros.protein.percentage}%
            </div>
            <div 
              className={classes.carbBar} 
              style={{ width: `${nutritionData.macros.carbs.percentage}%` }}
            >
              {nutritionData.macros.carbs.percentage}%
            </div>
            <div 
              className={classes.fatBar} 
              style={{ width: `${nutritionData.macros.fat.percentage}%` }}
            >
              {nutritionData.macros.fat.percentage}%
            </div>
          </div>
          <div className={classes.legend}>
            <div className={classes.legendItem}>
              <div className={classes.proteinSwatch}></div>
              <span>Protein</span>
            </div>
            <div className={classes.legendItem}>
              <div className={classes.carbSwatch}></div>
              <span>Carbs</span>
            </div>
            <div className={classes.legendItem}>
              <div className={classes.fatSwatch}></div>
              <span>Fat</span>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.detailedResults}>
        <div className={classes.macroDetails}>
          <h2>Daily Macro Targets</h2>
          <div className={classes.macroCard}>
            <div className={classes.macroHeader}>Protein</div>
            <div className={classes.macroValue}>{nutritionData.macros.protein.grams}g</div>
            <div className={classes.macroPercent}>{nutritionData.macros.protein.percentage}%</div>
          </div>
          
          <div className={classes.macroCard}>
            <div className={classes.macroHeader}>Carbohydrates</div>
            <div className={classes.macroValue}>{nutritionData.macros.carbs.grams}g</div>
            <div className={classes.macroPercent}>{nutritionData.macros.carbs.percentage}%</div>
            <div className={classes.macroSubInfo}>
              <span>Limit Sugar to: {nutritionData.macros.carbs.sugar.maxGrams}g</span>
            </div>
          </div>
          
          <div className={classes.macroCard}>
            <div className={classes.macroHeader}>Fat</div>
            <div className={classes.macroValue}>{nutritionData.macros.fat.grams}g</div>
            <div className={classes.macroPercent}>{nutritionData.macros.fat.percentage}%</div>
            <div className={classes.macroSubInfo}>
              <span>Limit Saturated Fat to: {nutritionData.macros.fat.saturatedFat.maxGrams}g</span>
            </div>
          </div>
        </div>

        <div className={classes.alternativeGoals}>
          <h2>Alternative Calorie Goals</h2>
          <div className={classes.goalCards}>
            <div className={classes.goalCard}>
              <h3>Maintain Weight</h3>
              <div className={classes.goalValue}>{nutritionData.calories.maintain} calories</div>
            </div>
            <div className={classes.goalCard}>
              <h3>Lose Fat</h3>
              <div className={classes.goalValue}>{nutritionData.calories.loseFat} calories</div>
            </div>
            <div className={classes.goalCard}>
              <h3>Build Muscle</h3>
              <div className={classes.goalValue}>{nutritionData.calories.buildMuscle} calories</div>
            </div>
          </div>
        </div>

        <div className={classes.infoSection}>
          <h2>Your Metabolism Information</h2>
          <div className={classes.infoGrid}>
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>Basal Metabolic Rate (BMR)</div>
              <div className={classes.infoValue}>{nutritionData.bmr} calories</div>
            </div>
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>Activity Level</div>
              <div className={classes.infoValue}>{nutritionData.activityLevel}</div>
            </div>
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
