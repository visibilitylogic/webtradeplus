import React, {useState, useEffect} from 'react';
import "./Mail.css";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
function Payment() {
    const {adminData} = useSelector(state=> state.adminInfo); 
  const [paymentSuccessText, setpaymentSuccessText] = useState("");
  const [paymentRefPattern, setpaymentRefPattern] = useState("");
  const [paymentMinDeposit, setPaymentMinDeposit] = useState("");
  const [paymentMaxDeposit, setPaymentMaxDeposit] = useState("");
  const [paymentMinWithdraw, setPaymentMinWithdraw] = useState("");
  const [paymentMaxWithdraw, setPaymentMaxWithdraw] = useState("");
  const [paymentNeedsApproval, setpaymentNeedsApproval] = useState(null);
  const [masterCardStatus, setmasterCardStatus] = useState(null);
  const [bitCoinStatus, setbitCoinStatus] = useState(null);
  const [btcHeaderText, setbtcHeaderText] = useState("");
  const [btcAddress, setbtcAddress] = useState("");
  const [buyBTCLink, setbuyBTCLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const dataAll = {
    paymentSuccessText: paymentSuccessText,
    paymentRefPattern: paymentRefPattern,
    paymentMinDeposit: paymentMinDeposit,
    paymentMaxDeposit: paymentMaxDeposit,
    paymentMinWithdraw: paymentMinWithdraw,
    paymentMaxWithdraw: paymentMaxWithdraw,
    paymentNeedsApproval: paymentNeedsApproval,
    masterCardStatus: masterCardStatus,
    bitCoinStatus: bitCoinStatus,
    buyBTCLink: buyBTCLink,
    btcAddress: btcAddress,
    btcHeaderText: btcHeaderText,
  };
  useEffect(() => {
    if (adminData) {
      setpaymentSuccessText(adminData.paymentSuccessText);
      setpaymentRefPattern(adminData.paymentRefPattern);
      setpaymentNeedsApproval(adminData.paymentNeedsApproval);
      setPaymentMinDeposit(adminData.paymentMinDeposit);
      setPaymentMaxDeposit(adminData.paymentMaxDeposit);
      setPaymentMinWithdraw(adminData.paymentMinWithdraw);
      setPaymentMaxWithdraw(adminData.paymentMaxWithdraw);
      setmasterCardStatus(adminData.masterCardStatus);
      setbitCoinStatus(adminData.bitCoinStatus);
      setbtcHeaderText(adminData.btcHeaderText);
      setbtcAddress(adminData.btcAddress);
      setbuyBTCLink(adminData.buyBTCLink);
    }
  }, []);

  const onSaved = {
      
  }
    return (
        <div>
            
        <div>
        <div
          className="public-card"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <div className="dash-row dash-row-centralized payment-integration">
            <div className="platform">
              <img src="https://www.pngfind.com/pngs/m/328-3281030_mastercard-logo-png-mastercard-png-transparent-png.png" />
            </div>
            <div className="subscription">
              <a
                className="icon mdi mdi-information-outline"
                href="https://help.ovrley.com/help-center/articles/6/fortumo"
                target="_blank"
              />{" "}
              <span className="font-size-13 text-fade">
                This payment gateway is only available for
                subscription system
              </span>
            </div>
            <div className="action">
              {masterCardStatus === true ? (
                <span className="enabled text-uppercase">
                  Enabled
                </span>
              ) : (
                <span className="disabled text-uppercase">
                  Disabled
                </span>
              )}

              <NavLink to="/mastercard" className="configure">
                Configure
              </NavLink>
            </div>
          </div>
          <div className="dash-row dash-row-centralized payment-integration">
            <div className="platform">
              <img
                style={{ width: "50%" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
              />
            </div>
            <div className="subscription">
              <a
                className="icon mdi mdi-information-outline"
                href="https://help.ovrley.com/help-center/articles/6/fortumo"
                target="_blank"
              />{" "}
              <span className="font-size-13 text-fade">
                This payment gateway is only available for
                subscription system
              </span>
            </div>
            <div className="action">
              {bitCoinStatus === true ? (
                <span className="enabled text-uppercase">
                  Enabled
                </span>
              ) : (
                <span className="disabled text-uppercase">
                  Disabled
                </span>
              )}
              <NavLink to="/bitcoin" className="configure">
                Configure
              </NavLink>
            </div>
          </div>
        </div>
        <div className="public-card">
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Payment success</h4>
            </div>
            <div className="actions">
              <input
                value={paymentSuccessText}
                onChange={(e) =>
                  setpaymentSuccessText(e.target.value)
                }
                className="dash-input"
                type="text"
                name="text"
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Deposit minimum (in $)</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="number"
                name="text"
                value={paymentMinDeposit}
                onChange={(e) => setPaymentMinDeposit(e.target.value)}
              />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Deposit maximum (in $)</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="number"
                name="text"
                value={paymentMaxDeposit}
                onChange={(e) => setPaymentMaxDeposit(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Withdraw minimum (in $)</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="number"
                name="text"
                value={paymentMinWithdraw}
                onChange={(e) =>
                  setPaymentMinWithdraw(e.target.value)
                }
              />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Withdraw maximum (in $)</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="number"
                name="text"
                value={paymentMaxWithdraw}
                onChange={(e) =>
                  setPaymentMaxWithdraw(e.target.value)
                }
              />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Payment reference pattern</h4>
              <p>
                $ : Random number (0-9)
                <br />* : Random Letter (A-Z)
              </p>
            </div>
            <div className="actions">
              <input
                value={paymentRefPattern}
                onChange={(e) => setpaymentRefPattern(e.target.value)}
                className="dash-input"
                type="text"
                name="text"
              />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Payment need to be approved</h4>
            </div>
            <div className="actions switch-field">
              <div className="switch-field-round">
                <input
                  type="radio"
                  id="approved-payment-one"
                  name="approved-payment"
                  defaultValue="yes"
                  onChange={(e) =>
                    setpaymentNeedsApproval(
                      e.target.checked ? true : false
                    )
                  }
                  checked={
                    paymentNeedsApproval === true ? true : false
                  }
                />
                <label htmlFor="approved-payment-one">ON</label>
                <input
                  type="radio"
                  id="approved-payment-two"
                  name="approved-payment"
                  defaultValue="no"
                  onChange={(e) =>
                    setpaymentNeedsApproval(
                      e.target.checked ? false : true
                    )
                  }
                  checked={
                    paymentNeedsApproval === false ? true : false
                  }
                />
                <label htmlFor="approved-payment-two">OFF</label>
              </div>
            </div>
          </div>
        </div>
        <div className="save-btn">
          <button disabled={submitLoading} onClick={onSaved}>
            Save
          </button>
        </div>
      </div>

        </div>    
    )
}

export default Payment
