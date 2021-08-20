import { Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { message } from "antd";

import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";

const BankPaymentForm = ({
  web,
  setBankTransferSelected,
  paymentDetails,
  handlePaymentDetails,
}) => {
  const { addBankPaymentMethod } = useActions();

  const { error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const {
    bankName,
    bankAddress,
    bankCity,
    bankCountry,
    accountNumber,
    swiftCode,
    fullName,
    yourAddress,
    yourCountry,
    yourCity,
  } = paymentDetails;

  const handleBankPaymentMethodAdded = () => {
    if (error) {
      message.error("problems saving bank details, try again");
    }
    message.success("Your Bank Details saved successfully");

    addBankPaymentMethod({
      id: user._id,
      bankName,
      bankCity,
      bankAddress,
      bankCountrybankAccountNumber: accountNumber,
      userAddress: yourAddress,
      bankSwiftCode: swiftCode,
      userBankfULLName: fullName,
      userCountry: yourCountry,
      userCity: yourCity,
    });

    // setTimeout(() => window.location.reload(), 2000);

    setBankTransferSelected(false);
  };
  return (
    <div className="withdraw-modal bank-modal">
      <div className="header">Bank Transfer</div>
      <span className="close" onClick={() => setBankTransferSelected(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>cross</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
      <div className="dash-row">
        <div className="content">
          <div className="billing-form text-left">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="bankName"
                id="bankName"
                value={bankName}
                onChange={handlePaymentDetails}
              />
            </Form.Group>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Bank Address"
                    name="bankAddress"
                    id="bankAddress"
                    value={bankAddress}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Bank City"
                    name="bankCity"
                    id="bankCity"
                    value={bankCity}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Bank Country"
                    name="bankCountry"
                    id="bankCountry"
                    value={bankCountry}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Bank Account Number/IBAN"
                    name="accountNumber"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Swift Code"
                    name="swiftCode"
                    id="swiftCode"
                    value={swiftCode}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Full Name (First Name and Last Name)"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Address"
                    name="yourAddress"
                    id="yourAddress"
                    value={yourAddress}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Country"
                    name="yourCountry"
                    id="yourCountry"
                    value={yourCountry}
                    onChange={handlePaymentDetails}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your City"
                name="yourCity"
                id="yourCity"
                value={yourCity}
                onChange={handlePaymentDetails}
              />
            </Form.Group>

            <div className="text-right">
              <Button
                style={{ background: web.yourMainColor }}
                variant="primary"
                onClick={handleBankPaymentMethodAdded}
                className="mb-4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BankPaymentForm.propTypes = {
  web: PropTypes.object,
  setBankTransferSelected: PropTypes.func.isRequired,
  paymentDetails: PropTypes.object.isRequired,
  handlePaymentDetails: PropTypes.func.isRequired,
};

export default BankPaymentForm;
