import * as actionTypes from '../action-types'
import axios from 'axios'

export const managerDeactiveUser = (userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    await axios.put(`/api/users/deactivate/${userId}`, config)

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
