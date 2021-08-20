import DepositSidebar from "./DepositSidebar";
import { Tab } from "react-bootstrap";
import PropTypes from "prop-types";
import CreditModal from "./CreditModal";
import CryptoModal from "./CryptoModal";

const CreditModalContents = ({ setShowCredit, web, setCryptoStepFive }) => {
  return (
    <div className="credit-modal">
      <div className="header">Fund Your Wallet</div>
      <div className="dash-row">
        <Tab.Container defaultActiveKey="credit" id="uncontrolled-tab-example">
          <DepositSidebar />
          <div className="content">
            <Tab.Content>
              <CreditModal web={web} setShowCredit={setShowCredit} />
              <CryptoModal
                web={web}
                setShowCredit={setShowCredit}
                setCryptoStepFive={setCryptoStepFive}
              />
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
      <span className="close" onClick={() => setShowCredit(false)}>
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

CreditModalContents.propTypes = {
  setShowCredit: PropTypes.func.isRequired,
  web: PropTypes.object.isRequired,
  setCryptoStepFive: PropTypes.func.isRequired,
};

export default CreditModalContents;
