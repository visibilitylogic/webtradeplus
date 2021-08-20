import PropTypes from "prop-types";
import iboxBackground from "../../assets/images/profile.jpg";

const Ibox = ({ setShowIbox, currentItem }) => {
  return (
    <div
      className="instrument-box"
      style={{ display: "block" }}
      onMouseLeave={() => setShowIbox(false)}
    >
      <img className="header-img" src={iboxBackground} alt="Background" />
      <div className="dtls">
        <div className="dash-row dash-row-centralized">
          <div>
            <span className="instrument">
              {Object.keys(currentItem).length > 0 && currentItem.symbol
                ? currentItem.symbol
                : ""}
            </span>
          </div>
        </div>
        <div className="dash-row split">
          <div className="split-50">
            <span className="sub">Leverage</span>
            <span className="main">x10</span>
          </div>
          <div className="split-50">
            <span className="sub">Commission</span>
            <span className="main">0.02 USD</span>
          </div>
          <div className="split-50">
            <span className="sub">Financing Rate Long</span>
            <span className="main">
              {Object.keys(currentItem).length > 0 && currentItem.price
                ? currentItem.price
                : ""}
            </span>
          </div>
          <div className="split-50">
            <span className="sub">Financing Rate Short</span>
            <span className="main">-0.07</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Ibox.propTypes = {
  setShowIbox: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
};

export default Ibox;
