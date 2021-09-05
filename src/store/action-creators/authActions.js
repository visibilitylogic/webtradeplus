import * as actionTypes from '../action-types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const BASE_URL = 'https://trade-backend-daari.ondigitalocean.app'
// AUTHENTICATIONS
export const loadUser = (userId) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_USER,
  })
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const { data } = await axios.get(`${BASE_URL}/api/profile/single/${userId}`)
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: error.message,
    })
  }
}

export const registerUser = (profile) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CREDENTIALS,
  })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(profile)
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/registration`,
      body,
      config,
    )

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: data,
    })
    dispatch(loadUser(data._id))
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAILED,
      payload: error.message,
    })
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CREDENTIALS,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/registration/login`,
      body,
      config,
    )

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
    })

    dispatch(loadUser(data._id))
  } catch (error) {
    console.log(error)
    dispatch({
      type: actionTypes.LOGIN_FAILED,
      payload: error.message,
    })
  }
}

// export const logout = () => (dispatch) => {
//   dispatch({ type: actionTypes.LOGOUT });
//   // const config = {
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // };
//   // const body = JSON.stringify({ isOnline: false });
//   // try {
//   //   const { data } = await axios.put(
//   //     `${BASE_URL}/api/users/set-user-presence/${id}`,
//   //     body,
//   //     config
//   //   );
//   //   dispatch({
//   //     type: actionTypes.LOGOUT,
//   //     payload: data,
//   //   });
//   // } catch (error) {
//   //   console.log(error);
//   //   dispatch({
//   //     type: actionTypes.LOGOUT_FAILED,
//   //     payload: error.message,
//   //   });
//   // }
// };

export const logout = () => (dispatch) => dispatch({ type: actionTypes.LOGOUT })
