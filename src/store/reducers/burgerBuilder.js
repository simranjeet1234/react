import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
     totalPrice: 100,
     building: false

};

const INGREDIENT_PRICES = {
    salad : 30,
    bacon : 70,
    cheese :50,
    meat : 100

}

const reducer = (state = initialState,action)  => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
                
            };

         case   actionTypes.SET_INGREDIENTS: 
             return {
                ...state,
                ingredients: {
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat,
                },
                totalPrice:100,
                building: false
             };
            default:
                return state;
    }
    
};

export default reducer;