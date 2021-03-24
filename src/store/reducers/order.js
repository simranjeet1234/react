import * as actionTypes from '../actions/actionTypes';
import { fetchOrderFail } from '../actions/order';


const initialState = {
    orders: [],
    loading: false,
    purchased: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            };
        
            default:
                return state;

    
    }
};

export default reducer;