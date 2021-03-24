import { Component } from "react";
import {connect}   from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
    state ={
         orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name',
                    },
                    value:'',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false

                },
                email:{
                    elementType: 'input',
                    elementConfig: {
                       type: 'email',
                       placeholder: 'Your email',
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            place:{
                elementType: 'input',
                elementConfig: {
                   type: 'text',
                   placeholder: 'city',
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                       Options:[
                           {value:'fatest', displayValue:'Fastest'},
                           {value:'cheapest', displayValue:'Cheapest'}
                       ]
                    },
                    value:'fastest' ,
                    validation:{},
                    valid: true
                }
        },
        formIsValid: false
        
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
            for(let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
  
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
           
        }
        this.props.onOrderBurger(order);
        
    }

    checkValidity(value, rules) {
        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== '';
        }
        // if(rules.minLength){
        //     isValid = value.length >= rules.minLength
        // }
        return isValid;

    }

    inputChangedHandler= (event,inputIdentifier) => {
           const updatedOrderForm = {

               ...this.state.orderForm
           };
            const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
                };
                updatedFormElement.value = event.target.value;
                updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
                updatedOrderForm[inputIdentifier] = updatedFormElement;
                console.log(updatedFormElement);
                updatedFormElement.touched = true;

                let formIsValid = true;
                for(let inputIdentifier in updatedOrderForm){
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                }

                this.setState({orderForm: updatedOrderForm , formIsValid:formIsValid});
            }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (  
        <form onSubmit={this.orderHandler}>
            
            {formElementsArray.map(formElement => (
                <Input
                key={formElement.id}
                 elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler} >ORDER</Button>
        </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.Contactdata}>
                <h4>Enter your contact data</h4>
               {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
  return {
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    };

    
};

export default connect(mapStateToProps,mapDispatchToProps)(ContactData); 