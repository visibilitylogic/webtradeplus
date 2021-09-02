import PropTypes from "prop-types";
import { FaRegGem } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import "./DashboardFooter.css";
import SwitchButton from "../utils/SwitchButton";
import { useSelector } from "react-redux";
import { getProfitOrLoss } from "../../helpers/getProfitOrLoss";

const DashboardFooter = ({ setSupport }) => {
  const { user } = useSelector((state) => state.auth);
  const { webData } = useSelector((state) => state.web);
  const { activeTrade } = useSelector((state) => state.profile);
  const { currentSelectedStock, defaultSelectedStock } = useSelector(
    (state) => state.stock
  );

  const profitOrLoss = getProfitOrLoss(
    activeTrade,
    currentSelectedStock,
    defaultSelectedStock
  );

  const balance = user && user.wallet + user.bonus;

  const equity =
    Object.keys(activeTrade).length > 0
      ? balance +
        parseFloat(activeTrade.margin) +
        parseFloat(profitOrLoss) -
        parseFloat(activeTrade.margin)
      : balance;

  const freeMargin =
    Object.keys(activeTrade).length > 0
      ? balance + (parseFloat(profitOrLoss) - parseFloat(activeTrade.margin))
      : balance;

  return (
    <footer className="dash-footer">
      <div className="footer-left-side">
        <div className="admin-text-wrapper">
          <FaRegGem size={15} className="mr-2" />
          <p>{user && user.isAdmin ? "Admin" : "User"}</p>
        </div>
        <div className="theme-wrapper">
          <p className="mr-2">Dark</p>
          <SwitchButton />
          <p className="ml-2">White</p>
        </div>
        <div className="accounting-area">
          <p>
            Balance:{" "}
            {user && user.currency === "USD" ? "$" : user && user.currency}
            {Object.keys(activeTrade).length > 0
              ? new Intl.NumberFormat("en-US")
                  .format(balance - activeTrade.margin)
                  .slice(0, 9)
              : new Intl.NumberFormat("en-US").format(balance).slice(0, 9)}{" "}
            |
          </p>
          <p
            style={{
              color:
                Object.keys(activeTrade).length === 0
                  ? "#fff"
                  : Object.keys(activeTrade).length > 0 &&
                    parseFloat(profitOrLoss) === 0
                  ? "yellow"
                  : parseFloat(profitOrLoss) > 0
                  ? "#54ac40"
                  : "red",
            }}
          >
            &nbsp;P/L:{" "}
            {user && user.currency === "USD" ? "$" : user && user.currency}
            {new Intl.NumberFormat("en-US").format(profitOrLoss)}
            &nbsp;
          </p>{" "}
          |
          <p>
            &nbsp;Equity:{" "}
            {user && user.currency === "USD" ? "$" : user && user.currency}
            {new Intl.NumberFormat("en-US").format(equity).slice(0, 9)}
            &nbsp;|
          </p>
          <p>
            &nbsp;Margin:{" "}
            {user && user.currency === "USD" ? "$" : user && user.currency}
            {Object.keys(activeTrade).length > 0 ? activeTrade.margin : 0} |
          </p>
          <p>
            &nbsp;Free Margin:{" "}
            {user && user.currency === "USD" ? "$" : user && user.currency}
            {new Intl.NumberFormat("en-US").format(freeMargin).slice(0, 9)}
          </p>
        </div>
      </div>
      <div className="footer-right-side">
        <button onClick={() => setSupport(true)}>
          <BsChat size={20} className="mr-3" />
          <span>Contact us</span>
        </button>
        <p className="date">{new Date().toDateString()}</p>
      </div>
    </footer>
  );
};

DashboardFooter.propTypes = {
  setSupport: PropTypes.func.isRequired,
};

export default DashboardFooter;
