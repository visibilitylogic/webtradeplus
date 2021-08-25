import PropTypes from "prop-types";
import { Button } from "antd";

const CryptoStepFive = ({
  cryptoStepFive,
  handleCryptoStepFive,
  goBackToCryptoStepFour,
}) => {
  return (
    cryptoStepFive && (
      <div>
        <div className="text-left">
          <Button onClick={goBackToCryptoStepFour} className="back-button">
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
            alt="spinner gif"
            style={{
              textAlign: "center",
              width: "30%",
              marginTop: "5%",
            }}
            src="https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif"
          />
        </div>
        <div
          style={{
            textAlign: "left",
            margin: "10px 0",
            color: "#fff",
          }}
        >
          <div className="d-flex">
            <div>
              <p>
                Your account will be credited Once your Bitcoin Transfer has
                been confirmed
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4" style={{ color: "#aaa" }}>
          It might take up to an hour for funds to become available in your
          account. On rare occasions, it may take up to 24 hours for the amount
          to be credited.
        </p>
        <div className="text-center">
          <Button
            className="mb-4"
            style={{
              width: "39%",
              padding: "15px 30px",
            }}
            onClick={handleCryptoStepFive}
          >
            Exit
          </Button>
        </div>
      </div>
    )
  );
};

CryptoStepFive.propTypes = {
  cryptoStepFive: PropTypes.bool.isRequired,
  goBackToCryptoStepFour: PropTypes.func.isRequired,
  handleCryptoStepFive: PropTypes.func.isRequired,
};

export default CryptoStepFive;
