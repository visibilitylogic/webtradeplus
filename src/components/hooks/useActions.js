import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
  webActions,
  authActions,
  profileActions,
  AdminAutoTradingActions,
  AdminActions,
  stockActions,
  themeActions,
  marketActions
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
      ...themeActions,
      ...marketActions
    },
    dispatch
  );
};
