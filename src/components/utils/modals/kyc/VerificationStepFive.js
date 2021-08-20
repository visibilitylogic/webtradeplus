import PropTypes from "prop-types";
import watch from "../../../../assets/images/stopwatch.webp";

const VerificationStepFive = ({ setVerStepOne, setOpenVerification }) => {
  const handleVerStepFive = () => {
    setVerStepOne(false);
    setOpenVerification(true);
  };
  return (
    <div
      className="container"
      id="container5"
      style={{ background: "#141621", display: "block" }}
    >
      <center>
        <h4>YOUR IDENTITY IS IN VERIFICATION</h4>
        <img
          style={{
            width: 150,
            display: "block",
            margin: "0 auto",
          }}
          src={watch}
          alt="stop watch"
        />
        <small
          style={{ display: "block", marginTop: 15 }}
          className="text-fade"
        >
          Your identity is in verification, it can take up to 24h. You will
          receive an email when the verification is completed.
        </small>
        <button
          className="dash-btn"
          style={{ borderRadius: 0, color: "white" }}
          onClick={handleVerStepFive}
        >
          BACK TO THE APP
        </button>
      </center>
    </div>
  );
};

VerificationStepFive.propTypes = {
  setVerStepOne: PropTypes.func.isRequired,
  setOpenVerification: PropTypes.func.isRequired,
};

export default VerificationStepFive;
