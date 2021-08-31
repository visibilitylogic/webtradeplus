import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import ForexBoxAside from "./ForexBoxAside";
import ForexBoxContents from "./ForexBoxContents";
import { useActions } from "../hooks/useActions";
import useSelector from "react-redux";

const ForexBox = (props) => {
  const { openForex, setOpenForex, selectedStock, setSelectedStock } = props;

  const {
    getCryptoAssets,
    getCommodityStocks,
    getInvestorsExchange,
    getExchangeTradedFund,
    getForexStocks,
  } = useActions();

  return (
    openForex && (
      <section className="forex-box" style={{ display: "block" }}>
        <div className="dash-row">
          <ForexBoxAside
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
          />
          <ForexBoxContents
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            setOpenForex={setOpenForex}
          />
        </div>
        <span className="close" onClick={() => setOpenForex(false)}>
          <svg id="lnr-cross " viewBox="0 0 1024 1024">
            <title>close</title>
            <path
              className="path1"
              d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
            />
          </svg>
        </span>
      </section>
    )
  );
};

ForexBox.propTypes = {
  openForex: PropTypes.bool.isRequired,
  setOpenForex: PropTypes.func.isRequired,
  selectedStock: PropTypes.number.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
};

export default ForexBox;
