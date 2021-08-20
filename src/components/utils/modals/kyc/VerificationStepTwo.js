import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const VerificationStepTwo = ({
  setVerStepOne,
  setVerStepTwo,
  setVerStepThree,
  formDetails,
  handleFormDetails,
}) => {
  const { user } = useSelector((state) => state.auth);

  const { fullName, address, phoneNumber } = formDetails;

  const handleVerificationStepTwo = () => {
    setVerStepTwo(false);
    setVerStepThree(true);
  };

  return (
    <div
      className="container verification"
      id="container2"
      style={{ background: "#141621", display: "block" }}
    >
      <center>
        <h4>STEP 1: IDENTITY</h4>
        <form>
          <div className="form-box">
            <label>FULL NAME</label>
            <input
              type="text"
              required
              name="fullName"
              placeholder={`${user.name} ${user.lastname}`}
              value={fullName}
              onChange={handleFormDetails}
            />
          </div>
          <div className="form-box">
            <label>ADDRESS</label>
            <input
              required
              type="text"
              name="address"
              value={address}
              onChange={handleFormDetails}
            />
          </div>
          <div className="form-box">
            <label>PHONE NUMBER</label>
            <input
              required
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleFormDetails}
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              href="#"
              style={{ color: "white" }}
              className="dash-btn"
              disabled={!fullName || !address || !phoneNumber}
              onClick={handleVerificationStepTwo}
            >
              Next
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};

VerificationStepTwo.propTypes = {
  setVerStepOne: PropTypes.func.isRequired,
  setVerStepTwo: PropTypes.func.isRequired,
  setVerStepThree: PropTypes.func.isRequired,
  formDetails: PropTypes.object.isRequired,
  handleFormDetails: PropTypes.func.isRequired,
};

export default VerificationStepTwo;
