import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Orders = (props) => {
  const { buysell, orders, getRate, closeOrder, delOrder, setBuysell } = props;

  const [intervalId, setIntervalId] = useState(null);

  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const getItem = () => {
    let buy = orders.filter((item) => {
      return (
        item.tag === "buy" &&
        parseInt(item.unit) / parseInt(getRate(item.stockName)) <
          parseInt(item.stockAmount) &&
        item.active
      );
    });

    let sell = orders.filter((item) => {
      return (
        item.tag === "sell" &&
        parseInt(item.unit) / parseInt(getRate(item.stockName)) >
          parseInt(item.stockAmount) &&
        item.active
      );
    });
    let closeArr = [...buy, ...sell];

    return closeArr;
  };

  const closeTimer = () => {
    let arr = getItem();

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

  // useEffect(() => {
  //   const newIntervalId = setInterval(closeTimer, 10000);
  //   setIntervalId(newIntervalId);

  //   clearInterval(newIntervalId);
  // }, []);

  return (
    <div
      className="order"
      style={
        buysell
          ? { height: "65vh", overflow: "auto" }
          : { height: "15vh", overflow: "auto" }
      }
    >
      <div className="dtls">
        <span className="text">Open positions</span>
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
          style={buysell ? { display: "block" } : { display: "block" }}
        >
          <div
            className="tables tablesI"
            id="open-positions"
            style={buysell ? { display: "block" } : { display: "block" }}
          >
            <table>
              <tbody>
                <tr>
                  <th>DATE</th>
                  <th>ID</th>
                  <th>INSTRUMENT</th>
                  <th>UNITS</th>
                  <th>INVESTMENT</th>
                  <th>DIRECTION</th>
                  <th>OPEN RATE</th>
                  <th>MARKET RATE</th>
                  <th>P&L</th>
                  <th>PROFIT/LOSS</th>
                  <th>STATUS</th>
                </tr>
                {orders.length > 0
                  ? orders.map((item, i) => (
                      <tr>
                        <td>
                          {item.time ? item.time.slice(0, 10) : ""}{" "}
                          {/* {item.time ? item.time.slice(16).slice(0, 8) : ""} */}
                        </td>
                        <td>00{i + 1}</td>
                        <td>{item.stockName}</td>

                        <td>
                          {item.unit
                            ? ((parseInt(item.unit) / item.buyW) * 10)
                                .toString()
                                .slice(0, 8)
                            : 1}
                        </td>
                        <td>
                          {item.unit
                            ? ("$" + (item.unit / item.buyW) * item.buyW)
                                .toString()
                                .slice(0, 8)
                            : 1}
                        </td>
                        <td
                          className="rise"
                          style={
                            item.tag === "buy"
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {item.tag}
                        </td>
                        <td>
                          {item.buyW
                            ? "$" + item.buyW.toString().slice(0, 8)
                            : ""}
                        </td>
                        <td>
                          {item.active ? "$" : ""}
                          {item.active
                            ? getRate(item.stockName)
                              ? getRate(item.stockName).toString().slice(0, 8)
                              : ""
                            : "---"}
                        </td>
                        <td className="fall">
                          {item.active
                            ? item.tag === "buy"
                              ? item.unit / getRate(item.stockName) >
                                item.stockAmount
                                ? (
                                    "-" +
                                    (item.unit / getRate(item.stockName) -
                                      item.stockAmount) *
                                      10 *
                                      getRate(item.stockName)
                                  )
                                    .toString()
                                    .slice(0, 8)
                                : (
                                    "+" +
                                    (item.stockAmount -
                                      item.unit / getRate(item.stockName)) *
                                      10 *
                                      getRate(item.stockName)
                                  )
                                    .toString()
                                    .slice(0, 8)
                              : //sell
                              item.unit / getRate(item.stockName) <
                                item.stockAmount
                              ? (
                                  (item.unit / getRate(item.stockName) -
                                    item.stockAmount) *
                                  10 *
                                  getRate(item.stockName)
                                )
                                  .toString()
                                  .slice(0, 8)
                              : (
                                  "+" +
                                  (item.unit / getRate(item.stockName) -
                                    item.stockAmount) *
                                    10 *
                                    getRate(item.stockName)
                                )
                                  .toString()
                                  .slice(0, 8)
                            : "---"}
                        </td>
                        <td>
                          {item.profit}/{item.loss}
                        </td>
                        <td style={{ display: "flex", width: "75%" }}>
                          <button className="orderBtn btn-green">
                            {item.active ? "Open" : "closed"}
                          </button>

                          {item.active && (
                            <button
                              className="orderBtn btn-red"
                              onClick={closeOrder(
                                item._id,
                                (parseInt(item.unit) / parseInt(item.buyW) -
                                  parseInt(item.stockAmount)) *
                                  10 *
                                  parseInt(item.buyW),
                                (parseInt(item.unit) /
                                  parseInt(getRate(item.stockName))) *
                                  10 *
                                  parseInt(getRate(item.stockName))
                              )}
                            >
                              CLOSE
                            </button>
                          )}

                          <i
                            className="fas fa-trash trashS"
                            onClick={delOrder(item._id)}
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
          <div className="tables" id="pending-orders">
            <table>
              <tbody>
                <tr>
                  <th>DATE</th>
                  <th>ID</th>
                  <th>INSTRUMENT</th>
                  <th>UNITS</th>
                  <th>INVESTMENT</th>
                  <th>DIRECTION</th>
                  <th>OPEN RATE</th>
                  <th>MARKET RATE</th>
                  <th>P&L</th>
                  <th>PROFIT/LOSS</th>
                  <th>STATUS</th>
                </tr>
                {orders.length > 0 &&
                  orders.map((item, i) => (
                    <tr>
                      <td>
                        {item.time ? item.time.slice(0, 10) : ""}{" "}
                        {/* {item.time
                                      ? item.time.slice(16).slice(0, 8)
                                      : ""} */}
                      </td>
                      <td>00{i + 1}</td>
                      <td>{item.stockName}</td>

                      <td>
                        {item.unit
                          ? ((parseInt(item.unit) / item.buyW) * 10)
                              .toString()
                              .slice(0, 8)
                          : 1}
                      </td>

                      <td>
                        {item.unit
                          ? ("$" + (item.unit / item.buyW) * item.buyW)
                              .toString()
                              .slice(0, 8)
                          : 1}
                      </td>

                      <td
                        className="rise"
                        style={
                          item.tag === "buy"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {item.tag}
                      </td>
                      <td>
                        {item.buyW
                          ? "$" + item.buyW.toString().slice(0, 8)
                          : ""}
                      </td>
                      <td>
                        {item.active ? "$" : ""}
                        {item.active
                          ? getRate(item.stockName)
                            ? getRate(item.stockName).toString().slice(0, 8)
                            : ""
                          : "---"}
                      </td>
                      <td className="fall">
                        {item.active
                          ? item.tag === "buy"
                            ? item.unit / getRate(item.stockName) >
                              item.stockAmount
                              ? (
                                  "-" +
                                  (item.unit / getRate(item.stockName) -
                                    item.stockAmount) *
                                    10 *
                                    getRate(item.stockName)
                                )
                                  .toString()
                                  .slice(0, 8)
                              : (
                                  "+" +
                                  (item.stockAmount -
                                    item.unit / getRate(item.stockName)) *
                                    10 *
                                    getRate(item.stockName)
                                )
                                  .toString()
                                  .slice(0, 8)
                            : //sell
                            item.unit / getRate(item.stockName) <
                              item.stockAmount
                            ? (
                                (item.unit / getRate(item.stockName) -
                                  item.stockAmount) *
                                10 *
                                getRate(item.stockName)
                              )
                                .toString()
                                .slice(0, 8)
                            : (
                                "+" +
                                (item.unit / getRate(item.stockName) -
                                  item.stockAmount) *
                                  10 *
                                  getRate(item.stockName)
                              )
                                .toString()
                                .slice(0, 8)
                          : "---"}
                      </td>
                      <td>
                        {item.profit}/{item.loss}
                      </td>
                      <td style={{ display: "flex", width: "75%" }}>
                        <button className="orderBtn btn-green">
                          {item.active ? "Open" : "closed"}
                        </button>

                        {item.active && (
                          <button
                            className="orderBtn btn-red"
                            onClick={closeOrder(
                              item._id,
                              (parseInt(item.unit) / parseInt(item.buyW) -
                                parseInt(item.stockAmount)) *
                                10 *
                                parseInt(item.buyW),
                              (parseInt(item.unit) /
                                parseInt(getRate(item.stockName))) *
                                10 *
                                parseInt(getRate(item.stockName))
                            )}
                          >
                            CLOSE
                          </button>
                        )}

                        <i
                          className="fas fa-trash trashS"
                          onClick={delOrder(item._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
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
