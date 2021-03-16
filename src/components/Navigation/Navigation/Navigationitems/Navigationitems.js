import React from 'react';
 import NavigationItem from '../../Navigationitem/Navigationitem';
import classes from '../Navigationitems/Navigationitems.module.css';

const navigationItems = () => (
   <ul className={classes.NavigationItems}>
       <NavigationItem link="/" active>Burger </NavigationItem>
       <NavigationItem link="/" >checkout </NavigationItem>
   </ul>
);

export default navigationItems;