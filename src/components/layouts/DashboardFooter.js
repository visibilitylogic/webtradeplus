import PropTypes from "prop-types";
import { FaRegGem } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import "./DashboardFooter.css";
import SwitchButton from "../utils/SwitchButton";
import { useSelector } from "react-redux";
import { getPandL } from "../../helpers/getProfitOrLoss";
import { tradesMargin } from "./../../helpers/getOpenTradesMargin";

const DashboardFooter = ({ setSupport, timer }) => {
  const { user } = useSelector((state) => state.auth);
  const { openTrades } = useSelector((state) => state.profile);
  const { allStockAssets } = useSelector((state) => state.stock);

  const profitOrLoss = getPandL(openTrades, allStockAssets);

  const balance = user && user.wallet + user.bonus;

  const openTradesMargin = tradesMargin(openTrades);

  const equity =
    openTrades.length > 0
      ? balance +
        (parseFloat(profitOrLoss) - openTradesMargin) +
        openTradesMargin
      : balance;

  // const equity =
  //   Object.keys(activeTrade).length > 0
  //     ? balance +
  //       parseFloat(activeTrade.margin) +
  //       parseFloat(profitOrLoss) -
  //       parseFloat(activeTrade.margin)
  //     : balance;

  const freeMargin =
    openTrades.length > 0
      ? balance + (parseFloat(profitOrLoss) - openTradesMargin)
      : balance;

  // const openTradeAssets =
  //   openTrades.length > 0 &&
  //   openTrades.map((trade) => {
  //     allStockAssets.length > 0 &&
  //       allStockAssets
  //         .filter((stock) => {
  //           if (trade.nameOfAsset === stock.symbol) {
  //             return true;
  //           }
  //         })
  //         .map((asset) => {
  //           console.log(asset.price);
  //         });
  //     // .reduce((sum, curItem) => sum + curItem, 0);
  //   });

  // console.log(openTradeAssets);

  // const getMarketPrices = allStockAssets.length > 0 && allStockAssets.filter();

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
            <span>Balance: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              {openTrades.length > 0
                ? new Intl.NumberFormat("en-US")
                    .format(balance - openTradesMargin)
                    .slice(0, 9)
                : new Intl.NumberFormat("en-US")
                    .format(balance)
                    .slice(0, 9)}{" "}
              |
            </span>
          </p>
          <p>
            <span>&nbsp;P/L: </span>
            <span
              style={{
                color:
                  openTrades.length === 0 && profitOrLoss === 0
                    ? "yellow"
                    : openTrades.length > 0 && profitOrLoss > 0
                    ? "#54ac40"
                    : openTrades.length > 0 && profitOrLoss < 0
                    ? "red"
                    : "#fff",
              }}
            >
              {user && user.currency === "USD" ? "$" : user && user.currency}
              {openTrades.length > 0
                ? new Intl.NumberFormat("en-US").format(profitOrLoss)
                : 0}
              &nbsp; <span style={{ color: "#fff" }}>|</span>
            </span>
          </p>{" "}
          <p>
            <span>&nbsp;Equity: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              {new Intl.NumberFormat("en-US").format(equity).slice(0, 9)}
              &nbsp;|
            </span>
          </p>
          <p>
            <span>&nbsp;Margin: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              {openTradesMargin} |
            </span>
          </p>
          <p>
            <span>&nbsp;Free Margin: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              {new Intl.NumberFormat("en-US").format(freeMargin).slice(0, 9)}
            </span>
          </p>
        </div>
      </div>
      <div className="footer-right-side">
        <button onClick={() => setSupport(true)}>
          <BsChat size={20} className="mr-3" />
          <span>Contact us</span>
        </button>
        <p className="date">{new Date().toDateString()} &nbsp;</p>
        <p>
          {timer.getHours()} :{" "}
          {`${timer.getMinutes() < 10 ? "0" : ""}${timer.getMinutes()}`} :{" "}
          {`${timer.getUTCSeconds() < 10 ? "0" : ""}${timer.getUTCSeconds()}`}
        </p>
      </div>
    </footer>
  );
};

DashboardFooter.propTypes = {
  setSupport: PropTypes.func.isRequired,
  timer: PropTypes.func.isRequired,
};

export default DashboardFooter;
