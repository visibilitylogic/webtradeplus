import ethereum from "../../assets/images/ETH.svg";
import litecoin from "../../assets/images/LTC.svg";
import bitcoin from "../../assets/images/BTC.svg";
import usd from "../../assets/images/USD.svg";

const Calc = () => {
  return (
    <div className="calc-section">
      <div className="heading">
        <span>CONVERTER</span>

        <span className="close" dash-action="calc">
          <svg id="lnr-cross " viewBox="0 0 1024 1024">
            <title>cross</title>
            <path
              className="path1"
              d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
            />
          </svg>
        </span>
      </div>
      <div className="calc" id="calcSort">
        <div className="dash-row dash-row-centralized calc-instrument">
          <div className="image">
            <img src={ethereum} alt="Ethereum Logo" />
          </div>
          <div className="instrument">
            <span className="font-size-12">Ethereuem</span>
          </div>
          <div className="input">
            <div className="dash-row dash-row-centralized">
              <div className="input-field">
                <input type="text" name="input" id="input" defaultValue={1} />
              </div>
              <div className="input-ins">
                <span className="font-size-12">ETH</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-row dash-row-centralized calc-instrument">
          <div className="image">
            <img src={litecoin} alt="Litecoin Logo" />
          </div>
          <div className="instrument">
            <span className="font-size-12">Litecoin</span>
          </div>
          <div className="input">
            <div className="dash-row dash-row-centralized">
              <div className="input-field">
                <input type="text" name="input" id="input" defaultValue={1} />
              </div>
              <div className="input-ins">
                <span className="font-size-12">LTC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-row dash-row-centralized calc-instrument">
          <div className="image">
            <img src={bitcoin} alt="Bitcoin Logo" />
          </div>
          <div className="instrument">
            <span className="font-size-12">BITCOIN</span>
          </div>
          <div className="input">
            <div className="dash-row dash-row-centralized">
              <div className="input-field">
                <input type="text" name="input" id="input" defaultValue={1} />
              </div>
              <div className="input-ins">
                <span className="font-size-12">BIT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-row dash-row-centralized calc-instrument">
          <div className="image">
            <img src={usd} alt="US Dollar bill" />
          </div>
          <div className="instrument">
            <span className="font-size-12">DOLLARS</span>
          </div>
          <div className="input">
            <div className="dash-row dash-row-centralized">
              <div className="input-field">
                <input type="text" name="input" id="input" defaultValue={1} />
              </div>
              <div className="input-ins">
                <span className="font-size-12">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <center>
        <div className="add-icon">
          <span>+</span>
        </div>
      </center>
    </div>
  );
};

export default Calc;
