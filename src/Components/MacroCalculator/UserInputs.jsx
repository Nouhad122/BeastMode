import React, { useState } from 'react';
import classes from './UserInputs.module.css';
import Button from '../sharedComps/Button';
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from 'react-router';

const UserInputs = () => {
  const navigate = useNavigate();

  // Form state
  const [unit, setUnit] = useState('imperial');
  const [primaryGoal, setPrimaryGoal] = useState('lose_fat');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  // Form validation state
  const [errors, setErrors] = useState({});

  // Clear form data
  const handleClear = () => {
    setUnit('imperial');
    setPrimaryGoal('lose_fat');
    setGender('male');
    setActivity('sedentary');
    setAge('');
    setWeight('');
    setHeight('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!age) newErrors.age = 'Age is required';
    if (age < 0 || age > 130) newErrors.age = 'Please enter a valid age'

    if (!weight) newErrors.weight = 'Weight is required';
    if (unit === 'imperial' && weight && (weight < 50 || weight > 1400)) newErrors.weight = 'Please enter a valid weight';
    if( unit === 'metric' && weight && (weight < 22 || weight > 635)) newErrors.weight = 'Please enter a valid weight';

    if (!height) newErrors.height = 'Height is required';
    if (unit === 'metric' && height && (height < 50 || height > 300)) newErrors.height = 'Please enter a valid height';
    if (unit === 'imperial' && height && (height < 1.64 || height > 9.84)) newErrors.height = 'Please enter a valid height';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formData = {
        unit,
        primaryGoal,
        gender,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        activity
      };
      
      localStorage.setItem('nutritionFormData', JSON.stringify(formData));
      
      console.log('Form submitted with data:', formData);
      navigate('/personal-macro', { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={classes['header']}>Macro Calculator</h2>
      <div className={classes['form-group']}>
        <label htmlFor='units' className={classes['main-label']}>Preferred Units</label>
        <div className={classes['option']}>
          <input
            type='radio'
            name='units'
            id='unit-0'
            value='imperial'
            checked={unit === 'imperial'}
            onChange={() => setUnit('imperial')}
          />
          <label className={classes['radio']} htmlFor='unit-0'>
            Imperial
          </label>

          <input
            type='radio'
            name='units'
            id='unit-1'
            value='metric'
            checked={unit === 'metric'}
            onChange={() => setUnit('metric')}
          />
          <label className={classes['radio']} htmlFor='unit-1'>
            Metric
          </label>    
        </div>
        <span className={classes['help-block']}>
            Choose Imperial if you use inches &amp; lbs (mostly U.S.A.),
             or Metric if you use kilos &amp; cm.
        </span>
      </div>

      <div className={classes['form-group']}>
        <label htmlFor='primary_goal' className={classes['main-label']}>My Primary Goal is</label>
        <div className={classes['option']}>
          <input
            type='radio'
            name='primary_goal'
            id='primary_goal-0'
            value='lose_fat'
            checked={primaryGoal === 'lose_fat'}
            onChange={() => setPrimaryGoal('lose_fat')}
          />
          <label className={classes['radio']} htmlFor='primary_goal-0'>
            Lose Fat
          </label>

          <input
            type='radio'
            name='primary_goal'
            id='primary_goal-1'
            value='build_muscle'
            checked={primaryGoal === 'build_muscle'}
            onChange={() => setPrimaryGoal('build_muscle')}
          />
          <label className={classes['radio']} htmlFor='primary_goal-1'>
            Build Muscle
          </label>

          <input
            type='radio'
            name='primary_goal'
            id='primary_goal-2'
            value='maintain_weight'
            checked={primaryGoal === 'maintain_weight'}
            onChange={() => setPrimaryGoal('maintain_weight')}
          />
          <label className={classes['radio']} htmlFor='primary_goal-2'>
            Maintain Weight
          </label>    
        </div>
      </div>
      
      <div className={classes['form-group']}>
        <label htmlFor='gender' className={classes['main-label']}>Gender</label>
        <div className={classes['option']}>
          <input
            type='radio'
            name='gender'
            id='gender-0'
            value='male'
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <label className={classes['radio']} htmlFor='gender-0'>
            Male
          </label>

          <input
            type='radio'
            name='gender'
            id='gender-1'
            value='female'
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
          <label className={classes['radio']} htmlFor='gender-1'>
            Female
          </label>    
        </div> 
      </div>

      <div className={classes['flex-text']}>
        <div className={classes['form-group']}>
          <label htmlFor='age' className={classes['main-label']}>Age</label>
          <input 
            type='number' 
            name='age' 
            id='age' 
            placeholder='years old' 
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <span className={classes['error']}>{errors.age}</span>}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor='weight' className={classes['main-label']}>
            Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
          </label>
          <input 
            type='number' 
            name='weight' 
            id='weight' 
            placeholder={unit === 'imperial' ? 'lbs' : 'kg'} 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && <span className={classes['error']}>{errors.weight}</span>}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor='height' className={classes['main-label']}>
            Height ({unit === 'imperial' ? 'feet' : 'cm'})
          </label>
          <input 
            type='number' 
            name='height' 
            id='height' 
            placeholder={unit === 'imperial' ? 'feet' : 'cm'} 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          {errors.height && <span className={classes['error']}>{errors.height}</span>}
        </div>
      </div>

      <div className={classes['form-group']}>
        <label htmlFor="activity" className={classes['main-label']}>Activity Level</label>
        <select
          id="activity"
          className={classes['select']}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Light (1-3 days per week)</option>
          <option value="moderate">Moderate (3-5 days per week)</option>
          <option value="active">Active (6-7 days per week)</option>
        </select>
        <span className={classes['help-block']}>
          Choose your activity level based on your daily exercise routine.
        </span>
        {errors.activity && <span className={classes['error']}>{errors.activity}</span>}
      </div>

      <div className={classes['form-btns-wrapper']}>
        <Button type="submit" className={classes['submit-btn']}>Calculate <VscDebugStart /></Button>
        <Button type="button" className={classes['clear-btn']} onClick={handleClear}>Clear</Button>
      </div>
    </form>
  );
};

export default UserInputs;