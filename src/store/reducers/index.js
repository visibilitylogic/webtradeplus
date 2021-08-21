import { combineReducers } from "redux";
import webReducer from "./webReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import { adminReducer, adminDataReducer } from "./adminReducer";
import stockReducer from "./stockReducer";

const reducers = combineReducers({
  web: webReducer,
  auth: authReducer,
  profile: profileReducer,
  adminData: adminReducer,
  adminInfo: adminDataReducer,
  stock: stockReducer,
});

export default reducers;
