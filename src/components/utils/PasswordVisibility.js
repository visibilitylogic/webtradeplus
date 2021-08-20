import { useState, Fragment } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";

const PasswordVisibility = ({ value, onChange, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Fragment>
      <Form.Control
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        style={{ borderBottom: "1px solid #d8dbe4" }}
        placeholder={placeholder}
      />
      {showPassword ? (
        <EyeSlash className="eye" onClick={() => setShowPassword(false)} />
      ) : (
        <Eye className="eye" onClick={() => setShowPassword(true)} />
      )}
    </Fragment>
  );
};

export default PasswordVisibility;
