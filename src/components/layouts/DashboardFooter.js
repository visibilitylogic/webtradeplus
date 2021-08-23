import PropTypes from "prop-types";
import { FaRegGem } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import "./DashboardFooter.css";
import SwitchButton from "../utils/SwitchButton";
import { useSelector } from "react-redux";

const DashboardFooter = ({ setSupport }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <footer className="dash-footer">
      <div className="footer-left-side">
        <div className="admin-text-wrapper">
          <FaRegGem size={15} className="mr-2" />
          <p>Admin</p>
        </div>
        <div className="theme-wrapper">
          <p className="mr-2">Dark</p>
          <SwitchButton />
          <p className="ml-2">White</p>
        </div>
        <div className="accounting-area">
          <p>Balance: {user && `${user.currency}${user.wallet}`} |</p>
          <p>&nbsp;Profit/loss: $0.00 |</p>
          <p>&nbsp;Equity: $0.00 |</p>
          <p>&nbsp;Margin: $0.00 |</p>
          <p>&nbsp;Free Margin: $0.00</p>
        </div>
      </div>
      <div className="footer-right-side">
        <button onClick={() => setSupport(true)}>
          <BsChat size={20} className="mr-3" />
          <span>Contact us</span>
        </button>
        <p className="date">{new Date().toDateString()}</p>
      </div>
    </footer>
  );
};

DashboardFooter.propTypes = {
  setSupport: PropTypes.func.isRequired,
};

export default DashboardFooter;
