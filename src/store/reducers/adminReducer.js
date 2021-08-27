import { bindActionCreators } from "redux";
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
    error:""
}

const LiveTradeInitial = {
    liveTrades:false,
    leverage:{},
    success:"",
    error:""
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
                trades:[{...action.payload}, ...state.trades],
                success:"Successfull added auto trade"
            }
        break;
        case actionTypes.AUTO_TRADE_UPDATE:
            return {
                ...state,
                success:"Trade Updated Successfully"
            }
        break;
        case actionTypes.AUTO_TRADE_DELETE:
            return {
                ...state,
                success:action.payload
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
                success:"",
                adminData: action.payload
            }
        break;
        case actionTypes.ADMIN_DATA_UPDATE:
            return {
                ...state,
                loading:false,
                adminData:{...state.adminData, ...action.payload},
                success:"Data updated successfully"
            }
        case actionTypes.ADMIN_DATA_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state   
    }
}

export function admin_live_trade(state=LiveTradeInitial, action){
    switch(action.type){
        case actionTypes.GET_LIVE_TRADE:
            return {
                ...state,
                liveTrades:action.payload
            }
        break;
        case actionTypes.UPDATE_LIVE_TRADE:
            return{
                ...state,
                liveTrades:!state.liveTrades,
                success:action.payload
            }
        break;
        case actionTypes.SET_LEVERAGE:
            return {
                ...state,
                leverage:action.payload,
                success:"Leverage updated successfully"
            }
        break;
        case actionTypes.SET_LEVERAGE_ERROR:
            return {
                ...state,
                leverage_error: action.payload
            }
        case actionTypes.LIVE_TRADE_ERROR:
            return {
                ...state,
                error:action.payload
            }
        break;
        default:
            return state
    }
}