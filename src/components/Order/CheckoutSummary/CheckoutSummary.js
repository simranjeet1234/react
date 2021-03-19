
import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>
                We hope it tastes well
                <div style={{width: '100%',  margin: 'auto'}}>
                    <Burger ingredients={props.ingredients} ></Burger>
                </div>
                <Button
                     btnType="Danger" clicked={props.CheckoutCancelled}>Cancel
                 </Button>
                <Button 
                    btnType="Success" clicked={props.CheckoutContinued}>Continue
                </Button>
            </h1>
        </div>
    )
}

export default checkoutSummary;