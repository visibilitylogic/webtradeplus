import { SET_DARK_THEME } from "../action-types";
const initialState = {
  isDarkMode: true,
};

const darkThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default darkThemeReducer;
