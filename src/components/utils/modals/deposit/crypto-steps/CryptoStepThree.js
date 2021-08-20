import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CryptoStepThree = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { depositAmount } = useSelector((state) => state.profile);

  const { cryptoStepThree, goBackToCryptoStepTwo, handleCryptoStepThree } =
    props;
  return (
    cryptoStepThree && (
      <div className="confirm-wrapper" style={{ color: "#fff" }}>
        <div className="text-left">
          <Button onClick={goBackToCryptoStepTwo} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <p className="mt-4">
          Please confirm that you have transferred {user.currency}
          {new Intl.NumberFormat("en-US").format(depositAmount)} worth of BTC to
          the following BITCOIN wallet address
        </p>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="I Confirm"
            style={{ color: "#fff!important" }}
          />
        </Form.Group>
        <div className="text-center">
          <Button
            className="mb-4"
            onClick={handleCryptoStepThree}
            style={{
              width: "39%",
              padding: "15px 30px",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    )
  );
};

CryptoStepThree.propTypes = {
  cryptoStepThree: PropTypes.bool.isRequired,
  goBackToCryptoStepTwo: PropTypes.func.isRequired,
  handleCryptoStepThree: PropTypes.func.isRequired,
};

export default CryptoStepThree;
