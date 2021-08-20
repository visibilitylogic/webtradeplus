import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import nortonsecure from "../../../../../assets/images/norton-secure.png";
import mcafeesecure from "../../../../../assets/images/mcafee-secure.jpeg";
import securessl from "../../../../../assets/images/mcafee-secure.jpeg";

const CreditStepTwo = (props) => {
  const {
    cardInput,
    creditStepTwo,
    goBackToCreditStepOne,
    handleCreditStepTwo,
    handleCardInput,
  } = props;

  // handles credit card month limit
  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  const checkMaxLength = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  // handles credit card month limit
  const handleCardExpiry = (val) => {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  };
  return (
    creditStepTwo && (
      <div className="process dash-row dash-row-centralized">
        <div className="text-left w-100">
          <Button onClick={goBackToCreditStepOne} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <div className="credit-card dash-row">
          <div className="front">
            <div className="dtls">
              <NumberFormat
                format="#### #### #### ####"
                name="cardNumber"
                placeholder="Card number"
                className="card-number"
                value={cardInput.cardNumber}
                onChange={handleCardInput}
              />
              <div
                className="dash-row dash-row-centralized"
                style={{ justifyContent: "flex-end" }}
              >
                <div className="valid-thru">
                  <span className="text-uppercase">
                    Valid
                    <br />
                    thru
                  </span>
                </div>
                <div className="mm">
                  <NumberFormat
                    format={handleCardExpiry}
                    className="short"
                    name="cardExpiryDate"
                    placeholder="MM/YY"
                    value={cardInput.cardExpiryDate}
                    onChange={handleCardInput}
                  />
                </div>
                {/* <div className="slash">
                 <span>/</span>
               </div>
               <div className="yy">
                 <input
                   className="short"
                   type="number"
                   minLength={0}
                   maxLength={4}
                   onInput={checkMaxLength}
                   name="number"
                   placeholder="YY"
                   value={cardYear}
                   onChange={(e) => {
                     setCardYear(e.target.value);
                   }}
                 />
               </div> */}
              </div>
              <input
                className="card-holder"
                type="text"
                name="cardHolderName"
                placeholder="Card holder"
                value={cardInput.cardHolderName}
                onChange={handleCardInput}
              />
            </div>
          </div>
          <div className="reverse">
            <div className="stripe" />
            <div className="cvc">
              <input
                minLength={0}
                maxLength={3}
                onInput={checkMaxLength}
                className="short"
                type="number"
                name="cardCvv"
                placeholder="CVC"
                value={cardInput.cardCvv}
                onChange={handleCardInput}
              />
              <small className="font-size-10">
                The last three digits on the reverse
              </small>
            </div>
          </div>
        </div>
        <div className="text-right w-100 mt-4">
          <div className="btn">
            <button
              disabled={
                !cardInput.cardNumber ||
                !cardInput.cardHolderName ||
                !cardInput.cardExpiryDate ||
                !cardInput.cardCvv
              }
              onClick={handleCreditStepTwo}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-5 d-flex align-items-center justify-content-between w-75 mx-auto">
          <div>
            <img
              src={nortonsecure}
              alt="norton secure logo"
              style={{ width: "65px" }}
            />
          </div>
          <div>
            <img
              src={mcafeesecure}
              alt="mcafee secure logo"
              style={{ width: "65px" }}
            />
          </div>
          <div>
            <img
              src={securessl}
              alt="secure ssl logo"
              style={{ width: "65px" }}
            />
          </div>
        </div>
      </div>
    )
  );
};

CreditStepTwo.propTypes = {
  creditStepTwo: PropTypes.bool.isRequired,
  goBackToCreditStepOne: PropTypes.func.isRequired,
  handleCreditStepTwo: PropTypes.func.isRequired,
  cardInput: PropTypes.object.isRequired,
  handleCardInput: PropTypes.func.isRequired,
};

export default CreditStepTwo;
