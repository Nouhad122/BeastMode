import React, { useState } from 'react'
import classes from './Navbar.module.css'
import logo from '../../assets/Beast-mode-light-logo.png'
import { NavLink } from 'react-router'
import { LuSquareMenu } from "react-icons/lu"

const Navbar = () => {
    const [openedMenu, setOpenedMenu] = useState(false);

    const handleMenuOpening = () =>{
        setOpenedMenu(prevState => !prevState);
    }
  return (
    <nav className={classes.navbar}>
        <div className={classes['logo-box']}>
            <img src={logo} alt='gym logo' className={classes.logo}/>
        </div>
    
        <LuSquareMenu onClick={handleMenuOpening} className={classes['menu-bars']}/>

        <ul className={`${classes['menu-list']} ${openedMenu ? classes['opened-list'] : ''}` }>
            <li>
                <NavLink
                to={`/`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Home
                </NavLink>
            </li>

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
                to={`/`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Favorites
                </NavLink>
            </li>

            <li>
                <NavLink
                to={`/`} 
                className={({isActive}) =>
                isActive ? classes.active : ''}>
                Macros Calculator
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
