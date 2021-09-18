import React, { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { calculatePandL } from "../../helpers/calculatePandL";
import { animateBalance } from "../../helpers/animateBalance";
import { getUserBalance } from "../../helpers/getUserBalance";
import { getActiveTradeMargin } from "../../helpers/getActiveTradeMargin";
import useInterval from "../hooks/useInterval";

function OrderBook() {
  const { setCurrentlyActiveTrade, closeUserTrade, getAllUserTrades } =
    useActions();
  const { user } = useSelector((state) => state.auth);
  const { webData } = useSelector((state) => state.web);
  const { error, activeTrade, openTrades, userTrades } = useSelector(
    (state) => state.profile
  );
  const { loading } = useSelector((state) => state.orders);
  const { allStockAssets } = useSelector((state) => state.stock);

  const [display, setDisplay] = useState("open_position");

  const activeTradeMargin = getActiveTradeMargin(activeTrade);
  const balance = getUserBalance(user) - activeTradeMargin;

  useInterval(() => !loading && getAllUserTrades(user && user._id));

  const spinnerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleCloseUserTrade = (trade, closeRate) => {
    if (error) {
      message.error("Trade could not be closed");
      return;
    }

    closeUserTrade(trade._id, {
      closeRateOfAsset: closeRate.price,
    });

    setTimeout(() => {
      message.success("Your trade has been closed successfully");
      setCurrentlyActiveTrade({});
    }, 6000);

    setTimeout(() => {
      animateBalance(
        "balance",
        balance,
        balance +
          trade.margin +
          calculatePandL(trade, closeRate) *
            (webData ? webData.leverageAmount : 1) -
          trade.margin,
        3000
      );
    }, 7000);
  };

  const bodyDisplay = () => {
    switch (display) {
      case "trading_history":
        if (userTrades.length > 0) {
          return (
            <table style={{ width: "100%" }}>
              <tbody style={{ textAlign: "left" }}>
                {userTrades &&
                  userTrades.map((data) => (
                    <tr
                      style={{
                        paddingTop: "4px",
                        borderBottom: ".1px solid #4a4a4d",
                        marginBottom: "-30px",
                      }}
                      className="tableRoww"
                      key={data.id}
                    >
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {" "}
                          {data.time &&
                            data.time.split("T")[1].slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          {data.time && data.time.split("T")[0]}
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">{data.nameOfAsset} </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          Asset{" "}
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.openRateOfAsset}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          amount
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span
                          className="order_span"
                          style={{
                            color: data.tag === "buy" ? "green" : "red",
                          }}
                        >
                          {data.tag}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          direction
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {user && user.currency === "USD"
                            ? "$"
                            : user && user.currency}
                          {data.margin}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          units
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.stockAmount.toString().slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          investment
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {new Intl.NumberFormat("en-US")
                            .format(data.profit)
                            .slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          profit
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {new Intl.NumberFormat("en-US")
                            .format(data.loss)
                            .slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          loss
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.isOpen ? "Open" : "Closed"}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          status
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        } else {
          return (
            <div style={{ marginTop: "20%" }}>
              <h1 style={{ color: "white" }}> No Trade History</h1>
            </div>
          );
        }

      case "open_position":
        if (openTrades.length > 0) {
          return (
            <table style={{ width: "100%" }}>
              <tbody style={{ textAlign: "left" }}>
                {openTrades &&
                  openTrades.map((data) => (
                    <tr
                      style={{
                        padding: "14px 0px",
                        borderBottom: ".1px solid #4a4a4d",
                        marginBottom: "-30px",
                      }}
                      className="tableRoww"
                      key={data.id}
                    >
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {" "}
                          {data.time &&
                            data.time.split("T")[1].slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          {data.time && data.time.split("T")[0]}
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">{data.nameOfAsset} </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          Asset{" "}
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.openRateOfAsset}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          amount
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span
                          className="order_span"
                          style={{
                            color: data.tag === "buy" ? "green" : "red",
                          }}
                        >
                          {data.tag}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          direction
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {user && user.currency === "USD"
                            ? "$"
                            : user && user.currency}
                          {data.margin}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          units
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.stockAmount.toString().slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          investment
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {new Intl.NumberFormat("en-US")
                            .format(data.profit)
                            .slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          profit
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {new Intl.NumberFormat("en-US")
                            .format(data.loss)
                            .slice(0, 8)}{" "}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          loss
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">
                          {data.isOpen ? "Open" : "Closed"}
                        </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          status
                        </p>
                      </td>
                      {allStockAssets.length > 0 &&
                        allStockAssets
                          .filter((stock) => {
                            if (stock.symbol === data.nameOfAsset) {
                              return true;
                            } else {
                              return false;
                            }
                          })
                          .map((asset, index) => (
                            <td style={{ paddingTop: "2%" }} key={index}>
                              {data.isOpen && (
                                <button
                                  className="orderBtn btn-red"
                                  onClick={() => {
                                    handleCloseUserTrade(data, asset);
                                  }}
                                >
                                  CLOSE
                                </button>
                              )}
                            </td>
                          ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        } else {
          return (
            <div style={{ marginTop: "20%" }}>
              <h1 style={{ color: "white" }}>No Open Position</h1>
            </div>
          );
        }
      // case "auto_trades":
      //   if (trade_orders.length > 0 && loading) {
      //     return (
      //       <table style={{ width: "100%" }}>
      //         <tbody style={{ textAlign: "left" }}>
      //           {trade_orders &&
      //             trade_orders.map((data) => (
      //               <tr
      //                 style={{
      //                   paddingTop: "4px",
      //                   borderBottom: ".1px solid #4a4a4d",
      //                   marginBottom: "-30px",
      //                 }}
      //                 className="tableRoww"
      //                 key={data.id}
      //               >
      //                 <td style={{ paddingTop: "2%" }}>
      //                   <span className="order_span">
      //                     {" "}
      //                     {data.time &&
      //                       data.time.split("T")[1].slice(0, 8)}{" "}
      //                   </span>
      //                   <p
      //                     style={{
      //                       color: "rgb(165 167 173)",
      //                       fontSize: "13px",
      //                     }}
      //                   >
      //                     {data.time && data.time.split("T")[0]}
      //                   </p>
      //                 </td>
      //                 <td style={{ paddingTop: "2%" }}>
      //                   <span className="order_span">{data.nameOfAsset} </span>
      //                   <p
      //                     style={{
      //                       color: "rgb(165 167 173)",
      //                       fontSize: "13px",
      //                     }}
      //                   >
      //                     Asset{" "}
      //                   </p>
      //                 </td>
      //                 <td style={{ paddingTop: "2%" }}>
      //                   <span className="order_span">
      //                     {data.openRateOfAsset}{" "}
      //                   </span>
      //                   <p
      //                     style={{
      //                       color: "rgb(165 167 173)",
      //                       fontSize: "13px",
      //                     }}
      //                   >
      //                     amount
      //                   </p>
      //                 </td>
      //                 <td style={{ paddingTop: "2%" }}>
      //                   <span
      //                     className="order_span"
      //                     style={{
      //                       color: data.tag === "buy" ? "green" : "red",
      //                     }}
      //                   >
      //                     {data.tag}{" "}
      //                   </span>
      //                   <p
      //                     style={{
      //                       color: "rgb(165 167 173)",
      //                       fontSize: "13px",
      //                     }}
      //                   >
      //                     tag
      //                   </p>
      //                 </td>
      //               </tr>
      //             ))}
      //         </tbody>
      //       </table>
      //     );
      //   } else {
      //     return (
      //       <div style={{ marginTop: "20%" }}>
      //         <h1 style={{ color: "white" }}> No Autorade History</h1>
      //       </div>
      //     );
      //   }
      default:
        break;
    }
  };
  return (
    <div style={{ marginLeft: "140px" }}>
      <div
        className="order-book-section orderBookComponent"
        style={{ display: "block" }}
      >
        <div className="order-book-sec">
          <h1
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "25px",
              fontFamily: "arial",
              marginTop: "20px",
            }}
          >
            {" "}
            Order Book
          </h1>
          <div className="tabs" style={{ borderBottom: "1px solid #4a4a4d" }}>
            <a
              className={display === "open_position" ? "active" : " "}
              onClick={() => setDisplay("open_position")}
              href="#!"
            >
              {" "}
              Opened Positions
            </a>
            <a
              className={display === "trading_history" ? "active" : ""}
              dash-tab="order-book"
              onClick={() => setDisplay("trading_history")}
              href="#!"
            >
              Trading History
            </a>
            {/* <a
              className={display === "auto_trades" ? "active" : " "}
              onClick={() => setDisplay("auto_trades")}
              href="#!"
            >
              {" "}
              Auto Trades
            </a> */}
          </div>
          {/* {loading && <Spinner style={spinnerStyle} />} */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "13%",
            }}
          >
            {bodyDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
