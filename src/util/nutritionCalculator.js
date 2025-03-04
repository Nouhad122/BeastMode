const calculateNutrition = (formData) => {
  const { weight, height, age, gender, unit, activity, primaryGoal } = formData;
  
  let weightKg = weight;
  let heightCm = height;
  
  if (unit === 'imperial') {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }
  
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  
  const multiplier = activityMultipliers[activity] || activityMultipliers.moderate;
  const maintenanceCalories = Math.round(bmr * multiplier);
  
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
  
  let proteinMultiplier;
  switch (primaryGoal) {
    case 'lose_fat':
      proteinMultiplier = 2.2;
      break;
    case 'build_muscle':
      proteinMultiplier = 1.8;
      break;
    case 'maintain_weight':
    default:
      proteinMultiplier = 1.6;
  }
  
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;
  
  let fatPercentage;
  switch (primaryGoal) {
    case 'lose_fat':
      fatPercentage = 0.3;
      break;
    case 'build_muscle':
      fatPercentage = 0.25;
      break;
    case 'maintain_weight':
    default:
      fatPercentage = 0.3;
  }
  
  const fatCalories = Math.round(currentGoalCalories * fatPercentage);
  const fatGrams = Math.round(fatCalories / 9);
  
  const minCarbCalories = Math.round(currentGoalCalories * 0.2);
  let carbCalories = currentGoalCalories - proteinCalories - fatCalories;
  
  let finalProteinCalories = proteinCalories;
  let finalFatCalories = fatCalories;
  
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
  
  const proteinPercentage = Math.round((finalProteinCalories / currentGoalCalories) * 100);
  const fatPercentage2 = Math.round((finalFatCalories / currentGoalCalories) * 100);
  const carbPercentage = Math.round((carbCalories / currentGoalCalories) * 100);
  
  const macroSum = proteinPercentage + fatPercentage2 + carbPercentage;
  
  let adjustedCarbPercentage = carbPercentage;
  if (macroSum !== 100) {
    adjustedCarbPercentage = carbPercentage + (100 - macroSum);
  }
  
  let fiberGrams;
  if (gender === 'male') {
    fiberGrams = Math.max(38, Math.round(currentGoalCalories / 1000 * 14));
  } else {
    fiberGrams = Math.max(25, Math.round(currentGoalCalories / 1000 * 14));
  }
  
  const maxSugarGrams = Math.round((currentGoalCalories * 0.1) / 4);
  const maxSaturatedFatGrams = Math.round((currentGoalCalories * 0.1) / 9);
  
  // Calculate water needs based on weight
  const waterLiters = (weightKg * 0.033).toFixed(1);
  
  // Calculate meal distribution
  const meals = 4; // Default to 4 meals
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

// Helper function to calculate meal distribution
function calculateMealDistribution(totalCalories, totalProtein, totalCarbs, totalFat, meals) {
  // Breakfast: 25%, Lunch: 30%, Dinner: 35%, Snacks: 10%
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