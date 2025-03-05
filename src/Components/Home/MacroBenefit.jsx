import React from 'react';
import classes from './MacroBenefit.module.css';
import Title from '../sharedComps/Title';
import Button from '../sharedComps/Button';
import macroImage1 from '../../assets/macro-image-1.jpg';
import macroImage2 from '../../assets/macro-image-2.jpg';
import macroImage3 from '../../assets/macro-image-3.jpg';
import { Link } from 'react-router';

const MacroBenefit = () => {

  const benefitCards = [
    {
      id: 'weight-management',
      title: 'Weight Management',
      description: "Understanding your unique caloric needs helps you maintain, lose, or gain weight effectively without guesswork. Tracking macros ensures you're getting the right amount of calories for your goals.",
      imageUrl: macroImage1,
      imageAlt: 'Person measuring waist with tape measure'
    },
    {
      id: 'muscle-development',
      title: 'Muscle Development',
      description: 'Protein is the building block of muscle tissue. Proper protein intake supports muscle repair and growth, essential for improving strength and overall body composition.',
      imageUrl: macroImage2,
      imageAlt: 'Person lifting weights'
    },
    {
      id: 'energy-levels',
      title: 'Optimized Energy',
      description: 'Balanced carbohydrate intake ensures sustained energy throughout the day and during workouts. Finding your ideal carb intake prevents energy crashes and optimizes performance.',
      imageUrl: macroImage3,
      imageAlt: 'Person with high energy running outdoors'
    }
  ];

  return (
    <section className={classes['macro-benefit-section']}>
      <Title 
       title="Why Tracking Macro?"
      />
      <div className={classes.container}>
        <div className={classes.cardsContainer}>
          {benefitCards.map((card, index) => (
            <div key={card.id} className={`${classes.benefitCard} ${index % 2 !== 0 ? classes.reversed : ''}`}>
              <div className={classes.imageContainer}>
                <img 
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  className={classes.benefitImage}
                />
              </div>
              <div className={classes.textContent}>
                <h3 className={classes.benefitTitle}>{card.title}</h3>
                <p className={classes.benefitDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={classes.ctaContainer}>
          <p className={classes.ctaText}>
            Your body has unique nutritional needs based on your age, weight, height, activity level, and goals.
            Our calculator helps you find your perfect macro balance.
          </p>
          <Link to={'macro-calculator'}>
            <Button>
              Calculate Your Macros Now
            </Button>
          </Link>
          
        </div>
      </div>
    </section>
  );
}

export default MacroBenefit
