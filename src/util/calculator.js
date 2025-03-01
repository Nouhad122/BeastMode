/**
 * Calculate BMR using the Mifflin-St Jeor Equation
 * @param {number} weight - Weight in pounds
 * @param {number} height - Height in feet
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @param {string} unit - 'imperial' or 'metric'
 * @returns {number} BMR in calories
 */
const calculateBMR = (weight, height, age, gender, unit) => {
    // Convert imperial to metric if needed
    let weightKg = weight;
    let heightCm = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightCm = height * 30.48; // feet to cm
    }
    
    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    
    return Math.round(bmr);
  };
  
  /**
   * Calculate TDEE (Total Daily Energy Expenditure)
   * @param {number} bmr - Basal Metabolic Rate
   * @param {string} activityLevel - Activity level
   * @returns {number} TDEE in calories
   */
  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      veryActive: 1.9 // Very hard exercise & physical job
    };
    
    const multiplier = activityMultipliers[activityLevel] || activityMultipliers.sedentary;
    return Math.round(bmr * multiplier);
  };
  
  /**
   * Calculate target calories based on goal
   * @param {number} tdee - Total Daily Energy Expenditure
   * @param {string} goal - 'lose_fat', 'build_muscle', or 'maintain_weight'
   * @returns {number} Target calories
   */
  const calculateTargetCalories = (tdee, goal) => {
    switch (goal) {
      case 'lose_fat':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'build_muscle':
        return Math.round(tdee * 1.1); // 10% surplus
      case 'maintain_weight':
      default:
        return tdee;
    }
  };
  
  /**
   * Calculate macronutrient distribution
   * @param {number} targetCalories - Target daily calories
   * @param {string} goal - 'lose_fat', 'build_muscle', or 'maintain_weight'
   * @param {number} weightLbs - Weight in pounds
   * @param {string} unit - 'imperial' or 'metric'
   * @returns {Object} Macros in grams and percentages
   */
  const calculateMacros = (targetCalories, goal, weightLbs, unit) => {
    // Convert weight to kg if needed
    const weightKg = unit === 'imperial' ? weightLbs * 0.453592 : weightLbs;
    
    let proteinPerKg = 0;
    let fatPercentage = 0;
    let carbPercentage = 0;
    
    // Set protein targets based on goal
    switch (goal) {
      case 'lose_fat':
        proteinPerKg = 2.2; // Higher protein for fat loss
        fatPercentage = 0.35; // 35% from fat
        break;
      case 'build_muscle':
        proteinPerKg = 1.8; // High protein for muscle growth
        fatPercentage = 0.25; // 25% from fat
        break;
      case 'maintain_weight':
      default:
        proteinPerKg = 1.6; // Moderate protein for maintenance
        fatPercentage = 0.3; // 30% from fat
    }
    
    // Calculate protein in grams
    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinCalories = proteinGrams * 4;
    
    // Calculate fat in grams
    const fatCalories = targetCalories * fatPercentage;
    const fatGrams = Math.round(fatCalories / 9);
    
    // Calculate remaining calories for carbs
    const remainingCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(remainingCalories / 4);
    
    // Calculate percentages
    const proteinPercentage = Math.round((proteinCalories / targetCalories) * 100);
    const fatPercentage2 = Math.round((fatCalories / targetCalories) * 100);
    const carbPercentage = 100 - proteinPercentage - fatPercentage2;
    
    return {
      calories: targetCalories,
      protein: {
        grams: proteinGrams,
        percentage: proteinPercentage
      },
      carbs: {
        grams: carbGrams,
        percentage: carbPercentage
      },
      fat: {
        grams: fatGrams,
        percentage: fatPercentage2
      }
    };
  };
  
  /**
   * Main function to calculate all nutrition data
   * @param {Object} formData - Form data
   * @returns {Object} Complete nutrition data
   */
  const calculateNutrition = (formData) => {
    const { unit, primaryGoal, gender, age, weight, height, activity } = formData;
    
    // Calculate BMR
    const bmr = calculateBMR(weight, height, age, gender, unit);
    
    // Calculate TDEE
    const tdee = calculateTDEE(bmr, activity);
    
    // Calculate target calories
    const targetCalories = calculateTargetCalories(tdee, primaryGoal);
    
    // Calculate macros
    const macros = calculateMacros(targetCalories, primaryGoal, weight, unit);
    
    return {
      bmr,
      tdee,
      ...macros
    };
  };
  
  export {
    calculateBMR,
    calculateTDEE,
    calculateTargetCalories,
    calculateMacros,
    calculateNutrition
  };