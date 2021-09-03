import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../utils/Carousel";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { webData } = useSelector((state) => state.web);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your email is ${email}`);
  };

  return (
    <div
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        background: `url(${webData && webData.loginBackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Row>
          <Col xs={12} md={5} style={{ paddingRight: 0 }}>
            <section className="auth-wrapper">
              <Form
                onSubmit={handleSubmit}
                className="mt-8 pt-5"
                style={{ marginTop: "10rem" }}
              >
                <Form.Group
                  controlId="formBasicEmail"
                  className="floating mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: "1px solid #d8dbe4" }}
                  />
                  <Form.Label>Your e-mail address</Form.Label>
                </Form.Group>
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div>
                    <Link to="/" className="backtologin">
                      Back to login
                    </Link>
                  </div>
                  <Button
                    variant="primary"
                    style={{ background: webData && webData.yourMainColor }}
                    type="submit"
                  >
                    NEXT
                  </Button>
                </div>
              </Form>
            </section>
          </Col>
          <Col xs={12} md={7} style={{ paddingLeft: 0 }}>
            <Carousel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
