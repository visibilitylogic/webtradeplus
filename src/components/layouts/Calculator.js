import React from 'react'
import ethereum from "../../assets/images/ETH.svg";
import litecoin from "../../assets/images/LTC.svg";
import bitcoin from "../../assets/images/BTC.svg";
import usd from "../../assets/images/USD.svg";
import "./dasn.css"
function Calculator() {
    return (
        <div className="dashcontents calc_contain">        
        <div className="calc-sections">
        <div className="heading">
          <span style={{fontSize:"20px", letterSpacing:"1px", fontFamily:"arial"}}>CONVERTER</span>
        </div>
        <div className="calc" id="calcSort">
          <div className="dash-row dash-row-centralized calc-instrument">
            <div className="image">
              <img src={ethereum} />
            </div>
            <div className="instrument">
              <span className="font-size-12">Ethereuem</span>
            </div>
            <div className="input">
              <div className="dash-row dash-row-centralized">
                <div className="input-field">
                  <input
                    type="text"
                    name="input"
                    id="input"
                    defaultValue={1}
                  />
                </div>
                <div className="input-ins">
                  <span className="font-size-12">ETH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-row dash-row-centralized calc-instrument">
            <div className="image">
              <img src={litecoin} />
            </div>
            <div className="instrument">
              <span className="font-size-12">Litecoin</span>
            </div>
            <div className="input">
              <div className="dash-row dash-row-centralized">
                <div className="input-field">
                  <input
                    type="text"
                    name="input"
                    id="input"
                    defaultValue={1}
                  />
                </div>
                <div className="input-ins">
                  <span className="font-size-12">LTC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-row dash-row-centralized calc-instrument">
            <div className="image">
              <img src={bitcoin} />
            </div>
            <div className="instrument">
              <span className="font-size-12">BITCOIN</span>
            </div>
            <div className="input">
              <div className="dash-row dash-row-centralized">
                <div className="input-field">
                  <input
                    type="text"
                    name="input"
                    id="input"
                    defaultValue={1}
                  />
                </div>
                <div className="input-ins">
                  <span className="font-size-12">BIT</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-row dash-row-centralized calc-instrument">
            <div className="image">
              <img src={usd} />
            </div>
            <div className="instrument">
              <span className="font-size-12">DOLLARS</span>
            </div>
            <div className="input">
              <div className="dash-row dash-row-centralized">
                <div className="input-field">
                  <input
                    type="text"
                    name="input"
                    id="input"
                    defaultValue={1}
                  />
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
      </div>
          );
    
}

export default Calculator
