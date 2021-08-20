import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/action-creators";
import { webActions } from "../../store/action-creators";
import {
  profileActions,
  AdminAutoTradingActions,
  AdminActions,
} from "../../store/action-creators";

import {
  stockActions,
} from "../../store/action-creators";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...webActions,
      ...authActions,
      ...profileActions,
      ...AdminAutoTradingActions,
      ...AdminActions,
      ...stockActions,
    },
    dispatch
  );
};
