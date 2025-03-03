import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { calculateNutrition } from '../util/nutritionCalculator';
import { useNavigate } from 'react-router-dom';
const useNutritionData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () =>{
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
    
          const data = calculateNutrition(parsedData);
          setNutritionData(data);
        }
        
        setLoading(false);
    }

    loadData();

  }, [location]);

  const clearNutritionData = () => {
    localStorage.removeItem('nutritionFormData');
    setNutritionData(null);
    navigate('/macro-calculator');
  };

  return (
    {
        nutritionData,
        loading,
        clearNutritionData
    }
  )
}

export default useNutritionData
