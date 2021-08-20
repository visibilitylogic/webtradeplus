import * as actionTypes from "../action-types";
import axios from "axios";

export const getCryptoAssets = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_CRYPTO_ASSETS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getInvestorsExchange = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/stock/list?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_IEX_ASSETS,
      payload: data.slice(0, 100),
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getCommodityStocks = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_COMMODITY_ASSETS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getForexStocks = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/quotes/forex?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_FOREX_ASSETS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getExchangeTradedFund = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/etf/list?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_ETF_ASSETS,
      payload: data.slice(0, 100),
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

// export const getAllStockAssets = () => async (dispatch) => {
//   Promise.all([
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/forex?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/stock/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/etf/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//   ])
//     .then((response) => Promise.all(response.map((result) => result.json())))
//     .then((result) => {
//       const data = result[0].concat(
//         result[1],
//         result[2].slice(0, 100),
//         result[3],
//         result[4].slice(0, 100)
//       );

//       dispatch({
//         type: actionTypes.GET_ALL_ASSETS,
//         payload: data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: actionTypes.STOCK_ERROR,
//         payload: err.message,
//       });
//     });
// };

export const setCurrentSelectedStock = (stock) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CURRENT_STOCK_SELECTED,
    payload: stock,
  });
};
