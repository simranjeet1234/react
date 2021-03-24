import * as actionTypes from './actionTypes';
import axios from 'axios'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
};


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-55fcf-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredient(response.data))
        }
        );
    };
};