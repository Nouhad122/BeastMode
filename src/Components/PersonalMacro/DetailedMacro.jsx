import React from 'react';
import classes from './DetailedMacro.module.css';
import useNutritionData from '../../hooks/useNutritionData';
import EmptyData from './EmptyData';
import MacroSummary from './MacroSummary';
import DetailedResults from './DetailedResults';
import ActionButtons from './ActionButtons';

const DetailedMacro = () => {
  const {nutritionData, loading} = useNutritionData();

  if (loading) {
    return <div className={classes.loading}>Loading your personalized nutrition plan...</div>;
  }


  return (
    <div className={classes.container}>
      {!nutritionData && <EmptyData />}
      {nutritionData && 
      <>
        <MacroSummary nutritionData={nutritionData}/>

        <DetailedResults nutritionData={nutritionData}/>

        <ActionButtons />
      </>
      }  
    </div>
  );
};

export default DetailedMacro
