import PropTypes from "prop-types";
import card from "../../../../assets/images/card.png";

const VerificationStepOne = ({ setVerStepOne, setVerStepTwo }) => {
  const handleVerificationStepOne = () => {
    setVerStepOne(false);
    setVerStepTwo(true);
  };
  return (
    <div
      className="container"
      id="container1"
      style={{ padding: "50px 0", background: "#141621" }}
    >
      <center>
        <h4>IDENTITY VERIFICATION REQUIRED</h4>
        <img
          style={{
            width: 150,
            display: "block",
            margin: "0 auto",
          }}
          src={card}
          alt="card"
        />
        <button
          className="dash-btn"
          style={{ borderRadius: 0, color: "white" }}
          onClick={handleVerificationStepOne}
        >
          START YOUR VERIFICATION
        </button>
        <small
          style={{ display: "block", marginTop: 15 }}
          className="text-fade"
        >
          All information will be stored safely and not redistribuate. Due to
          the GPRD, all information can be deleted on your needs.
        </small>
      </center>
    </div>
  );
};

VerificationStepOne.propTypes = {
  setVerStepTwo: PropTypes.func.isRequired,
  setVerStepOne: PropTypes.func.isRequired,
};

export default VerificationStepOne;
