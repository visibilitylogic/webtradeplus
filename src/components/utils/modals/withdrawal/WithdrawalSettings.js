import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import bankTransfer from "../../../../assets/images/bank-transfer.svg";
import BankPaymentMethod from "./BankPaymentMethod";
import CryptoPaymentMethod from "./CryptoPaymentMethod";

const WithdrawalSettings = ({
  setWithdrawalSettings,
  handleBankTransfer,
  handleCryptoSettings,
}) => {
  return (
    <div className="withdraw-modal support-modal withdrawal-settings-modal">
      <div className="header">Withdrawal Settings</div>
      <span className="close" onClick={() => setWithdrawalSettings(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
      <Container fluid className="pt-5 h-100">
        <div className="withdraw-settings d-flex">
          <div>
            <button onClick={handleBankTransfer}>
              <img src={bankTransfer} alt="bank transfer" />
            </button>
          </div>
          <div>
            <button onClick={handleCryptoSettings}>
              <img
                src={
                  "https://assets.coinbase.com/assets/bitcoin.0307bf6969a0d3b8b43fcab55e6de8ab.svg"
                }
                alt="cryptocurrencies"
              />
            </button>
          </div>
        </div>

        <div style={{ height: "35vh" }}>
          <BankPaymentMethod />
          <CryptoPaymentMethod />
        </div>
      </Container>
    </div>
  );
};

WithdrawalSettings.propTypes = {
  setWithdrawalSettings: PropTypes.func.isRequired,
  handleBankTransfer: PropTypes.func.isRequired,
  handleCryptoSettings: PropTypes.func.isRequired,
};

export default WithdrawalSettings;
