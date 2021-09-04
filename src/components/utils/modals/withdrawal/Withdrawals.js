import { useState, useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { message } from "antd";
import PropTypes from "prop-types";
import { tradesMargin } from "./../../../../helpers/getOpenTradesMargin";

const Withdrawals = ({ setWithdraw, country }) => {
  const [widthdrawalMethod, setWidthdrawalMethod] = useState("");
  const [withdrawalDetails, setWithdrawalDetails] = useState({});

  const { webData } = useSelector((state) => state.web);
  const {
    withdrawalAmount,
    bankPaymentMethods,
    cryptoPaymentMethods,
    openTrades,
  } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const balance = user && user.wallet + user.bonus;

  const openTradesMargin = tradesMargin(openTrades);

  const {
    processWithdrawal,
    setWithdrawalAmount,
    getBankPaymentMethod,
    getCryptoPaymentMethod,
  } = useActions();

  const percentToGet = 3;
  const percent = (percentToGet * withdrawalAmount) / 100;
  const amount = withdrawalAmount - percent;

  const handleProcessWithdrawal = () => {
    if (withdrawalAmount > balance) {
      message.error("Insufficient withdrawal Amount");
    } else {
      processWithdrawal({
        id: user._id,
        currency: user.currency,
        fees: percent,
        method: widthdrawalMethod,
        amount: amount,
        country: user.country,
        methodDetails: withdrawalDetails,
      });
      message.success("Your withdrawal request was successful");
    }

    setWithdraw(false);
  };

  const addComma = (value) => {
    if (value !== null && value !== undefined) {
      return new Intl.NumberFormat("en-US").format(value);
    }
    return;
  };

  useEffect(() => {
    getBankPaymentMethod(user._id);
    getCryptoPaymentMethod(user._id);
  }, []);

  return (
    <div className="withdraw-modal">
      <div className="header">Ask a withdraw</div>
      <div className="dash-row">
        <div className="sidebar">
          <div className="links">
            <a href="#!">
              {/* <span className="font-size-15 font-weight-bold"></span> */}
              <span className="font-size-11">
                {user && user.currency === "USD" ? "$" : user && user.currency}
                {`${new Intl.NumberFormat("en-US")
                  .format(balance - openTradesMargin)
                  .slice(0, 9)}`}
              </span>
            </a>
          </div>
        </div>
        <div className="content">
          <div className="range">
            <center>
              <h3 className="text-uppercase font-weight-normal">
                <span
                  style={{
                    backgroundColor: "#29c359",
                    color: "#fff",
                    padding: "7px 12px",
                    display: "inline-block",
                  }}
                >
                  {user.currency}
                </span>{" "}
                Withdraw
              </h3>
            </center>
            <div className="dash-row">
              <input
                style={{
                  width: "60em",
                  border: "none",
                  padding: ".5em",
                  color: "black",
                }}
                type="number"
                min={webData.minWithdrawalAmount}
                max={webData.maxWithdrawalAmount}
                value={withdrawalAmount}
                name="amtWithdraw"
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </div>
            <div className="dash-row" style={{ color: "white" }}>
              <small style={{ paddingRight: "2em" }}>
                Minimum: {""} {addComma(webData.minWithdrawalAmount)}
              </small>
              <small>
                Maximum: {""} {addComma(webData.maxWithdrawalAmount)}{" "}
              </small>
            </div>
            <div className="dash-row" style={{ marginTop: "30px" }}>
              <div className="withdraw-card">
                <span className="title">AMOUNT</span>
                <span>{addComma(withdrawalAmount)}</span>
              </div>
              <div className="withdraw-card">
                <span className="title">FEES (3.00 %)</span>
                <span>
                  {user && user.currency === "USD"
                    ? "$"
                    : user && user.currency}
                  {addComma(percent)}
                </span>
              </div>
              <div className="withdraw-card total">
                <span className="title">TOTAL</span>
                <span>
                  {user && user.currency === "USD"
                    ? "$"
                    : user && user.currency}
                  {withdrawalAmount > 0 ? addComma(amount.toFixed(2)) : 0}
                </span>
              </div>
            </div>
            <div className="withdraw-method">
              <h4>CHOOSE RECEIVER ACCOUNT</h4>
              <select
                value={widthdrawalMethod}
                onChange={(e) => setWidthdrawalMethod(e.target.value)}
              >
                <option>Choose your method</option>

                {(bankPaymentMethods.length > 0 ||
                  cryptoPaymentMethods.length) &&
                  [...bankPaymentMethods, ...cryptoPaymentMethods].map(
                    (payment, index) => (
                      <option
                        key={index}
                        value={index}
                        onClick={() => setWithdrawalDetails(payment)}
                      >
                        {payment.bankName || payment.cryptoCurrencyName}
                      </option>
                    )
                  )}
              </select>
              <button onClick={handleProcessWithdrawal} className="btn">
                Validate
              </button>
            </div>
          </div>
          <div className="no-withdrawal">
            <span>YOU NEED TO HAVE AT LEAST 200 USD</span>
          </div>
        </div>
      </div>
      <span className="close" onClick={() => setWithdraw(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
    </div>
  );
};

Withdrawals.propTypes = {
  setWithdraw: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
};

export default Withdrawals;
