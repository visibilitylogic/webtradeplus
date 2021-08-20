import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const CryptoPaymentMethod = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    user.cryptocurrencyWallet.length > 0 &&
    user.cryptocurrencyWallet.map((payment, index) => (
      <div className="shadowed text-left" key={index}>
        <div>
          <h6 className="mb-0">Crypto Transfer</h6>
          <Row>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Name</p>
                <p className="value">{payment.name}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Crypto Currency Name</p>
                <p className="value">{payment.cryptoCurrencyName}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mt-2">
                <p className="title mb-0">Crypto Currency Address</p>
                <p className="value">{payment.cryptoCurrencyAddress}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    ))
  );
};

export default CryptoPaymentMethod;
