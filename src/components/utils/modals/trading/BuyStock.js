import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BuyStockModal = (props) => {
  const {
    assetQuantity,
    setProfitAmount,
    setDisableTakeProfit,
    disableTakeProfit,
    setDisableStopLoss,
    disableStopLoss,
    setStopLossAmount,
    setBuyStock,
    profitAmount,
    handleStockPurchase,
    stopLossAmount,
  } = props;

  const { currentSelectedStock } = useSelector((state) => state.stock);
  return (
    <form
      // onMouseEnter={() => {
      //   this.setState({
      //     data: {
      //       ...this.state.data,
      //       ...{ tag: "buy" },
      //       ...{ stockName: this.state.setView.symbol },
      //       ...{
      //         stockAmount: this.state.num / this.state.setView.price,
      //         ...{
      //           buyW: this.getRate(
      //             this.state.setView.symbol ? this.state.setView.symbol : ""
      //           ),
      //         },
      //         ...{ unit: this.state.unitP },
      //       },
      //     },
      //   });
      // }}
      onSubmit={handleStockPurchase}
    >
      <h6>CONFIRMATION</h6>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Unit price</span>
        </div>
        <div className="split moved">
          <span>{currentSelectedStock.price} $</span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Investment</span>
        </div>
        <div className="split moved">
          <span>
            {currentSelectedStock.price
              ? ((assetQuantity / currentSelectedStock.price) * 10)
                  .toString()
                  .slice(0, 8)
              : ""}{" "}
            {currentSelectedStock.symbol}
            {/* {currentSelectedStock.price
              ? currentSelectedStock.price.toString().slice(0, 8)
              : ""}{" "}
            {currentSelectedStock.symbol} */}
          </span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>{currentSelectedStock.symbol} Quantity</span>
        </div>
        <div className="split moved">
          <span>{assetQuantity}</span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Leverage</span>
        </div>
        <div className="split moved">
          <span>1:10</span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Margin Required</span>
        </div>
        <div className="split moved">
          <span>
            {currentSelectedStock.price
              ? currentSelectedStock.price.toString().slice(0, 8)
              : ""}{" "}
            {currentSelectedStock.symbol}
          </span>
        </div>
      </div>
      <div
        className="dash-row dash-row-centralized"
        style={{ marginBottom: "-26px" }}
      >
        <div className="split">
          <span>Take Profit</span>
        </div>
        <div className="split moved">
          <div className="dash-row">
            <div className="switish">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!disableTakeProfit}
                  onChange={() => setDisableTakeProfit((prev) => !prev)}
                />
                <span className="slider round" />
              </label>
              <input
                type="number"
                name="profit"
                min={1}
                max={5000000000}
                placeholder="+ 100"
                disabled={disableTakeProfit}
                value={profitAmount}
                onChange={(e) => setProfitAmount(e.target.value)}
                style={{ color: !disableTakeProfit ? "#1a202d" : undefined }}
              />
            </div>
            <div>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="dash-row dash-row-centralized"
        style={{ marginTop: "15%" }}
      >
        <div className="split">
          <span>Stop Loss</span>
        </div>
        <div className="split moved">
          <div className="dash-row">
            <div className="switish">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!disableStopLoss}
                  onChange={() => setDisableStopLoss((prev) => !prev)}
                />
                <span className="slider round" />
              </label>{" "}
              <input
                type="number"
                name="loss"
                max={0}
                placeholder="-100"
                disabled={disableStopLoss}
                value={stopLossAmount}
                onChange={(e) => setStopLossAmount(e.target.value)}
                style={{ color: !disableStopLoss ? "#1a202d" : undefined }}
              />
            </div>
            <div>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Commission</span>
        </div>
        <div className="split moved">
          <span>
            2.00% ={" "}
            {currentSelectedStock.price
              ? currentSelectedStock.price.toString().slice(0, 8)
              : ""}{" "}
            {currentSelectedStock.symbol}
          </span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized highlighted">
        <div className="split">
          <span>TRADE</span>
        </div>
        <div className="split moved">
          <span>
            {currentSelectedStock.price
              ? currentSelectedStock.price.toString().slice(0, 8)
              : ""}{" "}
            USD
          </span>
        </div>
      </div>
      <div className="dash-row">
        <button className="close1">Confirm buying</button>
      </div>
      <span className="close" onClick={() => setBuyStock(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>
    </form>
  );
};

BuyStockModal.propTypes = {
  assetQuantity: PropTypes.number,
  setProfitAmount: PropTypes.func.isRequired,
  setDisableTakeProfit: PropTypes.func.isRequired,
  disableTakeProfit: PropTypes.bool.isRequired,
  setDisableStopLoss: PropTypes.func.isRequired,
  disableStopLoss: PropTypes.bool.isRequired,
  setStopLossAmount: PropTypes.func.isRequired,
  setBuyStock: PropTypes.func.isRequired,
  handleStockPurchase: PropTypes.func.isRequired,
  profitAmount: PropTypes.string.isRequired,
  stopLossAmount: PropTypes.string.isRequired,
};

export default BuyStockModal;
