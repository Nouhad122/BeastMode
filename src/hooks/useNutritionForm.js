import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useNutritionForm = () => {
  const navigate = useNavigate();
  
  // Form initial values
  const initialFormData = {
    unit: 'imperial',
    primaryGoal: 'lose_fat',
    gender: 'male',
    activity: 'sedentary',
    age: '',
    weight: '',
    height: ''
  };

  // Form data state
  const [formData, setFormData] = useState(initialFormData);
  
  // Form validation state
  const [errors, setErrors] = useState({});

  // Form options (moved from component to reduce clutter)
  const formOptions = {
    unitOptions: [
      { id: 'unit-0', value: 'imperial', label: 'Imperial' },
      { id: 'unit-1', value: 'metric', label: 'Metric' }
    ],
    goalOptions: [
      { id: 'primary_goal-0', value: 'lose_fat', label: 'Lose Fat' },
      { id: 'primary_goal-1', value: 'build_muscle', label: 'Build Muscle' },
      { id: 'primary_goal-2', value: 'maintain_weight', label: 'Maintain Weight' }
    ],
    genderOptions: [
      { id: 'gender-0', value: 'male', label: 'Male' },
      { id: 'gender-1', value: 'female', label: 'Female' }
    ],
    activityOptions: [
      { value: 'sedentary', label: 'Sedentary (Little to no exercise)' },
      { value: 'light', label: 'Light (1-3 days per week)' },
      { value: 'moderate', label: 'Moderate (3-5 days per week)' },
      { value: 'active', label: 'Active (6-7 days per week)' }
    ]
  };

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form to initial state
  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  // Validate form fields
  const validateForm = () => {
    const { unit, age, weight, height } = formData;
    const newErrors = {};
    
    if (!age) newErrors.age = 'Age is required';
    else if (age < 0 || age > 130) newErrors.age = 'Please enter a valid age';

    if (!weight) newErrors.weight = 'Weight is required';
    else if (unit === 'imperial' && (weight < 50 || weight > 1400)) 
      newErrors.weight = 'Please enter a valid weight';
    else if (unit === 'metric' && (weight < 22 || weight > 635)) 
      newErrors.weight = 'Please enter a valid weight';

    if (!height) newErrors.height = 'Height is required';
    else if (unit === 'metric' && (height < 50 || height > 300)) 
      newErrors.height = 'Please enter a valid height';
    else if (unit === 'imperial' && (height < 1.64 || height > 9.84)) 
      newErrors.height = 'Please enter a valid height';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      };
      
      localStorage.setItem('nutritionFormData', JSON.stringify(submissionData));
      navigate('/personal-macro', { state: submissionData });
    }
  };

  return {
    formData,
    errors,
    formOptions,
    handleInputChange,
    handleClear,
    handleSubmit
  };
};

export default useNutritionForm;