import React from 'react';
import classes from './DetailedMacro.module.css';
import useNutritionData from '../../hooks/useNutritionData';
import EmptyData from './EmptyData';
import MacroSummary from './MacroSummary';
import DetailedResults from './DetailedResults';
import ActionButtons from './ActionButtons';
import LoadingText from '../Loader/LoadingText';

const DetailedMacro = () => {
  const {nutritionData, loading} = useNutritionData();

  if (loading) {
    return <LoadingText text="Calculating your personalized nutrition plan..."/>;
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
