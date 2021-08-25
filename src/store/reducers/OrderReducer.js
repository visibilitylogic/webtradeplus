import { GET_ORDERS, GET_ORDER_ERROR, ORDER_LOADING } from "../action-types";

const initialState = {
    loading:false,
    trade_orders: []
};

export const orderReducer = (state = initialState, action)=>{
    console.log(action);
    switch(action.type){
        case ORDER_LOADING:
            return {
                ...state,
                loading:true
            }
        break;
        case GET_ORDERS:
            return {
                ...state,
                loading:false,
                trade_orders:action.payload
            }
        break;
        case GET_ORDER_ERROR:
            return {
                ...state,
                error:action.payload
            }
        break;
        default: return state
    }
}