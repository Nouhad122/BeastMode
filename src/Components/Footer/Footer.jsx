import React from 'react';
import classes from './Footer.module.css';
import logo from '../../assets/Beast-mode-light-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.footerContent}>
          <div className={classes.logoSection}>
        
            <div className={classes.logoPlaceholder}>
                <img className={classes.logo} src={logo} alt='beast mode logo'/>
            </div>
          </div>
          
          <div className={classes.mottoSection}>
            <p className={classes.motto}>"Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."</p>
          </div>
        </div>
        
        <div className={classes.decorativeLine}>
          <div className={classes.line}></div>
          <div className={classes.circle}></div>
          <div className={classes.line}></div>
        </div>
        
        <div className={classes.copyright}>
          <p>&copy; {currentYear} BeastMode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;