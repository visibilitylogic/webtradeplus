import { Fragment } from "react";
import { Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import "./Sidebar.css";

const SubSidebar = ({ view, getRate }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const {
    currentSelectedStock,
    defaultSelectedStock,
    loading: stockLoading,
    stocksSelected,
  } = useSelector((state) => state.stock);

  // Action Creators
  const { setCurrentSelectedStock } = useActions();

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
        <ul id="stock-list-display" className="p-0 w-100 text-left">
          {stocksSelected.length === 0 ? (
            <li id="watching-list-item">
              <span>{defaultSelectedStock.symbol}</span>
              <span>
                {Object.keys(defaultSelectedStock).length > 0 &&
                  defaultSelectedStock.price.toString().slice(0, 8)}
              </span>
              <span
                className={`${
                  defaultSelectedStock.changesPercentage < 0 ? "red" : "green"
                }`}
              >
                {Object.keys(defaultSelectedStock).length > 0 &&
                  defaultSelectedStock.changesPercentage.toFixed(2)}
              </span>
            </li>
          ) : (
            stocksSelected.map((stock, index) => (
              <li
                id="watching-list-item"
                key={index}
                onClick={() => setCurrentSelectedStock(stock)}
              >
                <span style={{ flex: 3 }}>{stock.symbol}</span>
                <span style={{ flex: 2 }}>
                  {stock.price.toString().slice(0, 8)}
                </span>
                <span
                  style={{ flex: 1 }}
                  className={`${stock.changesPercentage < 0 ? "red" : "green"}`}
                >
                  {stock.changesPercentage
                    ? stock.changesPercentage.toFixed(2)
                    : ""}
                </span>
              </li>
            ))
          )}
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
        <h6>
          {!stockLoading && Object.keys(defaultSelectedStock).length > 0
            ? defaultSelectedStock.symbol
            : currentSelectedStock.symbol}
        </h6>
        <p className="mb-0 badge-code">
          {!stockLoading && Object.keys(defaultSelectedStock).length > 0
            ? defaultSelectedStock.exchange
            : currentSelectedStock.exchange}
        </p>
        <p className="price mt-4 mb-0">
          {!stockLoading && Object.keys(defaultSelectedStock).length > 0
            ? defaultSelectedStock.price
            : currentSelectedStock.price}
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
