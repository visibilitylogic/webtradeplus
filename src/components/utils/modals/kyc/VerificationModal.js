import { useState } from "react";
import PropTypes from "prop-types";
import VerificationStepOne from "./VerificationStepOne";
import VerificationStepThree from "./VerificationStepThree";
import VerificationStepTwo from "./VerificationStepTwo";
import VerificationStepFour from "./VerificationStepFour";
import useFormInput from "../../../hooks/useFormInput";
import VerificationStepFive from "./VerificationStepFive";

const VerificationModal = ({ setOpenVerification }) => {
  const [verStepOne, setVerStepOne] = useState(true);
  const [verStepTwo, setVerStepTwo] = useState(false);
  const [verStepThree, setVerStepThree] = useState(false);
  const [verStepFour, setVerStepFour] = useState(false);
  const [verStepFive, setVerStepFive] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [passportPhoto, setPassportPhoto] = useState("");
  const [addressProof, setAddressProof] = useState("");

  const [formDetails, handleFormDetails] = useFormInput({
    fullName: "",
    address: "",
    phoneNumber: "",
  });

  return (
    <div className="verification-modal">
      {verStepOne && (
        <VerificationStepOne
          setVerStepTwo={setVerStepTwo}
          setVerStepOne={setVerStepOne}
        />
      )}

      {verStepTwo && (
        <VerificationStepTwo
          setVerStepTwo={setVerStepTwo}
          setVerStepOne={setVerStepOne}
          setVerStepThree={setVerStepThree}
          formDetails={formDetails}
          handleFormDetails={handleFormDetails}
        />
      )}

      {verStepThree && (
        <VerificationStepThree
          setVerStepFour={setVerStepFour}
          setVerStepThree={setVerStepThree}
          setVerStepTwo={setVerStepTwo}
          setVerificationId={setVerificationId}
        />
      )}

      {verStepFour && (
        <VerificationStepFour
          formDetails={formDetails}
          addressProof={addressProof}
          documentType={documentType}
          passportPhoto={passportPhoto}
          setAddressProof={setAddressProof}
          setDocumentType={setDocumentType}
          setPassportPhoto={setPassportPhoto}
          setVerStepFour={setVerStepFour}
          verificationId={verificationId}
          setVerStepThree={setVerStepThree}
          setVerStepFive={setVerStepFive}
        />
      )}

      {verStepFive && (
        <VerificationStepFive
          setOpenVerification={setOpenVerification}
          setVerStepOne={setVerStepOne}
        />
      )}

      <span className="close" onClick={() => setOpenVerification(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>cross</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>
    </div>
  );
};

VerificationModal.propTypes = {
  setOpenVerification: PropTypes.func.isRequired,
};

export default VerificationModal;
