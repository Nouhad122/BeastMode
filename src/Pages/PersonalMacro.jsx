import React from 'react';
import classes from './PersonalMacro.module.css';
import useNutritionData from '../hooks/useNutritionData';
import EmptyData from '../Components/PersonalMacro/EmptyData';
import MacroSummary from '../Components/PersonalMacro/MacroSummary';
import DetailedResults from '../Components/PersonalMacro/DetailedResults';
import MealPlanSection from '../Components/PersonalMacro/MealPlanSection';
// import MicronutrientSection from '../Components/PersonalMacro/MicronutrientSection';
import WorkoutCalendar from '../Components/PersonalMacro/WorkoutCalendar';
import FoodRecommendations from '../Components/PersonalMacro/FoodRecommendations';
import ResultsTimeline from '../Components/PersonalMacro/ResultsTimeline';
import ActionButtons from '../Components/PersonalMacro/ActionButtons';
import LoadingText from '../Components/Loader/LoadingText';
import Title from '../Components/sharedComps/Title';

const PersonalMacro = () => {
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
        
        <MealPlanSection />
        
        {/* <MicronutrientSection /> */}
        
        <WorkoutCalendar />
        
        <FoodRecommendations />
        
        <ResultsTimeline />

        <ActionButtons />
      </>
      }  
    </div>
    </section>
  );
};

export default PersonalMacro