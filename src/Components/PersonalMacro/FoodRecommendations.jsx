import React from 'react';
import classes from './FoodRecommendations.module.css';
import useNutritionData from '../../hooks/useNutritionData';

const FoodRecommendations = () => {
  const { nutritionData } = useNutritionData();

  if (!nutritionData) {
    return null;
  }

  // Default food recommendations
  const foodRecommendations = {
    protein: [
      'Chicken Breast',
      'Greek Yogurt',
      'Egg Whites',
      'Lean Beef',
      'Tofu',
      'Fish'
    ],
    carbs: [
      'Brown Rice',
      'Sweet Potatoes',
      'Oatmeal',
      'Fruits',
      'Quinoa',
      'Whole Grain Bread'
    ],
    fats: [
      'Avocado',
      'Olive Oil',
      'Nuts & Seeds',
      'Fatty Fish',
      'Nut Butters',
      'Eggs'
    ]
  };

  // Adjust recommendations based on goal
  const getGoalSpecificRecommendations = () => {
    const goal = nutritionData.goal;
    let adjustedRecommendations = { ...foodRecommendations };
    
    if (goal === 'lose_fat') {
      // Add more filling, lower calorie options for fat loss
      adjustedRecommendations.protein.unshift('White Fish');
      adjustedRecommendations.carbs.unshift('Vegetables');
      adjustedRecommendations.fats.unshift('Flaxseeds');
    } else if (goal === 'build_muscle') {
      // Add more calorie-dense options for muscle building
      adjustedRecommendations.protein.unshift('Whey Protein');
      adjustedRecommendations.carbs.unshift('Pasta');
      adjustedRecommendations.fats.unshift('Full-Fat Dairy');
    }
    
    return adjustedRecommendations;
  };

  const recommendations = getGoalSpecificRecommendations();

  return (
    <div className={classes.recommendationsSection}>
      <h2>Food Recommendations</h2>
      <div className={classes.foodCards}>
        <div className={classes.foodCard}>
          <div className={classes.foodCardHeader + ' ' + classes.proteinHeader}>
            Protein Sources
          </div>
          <ul className={classes.foodList}>
            {recommendations.protein.slice(0, 5).map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        
        <div className={classes.foodCard}>
          <div className={classes.foodCardHeader + ' ' + classes.carbsHeader}>
            Carb Sources
          </div>
          <ul className={classes.foodList}>
            {recommendations.carbs.slice(0, 5).map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        
        <div className={classes.foodCard}>
          <div className={classes.foodCardHeader + ' ' + classes.fatsHeader}>
            Fat Sources
          </div>
          <ul className={classes.foodList}>
            {recommendations.fats.slice(0, 5).map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoodRecommendations;