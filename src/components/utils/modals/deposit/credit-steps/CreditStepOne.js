import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import mastercard from "../../../../../assets/images/mastercard.svg";
import visa from "../../../../../assets/images/visa.png";
import discover from "../../../../../assets/images/discover-network.jpeg";
import amex from "../../../../../assets/images/american-express.png";
import { useActions } from "../../../../hooks/useActions";

import { Col } from "react-bootstrap";

const CreditStepOne = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { depositAmount } = useSelector((state) => state.profile);

  const { setDepositAmount } = useActions();

  const { creditStepOne, web, handleCreditStepOne } = props;

  return (
    creditStepOne && (
      <div
        className="process dash-row dash-row-centralized"
        style={{
          justifyContent: "space-around",
          marginTop: "15%",
        }}
      >
        <h5 style={{ marginBottom: "15%", color: "white" }}>
          Please Specify the amount you would like to deposit into your account
          using your Credit Card
        </h5>
        {/* <div
            className="currency"
            style={{ display: "none" }}
          >
            <select
              value={cardCurrency}
              onChange={(e) => {
                setCardCurrency(e.target.value);
              }}
            >
              <option value="USD">
                {props.user.user.user.currency}
              </option>
            </select>
          </div> */}

        <div
          className="process dash-row dash-row-centralized"
          style={{
            justifyContent: "space-around",
            marginTop: "-30px",
            width: "100%",
          }}
        >
          <Col md={6} className="px-0">
            <input
              id="depositAmount"
              type="number"
              name="digit"
              placeholder="Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </Col>
          <Col md={6} className="pr-0">
            <div className="d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="btn-amount"
                  onClick={() => setDepositAmount(web.BTCAmount1)}
                >
                  {`${user.currency}${web.BTCAmount1}`}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-amount"
                  onClick={() => setDepositAmount(web.BTCAmount2)}
                >
                  {`${user.currency}${new Intl.NumberFormat("en-US").format(
                    web.BTCAmount2
                  )}`}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-amount"
                  onClick={() => setDepositAmount(web.BTCAmount3)}
                >
                  {`${user.currency} ${new Intl.NumberFormat("en-US").format(
                    web.BTCAmount3 === null ? 0 : web.BTCAmount3
                  )}`}
                </button>
              </div>
            </div>
          </Col>
        </div>
        <div className="process" style={{ display: "block", width: "100%" }}>
          <div className="btn">
            <button
              disabled={!depositAmount || depositAmount <= 0}
              onClick={handleCreditStepOne}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
        <br />
        <div className="mt-5 d-flex align-items-center justify-content-between w-75">
          <div>
            <img src={visa} alt="visa card logo" style={{ width: "65px" }} />
          </div>
          <div>
            <img
              src={mastercard}
              alt="master card logo"
              style={{ width: "65px" }}
            />
          </div>
          <div>
            <img
              src={discover}
              alt="discover network logo"
              style={{ width: "65px" }}
            />
          </div>
          <div>
            <img
              src={amex}
              alt="american express logo"
              style={{ width: "65px" }}
            />
          </div>
        </div>
      </div>
    )
  );
};

CreditStepOne.propTypes = {
  creditStepOne: PropTypes.bool.isRequired,
  web: PropTypes.shape({}).isRequired,
  handleCreditStepOne: PropTypes.func.isRequired,
};

export default CreditStepOne;
