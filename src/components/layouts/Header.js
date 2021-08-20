import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";

export default function Header(props) {
  const { data, path, title, setToggleRegister } = props;
  return (
    <div>
      <header className="d-flex align-items-center justify-content-between auth-header p-4 fixed-top">
        <div>
          <img src={data && data.siteLogo} alt="logo" />
        </div>
        <div>
          <Link
            to={path}
            className="btn btn-primary"
            style={{ background: data && data.siteColor }}
            onClick={() => setToggleRegister((prev) => !prev)}
          >
            {title}
          </Link>
        </div>
      </header>
    </div>
  );
}

Header.propTypes = {
  data: PropTypes.object,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setToggleRegister: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: "Register",
  link: "/",
};
