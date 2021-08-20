import { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Form, Button, Row, Col } from "react-bootstrap";

const CreditStepThree = (props) => {
  const {
    creditStepThree,
    goBackToCreditStepTwo,
    handleCreditStepThree,
    handleAddressInput,
    cardInput,
    userCountry,
    setUserCountry,
  } = props;
  const options = useMemo(() => countryList().getData(), []);

  // const [userCountry, setUserCountry] = useState("");

  return (
    creditStepThree && (
      <div className="process dash-row dash-row-centralized">
        <div className="text-left w-100">
          <Button onClick={goBackToCreditStepTwo} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <div className="billing-form w-100 mt-3 text-left">
          <div>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Billing Address"
                name="billingAddress"
                id="billingAddress"
                value={cardInput.billingAddress}
                onChange={handleAddressInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Zip Code"
                name="zipCode"
                id="zipCode"
                value={cardInput.zipCode}
                onChange={handleAddressInput}
              />
            </Form.Group>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your State"
                    name="yourState"
                    id="yourState"
                    value={cardInput.yourState}
                    onChange={handleAddressInput}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group style={{ color: "#6c757d" }}>
                  <Select
                    style={{ color: "#6c757d" }}
                    options={options}
                    value={userCountry}
                    id="userCountry"
                    placeholder={
                      <div style={{ color: "#6c757d" }}>Select Country</div>
                    }
                    onChange={(userCountry) => setUserCountry(userCountry)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <div className="text-right w-100 mt-3">
          <div className="btn pr-0">
            <button
              onClick={handleCreditStepThree}
              type="button"
              disabled={!cardInput.billingAddress || !userCountry}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};

CreditStepThree.propTypes = {
  creditStepThree: PropTypes.bool.isRequired,
  goBackToCreditStepTwo: PropTypes.func.isRequired,
  handleCreditStepThree: PropTypes.func.isRequired,
  cardInput: PropTypes.object,
  userCountry: PropTypes.string,
  setUserCountry: PropTypes.func.isRequired,
  handleAddressInput: PropTypes.func.isRequired,
};

export default CreditStepThree;
