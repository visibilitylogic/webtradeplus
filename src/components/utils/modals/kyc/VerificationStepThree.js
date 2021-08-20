import PropTypes from "prop-types";
import { Button } from "antd";
const VerificationStepThree = ({
  setVerStepThree,
  setVerStepTwo,
  setVerStepFour,
  setVerificationId,
}) => {
  const goBackToVerStepTwo = () => {
    setVerStepThree(false);
    setVerStepTwo(true);
  };

  const handleVerStepThree = (verId) => {
    setVerificationId(verId);
    setVerStepThree(false);
    setVerStepFour(true);
  };
  return (
    <div
      className="container verification"
      id="container3"
      style={{ background: "#141621", display: "block" }}
    >
      <div className="text-left w-100" style={{ marginBottom: "15px" }}>
        <Button onClick={goBackToVerStepTwo} className="back-button">
          &#8592;&nbsp; Previous
        </Button>
      </div>
      <center>
        <h4>SELECT YOUR DOCUMENT</h4>
        <div onClick={() => handleVerStepThree("Passport")}>
          <div className="option">Passport</div>
        </div>

        <div onClick={() => handleVerStepThree("Driving license")}>
          <div className="option">Driving license</div>
        </div>

        <div onClick={() => handleVerStepThree("ID Card")}>
          <div className="option">ID Card</div>
        </div>
      </center>
    </div>
  );
};

VerificationStepThree.propTypes = {
  setVerStepThree: PropTypes.func.isRequired,
  setVerStepTwo: PropTypes.func.isRequired,
  setVerStepFour: PropTypes.func.isRequired,
  setVerificationId: PropTypes.func.isRequired,
};

export default VerificationStepThree;
