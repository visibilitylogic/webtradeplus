import * as actionTypes from "../action-types";
const initialState = {
  loading: false,
  webData: null,
  error: null,
};

export default function webReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
        webData: null,
        error: null,
      };
    case actionTypes.GET_WEB_DATA:
      return {
        ...state,
        loading: false,
        webData: action.payload,
        error: null,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        webData: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
