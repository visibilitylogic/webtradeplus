import { useState } from "react";
import { Tab } from "react-bootstrap";
import PropTypes from "prop-types";
import CreditStepOne from "./credit-steps/CreditStepOne";
import CreditStepTwo from "./credit-steps/CreditStepTwo";
import CreditStepThree from "./credit-steps/CreditStepThree";
import CreditStepFour from "./credit-steps/CreditStepFour";
import CreditStepFive from "./credit-steps/CreditStepFive";
import { useSelector } from "react-redux";
import useFormInput from "../../../hooks/useFormInput";
import { useActions } from "../../../hooks/useActions";

const CreditModal = ({ web, setShowCredit }) => {
  const [cardInput, handleCardInput] = useFormInput({
    cardNumber: "",
    cardExpiryDate: "",
    cardHolderName: "",
    cardCvv: "",
    billingAddress: "",
    zipCode: "",
    yourState: "",
  });

  const { userId } = useSelector((state) => state.auth);
  const { depositAmount } = useSelector((state) => state.profile);

  const { processDeposit } = useActions();

  const [creditStepOne, setCreditStepOne] = useState(true);
  const [creditStepTwo, setCreditStepTwo] = useState(false);
  const [creditStepThree, setCreditStepThree] = useState(false);
  const [creditStepFour, setCreditStepFour] = useState(false);
  const [creditStepFive, setCreditStepFive] = useState(false);
  const [userCountry, setUserCountry] = useState("");

  const cardDetails = {
    id: userId,
    fee: 0.0,
    method: "Card Deposit",
    cardNumber: cardInput.cardNumber,
    cardCvv: cardInput.cardCvv,
    cardMonth: `${cardInput.cardExpiryDate[0]}${cardInput.cardExpiryDate[1]}`,
    cardYear: `20${cardInput.cardExpiryDate[3]}${cardInput.cardExpiryDate[4]}`,
    amount: parseFloat(depositAmount),
    cardName: cardInput.cardHolderName,
    zipCode: cardInput.zipCode,
    homeAddress: cardInput.billingAddress,
    yourCountry: userCountry.label,
    yourState: cardInput.yourState,
  };

  // These handle the next button
  const handleCreditStepOne = () => {
    setCreditStepOne(false);
    setCreditStepTwo(true);
  };

  const handleCreditStepTwo = () => {
    setCreditStepTwo(false);
    setCreditStepThree(true);
  };

  const handleCreditStepThree = () => {
    setCreditStepThree(false);
    setCreditStepFour(true);
  };

  const handleCreditStepFour = () => {
    setCreditStepFour(false);
    setCreditStepFive(true);
  };

  // These handle the previous step button
  const goBackToCreditStepOne = () => {
    setCreditStepOne(true);
    setCreditStepTwo(false);
  };

  const goBackToCreditStepTwo = () => {
    setCreditStepTwo(true);
    setCreditStepThree(false);
  };

  const goBackToCreditStepThree = () => {
    setCreditStepThree(true);
    setCreditStepFour(false);
  };

  const goBackToCreditStepFour = () => {
    setCreditStepFour(true);
    setCreditStepFive(false);
  };

  return (
    web &&
    web.masterCardStatus && (
      <Tab.Pane eventKey="credit">
        <CreditStepOne
          web={web}
          handleCreditStepOne={handleCreditStepOne}
          creditStepOne={creditStepOne}
        />
        <CreditStepTwo
          creditStepTwo={creditStepTwo}
          goBackToCreditStepOne={goBackToCreditStepOne}
          handleCreditStepTwo={handleCreditStepTwo}
          cardInput={cardInput}
          handleCardInput={handleCardInput}
        />
        <CreditStepThree
          creditStepThree={creditStepThree}
          goBackToCreditStepTwo={goBackToCreditStepTwo}
          handleCreditStepThree={handleCreditStepThree}
          setUserCountry={setUserCountry}
          userCountry={userCountry}
          cardInput={cardInput}
          handleAddressInput={handleCardInput}
        />
        <CreditStepFour
          creditStepFour={creditStepFour}
          goBackToCreditStepThree={goBackToCreditStepThree}
          handleCreditStepFour={handleCreditStepFour}
        />
        <CreditStepFive
          creditStepFive={creditStepFive}
          goBackToCreditStepFour={goBackToCreditStepFour}
          processDeposit={processDeposit}
          setShowCredit={setShowCredit}
          cardDetails={cardDetails}
        />
      </Tab.Pane>
    )
  );
};

CreditModal.propTypes = {
  web: PropTypes.object.isRequired,
  setShowCredit: PropTypes.func.isRequired,
};

export default CreditModal;
