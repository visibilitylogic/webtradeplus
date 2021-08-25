import * as actionTypes from "../action-types";
const initialState = {
    market: [],
    loading:false,
    error:""
}

export const marketReducer = (state = initialState, action)=>{

    switch(action.type){
        case actionTypes.MARKET_PLACE_LOADING:
            return {
                ...state,
                loading:true
            }
        break;
        case actionTypes.GET_MARKET_PLACE:
            return {
                ...state,
                loading:false,
                market:action.payload
            }
        break;
        case actionTypes.MARKET_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            };
        break;
        default:
            return state;
    }
}