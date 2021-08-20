import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CryptoStepTwo = (props) => {
  const { web, cryptoStepTwo, goBackToCryptoStepOne, handleCryptoStepTwo } =
    props;

  const { user } = useSelector((state) => state.auth);
  const { depositAmount } = useSelector((state) => state.profile);

  const [copied, setCopied] = useState(false);

  const handleCopied = () => {
    setCopied(true);
    message.success("Copied");
  };

  return (
    cryptoStepTwo && (
      <div id="step-two">
        <div className="text-left">
          <Button onClick={goBackToCryptoStepOne} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <img src={web.BTCQRCodeImg} className="qrcode my-5" alt="QR Code" />
        <br />
        <div className="mb-0" style={{ color: "#fff" }}>
          <p>To complete your payment, please send</p>
          <h3 style={{ color: "#fff" }}>
            {`${user.currency}${new Intl.NumberFormat("en-US").format(
              depositAmount
            )}`}
          </h3>
          <p>worth of BTC to the address below.</p>
        </div>
        <div>
          <h6 className="my-4 text-left">{web.btcHeaderText}:</h6>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={web.btcAddress}
              disabled
              style={{
                width: "100%",
                background: "#fff",
                height: "55px",
                textAlign: "left",
                padding: "15px",
                color: "#1c2030",
              }}
            />
            <CopyToClipboard text={web.btcAddress} onCopy={handleCopied}>
              <Button
                variant="primary"
                style={{
                  //   background: web.yourMainColor,
                  height: "55px",
                  marginLeft: "-2px",
                  background: "#fff",
                  borderTopLeftRadius: "0",
                  borderBottomRightRadius: "0",
                  color: "#1c2030",
                  width: "auto",
                  padding: "15px 30px",
                }}
              >
                {copied ? "COPIED" : "COPY"}
              </Button>
            </CopyToClipboard>
          </div>
          <br />
          <div className="text-center">
            <Button
              className="mb-4"
              onClick={handleCryptoStepTwo}
              style={{
                width: "39%",
                padding: "15px 30px",
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

CryptoStepTwo.propTypes = {
  web: PropTypes.object,
  cryptoStepTwo: PropTypes.bool.isRequired,
  goBackToCryptoStepOne: PropTypes.func.isRequired,
  handleCryptoStepTwo: PropTypes.func.isRequired,
};

export default CryptoStepTwo;
