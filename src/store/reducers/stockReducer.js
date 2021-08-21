import * as actionTypes from "../action-types";

const initialState = {
  loading: true,
  crypto: [],
  iex: [],
  commodities: [],
  forex: [],
  etf: [],
  defaultSelectedStock: {},
  currentSelectedStock: {},
  stocksSelected: [],
  // stocksSelected: JSON.parse(localStorage.getItem("stocksSelected")) || [],
  error: null,
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CRYPTO_ASSETS:
      return {
        ...state,
        loading: false,
        crypto: action.payload,
        error: null,
      };
    case actionTypes.GET_IEX_ASSETS:
      return {
        ...state,
        loading: false,
        iex: action.payload,
        error: null,
      };
    case actionTypes.GET_COMMODITY_ASSETS:
      return {
        ...state,
        loading: false,
        commodities: action.payload,
        error: null,
      };
    case actionTypes.GET_FOREX_ASSETS:
      return {
        ...state,
        loading: false,
        forex: action.payload,
        error: null,
      };
    case actionTypes.GET_ETF_ASSETS:
      return {
        ...state,
        loading: false,
        etf: action.payload,
      };
    case actionTypes.GET_ALL_ASSETS:
      return {
        ...state,
        loading: false,
        allStocks: action.payload,
      };
    case actionTypes.SET_CURRENT_STOCK_SELECTED:
      return {
        ...state,
        loading: false,
        currentSelectedStock: action.payload,
        defaultSelectedStock: {},
      };
    case actionTypes.SET_DEFAULT_STOCK_SELECTED:
      return {
        ...state,
        loading: false,
        defaultSelectedStock: action.payload,
      };
    case actionTypes.ADD_STOCK_TO_LIST:
      // localStorage.setItem(
      //   "stocksSelected",
      //   JSON.stringify([action.payload, ...state.stocksSelected])
      // );
      return {
        ...state,
        stocksSelected: [action.payload, ...state.stocksSelected],
        // ...action.payload,
        loading: false,
      };
    case actionTypes.STOCK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
