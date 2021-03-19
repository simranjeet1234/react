import React from 'react';
 import NavigationItem from '../../Navigationitem/Navigationitem';
import classes from '../Navigationitems/Navigationitems.module.css';

const navigationItems = () => (
   <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact >Burger </NavigationItem>
       <NavigationItem link="/orders" >Orders </NavigationItem>
   </ul>
);

export default navigationItems;