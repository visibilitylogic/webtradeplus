import * as actionTypes from "../action-types";
import axios from "axios";

const BASE_URL = "https://trade-backend-daari.ondigitalocean.app/api";

const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING,
  };
};

const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
};

export const getWebData = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${BASE_URL}/site`);
    dispatch({
      type: actionTypes.GET_WEB_DATA,
      payload: response.data,
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};
