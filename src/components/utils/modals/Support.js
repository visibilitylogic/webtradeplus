import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

const Support = ({ web, setSupport }) => {
  return (
    <div className="withdraw-modal support-modal">
      <div className="header">Contact Support</div>
      <span className="close" onClick={() => setSupport(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
      <Container fluid>
        <Row>
          <Col xs={12} md={6}>
            <div className="support-image"></div>
          </Col>
          <Col xs={12} md={6}>
            <div className="support-wrapper">
              <h6 className="text-left">SUPPORT</h6>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p>EMAIL</p>
                </div>
                <div>
                  <p>
                    <a href={`mailto:${web.supportMail}`}>{web.supportMail}</a>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p>PHONE</p>
                </div>
                <div>
                  <p>
                    <a href="tel:+234800000000">{web.supportPhone}</a>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p>ADDRESS</p>
                </div>
                <div>
                  <p>{web.supportAddress}</p>
                </div>
              </div>
              <div className="mt-4">
                <h6 className="text-left">CONTACT DPO</h6>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>
                    <p>EMAIL</p>
                  </div>
                  <div>
                    <p>
                      <a href={`mailto:${web.DPOEmail}`}>{web.DPOEmail}</a>
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p>PHONE</p>
                  </div>
                  <div>
                    <p>
                      <a href="tel:+234800000000">{web.DPOPhone}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Support.propTypes = {
  web: PropTypes.object,
  setSupport: PropTypes.func.isRequired,
};

export default Support;
