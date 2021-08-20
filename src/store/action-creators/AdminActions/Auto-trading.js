import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import * as actionTypes from "../../action-types";
import getToken from "../../utils/gettoken";
const instance = axios.create({
    baseURL:"https://trade-backend-daari.ondigitalocean.app/api/copytrade",
})
export const add_auto_trade = (datas)=> async (dispatch)=>{
    try {
      const {data} = await instance.post("/", datas, getToken());  
      console.log(data);
      dispatch({
        type:actionTypes.AUTO_TRADE_ADD_SUCCESS,
        payload:data
      })
    } catch (error) {
        console.log(error);
        dispatch({
            type: actionTypes.AUTO_TRADE_ERROR,
            payload: error.message,
          });
    }
}


export const get_all_auto_trades = () => async (dispatch)=>{
    dispatch({
        type:actionTypes.AUTO_TRADE_LOADING
    })
    try {
        const {data} = await instance.get("/", getToken());
        console.log(data);
        dispatch({
            type:actionTypes.AUTO_TRADES,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.AUTO_TRADE_ERROR,
            payload: error.message,
          });
    }
}

export const get_specific_trade = (id)=> async (dispatch)=>{
    dispatch({
        type:actionTypes.AUTO_TRADE_LOADING
    })
    try {
        const {data} = await instance.get(`/${id}`, getToken());
        console.log(data);
        dispatch({
            type:actionTypes.SPECIFIC_TRADE,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.AUTO_TRADE_ERROR,
            payload: error.message,
          });
    }
}

export const update_auto_trade = (id, datas)=> async (dispatch)=>{
    try {
      const {data} = await instance.post(`/${id}`, datas, getToken());  
      console.log(data);
      dispatch({
        type:actionTypes.AUTO_TRADE_ADD_SUCCESS,
        payload:data
      })
    } catch (error) {
        console.log(error);
        dispatch({
            type: actionTypes.AUTO_TRADE_ERROR,
            payload: error.message,
          });
    }
}



