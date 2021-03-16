import React from 'react';
import classes from '../Toolbar/Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/Navigationitems/Navigationitems';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}>

        </DrawerToggle>
        <div className={classes.Logo}><Logo /></div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
);
 export default toolbar;