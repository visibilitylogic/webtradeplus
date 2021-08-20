import * as actionTypes from "../action-types";

const initialState = {
    success:"",
    loading:false,
    error:"",
    trades:[],
    specificTrade:{}
}

const adminInitialState = {
    adminData : {},
    loading:false,
}

export function adminReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.AUTO_TRADE_LOADING:
            return {
                ...state,
                loading:true
            }
            break;
        case actionTypes.AUTO_TRADE_ADD_SUCCESS:
            return {
                ...state,
                trades:[...state.trades, action.payload],
                success:"Successfull added auto trade"
            }
        break;
        case actionTypes.AUTO_TRADE_ERROR:
            return{
                ...state,
                error:action.payload
            }
        break;
        case actionTypes.AUTO_TRADES:
            return {
                ...state,
                loading:false,
                trades:action.payload
            }
        break;
        case actionTypes.SPECIFIC_TRADE:
            return {
                ...state,
                loading:false,
                specificTrade:action.payload
            }
        break;
        default:
            return {
                initialState
            }
    }
}

export const adminDataReducer =  (state=adminInitialState, action)=>{
    const {type} = action;
    switch(type){
        case actionTypes.ADMIN_DATA_LOADING:
            return {
                ...state,
                loading:true,
            }
        break;
        case actionTypes.ADMIN_DATA:
            return {
                ...state,
                loading:false,
                adminData: action.payload
            }
        break;
        default:
            return state   
    }
}