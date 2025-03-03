import React, { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/Beast-mode-light-logo.png';
import { NavLink } from 'react-router';
import { LuSquareMenu } from "react-icons/lu";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();
    const [openedMenu, setOpenedMenu] = useState(false);

    useEffect(() => {
        setOpenedMenu(false);
      }, [pathname]);

    const handleMenuOpening = () =>{
        setOpenedMenu(prevState => !prevState);
    }
  return (
    <nav className={classes.navbar}>
        <div className={classes['logo-box']}>
        <NavLink to={`/`}><img src={logo} alt='gym logo' className={classes.logo}/></NavLink>
        </div>
    
        <LuSquareMenu onClick={handleMenuOpening} className={classes['menu-bars']}/>

        <ul className={`${classes['menu-list']} ${openedMenu ? classes['opened-list'] : ''}` }>
            <li>
                <NavLink
                to={`exercises`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Exercises
                </NavLink>
            </li>

            <li>
                <NavLink
                to={`my-schedule`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                My Schedule
                </NavLink>
            </li>

            <li>
                <NavLink
                to={`macro-calculator`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Macro Calculator
                </NavLink>
            </li>

            <li>
                <NavLink
                to={`personal-macro`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Personal Macro
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
