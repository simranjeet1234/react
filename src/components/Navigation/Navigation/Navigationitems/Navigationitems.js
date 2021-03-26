import React from 'react';
 import NavigationItem from '../../Navigationitem/Navigationitem';
import classes from '../Navigationitems/Navigationitems.module.css';

const navigationItems = (props) => (
   <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact >Burger </NavigationItem>
       {props.isAuthenticated ? <NavigationItem link="/orders" >Orders </NavigationItem> : null}
       {!props.isAuthenticated 
       ? <NavigationItem link="/auth" >Authentication </NavigationItem>
       : <NavigationItem link="/logout" >Logout </NavigationItem>}
   </ul>
);

export default navigationItems;