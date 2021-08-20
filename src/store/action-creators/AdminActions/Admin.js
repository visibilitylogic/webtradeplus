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