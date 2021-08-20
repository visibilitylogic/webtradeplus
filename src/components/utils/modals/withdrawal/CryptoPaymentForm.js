import useFormInput from "../../../hooks/useFormInput";
import { useActions } from "../../../hooks/useActions";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import { useSelector } from "react-redux";

const CryptoPaymentForm = ({ web, setCryptoCurrencySelected }) => {
  const [cryptoDetails, handleCryptoDetails] = useFormInput({
    cryptoCurrencyName: "",
    cryptoAddress: "",
  });
  const { cryptoCurrencyName, cryptoAddress } = cryptoDetails;

  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.profile);
  const { addCryptoPaymentMethod } = useActions();

  const handleCryptoPaymentMethodAdded = () => {
    if (error) {
      message.error("problems saving cryptocurrency details, try again");
    }

    message.success("Your Crypto currency Details saved successfully");
    addCryptoPaymentMethod({
      id: user._id,
      cryptoCurrencyName,
      cryptoCurrencyAddress: cryptoAddress,
    });

    setCryptoCurrencySelected(false);
  };

  return (
    <div className="withdraw-modal personal-modal">
      <div className="header">Cryptocurrencies</div>
      <span className="close" onClick={() => setCryptoCurrencySelected(false)}>
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
                name="cryptoCurrencyName"
                value={cryptoCurrencyName}
                onChange={handleCryptoDetails}
                as="select"
              >
                <option value=""></option>
                <option value="BTC">BTC</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Address"
                name="cryptoAddress"
                id="address"
                value={cryptoAddress}
                onChange={handleCryptoDetails}
              />
            </Form.Group>
            <div className="text-right">
              <Button
                style={{ background: web.yourMainColor }}
                variant="primary"
                onClick={handleCryptoPaymentMethodAdded}
                className="mb-4"
                disabled={!cryptoCurrencyName || !cryptoAddress}
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

export default CryptoPaymentForm;
