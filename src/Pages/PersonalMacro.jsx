import React from 'react';
import DetailedMacro from '../Components/PersonalMacro/DetailedMacro';
import Title from '../Components/sharedComps/Title';

const PersonalMacro = () => {
  return (
    <section>
      <Title
       title="Your Personal Nutrition Plan" 
       subText="We’ve crunched the numbers, and evaluated the data and inspected your info."/>
       
      <DetailedMacro />
    </section>
    
  );
};

export default PersonalMacro;