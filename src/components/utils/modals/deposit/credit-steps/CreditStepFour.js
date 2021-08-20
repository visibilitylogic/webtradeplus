import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const CreditStepFour = (props) => {
  const [checked, setChecked] = useState(false);

  const { creditStepFour, goBackToCreditStepThree, handleCreditStepFour } =
    props;
  return (
    creditStepFour && (
      <div className="confirm-wrapper">
        <div className="text-left w-100">
          <Button onClick={goBackToCreditStepThree} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <div className="mt-4" style={{ color: "#fff" }}>
          <p>Please confirm that all the filled details are correct</p>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I confirm"
              style={{ color: "#fff!important" }}
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              className="mb-4"
              onClick={handleCreditStepFour}
              style={{
                width: "39%",
                padding: "15px 30px",
              }}
              disabled={!checked}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

CreditStepFour.propTypes = {
  creditStepFour: PropTypes.bool.isRequired,
  goBackToCreditStepThree: PropTypes.func.isRequired,
  handleCreditStepFour: PropTypes.func.isRequired,
};

export default CreditStepFour;
