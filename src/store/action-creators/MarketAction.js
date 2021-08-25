import axios from "axios";
import getToken from "../utils/gettoken";
import * as actionTypes from "../action-types";


export const getmarket = ()=> async( dispatch ) => {
    dispatch({
        type:actionTypes.MARKET_PLACE_LOADING
    })
    
    try {
       const {data} = await axios.get("https://financialmodelingprep.com/api/v3/quotes/forex?apikey=6e39eba411ee51caced6ab2be49f987b", getToken());
       dispatch({
           type:actionTypes.GET_MARKET_PLACE,
           payload:data
       })
       console.log("datta", data);

    } catch (error) {
        dispatch({
            type: actionTypes.MARKET_ERROR,
            payload:error.message
        })
    }
}

export const getOrder = (id)=> async(dispatch)=> {
    dispatch({
        type:actionTypes.ORDER_LOADING
    })
    try {
        const {data} = await axios.get(`https://trade-backend-daari.ondigitalocean.app/api/trade/${id}`, getToken());
        console.log(data);
        dispatch({
            type:actionTypes.GET_ORDERS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:actionTypes.GET_ORDER_ERROR,
            payload:error.message
        })
    }
}