import { Fragment } from "react";
import { Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const SubSidebar = ({ view, getRate }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const { currentSelectedStock } = useSelector((state) => state.stock);

  return (
    <div className="sidebar-wrapper">
      <header className="d-flex align-items-center justify-content-between">
        <p className="watchlist mb-0">Watchlist</p>
        <Form inline>
          <FormControl
            type="text"
            placeholder="BTCETH ..."
            className="search"
          />
        </Form>
      </header>
      <nav>
        <ul id="watching-list" className="mb-0">
          <li>Symbol</li>
          <li className="ml-auto">Last</li>
          <li className="ml-4">Chng (%)</li>
        </ul>
        <ul id="watching-list-item">
          <li>{currentSelectedStock.symbol}</li>
          <li className="ml-auto">{currentSelectedStock.price}</li>
          <li
            className={`ml-5 ${
              currentSelectedStock.changesPercentage >= 0 ? "green" : "red"
            }`}
          >
            {currentSelectedStock.changesPercentage
              ? currentSelectedStock.changesPercentage.toFixed(2)
              : ""}
          </li>
        </ul>
        {!loading && user && user.isTrading && (
          <Fragment>
            <div className="isTradingI">AutoCopy Trader is active</div>
            <img
              style={{ width: " 100%" }}
              src={"https://www.virtualdj.com/images/ajax-loading-big.gif"}
              alt="auto trading"
            />
          </Fragment>
        )}
      </nav>
      <ul className="watchlist-details"></ul>

      <div className="infocurrency-wrapper p-2">
        <header
          className="details-wrapper d-flex align-items-center justify-content-between"
          style={{ margin: " 0 0 5%" }}
        >
          <p className="watchlist mb-0">DETAILS</p>
        </header>
        <h6>{currentSelectedStock.symbol}</h6>
        <p className="mb-0 badge-code">{currentSelectedStock.exchange}</p>
        <p className="price mt-4 mb-0">
          {currentSelectedStock.price}
          {/* {getRate(view.symbol ? view.symbol : "")} */}
        </p>
      </div>
    </div>
  );
};

SubSidebar.propTypes = {
  getRate: PropTypes.func.isRequired,
  view: PropTypes.object,
};

export default SubSidebar;
