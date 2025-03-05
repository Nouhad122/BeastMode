// calculateNutrition.js
const calculateNutrition = (formData) => {
  const { weight, height, age, gender, unit, activity, primaryGoal } = formData;
  
  // Unit conversion with precise coefficients based on metric system standards
  let weightKg = weight;
  let heightCm = height;
  
  if (unit === 'imperial') {
    weightKg = weight * 0.453592; // Standard lbs to kg conversion factor
    heightCm = height * 2.54; // Standard inches to cm conversion factor
  }
  
  // Implementing Mifflin-St Jeor equation (most accurate BMR formula based on meta-analysis)
  // Coefficient derivation based on lean mass and metabolic activity studies
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);
  
  // Activity multipliers derived from doubly-labeled water studies
  // Values represent average energy expenditure increases across activity spectrums
  const activityMultipliers = {
    sedentary: 1.2,   // Minimal movement beyond basic activities of daily living
    light: 1.375,     // Light activity 1-3 days/week (30-45 min sessions)
    moderate: 1.55,   // Moderate activity 3-5 days/week (45-60 min sessions)
    active: 1.725,    // Hard training 6-7 days/week (60+ min sessions)
    veryActive: 1.9   // Professional athlete level training (multiple daily sessions)
  };
  
  const multiplier = activityMultipliers[activity] || activityMultipliers.moderate;
  const maintenanceCalories = Math.round(bmr * multiplier);
  
  // Caloric targets based on metabolic adaptation research and energy balance modeling
  // 20% deficit shown optimal for fat loss without excessive metabolic adaptation
  // 10% surplus balances muscle protein synthesis stimulus without excessive fat gain
  const caloriesLoseFat = Math.round(maintenanceCalories * 0.8);
  const caloriesBuildMuscle = Math.round(maintenanceCalories * 1.1);
  
  let currentGoalCalories;
  switch (primaryGoal) {
    case 'lose_fat':
      currentGoalCalories = caloriesLoseFat;
      break;
    case 'build_muscle':
      currentGoalCalories = caloriesBuildMuscle;
      break;
    case 'maintain_weight':
    default:
      currentGoalCalories = maintenanceCalories;
  }
  
  // Protein requirements based on sports nutrition research and nitrogen balance studies
  // Higher needs during caloric restriction to preserve lean mass
  // Values aligned with ISSN position stands on protein requirements
  let proteinMultiplier;
  switch (primaryGoal) {
    case 'lose_fat':
      proteinMultiplier = 2.2; // g/kg - upper research-supported range during deficit
      break;
    case 'build_muscle':
      proteinMultiplier = 1.8; // g/kg - optimal anabolic response threshold
      break;
    case 'maintain_weight':
    default:
      proteinMultiplier = 1.6; // g/kg - sufficient for maintenance with training
  }
  
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;
  
  // Fat allocation based on hormonal requirements and EFA needs
  // Minimum thresholds important for endocrine function and satiety
  let fatPercentage;
  switch (primaryGoal) {
    case 'lose_fat':
      fatPercentage = 0.3; // 30% - supports hormone production during deficit
      break;
    case 'build_muscle':
      fatPercentage = 0.25; // 25% - balanced for anabolic environment
      break;
    case 'maintain_weight':
    default:
      fatPercentage = 0.3; // 30% - balanced intake for general health
  }
  
  const fatCalories = Math.round(currentGoalCalories * fatPercentage);
  const fatGrams = Math.round(fatCalories / 9);
  
  // Implementing carbohydrate floor to prevent excessive low-carb state
  // Minimum threshold ensures adequate glycogen replenishment and CNS function
  const minCarbCalories = Math.round(currentGoalCalories * 0.2);
  let carbCalories = currentGoalCalories - proteinCalories - fatCalories;
  
  let finalProteinCalories = proteinCalories;
  let finalFatCalories = fatCalories;
  
  // Dynamic macronutrient rebalancing algorithm to ensure minimums while maintaining caloric target
  if (carbCalories < minCarbCalories) {
    const deficit = minCarbCalories - carbCalories;
    const proteinReduction = Math.round(deficit * 0.6);
    const fatReduction = deficit - proteinReduction;
    
    finalProteinCalories = Math.max(proteinCalories - proteinReduction, Math.round(currentGoalCalories * 0.3));
    finalFatCalories = Math.max(fatCalories - fatReduction, Math.round(currentGoalCalories * 0.2));
    
    carbCalories = currentGoalCalories - finalProteinCalories - finalFatCalories;
  }
  
  const finalProteinGrams = Math.round(finalProteinCalories / 4);
  const finalFatGrams = Math.round(finalFatCalories / 9);
  const carbGrams = Math.round(carbCalories / 4);
  
  // Calculating precise macronutrient percentages with rounding correction
  const proteinPercentage = Math.round((finalProteinCalories / currentGoalCalories) * 100);
  const fatPercentage2 = Math.round((finalFatCalories / currentGoalCalories) * 100);
  const carbPercentage = Math.round((carbCalories / currentGoalCalories) * 100);
  
  // Macronutrient ratio validation and adjustment to ensure 100% total
  const macroSum = proteinPercentage + fatPercentage2 + carbPercentage;
  
  let adjustedCarbPercentage = carbPercentage;
  if (macroSum !== 100) {
    adjustedCarbPercentage = carbPercentage + (100 - macroSum);
  }
  
  // Fiber recommendations based on Institute of Medicine standards
  // Higher recommendations for caloric surplus to support digestive health
  let fiberGrams;
  if (gender === 'male') {
    fiberGrams = Math.max(38, Math.round(currentGoalCalories / 1000 * 14));
  } else {
    fiberGrams = Math.max(25, Math.round(currentGoalCalories / 1000 * 14));
  }
  
  // Sugar and saturated fat limits based on WHO and AHA guidelines
  const maxSugarGrams = Math.round((currentGoalCalories * 0.1) / 4);
  const maxSaturatedFatGrams = Math.round((currentGoalCalories * 0.1) / 9);
  
  // Hydration needs based on weight and metabolic activity
  const waterLiters = (weightKg * 0.033).toFixed(1);
  
  // Meal frequency and distribution optimization based on protein synthesis research
  // Implementing the concept of protein distribution throughout the day
  const meals = 4; // Default to 4 meals based on protein synthesis timing research
  const mealDistribution = calculateMealDistribution(
    currentGoalCalories, 
    finalProteinGrams, 
    carbGrams, 
    finalFatGrams, 
    meals
  );
  
  return {
    calories: {
      maintain: maintenanceCalories,
      loseFat: caloriesLoseFat,
      buildMuscle: caloriesBuildMuscle,
      currentGoal: currentGoalCalories
    },
    macros: {
      protein: {
        grams: finalProteinGrams,
        percentage: proteinPercentage
      },
      carbs: {
        grams: carbGrams,
        percentage: adjustedCarbPercentage,
        fiber: {
          grams: fiberGrams,
          recommendation: gender === 'male' ? "38g minimum" : "25g minimum"
        },
        sugar: {
          maxGrams: maxSugarGrams,
          recommendation: "Max 10% of total calories"
        }
      },
      fat: {
        grams: finalFatGrams, 
        percentage: fatPercentage2,
        saturatedFat: {
          maxGrams: maxSaturatedFatGrams,
          recommendation: "Max 10% of total calories"
        }
      }
    },
    hydration: {
      waterLiters: waterLiters,
      recommendation: "Increase by 0.5L during exercise"
    },
    mealPlan: {
      meals: mealDistribution
    },
    micronutrients: {
      sodium: "Less than 2300mg daily",
      calcium: "1000mg daily"
    },
    bmr: bmr,
    activityLevel: activity,
    goal: primaryGoal
  };
};

// Meal distribution algorithm based on research supporting protein distribution
// throughout the day for optimal muscle protein synthesis
function calculateMealDistribution(totalCalories, totalProtein, totalCarbs, totalFat, meals) {
  // Distribution pattern optimized for circadian rhythm and training adaptations
  // Breakfast: moderate, Lunch: substantial, Dinner: largest (when training typically occurs)
  // Snacks: smaller but sufficient for recovery between main meals
  const distribution = {
    breakfast: { calPercent: 0.25, proteinPercent: 0.25, carbPercent: 0.25, fatPercent: 0.25 },
    lunch: { calPercent: 0.30, proteinPercent: 0.30, carbPercent: 0.30, fatPercent: 0.30 },
    dinner: { calPercent: 0.35, proteinPercent: 0.35, carbPercent: 0.35, fatPercent: 0.35 },
    snacks: { calPercent: 0.10, proteinPercent: 0.10, carbPercent: 0.10, fatPercent: 0.10 }
  };
  
  return {
    breakfast: {
      calories: Math.round(totalCalories * distribution.breakfast.calPercent),
      protein: Math.round(totalProtein * distribution.breakfast.proteinPercent),
      carbs: Math.round(totalCarbs * distribution.breakfast.carbPercent),
      fat: Math.round(totalFat * distribution.breakfast.fatPercent)
    },
    lunch: {
      calories: Math.round(totalCalories * distribution.lunch.calPercent),
      protein: Math.round(totalProtein * distribution.lunch.proteinPercent),
      carbs: Math.round(totalCarbs * distribution.lunch.carbPercent),
      fat: Math.round(totalFat * distribution.lunch.fatPercent)
    },
    dinner: {
      calories: Math.round(totalCalories * distribution.dinner.calPercent),
      protein: Math.round(totalProtein * distribution.dinner.proteinPercent),
      carbs: Math.round(totalCarbs * distribution.dinner.carbPercent),
      fat: Math.round(totalFat * distribution.dinner.fatPercent)
    },
    snacks: {
      calories: Math.round(totalCalories * distribution.snacks.calPercent),
      protein: Math.round(totalProtein * distribution.snacks.proteinPercent),
      carbs: Math.round(totalCarbs * distribution.snacks.carbPercent),
      fat: Math.round(totalFat * distribution.snacks.fatPercent)
    }
  };
}

export { calculateNutrition };