import React from 'react';
import classes from './UserInputForm.module.css';
import RadioGroup from './RadioGroup';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import FormActions from './FormActions';
import useNutritionForm from '../../hooks/useNutritionForm';

const UserInputForm = () => {
  const {
    formData,
    errors,
    formOptions,
    handleInputChange,
    handleClear,
    handleSubmit
  } = useNutritionForm();

  const { unitOptions, goalOptions, genderOptions, activityOptions } = formOptions;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={classes.header}>Macro Calculator</h2>
      
      <RadioGroup
        label="Preferred Units"
        name="unit"
        options={unitOptions}
        selected={formData.unit}
        onChange={handleInputChange}
        helpText="Choose Imperial if you use inches & lbs (mostly U.S.A.), or Metric if you use kilos & cm."
      />

      <RadioGroup
        label="My Primary Goal is"
        name="primaryGoal"
        options={goalOptions}
        selected={formData.primaryGoal}
        onChange={handleInputChange}
      />
      
      <RadioGroup
        label="Gender"
        name="gender"
        options={genderOptions}
        selected={formData.gender}
        onChange={handleInputChange}
      />

      <div className={classes.flexText}>
        <NumberInput
          label="Age"
          name="age"
          placeholder="years old"
          value={formData.age}
          onChange={handleInputChange}
          error={errors.age}
        />

        <NumberInput
          label={`Weight (${formData.unit === 'imperial' ? 'lbs' : 'kg'})`}
          name="weight"
          placeholder={formData.unit === 'imperial' ? 'lbs' : 'kg'}
          value={formData.weight}
          onChange={handleInputChange}
          error={errors.weight}
        />

        <NumberInput
          label={`Height (${formData.unit === 'imperial' ? 'feet' : 'cm'})`}
          name="height"
          placeholder={formData.unit === 'imperial' ? 'feet' : 'cm'}
          value={formData.height}
          onChange={handleInputChange}
          error={errors.height}
        />
      </div>

      <SelectInput
        label="Activity Level"
        name="activity"
        options={activityOptions}
        value={formData.activity}
        onChange={handleInputChange}
        helpText="Choose your activity level based on your daily exercise routine."
        error={errors.activity}
      />

      <FormActions onClear={handleClear} />
    </form>
  );
};

export default UserInputForm;