import * as actionTypes from "../action-types";

const initialState = {
  loading: false,
  crypto: [],
  iex: [],
  commodities: [],
  forex: [],
  etf: [],
  defaultSelectedStock: {},
  currentSelectedStock: {},
  stocksSelected: [],
  allStockAssets: [],
  error: null,
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.LOAD_STOCK:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
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
    case actionTypes.GET_ALL_ASSETS_CURRENT_PRICE:
      return {
        ...state,
        loading: false,
        allStockAssets: action.payload,
        error: null,
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
      return {
        ...state,
        loading: false,
        stocksSelected: [action.payload, ...state.stocksSelected],
      };
    case actionTypes.DELETE_STOCK:
      return {
        ...state,
        loading: false,
        stocksSelected: state.stocksSelected.filter(
          (stock) => stock.symbol !== action.payload
        ),
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
