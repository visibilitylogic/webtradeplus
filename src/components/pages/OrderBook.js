import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";

function OrderBook() {
  const { getOrder } = useActions();
  const { user } = useSelector((state) => state.auth);
  const { loading, trade_orders } = useSelector((state) => state.orders);
  const [display, setDisplay] = useState("order-book");
  const openData =
    trade_orders && trade_orders.filter((data) => data.isOpen === true);
  console.log(trade_orders);
  useEffect(() => {
    getOrder(user && user._id);
  }, []);
  const bodyDisplay = () => {
    switch (display) {
      case "order-book":
        if (trade_orders.length > 0) {
          return (
            <table style={{ width: "100%" }}>
              <tbody style={{ textAlign: "left" }}>
                {trade_orders &&
                  trade_orders.map((data) => (
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
                          tag
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">{data.margin} </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          margin
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
        if (openData.length > 0) {
          return (
            <table style={{ width: "100%" }}>
              <tbody style={{ textAlign: "left" }}>
                {openData &&
                  openData.map((data) => (
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
                          tag
                        </p>
                      </td>
                      <td style={{ paddingTop: "2%" }}>
                        <span className="order_span">{data.margin} </span>
                        <p
                          style={{
                            color: "rgb(165 167 173)",
                            fontSize: "13px",
                          }}
                        >
                          margin
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
              <h1 style={{ color: "white" }}>No Open Position</h1>
            </div>
          );
        }
      case "auto_trades":
        if (trade_orders.length > 0 && loading) {
          return (
            <table style={{ width: "100%" }}>
              <tbody style={{ textAlign: "left" }}>
                {trade_orders &&
                  trade_orders.map((data) => (
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
                          tag
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
              <h1 style={{ color: "white" }}> No Autorade History</h1>
            </div>
          );
        }
      default:
        break;
    }
  };
  return (
    <div style={{ marginLeft: "70px" }}>
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
              className={display === "order-book" ? "active" : " "}
              dash-tab="order-book"
              onClick={() => setDisplay("order-book")}
              href="#!"
            >
              Trading History
            </a>
            <a
              className={display === "auto_trades" ? "active" : " "}
              onClick={() => setDisplay("auto_trades")}
              href="#!"
            >
              {" "}
              Auto Trades
            </a>
          </div>
          {loading && <div>Loading...</div>}
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
