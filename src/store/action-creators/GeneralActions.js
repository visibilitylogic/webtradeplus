import * as actionTypes from "../action-types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import getToken from "../utils/gettoken";
const instance = axios.create({
    baseURL:"https://trade-backend-daari.ondigitalocean.app/api/",
})

const view_auto_tades = ()=> async (dispatch)=>{
    try {
        const {data} = instance.get("/copytrade", getToken());
        
    } catch (error) {
        
    }
}