/**
 * Comprehensive nutrition calculator based on user data
 * @param {Object} formData - User input data
 * @param {number} formData.weight - Weight
 * @param {number} formData.height - Height
 * @param {number} formData.age - Age in years
 * @param {string} formData.gender - 'male' or 'female'
 * @param {string} formData.unit - 'imperial' or 'metric'
 * @param {string} formData.activity - Activity level: 'sedentary', 'light', 'moderate', 'active', or 'veryActive'
 * @param {string} formData.primaryGoal - 'maintain_weight', 'lose_fat', or 'build_muscle'
 * @returns {Object} Comprehensive nutrition data
 */
const calculateNutrition = (formData) => {
  const { weight, height, age, gender, unit, activity, primaryGoal } = formData;
  
  // Convert to metric if needed
  let weightKg = weight;
  let heightCm = height;
  
  if (unit === 'imperial') {
    weightKg = weight * 0.453592; // lbs to kg
    heightCm = height * 30.48; // feet to cm
  }
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);
  
  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,   // Little or no exercise
    light: 1.375,     // Light exercise 1-3 days/week
    moderate: 1.55,   // Moderate exercise 3-5 days/week
    active: 1.725,    // Hard exercise 6-7 days/week
    veryActive: 1.9   // Very hard exercise & physical job
  };
  
  // Calculate maintenance calories (TDEE)
  const multiplier = activityMultipliers[activity] || activityMultipliers.sedentary;
  const maintenanceCalories = Math.round(bmr * multiplier);
  
  // Calculate calories for different goals
  const caloriesLoseFat = Math.round(maintenanceCalories * 0.8); // 20% deficit
  const caloriesBuildMuscle = Math.round(maintenanceCalories * 1.1); // 10% surplus
  
  // Set current goal calories based on primaryGoal
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
  
  // Calculate protein needs based on goal (in g/kg of bodyweight)
  let proteinMultiplier;
  switch (primaryGoal) {
    case 'lose_fat':
      proteinMultiplier = 2.2; // Higher protein for fat loss (g/kg)
      break;
    case 'build_muscle':
      proteinMultiplier = 1.8; // High protein for muscle building (g/kg)
      break;
    case 'maintain_weight':
    default:
      proteinMultiplier = 1.6; // Moderate protein for maintenance (g/kg)
  }
  
  // Calculate macros
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;
  
  // Fat allocation (varies by goal)
  let fatPercentage;
  switch (primaryGoal) {
    case 'lose_fat':
      fatPercentage = 0.35; // 35% from fat
      break;
    case 'build_muscle':
      fatPercentage = 0.25; // 25% from fat
      break;
    case 'maintain_weight':
    default:
      fatPercentage = 0.3; // 30% from fat
  }
  
  const fatCalories = currentGoalCalories * fatPercentage;
  const fatGrams = Math.round(fatCalories / 9);
  
  // Remaining calories go to carbs
  const carbCalories = currentGoalCalories - proteinCalories - fatCalories;
  const carbGrams = Math.round(carbCalories / 4);
  
  // Calculate percentages for display
  const proteinPercentage = Math.round((proteinCalories / currentGoalCalories) * 100);
  const fatPercentage2 = Math.round((fatCalories / currentGoalCalories) * 100);
  const carbPercentage = 100 - proteinPercentage - fatPercentage2;
  
  // Calculate sugar (recommendation is max 10% of calories)
  const maxSugarGrams = Math.round((currentGoalCalories * 0.1) / 4);
  
  // Calculate saturated fat (recommendation is max 10% of calories)
  const maxSaturatedFatGrams = Math.round((currentGoalCalories * 0.1) / 9);
  
  return {
    calories: {
      maintain: maintenanceCalories,
      loseFat: caloriesLoseFat,
      buildMuscle: caloriesBuildMuscle,
      currentGoal: currentGoalCalories
    },
    macros: {
      protein: {
        grams: proteinGrams,
        percentage: proteinPercentage
      },
      carbs: {
        grams: carbGrams,
        percentage: carbPercentage,
        sugar: {
          maxGrams: maxSugarGrams,
          recommendation: "Max 10% of total calories"
        }
      },
      fat: {
        grams: fatGrams, 
        percentage: fatPercentage2,
        saturatedFat: {
          maxGrams: maxSaturatedFatGrams,
          recommendation: "Max 10% of total calories"
        }
      }
    },
    bmr: bmr,
    activityLevel: activity,
    goal: primaryGoal
  };
};

export { calculateNutrition }; 