import { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    value:'' ,
                    validation:{},
                    valid: true
                }
        },
        formIsValid: false,
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
            for(let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
  
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
           
        }
        axios.post('/orders.json',order)
        .then( response => {
            this.setState({loading: false});
            this.props.history.push('/');
         } )
        .catch( error =>{
            this.setState({loading: false});

        });

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
        if(this.state.loading){
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

export default ContactData;