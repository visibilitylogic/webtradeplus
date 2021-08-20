import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useActions } from "../../../../hooks/useActions";

const CryptoStepOne = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { depositAmount } = useSelector((state) => state.profile);

  const { setDepositAmount } = useActions();

  const { web, cryptoStepOne, handleCryptoStepOne } = props;
  return (
    cryptoStepOne && (
      <div id="step-one" style={{ marginTop: "15%" }}>
        <h5 style={{ marginBottom: "15%", color: "white" }}>
          Please Specify the amount you would like to deposit into your account
          through Bitcoin
        </h5>
        <div
          className="process dash-row dash-row-centralized"
          style={{
            justifyContent: "space-around",
            marginTop: "-30px",
          }}
        >
          <Col md={6} className="px-0">
            <input
              id="depositAmount"
              type="number"
              min={0}
              name="btcAmount"
              value={depositAmount}
              placeholder="Enter Amount"
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
                  {`${user.currency} ${new Intl.NumberFormat("en-US").format(
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
                  {`${user.currency}${new Intl.NumberFormat("en-US").format(
                    web.BTCAmount3 === null ? 0 : web.BTCAmount3
                  )}`}
                </button>
              </div>
            </div>
          </Col>
        </div>
        <div className="process">
          <div className="btn">
            <button
              onClick={handleCryptoStepOne}
              type="button"
              disabled={!depositAmount || parseFloat(depositAmount) === 0}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p style={{ color: "#fff" }}>
            Need to buy bitcoin?
            <a href="#!" target="_blank" rel="noreferrer">
              Click here
            </a>
          </p>
        </div>
        <br />
        <div
          className="mt-5 d-flex align-items-center justify-content-between w-75"
          style={{ margin: "0 auto" }}
        >
          <a href={web.depositeImg1Link} target="_blank" rel="noreferrer">
            <img
              src={web.depositeImg1}
              alt="account img"
              style={{ width: "65px" }}
            />
          </a>
          <a href={web.depositeImg2Link} target="_blank" rel="noreferrer">
            <img
              src={web.depositeImg2}
              alt="account img"
              style={{ width: "65px" }}
            />
          </a>
          <a href={web.depositeImg3Link} target="_blank" rel="noreferrer">
            <img
              src={web.depositeImg3}
              alt="account img"
              style={{ width: "65px" }}
            />
          </a>
        </div>
      </div>
    )
  );
};

CryptoStepOne.propTypes = {
  web: PropTypes.object,
  cryptoStepOne: PropTypes.bool.isRequired,
  handleCryptoStepOne: PropTypes.func.isRequired,
};

export default CryptoStepOne;
