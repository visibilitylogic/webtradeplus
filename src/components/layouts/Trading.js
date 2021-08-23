import React, {useState, useEffect} from 'react'
import { message, Switch as AntSwitch } from "antd";
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux'; 

function Trading() {
    const {get_Live_Trade, update_Live_Trade} = useActions();
    const {liveTrades, success, error} = useSelector(state =>state.liveTrade)
    const [liveTrade, setLiveTrade] = useState(true);
    useEffect(()=>{
      get_Live_Trade();
      setLiveTrade(liveTrades)
    }, []);

    const updateTrade = ()=>{
      const data = {liveTrade:liveTrade}
      update_Live_Trade(data);
      if(success && success.length > 0){
        message.success(success)
      }
      get_Live_Trade()
    }
    return (
        <div>
           <div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable live trading</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              id="native-trading-one"
                              name="native-trading"
                              checked={liveTrade}
                              onChange={()=>setLiveTrade(!liveTrade)}
                              onClick={updateTrade}
                            />
                          </div>

                          {/* <div className="switch-field-round">
                            <input
                              type="radio"
                              id="native-trading-one"
                              name="native-trading"
                              value={this.state.isLiveTradeActive}
                              checked={this.state.isLiveTradeActive}
                              onChange={this.handleChange.bind(this)}
                            />
                            <label htmlFor="native-trading-one">ON</label>
                            <input
                              type="radio"
                              id="native-trading-two"
                              name="native-trading"
                              value={this.state.isLiveTradeActive}
                             
                            />
                            <label htmlFor="native-trading-two">OFF</label>
                          </div> */}
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            User can choose between live trading and no-live
                            trading
                          </h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />

                            {/* <input
                              type="radio"
                              id="no-native-trading-one"
                              name="no-native-trading"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="no-native-trading-one">ON</label>
                            <input
                              type="radio"
                              id="no-native-trading-two"
                              name="no-native-trading"
                              defaultValue="no"
                            />
                            <label htmlFor="no-native-trading-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable native trading without exchange</h4>
                          <p>
                            Warning !<br />
                            This option is more risky, because you need to
                            manage by yourself the liquidy
                          </p>
                          <p>
                            You need to active the exchanges you want for fetch
                            data from exchange
                          </p>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />
                            {/* <input
                              type="radio"
                              id="without-exchange-one"
                              name="without-exchange"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="without-exchange-one">ON</label>
                            <input
                              type="radio"
                              id="without-exchange-two"
                              name="without-exchange"
                              defaultValue="no"
                            />
                            <label htmlFor="without-exchange-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Balance configuration */}
                    <h3 className="font-weight-normal">
                      Balance configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Show balance estimation</h4>
                          <p>Based on all wallet</p>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />
                            {/* <input
                              type="radio"
                              id="balance-estimation-one"
                              name="balance-estimation"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="balance-estimation-one">ON</label>
                            <input
                              type="radio"
                              id="balance-estimation-two"
                              name="balance-estimation"
                              defaultValue="no"
                            />
                            <label htmlFor="balance-estimation-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User user currency select</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />

                            {/* <input
                              type="radio"
                              id="currency-select-one"
                              name="currency-select"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="currency-select-one">ON</label>
                            <input
                              type="radio"
                              id="currency-select-two"
                              name="currency-select"
                              defaultValue="no"
                            />
                            <label htmlFor="currency-select-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Show balance estimation in</h4>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="USD">USD</option>
                            <option value="NAV">NAV</option>
                            <option value="PHB">PHB</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Leaderboard */}
                    <h3 className="font-weight-normal">Leaderboard</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Enable leaderboard (native trading need to be
                            enabled)
                          </h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                            />
                            {/* <input
                              type="radio"
                              id="enable-leaderboard-one"
                              name="enable-leaderboard"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-leaderboard-one">ON</label>
                            <input
                              type="radio"
                              id="enable-leaderboard-two"
                              name="enable-leaderboard"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-leaderboard-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Markets */}
                    <h3 className="font-weight-normal">Markets</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Enable referral (native trading need to be enabled)
                          </h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                            />
                            {/* <input
                              type="radio"
                              id="enable-referal-one"
                              name="enable-referal"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-referal-one">ON</label>
                            <input
                              type="radio"
                              id="enable-referal-two"
                              name="enable-referal"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-referal-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Referral commission (in $, fixed amount)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Deposit configuration */}
                    <h3 className="font-weight-normal">
                      Deposit configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Deposit fees (in %)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Deposit currencies allowed</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Deposit wallet receive (if wallet real currency not
                            available)
                          </h4>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank transfer deposit agreement</h4>
                        </div>
                        <div className="actions">
                          <textarea
                            className="dash-textarea"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Withdraw configuration */}
                    <h3 className="font-weight-normal">
                      Withdraw configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable automatic cryptocurrencies withdraw</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                            />
                            {/* <input
                              type="radio"
                              id="auto-withdraw-one"
                              name="auto-withdraw"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="auto-withdraw-one">ON</label>
                            <input
                              type="radio"
                              id="auto-withdraw-two"
                              name="auto-withdraw"
                              defaultValue="no"
                            />
                            <label htmlFor="auto-withdraw-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Configure exchange needed for each cryptocurrencies
                          </h4>
                        </div>
                        <div className="actions"></div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Configure exchange needed for each cryptocurrencies
                          </h4>
                          <p>
                            You can define each exchange will be used for the
                            withdraw for each cryptocurrency
                          </p>
                          <p>
                            Ex : BTC = Binance
                            <br />
                            Ex : ETH = Okcoin
                            <br />
                            Ex : LTC = Btcmarkets
                          </p>
                        </div>
                        <div className="actions">
                          <a
                            className="dash-success-btn"
                            href="configure-exchange.html"
                          >
                            Configure Exchanges
                          </a>
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Withdraw processing time (in days)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Withdraw fees (in %)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Withdraw reference pattern</h4>
                          <p>
                            $ : Random number (0-9)
                            <br />* : Random Letter (A-Z)
                          </p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Bank transfer alert when withdraw currency is not
                            crypto-currency
                          </h4>
                        </div>
                        <div className="actions">
                          <textarea
                            className="dash-textarea"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>
                            Cryptocurrencies allowed for bank transfer withdraw
                          </h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Trading configuration */}
                    <h3 className="font-weight-normal">
                      Trading configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Trading fees (in %)</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Order reference pattern</h4>
                          <p>
                            $ : Random number (0-9)
                            <br />* : Random Letter (A-Z)
                          </p>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Real account configuration */}
                    <h3 className="font-weight-normal">
                      Real account configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable real account</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />
                            {/* <input
                              type="radio"
                              id="enable-real-account-one"
                              name="enable-real-account"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-real-account-one">ON</label>
                            <input
                              type="radio"
                              id="enable-real-account-two"
                              name="enable-real-account"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-real-account-two">OFF</label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Practice account configuration */}
                    <h3 className="font-weight-normal">
                      Practice account configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable practice account</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <AntSwitch
                              className="ant-switch"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              defaultChecked
                            />
                            {/* <input
                              type="radio"
                              id="enable-practice-account-one"
                              name="enable-practice-account"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-practice-account-one">
                              ON
                            </label>
                            <input
                              type="radio"
                              id="enable-practice-account-two"
                              name="enable-practice-account"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-practice-account-two">
                              OFF
                            </label> */}
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Maximum free deposit (in $)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Free deposit wallet receive</h4>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="save-btn">
                      <button>Save</button>
                    </div>
                  </div>  
        </div>
    )
}

export default Trading
