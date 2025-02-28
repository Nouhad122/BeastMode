import React, { useState } from 'react';
import classes from './UserInputs.module.css';

const UserInputs = () => {
  const [unit, setUnit] = useState('imperial');
  const [primaryGoal, setPrimaryGoal] = useState('lose_fat');
  const [gender, setGender] = useState('male');

  return (
    <form>
      <h2 className={classes['header']}>Macro Calculator</h2>
      <div className={classes['form-group']}>
        <label htmlFor='units'>Preferred Units</label>
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
        <label htmlFor='primary_goal'>My Primary Goal is</label>
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
        <label htmlFor='gender'>Gender</label>
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

    </form>
  );
};

export default UserInputs;
