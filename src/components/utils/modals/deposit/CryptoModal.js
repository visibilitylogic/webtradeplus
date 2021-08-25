import { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "react-bootstrap";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import CryptoStepOne from "./crypto-steps/CryptoStepOne";
import CryptoStepTwo from "./crypto-steps/CryptoStepTwo";
import CryptoStepThree from "./crypto-steps/CryptoStepThree";
import CryptoStepFour from "./crypto-steps/CryptoStepFour";
import CryptoStepFive from "./crypto-steps/CryptoStepFive";

const CryptoModal = ({ web, setShowCredit, setCryptoStepSix }) => {
  const [cryptoStepOne, setCryptoStepOne] = useState(true);
  const [cryptoStepTwo, setCryptoStepTwo] = useState(false);
  const [cryptoStepThree, setCryptoStepThree] = useState(false);
  const [cryptoStepFour, setCryptoStepFour] = useState(false);
  const [cryptoStepFive, setCryptoStepFive] = useState(false);
  const [cryptoDepositProof, setCryptoDepositProof] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { error, depositAmount } = useSelector((state) => state.profile);

  const { processDeposit } = useActions();

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

  const handleSubmitCryptoDeposit = () => {
    if (error) {
      message.error("Your deposit was not successful, try again");
      setCryptoStepFour(true);
      setCryptoStepFive(false);
    } else {
      processDeposit({
        id: user._id,
        fee: 0.0,
        method: "Cryptocurrency",
        amount: depositAmount,
        name: `${user.name} ${user.lastname}`,
        proof: cryptoDepositProof,
      });
      message.success("Your deposit is currently being processed");
      setCryptoStepFour(false);
      setCryptoStepFive(true);
    }
  };

  const handleCryptoStepFive = () => {
    setCryptoStepFive(false);
    setShowCredit(false);
    setCryptoStepSix(true);
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

  const goBackToCryptoStepFour = () => {
    setCryptoStepFour(true);
    setCryptoStepFive(false);
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
            handleSubmitDeposit={handleSubmitCryptoDeposit}
            goBackToCryptoStepThree={goBackToCryptoStepThree}
            setCryptoDepositProof={setCryptoDepositProof}
          />
          <CryptoStepFive
            cryptoStepFive={cryptoStepFive}
            goBackToCryptoStepFour={goBackToCryptoStepFour}
            handleCryptoStepFive={handleCryptoStepFive}
          />
        </div>
      </Tab.Pane>
    )
  );
};

CryptoModal.propTypes = {
  web: PropTypes.object,
  setShowCredit: PropTypes.func.isRequired,
  setCryptoStepSix: PropTypes.func.isRequired,
};

export default CryptoModal;
