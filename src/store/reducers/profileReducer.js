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
  activeTrade: {},
  userMargin: 1,
  singleUser: null, //made a change here
  singleWithdrawals: [],
  allSingleDeposits: [],
  DepositApproval: {},
  singleUserVerifedDetails: {},
  openTrades: [],
  autoTradeData: [],
  allSubscription: [],
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.GET_CURRENT_PROFILE:
    //   return {
    //     ...state,
    //     loading: false,
    //     profile: action.payload,
    //     error: null,
    //   };
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

    case actionTypes.APPROVE_SINGLE_DEPOSIT:
      const newDeposits = state.allDeposits
      const newsINGLEDeposits = state.allSingleDeposits
      const sing = newDeposits.find(
        (dep) => dep._id === action.payload.approveDeposit._id,
      )
      const single = newsINGLEDeposits.find((depo) => {
        if (depo._id == action.payload.approveDeposit._id) {
          return (single.status = action.payload.approveDeposit.status)
        }
      })

      sing.status = action.payload.approveDeposit.status
      return {
        ...state,
        allDeposits: [...newDeposits, sing], // [...newDeposits]
        // DepositApproval: action.payload,
        allSingleDeposits: [...newsINGLEDeposits],
      }

    case actionTypes.APPROVE_MANAGER_WITHDRAWAL:
      const newWithdraw = state.allWithdrawals
      const newsINGLEWithdraw = state.singleWithdrawals
      const singW = newWithdraw.find(
        (dep) => dep._id === action.payload.approvedWithdraw._id,
      )
      const singleW = newsINGLEWithdraw.find((depo) => {
        if (depo._id == action.payload.approvedWithdraw._id) {
          return (singleW.status = action.payload.approvedWithdraw.status)
        }
      })
      singW.status = action.payload.approvedWithdraw.status

      return {
        ...state,
        allWithdrawals: [...newWithdraw], // [...newDeposits]
        // DepositApproval: action.payload,
        singleWithdrawals: [...newsINGLEWithdraw],
      }

    case actionTypes.DECLINE_MANAGER_WITHDRAWAL:
      const newWithdraws = state.allWithdrawals
      const newsINGLEWithdraws = state.singleWithdrawals
      const singWs = newWithdraws.find(
        (dep) => dep._id === action.payload.declinedWithdraw._id,
      )
      singWs.status = action.payload.declinedWithdraw.status
      const singles = newsINGLEWithdraws.find((depo) => {
        if (depo._id == action.payload.declinedWithdraw._id) {
          return (singles.status = action.payload.declinedWithdraw.status)
        }
      })

      return {
        ...state,
        allWithdrawals: [...newWithdraws], // [...newDeposits]

        singleWithdrawals: [...newsINGLEWithdraws],
      }

    case actionTypes.APPROVE_DECLINE_DEPOSIT:
      const newDeposit = state.allDeposits
      const newsINGLEDeposit = state.allSingleDeposits
      const decline = newDeposit.find(
        (dep) => dep._id === action.payload.declinedDeposite._id,
      )
      decline.status = action.payload.declinedDeposite.status
      const singlewith = newsINGLEDeposit.find((depos) => {
        if (depos._id == action.payload.declinedDeposite._id) {
          return (singlewith.status = action.payload.declinedDeposite.status)
        }
      })

      return {
        ...state,
        allDeposits: [...newDeposit], // [...newDeposits]
        allSingleDeposits: [...newsINGLEDeposit],
      }

    case actionTypes.SET_WITHDRAWAL_AMOUNT:
      return {
        ...state,
        withdrawalAmount: action.payload,
        error: null,
      }
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        // allUsers: [newAllUser],
        singleUser: action.payload,
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
    case actionTypes.GET_SINGLE_DETAILS:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
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
        profile: action.payload,
        error: null,
      }
    case actionTypes.GET_VERFIED_DETAILS:
      return {
        ...state,
        loading: false,
        singleUserVerifedDetails: action.payload,
        error: null,
      }

    case actionTypes.GET_ALL_DEPOSITS:
      return {
        ...state,
        loading: false,
        allDeposits: action.payload,
        error: null,
      }

    case actionTypes.PROCESS_DEPOSIT_SUCCESS:
      return {
        ...state,
        loading: false,
        allDeposits: [action.payload, ...state.allDeposits],
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
    case actionTypes.DELETE_USER:
      const allnewUser = state.allUsers
      const index = allnewUser.findIndex((el) => el._id == action.payload)
      const nextUser = allnewUser[index + 1]
      return {
        ...state,
        loading: false,
        singleUser: { ...nextUser },
        error: null,
      }

    case actionTypes.SET_LIVE_TRADE:
      const newAllUsers = state.allUsers
      newAllUsers.map((user) =>
        user._id === action.payload._id ? { user: action.payload } : user,
      )

      return {
        ...state,
        loading: false,
        allUser: newAllUsers,
        singleUser: action.payload,
        error: null,
      }

    case actionTypes.SET_AUTO_TRADE:
      const newUsers = state.allUsers
      const userAuto = newUsers.find((user) => user._id == action.payload[1])
      const z = action.payload[0]
      userAuto.autoTrade = z

      return {
        ...state,
        loading: false,
        allUser: [...newUsers],
        singleUser: { ...userAuto },
        error: null,
      }

    case actionTypes.SINGLE_USER_BALANCE:
      const balanceState = state.singleUser
      balanceState.wallet = action.payload.wallet
      balanceState.profit = action.payload.profit
      balanceState.deposit = action.payload.deposit
      balanceState.bonus = action.payload.bonus

      return {
        ...state,
        loading: false,
        singleUser: { ...balanceState },
        error: null,
      }
    case actionTypes.ADD_USER_AUTO_COPY_TRADE:
      const newUser = state.singleUser
      newUser.currentBalance = action.payload.currentBalance
      const autoState = state.singleUser

      // balanceState.amount = action.payload.amount
      // balanceState.deposit = action.payload.deposit
      // balanceState.bonus = action.payload.bonus

      return {
        ...state,
        loading: false,
        singleUser: { ...newUser },
        userAutoCopyTrade: [action.payload, ...state.userAutoCopyTrade],
        error: null,
      }
    case actionTypes.DELETE_USER_AUTO_COPY_TRADE:
      const autoDeleteState = state.userAutoCopyTrade.filter(
        (trade) => trade._id !== action.payload,
      )

      return {
        ...state,
        loading: false,
        userAutoCopyTrade: [...autoDeleteState],
        error: null,
      }
    case actionTypes.GET_ALL_VERIFIED_USERS:
      return {
        ...state,
        loading: false,
        allVerifiedUsers: action.payload,
        error: null,
      }
    case actionTypes.MANAGER_APPROVE_VERIFY:
      const newVerify = state.allVerifiedUsers
      newVerify.map((single) => {
        if (single.userId == action.payload) {
          return (single.status = 'Approved')
        }
      })
      return {
        ...state,
        loading: false,
        allVerifiedUsers: [...newVerify],
        error: null,
      }
    case actionTypes.MANAGER_DECLINE_VERIFY:
      const newDeclineVerify = state.allVerifiedUsers
      newDeclineVerify.map((single) => {
        if (single.userId == action.payload) {
          return (single.status = 'Declined')
        }
      })
      return {
        ...state,
        loading: false,
        allVerifiedUsers: [...newDeclineVerify],
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
        openTrades: state.userTrades.filter((trade) => trade.isOpen),
        error: null,
      }
    case actionTypes.CLEAR_OPEN_TRADES:
      return {
        ...state,
        loading: false,
        userTrades: [],
        openTrades: [],
        error: null,
      }
    case actionTypes.CURRENTLY_ACTIVE_TRADE:
      return {
        ...state,
        loading: false,
        activeTrade: action.payload,
        error: null,
      }
    case actionTypes.SET_USER_MARGIN:
      return {
        ...state,
        loading: false,
        userMargin: action.payload,
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
