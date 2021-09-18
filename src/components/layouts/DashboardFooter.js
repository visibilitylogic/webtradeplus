import { useState } from "react";
import PropTypes from "prop-types";
import { FaRegGem } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import "./DashboardFooter.css";
import SwitchButton from "../utils/SwitchButton";
import { useSelector } from "react-redux";
import { getPandL } from "../../helpers/getProfitOrLoss";
import { tradesMargin } from "./../../helpers/getOpenTradesMargin";
import { getUserBalance } from "./../../helpers/getUserBalance";
import { getActiveTradeMargin } from "./../../helpers/getActiveTradeMargin";
import useInterval from "../hooks/useInterval";

const DashboardFooter = ({ setSupport }) => {
  const { user } = useSelector((state) => state.auth);
  const { openTrades, activeTrade } = useSelector((state) => state.profile);
  const { webData } = useSelector((state) => state.web);
  const { allStockAssets } = useSelector((state) => state.stock);
  const [timer, setTimer] = useState(new Date());

  const profitOrLoss = getPandL(
    openTrades,
    allStockAssets,
    webData?.leverageAmount
  );

  const activeTradeMargin = getActiveTradeMargin(activeTrade);

  const balance = getUserBalance(user) - activeTradeMargin;

  const openTradesMargin = tradesMargin(openTrades);

  const equity =
    openTrades.length > 0
      ? balance + parseFloat(profitOrLoss) + openTradesMargin
      : balance;

  // const equity =
  //   Object.keys(activeTrade).length > 0
  //     ? balance +
  //       parseFloat(activeTrade.margin) +
  //       parseFloat(profitOrLoss) -
  //       parseFloat(activeTrade.margin)
  //     : balance;

  const freeMargin =
    openTrades.length > 0 ? balance + parseFloat(profitOrLoss) : balance;

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

  useInterval(() => {
    setTimer(new Date());
  }, 1000);

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
              <span>
                {user && user.currency === "USD" ? "$" : user && user.currency}
              </span>
              <span className="balance">
                {new Intl.NumberFormat("en-US").format(balance).slice(0, 8)} |
              </span>
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
              <span style={{ color: "#fff" }}> | </span>
            </span>
          </p>
          <p>
            <span>&nbsp;Equity: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              <span className="balance">
                {new Intl.NumberFormat("en-US").format(equity).slice(0, 8)}
              </span>
              &nbsp;|
            </span>
          </p>
          <p>
            <span>&nbsp;Margin: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              <span>{openTradesMargin} |</span>
            </span>
          </p>
          <p>
            <span>&nbsp;Free Margin: </span>
            <span>
              {user && user.currency === "USD" ? "$" : user && user.currency}
              <span className="balance">
                {new Intl.NumberFormat("en-US").format(freeMargin).slice(0, 8)}
              </span>
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
};

export default DashboardFooter;
