import { Component } from "react";
import {connect} from    'react-redux';
import Aux from '../hoc/Au';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import axios from 'axios';
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        
        purchasing: false,
        
    }

    componentDidMount () {
        this.props.oninitIngredients();
        
    }
    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(
            igkey => {
                return ingredients[igkey];
            }
        ).reduce((sum,el) => {
            return sum + el
        },0);
        return sum> 0;
    }


    
    purchaseHandler =  () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
    this.props.onInitPurchase();
        
        this.props.history.push('/checkout');
    }

    render () {
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = <Spinner/>
        if(this.props.ings){
            burger =(
                <Aux>
                 <Burger ingredients={this.props.ings}/>
                <BuildControls
                       ingredientAdded={this.props.onIngredientAdded}
                       ingredientRemoved={this.props.onIngredientRemoved}
                       disabled ={disableInfo} 
                       purchasable = {this.updatePurchaseState(this.props.ings)}
                       ordered={this.purchaseHandler}
                       price={this.props.price}/>
                       </Aux>
                );
                orderSummary =
        <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
        }
        

         
       
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
}


const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        oninitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)  (withErrorHandler( BurgerBuilder,axios));