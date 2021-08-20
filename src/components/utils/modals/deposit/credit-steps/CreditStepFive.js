import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CreditStepFive = (props) => {
  const {
    creditStepFive,
    goBackToCreditStepFour,
    cardDetails,
    setShowCredit,
    processDeposit,
  } = props;

  return (
    creditStepFive && (
      <div className="process dash-row dash-row-centralized">
        <div className="text-left w-100">
          <Button onClick={goBackToCreditStepFour} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            margin: "5%",
          }}
        >
          <img
            style={{
              textAlign: "center",
              width: "30%",
              margin: "5%",
            }}
            src="https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif"
            alt="Check Mark"
          />
        </div>
        <div
          style={{
            textAlign: "left",
            margin: "10px 0",
            color: "#fff",
          }}
        >
          <div className="d-flex mt-2">
            <div>
              <p>
                The Account Department will Process Your Payments and credit
                your Account in a short While
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2" style={{ color: "#aaa" }}>
          N:B - When topping up your balance, please note: Per our fraud control
          guidelines, some transactions (especially those involving third-party
          payments) may require additional verification. In some cases, we’ll
          need phone verification for the card holder.
        </p>
        <div className="text-center w-100">
          <div className="btn pr-0">
            <button
              className="mb-4"
              onClick={() => {
                processDeposit(cardDetails);
                setShowCredit(false);
              }}
              style={{
                padding: "15px 30px",
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

CreditStepFive.propTypes = {
  creditStepFive: PropTypes.bool.isRequired,
  goBackToCreditStepFour: PropTypes.func.isRequired,
  setShowCredit: PropTypes.func.isRequired,
  processDeposit: PropTypes.func.isRequired,
  cardDetails: PropTypes.object.isRequired,
};

export default CreditStepFive;
