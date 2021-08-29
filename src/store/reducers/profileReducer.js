import * as actionTypes from '../action-types'

const initialState = {
  profile: null,
  error: null,
  loading: true,
  depositAmount: 0,
  withdrawalAmount: 0,
  bankPaymentMethods: [],
  cryptoPaymentMethods: [],
  allWithdrawals: [],
  bankTransfers: [],
  allOrders: [],
  allUsers: [],
  allDeposits: [],
  allTrades: [],
  allVerifiedUsers: [],
  userAutoCopyTrade: [],
  userTrades: [],
  singleUser: null,
  singleWithdrawals: [],
  singleDeposit: [],
  allSingleDeposits:[]
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BANK_PAYMENT_METHOD:
      return {
        ...state,
        loading: false,
        bankPaymentMethods: action.payload,
        error: null,
      }
    case actionTypes.GET_CRYPTO_PAYMENT_METHOD:
      return {
        ...state,
        loading: false,
        cryptoPaymentMethods: action.payload,
        error: null,
      }

    case actionTypes.SET_DEPOSIT_AMOUNT:
      return {
        ...state,
        depositAmount: action.payload,
        error: null,
      }
    case actionTypes.GET_SINGLE_DEPOSIT:
      return {
        ...state,
        singleDeposit: action.payload,
        error: null,
      }

    case actionTypes.SET_WITHDRAWAL_AMOUNT:
      return {
        ...state,
        withdrawalAmount: action.payload,
        error: null,
      }

    case actionTypes.GET_ALL_WITHDRAWALS:
      return {
        ...state,
        loading: false,
        allWithdrawals: action.payload,
        bankTransfers: state.allWithdrawals.filter(
          (withdrawal) => withdrawal.method === 'Bank Transfer',
        ),
        error: null,
      }
    case actionTypes.GET_SINGLE_WITHDRAWALS:
      return {
        ...state,
        loading: false,
        singleWithdrawals: action.payload,
        error: null,
      }

    case actionTypes.GET_ALL_ORDERS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      }

    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
        error: null,
      }
    case actionTypes.GET_CURRENT_PROFILE:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
        error: null,
      }

    case actionTypes.GET_ALL_DEPOSITS:
      return {
        ...state,
        loading: false,
        allDeposits: action.payload,
        error: null,
      }
    case actionTypes.GET_SINGLE_USER_DEPOSITS:
      return {
        ...state,
        loading: false,
        allSingleDeposits: action.payload,
        error: null,
      }
    case actionTypes.GET_ALL_TRADES:
      return {
        ...state,
        loading: false,
        allTrades: action.payload,
        error: null,
      }
    // case actionTypes.SET_AUTO_TRADE:
    //   const newUserState = state.singleUser
    //   newUserState.autoTrade = action.payload
    //   return {
    //     ...state,
    //     loading: false,
    //     singleUser: newUserState,
    //     error: null,
    //   }
    // case actionTypes.APPROVE_SINGLE_VERIFY:
    //   const approveState = state.singleUser
    //   approveState.autoTrade = action.payload
    //   return {
    //     ...state,
    //     loading: false,
    //     singleUser: approveState,
    //     error: null,
    //   }
    // case actionTypes.SET_LIVE_TRADE:
    //   const newLive_TRADE = state.singleUser
    //   newLive_TRADE.liveTrade = !newLive_TRADE.liveTrade
    //   return {
    //     ...state,
    //     loading: false,
    //     singleUser: newLive_TRADE,
    //     error: null,
    //   }

    case actionTypes.GET_ALL_VERIFIED_USERS:
      return {
        ...state,
        loading: false,
        allVerifiedUsers: action.payload,
        error: null,
      }
    case actionTypes.USER_AUTO_COPY_TRADE:
      return {
        ...state,
        loading: false,
        userAutoCopyTrade: action.payload,
        error: null,
      }
    case actionTypes.GET_ALL_USER_TRADES:
      return {
        ...state,
        loading: false,
        userTrades: action.payload,
        error: null,
      }

    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
