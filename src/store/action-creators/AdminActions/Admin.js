import axios from "axios";
import getToken from "../../utils/gettoken";
import * as actionTypes from "../../action-types"

export const get_admin_data = ()=> async (dispatch)=> {
    dispatch({
        type:actionTypes.ADMIN_DATA_LOADING
    })
    try {
        const {data} = await axios.get("https://trade-backend-daari.ondigitalocean.app/api/site", getToken());
        console.log(data);
        dispatch({
            type:actionTypes.ADMIN_DATA,
            payload:data
        })
    } catch (e) {
        dispatch({
            type:actionTypes.ADMIN_DATA_ERROR,
            paylaod:e.message
        })
    }
}

export const change_admin_data = (url, datas)=> async (dispatch)=>{
    try {
        dispatch({
            type:actionTypes.ADMIN_DATA_LOADING
        })
        const {data} = await axios.put(url, datas, getToken());
        dispatch({
            type:actionTypes.ADMIN_DATA_UPDATE,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:actionTypes.ADMIN_DATA_ERROR,
            payload:error.message
        })
    }
}

export const get_Live_Trade = () => async(dispatch)=>{
    try {
        const {data} = await axios.get("https://trade-backend-daari.ondigitalocean.app/api/site/livetrade", getToken());
        dispatch({
            type:actionTypes.GET_LIVE_TRADE,
            payload:data
        })
    } catch (e) {
        dispatch({
            type:actionTypes.LIVE_TRADE_ERROR,
            payload:e.message
        })
    }
}

export const update_Live_Trade = (LT) => async(dispatch)=>{
    const datas = {liveTrade:LT}
    try {
        const {data} = await axios.put("https://trade-backend-daari.ondigitalocean.app/api/profile/users/liveTrade",datas, getToken());
        console.log(data)
        dispatch({
            type:actionTypes.UPDATE_LIVE_TRADE,
            payload:data
        })
       
    } catch (e) {
        dispatch({
            type:actionTypes.LIVE_TRADE_ERROR,
            payload:e.message
        })
    }
}