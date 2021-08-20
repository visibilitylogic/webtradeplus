import PropTypes from "prop-types";
import { Button, message } from "antd";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";

const VerificationStepFour = (props) => {
  const {
    setVerStepThree,
    setVerStepFour,
    verificationId,
    setDocumentType,
    setPassportPhoto,
    setAddressProof,
    formDetails,
    addressProof,
    passportPhoto,
    documentType,
    setVerStepFive,
  } = props;

  const { requestVerification } = useActions();

  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.profile);

  const { fullName, address, phoneNumber } = formDetails;

  const handleSubmitVerification = (e) => {
    e.preventDefault();

    if (error) {
      message.error("Your request was not successful");
    } else {
      requestVerification({
        id: user._id,
        name: fullName,
        address,
        phoneNumber,
        documentName: verificationId,
        documentFile: documentType,
        Img: passportPhoto,
        proofDocument: addressProof,
      });
      message.success("Your verification request was successfully made");
      setVerStepFour(false);
    }
    setVerStepFive(true);
  };

  const handleVerificationDocument = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setDocumentType(reader.result);
      };
    }
  };

  const goBackToStepThree = () => {
    setVerStepThree(true);
    setVerStepFour(false);
  };

  const handleImagePassport = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setPassportPhoto(reader.result);
      };
    }
  };

  const handleDocumentProof = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAddressProof(reader.result);
      };
    }
  };
  return (
    <div
      className="container verification"
      id="container4"
      style={{ background: "#141621", display: "block" }}
    >
      <div className="text-left w-100" style={{ marginBottom: "15px" }}>
        <Button onClick={goBackToStepThree} className="back-button">
          &#8592;&nbsp; Previous
        </Button>
      </div>
      <center>
        <h4>STEP 2: UPLOAD YOUR {verificationId.toUpperCase()}</h4>
        <form>
          <div className="form-box">
            <label>{verificationId.toUpperCase()} document</label>
            <input required type="file" onChange={handleVerificationDocument} />
          </div>
          <h4>AND THIS DOCUMENTS</h4>
          <div className="form-box">
            <label>Proof of address(e.g. Utility Bill)</label>
            <input required type="file" onChange={handleDocumentProof} />
          </div>
          <div className="form-box">
            <label>Image Passport Photograph</label>
            <input required type="file" onChange={handleImagePassport} />
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              style={{ color: "white" }}
              className="dash-btn"
              type="button"
              onClick={handleSubmitVerification}
            >
              Submit
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};

VerificationStepFour.propTypes = {
  setVerStepThree: PropTypes.func.isRequired,
  setVerStepFour: PropTypes.func.isRequired,
  verificationId: PropTypes.string.isRequired,
  setDocumentType: PropTypes.func.isRequired,
  setPassportPhoto: PropTypes.func.isRequired,
  setAddressProof: PropTypes.func.isRequired,
  formDetails: PropTypes.object.isRequired,
  addressProof: PropTypes.string.isRequired,
  passportPhoto: PropTypes.string.isRequired,
  documentType: PropTypes.string.isRequired,
  setVerStepFive: PropTypes.func.isRequired,
};

export default VerificationStepFour;
