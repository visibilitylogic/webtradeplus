import { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "react-bootstrap";
import CryptoStepOne from "./crypto-steps/CryptoStepOne";
import CryptoStepTwo from "./crypto-steps/CryptoStepTwo";
import CryptoStepThree from "./crypto-steps/CryptoStepThree";
import CryptoStepFour from "./crypto-steps/CryptoStepFour";

const CryptoModal = ({ web, setShowCredit, setCryptoStepFive }) => {
  const [cryptoStepOne, setCryptoStepOne] = useState(true);
  const [cryptoStepTwo, setCryptoStepTwo] = useState(false);
  const [cryptoStepThree, setCryptoStepThree] = useState(false);
  const [cryptoStepFour, setCryptoStepFour] = useState(false);

  const handleCryptoStepOne = () => {
    setCryptoStepOne(false);
    setCryptoStepTwo(true);
  };

  const handleCryptoStepTwo = () => {
    setCryptoStepTwo(false);
    setCryptoStepThree(true);
  };

  const handleCryptoStepThree = () => {
    setCryptoStepThree(false);
    setCryptoStepFour(true);
  };

  const handleCryptoStepFour = () => {
    setCryptoStepFour(false);
    setShowCredit(false);
    setCryptoStepFive(true);
  };

  const goBackToCryptoStepOne = () => {
    setCryptoStepTwo(false);
    setCryptoStepOne(true);
  };

  const goBackToCryptoStepTwo = () => {
    setCryptoStepThree(false);
    setCryptoStepTwo(true);
  };

  const goBackToCryptoStepThree = () => {
    setCryptoStepThree(true);
    setCryptoStepFour(false);
  };

  return (
    web &&
    web.bitCoinStatus && (
      <Tab.Pane eventKey="crypto">
        <div className="crypto-tab">
          <CryptoStepOne
            web={web}
            cryptoStepOne={cryptoStepOne}
            handleCryptoStepOne={handleCryptoStepOne}
          />
          <CryptoStepTwo
            web={web}
            cryptoStepTwo={cryptoStepTwo}
            goBackToCryptoStepOne={goBackToCryptoStepOne}
            handleCryptoStepTwo={handleCryptoStepTwo}
          />
          <CryptoStepThree
            cryptoStepThree={cryptoStepThree}
            goBackToCryptoStepTwo={goBackToCryptoStepTwo}
            handleCryptoStepThree={handleCryptoStepThree}
          />
          <CryptoStepFour
            cryptoStepFour={cryptoStepFour}
            handleCryptoStepFour={handleCryptoStepFour}
            goBackToCryptoStepThree={goBackToCryptoStepThree}
          />
        </div>
      </Tab.Pane>
    )
  );
};

CryptoModal.propTypes = {
  web: PropTypes.object,
  setShowCredit: PropTypes.func.isRequired,
  setCryptoStepFive: PropTypes.func.isRequired,
};

export default CryptoModal;
