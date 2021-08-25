import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'

const DummyData = [
  {
    id: 1,
    isOpen: true,
    nameOfAsset: 'Bitcoin',
    tag: 'Buy',
    openRateOfAsset: 2000,
  },

  {
    id: 2,
    isOpen: false,
    nameOfAsset: 'Ethereum',
    tag: 'Sell',
    openRateOfAsset: 2000,
  },

  {
    id: 3,
    isOpen: true,
    nameOfAsset: 'Bitcoin',
    tag: 'Buy',
    openRateOfAsset: 5000,
  },
]

const openData = DummyData && DummyData.filter((data) => data.isOpen === true)
function OrderBook() {
  const { getOrder } = useActions()
  useEffect(() => {
    getOrder()
  }, [])
  return (
    <div>
      {/* <section className="dash-contents">
            <div className="dash-row">
              {this.state.orderBook ? (
                // <div className="full-width orderTabComponent">
                <div
                  className="order-book-section orderBookComponent"
                  style={{ display: "block" }}
                >
                  <div className="order-book-sec">
                    <h2 id="order-header">Order Book</h2>
                    <div
                      className="tabs"
                      style={{ borderBottom: "1px solid #4a4a4d" }}
                    >
                      <a className="active" dash-tab="order-book">
                        Trading History
                      </a>
                      <a dash-tab="opened-position"> Opened Positions</a>

                      <a dash-tab="opened-pos"> Auto Trades</a>
                    </div>
                    <div className="dash-tab-sec" dash-tab-sec="order-book"> */}
      {/* {this.state.orders.length > 0 ? (
                        this.state.orders.map((item, i) =>
                          item.active ? (
                            <div className="dash-row">
                              <div className="date">
                                <p className="time">
                                  {" "}
                                  {item.time
                                    ? item.time.slice(10).slice(1, 6)
                                    : ""}
                                </p>
                                <p className="day-month">
                                  {item.time ? item.time.slice(0, 10) : ""}
                                </p>
                              </div>
                              <div className="currency">
                                <p className="currency-type">
                                  {item.stockName}
                                </p>
                                <p className="cad">
                                  {item.stockAmount && item.buyW
                                    ? (item.stockAmount * item.buyW)
                                        .toString()
                                        .slice(0, 4) + "$"
                                    : ""}
                                </p>
                              </div>
                              <div className="rate">
                                <p
                                  className={
                                    item.tag.toLowerCase() === "buy"
                                      ? "rate-no"
                                      : "rate-no red"
                                  }
                                >
                                  {item.stockAmount
                                    ? new Intl.NumberFormat('en-US').format(item.stockAmount)
                                        .slice(0, 8)
                                    : ""}
                                </p>
                                <p className="currency">
                                  {item.profitLoss ? "profit" : "loss"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )
                        )
                      ) : (
                        <h3
                          style={{
                            fontWeight: "bold",
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>

                    <div
                      className="dash-tab-sec"
                      dash-tab-sec="opened-position"
                    >
                      {this.state.history.length > 0 ? (
                        this.state.history.map((item, i) => (
                          <div className="dash-row">
                            <div className="date">
                              <p className="time">
                                {" "}
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(10).slice(1, 6)
                                  : ""}
                              </p>
                              <p className="day-month">
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(0, 10)
                                  : ""}
                              </p>
                            </div>
                            <div className="currency">
                              <p className="currency-type">{item.market}</p>
                              <p className="cad">
                                {" "}
                                {item.assets ? item.assets : ""}
                              </p>
                            </div>
                            <div className="rate">
                              <p
                                className="currency-type"
                                style={{
                                  margin: 0,
                                  color: "white",
                                  fontSize: "11px",
                                }}
                              >
                                {item.amount
                                  ? new Intl.NumberFormat('en-US').format(item.amount)
                                      .slice(0, 8)
                                  : ""}
                              </p>{" "}
                              <p className="currency">
                                {item.profitLoss ? "profit" : "loss"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h3
                          style={{
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>

                    <div className="dash-tab-sec" dash-tab-sec="opened-pos">
                      {this.state.history.length > 0 ? (
                        this.state.history.map((item, i) => (
                          <div className="dash-row">
                            <div className="date">
                              <p className="time">
                                {" "}
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(10).slice(1, 6)
                                  : ""}
                              </p>
                              <p className="day-month">
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(0, 10)
                                  : ""}
                              </p>
                            </div>
                            <div className="currency">
                              <p className="currency-type">{item.market}</p>
                              <p className="cad">
                                {" "}
                                {item.assets ? item.assets : ""}
                              </p>
                            </div>
                            <div className="rate">
                              <p
                                className="currency-type"
                                style={{
                                  margin: 0,
                                  color: "white",
                                  fontSize: "11px",
                                }}
                              >
                                {item.amount
                                  ? new Intl.NumberFormat('en-US').format(item.amount)
                                      .slice(0, 8)
                                  : ""}
                              </p>{" "}
                              <p className="currency">
                                {item.profitLoss ? "profit" : "loss"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h3
                          style={{
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div> */}
      {/* </section> */}
    </div>
  )
}

export default OrderBook
