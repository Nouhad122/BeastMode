import React from 'react';
import classes from './PersonalMacro.module.css';
import useNutritionData from '../hooks/useNutritionData';
import EmptyData from '../Components/PersonalMacro/EmptyData.jsx';
import MacroSummary from '../Components/PersonalMacro/MacroSummary.jsx';
import DetailedResults from '../Components/PersonalMacro/DetailedResults.jsx';
import MealPlanSection from '../Components/PersonalMacro/MealPlanSection.jsx';
import MicronutrientSection from '../Components/PersonalMacro/MicronutrientSection.jsx';
import WorkoutCalendar from '../Components/PersonalMacro/WorkoutCalendar.jsx';
import FoodRecommendations from '../Components/PersonalMacro/FoodRecommendations.jsx';
import ResultsTimeline from '../Components/PersonalMacro/ResultsTimeline.jsx';
import ActionButtons from '../Components/PersonalMacro/ActionButtons.jsx';
import LoadingText from '../Components/Loader/LoadingText.jsx';
import Title from '../Components/sharedComps/Title.jsx';

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
        
        <MicronutrientSection />
        
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