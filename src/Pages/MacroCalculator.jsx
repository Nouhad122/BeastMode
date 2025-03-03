import React from 'react';
import UserInputForm from '../Components/MacroCalculator/UserInputForm';
import Title from '../Components/sharedComps/Title';

const MacroCalculator = () => {
  return (
    <section>
      <Title
       title="Free Macro Calculator" 
       subText="This free macro calculator provides you with the most accurate macros and calories
           for your flexible dieting goals."
      />

      <UserInputForm />
    </section>
  )
}

export default MacroCalculator
