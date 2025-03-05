import {useState, useEffect, useMemo} from 'react';
import { useLocation } from 'react-router-dom';
import { calculateNutrition } from '../util/nutritionCalculator';
import { useNavigate } from 'react-router-dom';

const useNutritionData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [parsedFormData, setParsedFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Handling form data loading and parsing
  useEffect(() => {
    const loadData = () => {
      let formData = location.state;
      
      if (!formData) {
        const savedData = localStorage.getItem('nutritionFormData');
        if (savedData) {
          formData = JSON.parse(savedData);
        }
      } else {
        localStorage.setItem('nutritionFormData', JSON.stringify(formData));
      }
      
      if (formData) {
        const parsedData = {
          ...formData,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height)
        };
        
        setParsedFormData(parsedData);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [location]);
  
  // Memoizing the complex nutrition calculation
  const nutritionData = useMemo(() => {
    if (!parsedFormData) return null;
    return calculateNutrition(parsedFormData);
  }, [parsedFormData]);
  
  const clearNutritionData = () => {
    localStorage.removeItem('nutritionFormData');
    setParsedFormData(null);
    navigate('/macro-calculator');
  };
  
  return {
    nutritionData,
    loading,
    clearNutritionData
  };
};

export default useNutritionData;