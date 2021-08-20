import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { message } from "antd";
import { useSelector } from "react-redux";
import { countryList as profileCountryList } from "../../../helpers/dataset/countryList";

const PersonalData = ({ web, setPersonalData }) => {
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    country: "",
    currency: "",
    yourPassword: "",
    yourPasswordConfirm: "",
  });

  const {
    name,
    lastname,
    email,
    phoneNumber,
    country,
    currency,
    yourPassword,
    yourPasswordConfirm,
  } = formData;

  const { updateProfile } = useSelector((state) => state.auth);

  const handleUpdateProfile = () => {
    if (yourPassword !== yourPasswordConfirm) {
      message.error("Password must match");
      return;
    } else if (error) {
      message.error("problems updating profile");
      return;
    }

    updateProfile({
      id: user._id,
      name: name,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      country: country,
      currency: currency,
      newPassword: yourPassword,
    });

    message.success("Profile was successfully updated");

    setPersonalData(false);
  };

  const handleUserInfo = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ? user.name : "",
      });
    }
  }, [user]);

  return (
    <div className="withdraw-modal personal-modal">
      <div className="header">User Personal Data</div>
      <div className="dash-row">
        <div className="content">
          <div className="billing-form text-left">
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your First Name"
                    name="name"
                    id="name"
                    defaultValue={name}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Last Name"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Your Email Address"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    value={phoneNumber}
                    onChange={handleUserInfo}
                    type="number"
                    placeholder="phone number"
                    name="phoneNumber"
                    id="phoneNumber"
                  />
                </Form.Group>
              </Col>
            </Row>
            <p style={{ color: "white" }}>Country</p>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="country"
                    value={country}
                    onChange={handleUserInfo}
                  >
                    <option value="Select Country">Select Country</option>
                    {profileCountryList.map((country) => (
                      <option>{country}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="currency"
                    defaultValue={currency}
                    onChange={handleUserInfo}
                  >
                    <option value="$">Select Currency</option>

                    <option value="$">USD</option>
                    <option value="€">EUR</option>
                    <option value="£">GBP</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    value={yourPassword}
                    onChange={handleUserInfo}
                    type="password"
                    placeholder="Your New Password"
                    name="yourPassword"
                    id="yourPassword"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    value={yourPasswordConfirm}
                    onChange={handleUserInfo}
                    type="password"
                    placeholder="Repeat New Password"
                    name="yourPasswordConfirm"
                    id="yourPasswordConfirm"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-right">
              <Button
                style={{ background: web.yourMainColor }}
                onClick={handleUpdateProfile}
                variant="primary"
                className="mb-4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="close" onClick={() => setPersonalData(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>cross</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
    </div>
  );
};

PersonalData.propTypes = {
  web: PropTypes.object,
  setPersonalData: PropTypes.func.isRequired,
};

export default PersonalData;
