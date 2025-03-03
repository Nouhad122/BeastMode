import React from 'react';
import classes from './DetailedMacro.module.css';
import useNutritionData from '../../hooks/useNutritionData';
import EmptyData from './EmptyData';
import MacroSummary from './MacroSummary';
import DetailedResults from './DetailedResults';
import ActionButtons from './ActionButtons';
import LoadingText from '../Loader/LoadingText';
import Title from '../sharedComps/Title';

const DetailedMacro = () => {
  const {nutritionData, loading} = useNutritionData();

  if (loading) {
    return <LoadingText text="Calculating your personalized nutrition plan..."/>;
  }

  return (
    <section>
    <Title
      title="Personal Nutrition Plan" 
      subText="We crunch the numbers, and evaluate the data and inspect your info."
    />

    <div className={classes.container}>
      {nutritionData === null && <EmptyData />}
      {nutritionData !== null && 
      <>
        <MacroSummary />

        <DetailedResults />

        <ActionButtons />
      </>
      }  
    </div>
    </section>
  );
};

export default DetailedMacro
