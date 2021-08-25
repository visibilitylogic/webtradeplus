import PropTypes from "prop-types";

const CryptoStepSix = ({ cryptoStepSix, setCryptoStepSix }) => {
  return (
    cryptoStepSix && (
      <div id="step-three">
        <div
          className="levC1"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            left: 0,
            right: 0,
          }}
        >
          <div className="levHeader" style={{ padding: "3%" }}>
            Completed
            <span
              className="close"
              onClick={() => setCryptoStepSix(false)}
              style={{
                top: "30px",
                right: "15px",
              }}
            >
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>close</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
          </div>
          Your deposit will be made once the transaction is confirmed by the
          accounting department. Thanks
        </div>
      </div>
    )
  );
};

CryptoStepSix.propTypes = {
  cryptoStepSix: PropTypes.bool.isRequired,
  setCryptoStepSix: PropTypes.func.isRequired,
};

export default CryptoStepSix;
