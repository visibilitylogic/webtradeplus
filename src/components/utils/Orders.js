import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import useInterval from "../hooks/useInterval";
import { message } from "antd";
import "./Orders.css";
import Spinner from "./Spinner";

const spinnerStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Orders = (props) => {
  const { buysell, setBuysell } = props;

  const { user } = useSelector((state) => state.auth);
  const { userTrades, error, loading } = useSelector((state) => state.profile);
  const { allStockAssets } = useSelector((state) => state.stock);
  const { webData } = useSelector((state) => state.web);

  const {
    getAllUserTrades,
    deleteUserTrade,
    closeUserBuyTrade,
    closeUserSellTrade,
    setCurrentlyActiveTrade,
  } = useActions();

  const handleDeleteUserTrade = (tradeId) => {
    if (error) {
      message.error("Trade could not be deleted");
    } else {
      deleteUserTrade(tradeId);
      setTimeout(() => {
        message.success("Trade deleted succesfully");
        setCurrentlyActiveTrade({});
      }, 5000);
    }
  };

  const handleCloseUserTrade = (trade, closeRate) => {
    if (error) {
      message.error("Trade could not be closed");
      return;
    }

    if (trade.tag === "buy") {
      closeUserBuyTrade(trade._id, {
        closeRateOfAsset: closeRate,
      });
      setCurrentlyActiveTrade({});
    } else {
      closeUserSellTrade(trade._id, {
        closeRateOfAsset: closeRate,
      });
      setCurrentlyActiveTrade({});
    }

    setTimeout(
      () => message.success("Your trade has been closed successfully"),
      5000
    );
  };

  useInterval(() => {
    !loading && getAllUserTrades(user && user._id);
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
        <span
          className="text"
          onClick={() => {
            setBuysell((prev) => !prev);
            getAllUserTrades(user && user._id);
          }}
        >
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
          onClick={() => {
            setBuysell((prev) => !prev);
            getAllUserTrades(user && user._id);
          }}
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
          {loading ? (
            <Spinner style={spinnerStyle} />
          ) : (
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

                          <td>
                            $
                            {new Intl.NumberFormat("en-US").format(item.margin)}
                          </td>
                          <td>{item.stockAmount}</td>
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
                          <td>{item.openRateOfAsset.toString().slice(0, 8)}</td>
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
                                    {asset.price.toString().slice(0, 8)}
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
                                    {new Intl.NumberFormat("en-US").format(
                                      (asset.price - item.openRateOfAsset)
                                        .toString()
                                        .slice(0, 8)
                                    )}
                                  </td>
                                  <td>
                                    {new Intl.NumberFormat("en-US").format(
                                      item.profit.toString().slice(0, 6)
                                    )}
                                    /
                                    {new Intl.NumberFormat("en-US").format(
                                      item.loss.toString().slice(0, 6)
                                    )}
                                  </td>
                                  <td
                                    style={{
                                      display: "flex",
                                      height: "100%",
                                      alignItems: "center",
                                      width: "75%",
                                    }}
                                  >
                                    <button
                                      className="orderBtn btn-green"
                                      style={{ marginRight: 20 }}
                                    >
                                      {item.isOpen ? "Open" : "closed"}
                                    </button>

                                    {item.isOpen && (
                                      <button
                                        className="orderBtn btn-red"
                                        onClick={() =>
                                          handleCloseUserTrade(
                                            item,
                                            asset.price
                                          )
                                        }
                                      >
                                        CLOSE
                                      </button>
                                    )}

                                    <i
                                      className="fas fa-trash trashS"
                                      onClick={() => {
                                        if (item.tag === "buy") {
                                          closeUserBuyTrade(
                                            item._id,
                                            asset.price
                                          );
                                        } else {
                                          closeUserSellTrade(
                                            item._id,
                                            asset.price
                                          );
                                        }
                                        handleDeleteUserTrade(item._id);
                                      }}
                                    >
                                      {" "}
                                    </i>
                                  </td>
                                </>
                              ))}
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          )}
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
