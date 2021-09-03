import { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import useFormInput from "../hooks/useFormInput";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";
import "./Form.css";
import { countryList } from "../../helpers/dataset/countryList";
import { sponsors } from "./../../helpers/dataset/sponsors";

import PasswordVisibility from "../utils/PasswordVisibility";
import { RiskTaking, RiskWarning } from "../utils/Risks";

const Register = ({ data, setToggleRegister }) => {
  const [formInput, handleFormInput] = useFormInput({
    name: "",
    lastname: "",
    email: "",
    country: "",
    phonenumber: "",
    password: "",
    repeatPassword: "",
  });
  const [termsChecked, setTermsChecked] = useState(false);

  const {
    name,
    lastname,
    email,
    country,
    phonenumber,
    password,
    repeatPassword,
  } = formInput;

  const { authError, isAuthenticated } = useSelector((state) => state.auth);

  const { registerUser } = useActions();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    registerUser({
      name,
      lastname,
      email,
      country,
      phonenumber,
      password,
      repeatPassword,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div>
        {/* <Favicon url={web ? web.siteFav : ""} />
  <Favicon url={web2 ? web2.siteFav : ""} /> */}

        <div>
          <section className="auth-wrapper">
            <h1>Sign Up</h1>
            <div className="auth-form">
              <div className="form-wrapper">
                <Form className="mt-4 pt-2" onSubmit={handleFormSubmit}>
                  {authError !== null && <p className="error1">{authError}</p>}
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleFormInput}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your First Name"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={handleFormInput}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your Last Name"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicEmail"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleFormInput}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your e-mail address"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="floating mb-0"
                  >
                    <Form.Control
                      as="select"
                      name="country"
                      onChange={handleFormInput}
                      value={country}
                    >
                      <option>Your Country</option>
                      {countryList.map((country, index) => (
                        <option value={country} key={index}>
                          {country}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <p
                    className="text-left"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Please make sure this is your country of permanent residence
                  </p>
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="number"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={handleFormInput}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your Phone Number"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicPassword"
                    className="floating mb-0"
                  >
                    <PasswordVisibility
                      name="password"
                      value={password}
                      onChange={handleFormInput}
                      placeholder="Your password"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPasswordTwo"
                    className="floating mb-0"
                  >
                    <PasswordVisibility
                      name="repeatPassword"
                      value={repeatPassword}
                      onChange={handleFormInput}
                      placeholder="Confirm password"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="d-flex mt-2 mb-2"
                  >
                    <Form.Check
                      type="checkbox"
                      name="agree"
                      checked={termsChecked}
                      onChange={() => setTermsChecked((prev) => !prev)}
                    />
                    <Form.Label className="agree pl-2">
                      I confirm that I am 18 years old or older and accept
                      <a href=""> Terms & Conditions</a>,
                      <a href=""> Privacy Policy</a> and
                      <a href=""> Order Execution Policy</a>
                    </Form.Label>
                  </Form.Group>
                  <div className="pb-3">
                    <Button
                      variant="primary"
                      style={{ background: data ? data.yourMainColor : "" }}
                      type="submit"
                      className="w-100"
                      disabled={!termsChecked}
                    >
                      LET'S GO !
                    </Button>
                  </div>
                </Form>
                <div className="signup text-center">
                  <p className="forget">
                    Already have an account?
                    <Link to="/" onClick={() => setToggleRegister(false)}>
                      &nbsp; Login
                    </Link>
                  </p>
                </div>
              </div>
              <RiskTaking />
            </div>
          </section>
          <div className="mt-5">
            <hr />
            <div className="sponsor d-flex align-items-center justify-content-between mx-5 px-5 mb-4 pt-4">
              <div className="d-flex align-items-center justify-content-between w-100">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.id}>
                    <img
                      src={sponsor.logo}
                      className="img-fluid"
                      alt={sponsor.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RiskWarning />
    </Fragment>
  );
};

export default Register;

Register.propTypes = {
  data: PropTypes.object,
  setToggleRegister: PropTypes.func.isRequired,
};
