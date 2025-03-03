import React from 'react';
import DetailedMacro from '../Components/PersonalMacro/DetailedMacro';
import Title from '../Components/sharedComps/Title';

const PersonalMacro = () => {
  return (
    <section>
      <Title
       title="Personal Nutrition Plan" 
       subText="We crunch the numbers, and evaluate the data and inspect your info."
      />

      <DetailedMacro />
    </section>
    
  );
};

export default PersonalMacro;