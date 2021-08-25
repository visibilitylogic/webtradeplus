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

export const getOrder = ()=> async(dispatch)=> {
    try {
        const {data} = await axios.get("https://trade-backend-daari.ondigitalocean.app/api/trade/60c34abf230a4e0015f1d0b3", getToken());
        console.log(data);
    } catch (error) {
        
    }
}