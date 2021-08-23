import { combineReducers } from "redux";
import webReducer from "./webReducer";
import {authReducer, ToggleOpenReducer} from "./authReducer";
import profileReducer from "./profileReducer";
import { adminReducer, adminDataReducer, admin_live_trade,   } from "./adminReducer";
import stockReducer from "./stockReducer";
import darkThemeReducer from "./themeReducer";

const reducers = combineReducers({
  web: webReducer,
  auth: authReducer,
  profile: profileReducer,
  adminData: adminReducer,
  adminInfo: adminDataReducer,
  liveTrade : admin_live_trade,
  stock: stockReducer,
<<<<<<< HEAD
  toggle:ToggleOpenReducer
=======
  theme: darkThemeReducer,
>>>>>>> 718d8be4c8445edaf5ab0fc73ddb69a34cc0cdb1
});

export default reducers;
