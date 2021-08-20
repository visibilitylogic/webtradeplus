const OrderBook = ({ orders, history }) => {
  return (
    <div className="order-book-sec">
      <h2 id="order-header">Order Book</h2>
      <div className="tabs" style={{ borderBottom: "1px solid #4a4a4d" }}>
        <a className="active" dash-tab="order-book" href="#!">
          Trading History
        </a>
        <a dash-tab="opened-position" href="#!">
          {" "}
          Opened Positions
        </a>

        <a dash-tab="opened-pos" href="#!">
          {" "}
          Auto Trades
        </a>
      </div>
      <div className="dash-tab-sec" dash-tab-sec="order-book">
        {orders.length > 0 ? (
          orders.map(
            (item, i) =>
              item.active && (
                <div className="dash-row">
                  <div className="date">
                    <p className="time">
                      {" "}
                      {item.time ? item.time.slice(10).slice(1, 6) : ""}
                    </p>
                    <p className="day-month">
                      {item.time ? item.time.slice(0, 10) : ""}
                    </p>
                  </div>
                  <div className="currency">
                    <p className="currency-type">{item.stockName}</p>
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
                        ? new Intl.NumberFormat("en-US")
                            .format(item.stockAmount)
                            .slice(0, 8)
                        : ""}
                    </p>
                    <p className="currency">
                      {item.profitLoss ? "profit" : "loss"}
                    </p>
                  </div>
                </div>
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

      <div className="dash-tab-sec" dash-tab-sec="opened-position">
        {history.length > 0 ? (
          history.map((item) => (
            <div className="dash-row">
              <div className="date">
                <p className="time">
                  {" "}
                  {item.scheduledTime
                    ? item.scheduledTime.slice(10).slice(1, 6)
                    : ""}
                </p>
                <p className="day-month">
                  {item.scheduledTime ? item.scheduledTime.slice(0, 10) : ""}
                </p>
              </div>
              <div className="currency">
                <p className="currency-type">{item.market}</p>
                <p className="cad"> {item.assets ? item.assets : ""}</p>
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
                    ? new Intl.NumberFormat("en-US")
                        .format(item.amount)
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
        {history.length > 0 ? (
          history.map((item, i) => (
            <div className="dash-row">
              <div className="date">
                <p className="time">
                  {" "}
                  {item.scheduledTime
                    ? item.scheduledTime.slice(10).slice(1, 6)
                    : ""}
                </p>
                <p className="day-month">
                  {item.scheduledTime ? item.scheduledTime.slice(0, 10) : ""}
                </p>
              </div>
              <div className="currency">
                <p className="currency-type">{item.market}</p>
                <p className="cad"> {item.assets ? item.assets : ""}</p>
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
                    ? new Intl.NumberFormat("en-US")
                        .format(item.amount)
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
  );
};

export default OrderBook;
