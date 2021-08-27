import * as actionTypes from '../action-types'
import axios from 'axios'
const BASE_URL = 'https://trade-backend-daari.ondigitalocean.app/api'

export const managerDeactiveUser = (userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(userId)
  try {
    await axios.put(`$/api/users/deactivate/${userId}`, body, config)

    dispatch({
      type: actionTypes.DEACTIVATE_USER,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MANAGER_ERROR,
      payload: error.message,
    })
  }
}
export const manageractiveUser = (userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(userId)
  try {
    await axios.put(`$/api/users/activate/${userId}`, body, config)

    dispatch({
      type: actionTypes.ACTIVATE_USER,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.MANAGER_ERROR,
      payload: error.message,
    })
  }
}
