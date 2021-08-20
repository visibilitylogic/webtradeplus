import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const BankPaymentMethod = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    user.bankDetails.length > 0 &&
    user.bankDetails.map((payment, index) => (
      <div key={index} className="shadowed text-left">
        <div>
          <h6 className="mb-0">Bank Transfer</h6>
          <Row>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Name</p>
                <p className="value">{payment.name}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Bank Name</p>
                <p className="value">{payment.bankName}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Bank Account Number</p>
                <p className="value">{payment.bankCountrybankAccountNumber}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    ))
  );
};

export default BankPaymentMethod;
