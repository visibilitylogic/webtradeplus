import { Fragment } from "react";
import useFormInput from "../hooks/useFormInput";
import { useActions } from "../hooks/useActions";
import { Link, Redirect } from "react-router-dom";
import "./Form.css";
import { Form, Button } from "react-bootstrap";
import PasswordVisibility from "../utils/PasswordVisibility";
import { RiskTaking, RiskWarning } from "../utils/Risks";
import { useSelector } from "react-redux";

const Login = ({ data }) => {
  const [formInput, handleFormInput] = useFormInput({
    email: "",
    password: "",
  });

  const { email, password } = formInput;

  const { authError, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const { loginUser } = useActions();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="auth-wrapper">
        <h1>Login</h1>
        <div className="auth-form">
          <div className="form-wrapper">
            <Form className="mt-4" onSubmit={handleFormSubmit}>
              {authError !== null && <p className="error">{authError}</p>}
              <Form.Group controlId="formBasicEmail" className="floating mb-0">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleFormInput}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                className="floating mb-3"
              >
                <PasswordVisibility
                  name="password"
                  value={password}
                  onChange={handleFormInput}
                  placeholder="Password"
                />
              </Form.Group>
              <div className="pb-3">
                <Button
                  variant="primary"
                  style={{
                    background: data ? data.yourMainColor : "",
                  }}
                  type="submit"
                  className="w-100"
                >
                  LOGIN
                </Button>
              </div>
            </Form>
            <div>
              <p className="forget text-center mb-3">
                <Link to="/forgot_password" className="backtologin">
                  Forgot Password?
                </Link>
              </p>
            </div>
            <div className="signup text-center">
              <p className="forget">
                Don't have account?
                <Link to="/signup">&nbsp; Register</Link>
              </p>
            </div>
          </div>
          <RiskTaking />
        </div>
      </section>
      <RiskWarning />
    </Fragment>
  );
};

export default Login;
