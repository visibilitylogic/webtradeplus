import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { useEffect } from "react";
import useInterval from "../hooks/useInterval";
import { message } from "antd";
import "./Orders.css";

const Orders = (props) => {
  const [currentStock, setCurrentStock] = useState({});
  const { buysell, orders, getRate, closeOrder, setBuysell } = props;

  const { user } = useSelector((state) => state.auth);
  const { userTrades, error } = useSelector((state) => state.profile);
  const { defaultSelectedStock, allStockAssets } = useSelector(
    (state) => state.stock
  );

  const { getAllUserTrades, deleteUserTrade, closeUserTrade } = useActions();

  const getStockPrice = (item) => {
    allStockAssets.length > 0 &&
      allStockAssets.filter((stock) => {
        if (stock.symbol === item) {
          setCurrentStock(stock);
        } else {
          return false;
        }
      });
  };

  // const getItem = () => {
  //   let buy = orders.filter((item) => {
  //     return (
  //       item.tag === "buy" &&
  //       parseInt(item.unit) / parseInt(getRate(item.stockName)) <
  //         parseInt(item.stockAmount) &&
  //       item.active
  //     );
  //   });

  //   let sell = orders.filter((item) => {
  //     return (
  //       item.tag === "sell" &&
  //       parseInt(item.unit) / parseInt(getRate(item.stockName)) >
  //         parseInt(item.stockAmount) &&
  //       item.active
  //     );
  //   });
  //   let closeArr = [...buy, ...sell];

  //   return closeArr;
  // };

  const closeTimer = () => {
    // let arr = getItem();
    let arr = [];
    arr.map((item) => {
      return closeOrder(
        item._id,
        (parseInt(item.unit) / parseInt(getRate(item.stockName)) -
          parseInt(item.stockAmount)) *
          10 *
          parseInt(getRate(item.stockName)),
        (parseInt(item.unit) / parseInt(getRate(item.stockName))) *
          10 *
          parseInt(getRate(item.stockName))
      )();
    });
  };

  const handleDeleteUserTrade = (tradeId) => {
    if (error) {
      message.error("Trade could not be deleted");
    } else {
      deleteUserTrade(tradeId);
      setTimeout(() => message.success("Trade deleted succesfully"), 5000);
    }
  };

  const handleCloseUserTrade = (tradeId) => {
    if (error) {
      message.error("Trade could not be closed");
    } else {
      closeUserTrade(tradeId);
      setTimeout(
        () => message.success("Trade has been closed successfully"),
        5000
      );
    }
  };

  useInterval(() => {
    getAllUserTrades(user && user._id);
  }, 10000);

  return (
    <div
      className="order orders-table"
      style={
        buysell
          ? { height: "65vh", overflow: "auto" }
          : { height: "15vh", overflow: "auto" }
      }
    >
      <div className="dtls">
        <span className="text" onClick={() => setBuysell((prev) => !prev)}>
          Open positions
        </span>
        {/* <span className="text">Pending orders</span> */}
        <svg
          className={buysell ? "expand toggled" : "expand untoggled"}
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setBuysell((prev) => !prev)}
        >
          <path
            d="M5 15.5L12 8.5L19 15.5"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className="all-tables tablesI"
          style={{ display: buysell ? "block" : "" }}
        >
          <div
            className="tables tablesI"
            id="open-positions"
            style={{
              display: buysell ? "block" : "",
              overflowX: "scroll",
              overflowY: "scroll",
            }}
          >
            <table>
              <tbody>
                <tr>
                  <th>DATE</th>
                  <th>ID</th>
                  <th>INSTRUMENT</th>
                  <th>MARGIN</th>
                  <th>INVESTMENT</th>
                  <th>DIRECTION</th>
                  <th>OPEN RATE</th>
                  <th>MARKET RATE</th>
                  <th>P&L</th>
                  <th>PROFIT/LOSS</th>
                  <th>STATUS</th>
                </tr>
                {userTrades.length > 0
                  ? userTrades.map((item, i) => (
                      <tr key={item._id}>
                        <td>{item.time.slice(0, 10)}</td>
                        <td>00{i + 1}</td>
                        <td>{item.nameOfAsset}</td>

                        <td>{item.margin}</td>
                        <td>
                          $
                          {(
                            (parseInt(item.margin) /
                              parseFloat(item.stockAmount)) *
                            10
                          )
                            .toString()
                            .slice(0, 8)}
                        </td>
                        <td
                          className="rise"
                          style={
                            item.tag === "buy"
                              ? { color: "#54ac40" }
                              : { color: "red" }
                          }
                        >
                          {item.tag}
                        </td>
                        <td>${item.openRateOfAsset.toString().slice(0, 8)}</td>
                        {allStockAssets.length > 0 &&
                          allStockAssets
                            .filter((stock) => {
                              if (stock.symbol === item.nameOfAsset) {
                                return true;
                              } else {
                                return false;
                              }
                            })
                            .map((asset, index) => (
                              <>
                                <td key={index}>
                                  ${asset.price.toString().slice(0, 8)}
                                </td>
                                <td
                                  style={{
                                    color:
                                      asset.price - item.openRateOfAsset < 0
                                        ? "red"
                                        : "#54ac40",
                                  }}
                                >
                                  {asset.price - item.openRateOfAsset > 0 &&
                                    "+"}
                                  {(asset.price - item.openRateOfAsset)
                                    .toString()
                                    .slice(0, 8)}
                                </td>
                              </>
                            ))}

                        <td>
                          {item.profit.toString().slice(0, 8)}/
                          {item.loss.toString().slice(0, 8)}
                        </td>
                        <td style={{ display: "flex", width: "75%" }}>
                          <button className="orderBtn btn-green">
                            {item.isOpen ? "Open" : "closed"}
                          </button>

                          {item.isOpen && (
                            <button
                              className="orderBtn btn-red"
                              onClick={() => handleCloseUserTrade(item._id)}
                            >
                              CLOSE
                            </button>
                          )}

                          <i
                            className="fas fa-trash trashS"
                            onClick={() => handleDeleteUserTrade(item._id)}
                          >
                            {" "}
                          </i>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Orders.propTypes = {
  buysell: PropTypes.bool,
  orders: PropTypes.array.isRequired,
  getRate: PropTypes.func.isRequired,
  closeOrder: PropTypes.func.isRequired,
  delOrder: PropTypes.func.isRequired,
  setBuysell: PropTypes.func.isRequired,
};

export default Orders;
