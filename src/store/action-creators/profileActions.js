import * as actionTypes from '../action-types'
import axios from 'axios'

// const BASE_URL = "https://trade-backend-daari.ondigitalocean.app/api";

export const getCurrentProfile = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/single/${userId}`)
    dispatch({
      type: actionTypes.GET_CURRENT_PROFILE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    })
  }
}

export const updateProfile = (profile) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(profile)

  try {
    await axios.put(`/api/profile/update/user`, body, config)
    dispatch({
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    })
  }
}

export const setDepositAmount = (amount) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_DEPOSIT_AMOUNT,
    payload: amount,
  })
}

export const setWithdrawalAmount = (amount) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_WITHDRAWAL_AMOUNT,
    payload: amount,
  })
}

export const processDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.post(`/api/deposit`, body, config)
    dispatch({
      type: actionTypes.PROCESS_DEPOSIT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROCESS_DEPOSIT_FAILED,
      payload: error.message,
    })
  }
}

export const processWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.post(`/api/withdraw`, body, config)
    dispatch({
      type: actionTypes.PROCESS_WITHDRAWAL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getBankPaymentMethod = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/paymentDetails/${userId}`)
    dispatch({
      type: actionTypes.GET_BANK_PAYMENT_METHOD,
      payload: data.banks,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getCryptoPaymentMethod = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/paymentDetails/${userId}`)
    dispatch({
      type: actionTypes.GET_CRYPTO_PAYMENT_METHOD,
      payload: data.crypto,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const setAutoTrade = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    axios.put(`/api/profile/autoTrade`, body, config)
    dispatch({
      type: actionTypes.SET_AUTO_TRADE,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const setIsTrading = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/profile/isTrading`, body, config)

    dispatch({
      type: actionTypes.SET_IS_TRADING,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const setLiveTrade = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/profile/liveTrade`, body, config)

    dispatch({
      type: actionTypes.SET_LIVE_TRADE,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}
export const setNotificationEnabled = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/profile/notificationsEnabled`, body, config)

    dispatch({
      type: actionTypes.SET_IS_NOTIFICATION,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const addBankPaymentMethod = (bankDetails) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(bankDetails)
  try {
    await axios.put(`/api/profile/userbankdetails`, body, config)
    dispatch({
      type: actionTypes.BANK_PAYMENT_METHOD_ADDED,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const addCryptoPaymentMethod = (cryptoDetails) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(cryptoDetails)
  try {
    await axios.put(`/api/profile/usercryptodetails`, body, config)
    dispatch({
      type: actionTypes.CRYPTO_PAYMENT_METHOD_ADDED,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const updateWalletBalance = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.put(`/api/profile/CreditDebitAmount`, body, config)
    dispatch({
      type: actionTypes.UPDATE_WALLET_BALANCE,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const approveDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.put(`/api/deposit/approve`, body, config)
    dispatch({
      type: actionTypes.APPROVE_DEPOSIT,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const declineDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.put(`/api/deposit/decline`, body, config)
    dispatch({
      type: actionTypes.DECLINE_DEPOSIT,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const declineVerify = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/verify/decline`, body, config)
    dispatch({
      type: actionTypes.DECLINE_VERIFY,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const approveVerify = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/verify/approve`, body, config)
    dispatch({
      type: actionTypes.APPROVE_VERIFY,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const declineWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/withdraw/decline`, body, config)
    dispatch({
      type: actionTypes.DECLINE_WITHDRAWAL,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const approveWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)
  try {
    await axios.put(`/api/withdraw/approve`, body, config)
    dispatch({
      type: actionTypes.APPROVE_WITHDRAWAL,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const makeAdmin = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(id)
  try {
    await axios.put(`/api/users/makeAdmin`, body, config)
    dispatch({
      type: actionTypes.MAKE_ADMIN,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const removeAdmin = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(id)
  try {
    await axios.put(`/api/users/removeAdmin`, body, config)
    dispatch({
      type: actionTypes.REMOVE_ADMIN,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const makeManager = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(id)
  try {
    await axios.put(`/api/users/makeManager`, body, config)
    dispatch({
      type: actionTypes.MAKE_MANAGER,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const removeManager = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(id)
  try {
    await axios.put(`/api/users/removeManager`, body, config)
    dispatch({
      type: actionTypes.REMOVE_MANAGER,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(id)
  try {
    await axios.delete(`/api/users/remove`, body, config)
    dispatch({
      type: actionTypes.DELETE_USER,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const runPassword = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.put(`/api/profile/update/user`, body, config)

    dispatch({
      type: actionTypes.RUN_USER_PASSWORD,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const requestVerification = (details) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(details)

  try {
    await axios.post(`/api/verify/verificationrequest`, body, config)
    dispatch({
      type: actionTypes.REQUEST_VERIFICATION,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const purchaseStockAsset = (userId, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(data)

  try {
    await axios.post(`/api/trade/${userId}`, body, config)

    dispatch({
      type: actionTypes.PURCHASE_STOCK,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    })
  }
}

export const sellStockAsset = (userId, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(data)

  try {
    await axios.post(`/api/trade/${userId}`, body, config)

    dispatch({
      type: actionTypes.SELL_STOCK,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    })
  }
}

export const getAllWithdrawals = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/withdraw/AllHistory`)
    dispatch({
      type: actionTypes.GET_ALL_WITHDRAWALS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getAllOrders = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/trade/${userId}`)

    dispatch({
      type: actionTypes.GET_ALL_ORDERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/allUser`)

    dispatch({
      type: actionTypes.GET_ALL_USERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getAllDeposits = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/deposit/AllHistory`)

    dispatch({
      type: actionTypes.GET_ALL_DEPOSITS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getAllTrades = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/allTrade')

    dispatch({
      type: actionTypes.GET_ALL_TRADES,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getAllVerifiedUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/verify`)

    dispatch({
      type: actionTypes.GET_ALL_VERIFIED_USERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const getUserAutoCopyTrade = (userId) => async (dispatch) => {
  try {
    const { data } = await axios(`/api/autocopytrade/${userId}`)

    dispatch({
      type: actionTypes.USER_AUTO_COPY_TRADE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const addUserAutoCopyTrade = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(data)
  try {
    await axios.post(`/api/autocopytrade`, body, config)

    dispatch({
      type: actionTypes.ADD_USER_AUTO_COPY_TRADE,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}

export const deleteUserAutoCopyTrade = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/autocopytrade/${userId}`)
    dispatch({
      type: actionTypes.DELETE_USER_AUTO_COPY_TRADE,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    })
  }
}
