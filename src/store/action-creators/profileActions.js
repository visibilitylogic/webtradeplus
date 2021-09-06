import * as actionTypes from "../action-types";
import axios from "axios";

const BASE_URL = "https://trade-backend-daari.ondigitalocean.app";

export const getCurrentProfile = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/profile/single/${userId}`
    );
    dispatch({
      type: actionTypes.GET_CURRENT_PROFILE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    });
  }
};
export const getSingleProfile = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_SINGLE_DETAILS,
    payload: data,
  });
};

export const getVerifieddetails = (details) => async (dispatch) => {
  await dispatch({
    type: actionTypes.GET_VERFIED_DETAILS,
    payload: details,
  });
};

export const updateProfile = (profile) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(profile);

  try {
    await axios.put(`${BASE_URL}/api/profile/update`, body, config);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    });
  }
};

export const setDepositAmount = (amount) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_DEPOSIT_AMOUNT,
    payload: amount,
  });
};

export const setWithdrawalAmount = (amount) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_WITHDRAWAL_AMOUNT,
    payload: amount,
  });
};

export const processDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(`details`, details);
  const body = JSON.stringify(details);

  try {
    const response = await axios.post(`${BASE_URL}/api/deposit`, body, config);

    dispatch({
      type: actionTypes.PROCESS_DEPOSIT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROCESS_DEPOSIT_FAILED,
      payload: error.message,
    });
  }
};

export const processWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    await axios.post(`${BASE_URL}/api/withdraw`, body, config);
    dispatch({
      type: actionTypes.PROCESS_WITHDRAWAL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getBankPaymentMethod = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/profile/paymentDetails/${userId}`
    );
    dispatch({
      type: actionTypes.GET_BANK_PAYMENT_METHOD,
      payload: data.banks,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getCryptoPaymentMethod = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/profile/paymentDetails/${userId}`
    );
    dispatch({
      type: actionTypes.GET_CRYPTO_PAYMENT_METHOD,
      payload: data.crypto,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const setAutoTrade = (id, details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios.put(`${BASE_URL}/api/users/autotrade/${id}`, body, config);
    // console.log(data)

    const f = [details.autoTrade, id];
    dispatch({
      type: actionTypes.SET_AUTO_TRADE,
      payload: f,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const checkUserOnlineStatus = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios.put(`${BASE_URL}/api/users/set-user-presence`, body, config);
    dispatch({
      type: actionTypes.USER_ONLINE_STATUS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const setIsTrading = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios.put(`${BASE_URL}/api/profile/isTrading`, body, config);

    dispatch({
      type: actionTypes.SET_IS_TRADING,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const setLiveTrade = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/profile/liveTrade`,
      body,
      config
    );
    console.log(data);
    if (data) {
      dispatch({
        type: actionTypes.SET_LIVE_TRADE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const setNotificationEnabled = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios.put(
      `${BASE_URL}/api/profile/notificationsEnabled`,
      body,
      config
    );

    dispatch({
      type: actionTypes.SET_IS_NOTIFICATION,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const addBankPaymentMethod = (bankDetails) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(bankDetails);
  try {
    await axios.put(`${BASE_URL}/api/profile/userbankdetails`, body, config);
    dispatch({
      type: actionTypes.BANK_PAYMENT_METHOD_ADDED,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const addCryptoPaymentMethod = (cryptoDetails) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(cryptoDetails);
  try {
    await axios.put(`${BASE_URL}/api/profile/usercryptodetails`, body, config);
    dispatch({
      type: actionTypes.CRYPTO_PAYMENT_METHOD_ADDED,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const updateWalletBalance = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    await axios.put(`${BASE_URL}/api/profile/CreditDebitAmount`, body, config);
    dispatch({
      type: actionTypes.UPDATE_WALLET_BALANCE,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/deposit/approve`,
      body,
      config
    );
    console.log(data);
    dispatch({
      type: actionTypes.APPROVE_DEPOSIT,
      payload: data,
    });
    // await axios
    //   .put(`${BASE_URL}/api/deposit/approve`, body, config)
    //   .then((res) => {
    //     getAllDeposits()
    //     dispatch({
    //       type: actionTypes.APPROVE_DEPOSIT,
    //     })
    //   })
    //   .catch((err) =>
    //     err.response === undefined ? false : console.error(err.response.data),
    //   )
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const declineDeposit = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  console.log(`body`, body);

  try {
    await axios
      .put(`${BASE_URL}/api/deposit/decline`, body, config)
      .then((res) => {
        // getAllDeposits()
        dispatch({
          type: actionTypes.APPROVE_DEPOSIT,
        });
      })
      .catch((err) =>
        err.response === undefined ? false : console.error(err.response.data)
      );

    dispatch({
      type: actionTypes.DECLINE_DEPOSIT,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

// only for manger
export const declineDepositForManager = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/deposit/decline`,
      body,
      config
    );
    dispatch({
      type: actionTypes.APPROVE_DECLINE_DEPOSIT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveDepositForManager = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/deposit/approve`,
      body,
      config
    );
    console.log(data);
    console.log(data.approveDeposit.status);
    dispatch({
      type: actionTypes.APPROVE_SINGLE_DEPOSIT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const declineVerify = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios
      .put(`${BASE_URL}/api/verify/decline`, body, config)
      .then((res) => {
        // getAllVerifiedUsers()
        dispatch({
          type: actionTypes.DECLINE_VERIFY,
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveVerify = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    console.log(`details`, details);
    await axios
      .put(`${BASE_URL}/api/verify/approve`, body, config)
      .then((res) => {
        // getAllVerifiedUsers()
        dispatch({
          type: actionTypes.APPROVE_VERIFY,
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveSingleUserVerify = (details) => async (dispatch) => {
  try {
    await axios.put(`${BASE_URL}/api/users/verify/${details}`);
    dispatch({
      type: actionTypes.APPROVE_SINGLE_VERIFY,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const declineWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    await axios.put(`${BASE_URL}/api/withdraw/decline`, body, config);
    dispatch({
      type: actionTypes.DECLINE_WITHDRAWAL,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/withdraw/approve`,
      body,
      config
    );
    dispatch({
      type: actionTypes.APPROVE_WITHDRAWAL,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

// for manager only

export const declineManagerWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/withdraw/decline`,
      body,
      config
    );
    dispatch({
      type: actionTypes.DECLINE_MANAGER_WITHDRAWAL,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const approveMAnagerWithdrawal = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/withdraw/approve`,
      body,
      config
    );
    dispatch({
      type: actionTypes.APPROVE_MANAGER_WITHDRAWAL,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const makeAdmin = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(id);
  try {
    await axios.put(`${BASE_URL}/api/users/makeAdmin`, body, config);
    dispatch({
      type: actionTypes.MAKE_ADMIN,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const removeAdmin = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(id);
  try {
    await axios.put(`${BASE_URL}/api/users/removeAdmin`, body, config);
    dispatch({
      type: actionTypes.REMOVE_ADMIN,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const makeManager = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(id);
  try {
    await axios.put(`${BASE_URL}/api/users/makeManager`, body, config);
    dispatch({
      type: actionTypes.MAKE_MANAGER,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const removeManager = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(id);
  try {
    await axios.put(`${BASE_URL}/api/users/removeManager`, body, config);
    dispatch({
      type: actionTypes.REMOVE_MANAGER,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const deleteAUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(id);
  try {
    await axios.delete(`${BASE_URL}/api/users/remove`, body, config);

    dispatch({
      type: actionTypes.DELETE_USER,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const runPassword = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    await axios.put(`${BASE_URL}/api/profile/update/user`, body, config);

    dispatch({
      type: actionTypes.RUN_USER_PASSWORD,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const requestVerification = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    await axios.post(
      `${BASE_URL}/api/verify/verificationrequest`,
      body,
      config
    );
    dispatch({
      type: actionTypes.REQUEST_VERIFICATION,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const purchaseStockAsset = (userId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  try {
    await axios.post(`${BASE_URL}/api/trade/buy/${userId}`, body, config);

    dispatch({
      type: actionTypes.PURCHASE_STOCK,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    });
  }
};
export const singleUserBalance = (userId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/users/pulse/${userId}`,
      body,
      config
    );

    dispatch({
      type: actionTypes.SINGLE_USER_BALANCE,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const sellStockAsset = (userId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  try {
    await axios.post(`${BASE_URL}/api/trade/sell/${userId}`, body, config);

    dispatch({
      type: actionTypes.SELL_STOCK,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    });
  }
};

export const deleteUserTrade = (stockId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/api/trade/${stockId}`);
    dispatch({
      type: actionTypes.DELETE_STOCK,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllWithdrawals = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/withdraw/AllHistory`);
    dispatch({
      type: actionTypes.GET_ALL_WITHDRAWALS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const getSingleWithdrawals = (details) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/users/my-withdrawals/${details}`
    );
    dispatch({
      type: actionTypes.GET_SINGLE_WITHDRAWALS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const getSingleDeposit = (details) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/users/deposit-history/${details}`
    );
    dispatch({
      type: actionTypes.GET_SINGLE_DEPOSIT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/trade/buy/allTrade`);

    dispatch({
      type: actionTypes.GET_ALL_ORDERS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/users/allUser`);

    dispatch({
      type: actionTypes.GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllDeposits = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/deposit/AllHistory`);

    dispatch({
      type: actionTypes.GET_ALL_DEPOSITS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const singleUserDeposit = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/users/deposit-history/${id}`
    );

    dispatch({
      type: actionTypes.GET_SINGLE_USER_DEPOSITS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllTrades = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/trade/buy/allTrade`);

    dispatch({
      type: actionTypes.GET_ALL_TRADES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllVerifiedUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/verify`);

    dispatch({
      type: actionTypes.GET_ALL_VERIFIED_USERS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getUserAutoCopyTrade = (userId) => async (dispatch) => {
  try {
    const { data } = await axios(`${BASE_URL}/api/autocopytrade/${userId}`);

    dispatch({
      type: actionTypes.USER_AUTO_COPY_TRADE,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const addUserAutoCopyTrade = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/autocopytrade`,
      body,
      config
    );
    console.log(data);
    dispatch({
      type: actionTypes.ADD_USER_AUTO_COPY_TRADE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const deleteUserAutoCopyTrade = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/api/autocopytrade/${userId}`);
    dispatch({
      type: actionTypes.DELETE_USER_AUTO_COPY_TRADE,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const getAllUserTrades = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/trade/${userId}`);

    dispatch({
      type: actionTypes.GET_ALL_USER_TRADES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const DeactivateUser = (userId) => async (dispatch) => {
  try {
    await axios.put(`${BASE_URL}/api/users/deactivate/${userId}`);

    dispatch({
      type: actionTypes.DEACTIVATE_USER,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};
export const ActivateUser = (userId) => async (dispatch) => {
  try {
    await axios.put(`${BASE_URL}/api/users/activate/${userId}`);

    dispatch({
      type: actionTypes.ACTIVATE_USER,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

export const closeUserTrade = (tradeId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  try {
    await axios.put(
      `${BASE_URL}/api/trade/buy/closeTrade/${tradeId}`,
      body,
      config
    );

    dispatch({
      type: actionTypes.CLOSE_USER_BUY_TRADE,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: error.message,
    });
  }
};

// export const closeUserSellTrade = (tradeId, data) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify(data);

//   try {
//     await axios.put(
//       `${BASE_URL}/api/trade/closeTrade/${tradeId}`,
//       body,
//       config
//     );

//     dispatch({
//       type: actionTypes.CLOSE_USER_SELL_TRADE,
//     });
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PROFILE_ERROR,
//       payload: error.message,
//     });
//   }
// };

export const setCurrentlyActiveTrade = (trade) => (dispatch) => {
  dispatch({
    type: actionTypes.CURRENTLY_ACTIVE_TRADE,
    payload: trade,
  });
};

export const setUserMargin = (margin) => (dispatch) =>
  dispatch({ type: actionTypes.SET_USER_MARGIN, payload: margin });

export const setTradeProfit = (profit) => (dispatch) => {
  dispatch({ type: actionTypes.SET_TRADE_PROFIT, payload: profit });
};
