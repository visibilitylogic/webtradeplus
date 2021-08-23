import { SET_DARK_THEME } from "../action-types";

export const setDarkTheme = () => (dispatch) => {
  dispatch({
    type: SET_DARK_THEME,
  });
};
