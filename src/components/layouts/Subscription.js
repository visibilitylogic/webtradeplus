import React from 'react'

function Subscription() {
    return (
        <div>
        <div className="public-card">
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Enable subscriptions</h4>
            </div>
            <div className="actions">
              <div style={{backgroundColor: '#e54747', color: '#fff', padding: '15px 25px'}}>
                <center>
                  <span>Credit card or Paypal payment need to be enabled !</span>
                </center>
              </div>
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Enable free trial</h4>
            </div>
            <div className="actions switch-field">
              <div className="switch-field-round">
                <input type="radio" id="enable-free-trial-one" name="enable-free-trial" defaultValue="yes" defaultChecked />
                <label htmlFor="enable-free-trial-one">ON</label>
                <input type="radio" id="enable-free-trial-two" name="enable-free-trial" defaultValue="no" />
                <label htmlFor="enable-free-trial-two">OFF</label>
              </div>
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Free trial duration (in day)</h4>
            </div>
            <div className="actions">
              <input type="text" name="text" className="dash-input" />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Premium features</h4>
            </div>
            <div className="actions">
              <textarea className="dash-text-area" defaultValue={""} />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Free users features</h4>
            </div>
            <div className="actions switch-field">
              <div className="switch-field-inline">
                <span>Blockfolio</span>
                <div className="switch-field-round">
                  <input type="radio" id="blockfolio-one" name="blockfolio" defaultValue="yes" defaultChecked />
                  <label htmlFor="blockfolio-one">ON</label>
                  <input type="radio" id="blockfolio-two" name="blockfolio" defaultValue="no" />
                  <label htmlFor="blockfolio-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Marketanalytic</span>
                <div className="switch-field-round">
                  <input type="radio" id="marketanalytic-one" name="marketanalytic" defaultValue="yes" defaultChecked />
                  <label htmlFor="marketanalytic-one">ON</label>
                  <input type="radio" id="marketanalytic-two" name="marketanalytic" defaultValue="no" />
                  <label htmlFor="marketanalytic-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>News</span>
                <div className="switch-field-round">
                  <input type="radio" id="news-one" name="news" defaultValue="yes" defaultChecked />
                  <label htmlFor="news-one">ON</label>
                  <input type="radio" id="news-two" name="news" defaultValue="no" />
                  <label htmlFor="news-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Social</span>
                <div className="switch-field-round">
                  <input type="radio" id="social-one" name="social" defaultValue="yes" defaultChecked />
                  <label htmlFor="social-one">ON</label>
                  <input type="radio" id="social-two" name="social" defaultValue="no" />
                  <label htmlFor="social-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Tradinglive</span>
                <div className="switch-field-round">
                  <input type="radio" id="tradinglive-one" name="tradinglive" defaultValue="yes" defaultChecked />
                  <label htmlFor="tradinglive-one">ON</label>
                  <input type="radio" id="tradinglive-two" name="tradinglive" defaultValue="no" />
                  <label htmlFor="tradinglive-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Notifications Phone</span>
                <div className="switch-field-round">
                  <input type="radio" id="notify-phone-one" name="notify-phone" defaultValue="yes" defaultChecked />
                  <label htmlFor="notify-phone-one">ON</label>
                  <input type="radio" id="notify-phone-two" name="notify-phone" defaultValue="no" />
                  <label htmlFor="notify-phone-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Googleauthenticator</span>
                <div className="switch-field-round">
                  <input type="radio" id="googleauthenticator-one" name="googleauthenticator" defaultValue="yes" defaultChecked />
                  <label htmlFor="googleauthenticator-one">ON</label>
                  <input type="radio" id="googleauthenticator-two" name="googleauthenticator" defaultValue="no" />
                  <label htmlFor="googleauthenticator-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Heat Map</span>
                <div className="switch-field-round">
                  <input type="radio" id="heat-map-one" name="heat-map" defaultValue="yes" defaultChecked />
                  <label htmlFor="heat-map-one">ON</label>
                  <input type="radio" id="heat-map-two" name="heat-map" defaultValue="no" />
                  <label htmlFor="heat-map-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Calculator</span>
                <div className="switch-field-round">
                  <input type="radio" id="calculator-one" name="calculator" defaultValue="yes" defaultChecked />
                  <label htmlFor="calculator-one">ON</label>
                  <input type="radio" id="calculator-two" name="calculator" defaultValue="no" />
                  <label htmlFor="calculator-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Livemarket</span>
                <div className="switch-field-round">
                  <input type="radio" id="livemarket-one" name="livemarket" defaultValue="yes" defaultChecked />
                  <label htmlFor="livemarket-one">ON</label>
                  <input type="radio" id="livemarket-two" name="livemarket" defaultValue="no" />
                  <label htmlFor="livemarket-two">OFF</label>
                </div>
              </div>
              <div className="switch-field-inline">
                <span>Exportgraph</span>
                <div className="switch-field-round">
                  <input type="radio" id="exportgraph-one" name="exportgraph" defaultValue="yes" defaultChecked />
                  <label htmlFor="exportgraph-one">ON</label>
                  <input type="radio" id="exportgraph-two" name="exportgraph" defaultValue="no" />
                  <label htmlFor="exportgraph-two">OFF</label>
                </div>
              </div>
            </div>
          </div>
          <div className="save-btn">
            <button>Save</button>
          </div>
        </div>
        {/* Add a new plan */}
        <h3 className="font-weight-normal">Add a new plan</h3>
        <div className="hr" />
        <div className="public-card">
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Name plan</h4>
            </div>
            <div className="actions">
              <input className="dash-input" type="text" name="text" />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Price total</h4>
            </div>
            <div className="actions">
              <input className="dash-input" type="text" name="text" />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Duration in days</h4>
            </div>
            <div className="actions">
              <input className="dash-input" type="text" name="text" />
            </div>
          </div>
          <div className="save-btn">
            <button>Add this plan</button>
          </div>
        </div>
        {/* Plans available */}
        <h3 className="font-weight-normal">Plans available</h3>
        <div className="hr" />
        <table>
          <tbody><tr>
              <th>Name plan</th>
              <th>Price plan</th>
              <th>Duration in days</th>
              <th>Duration in month</th>
              <th>Price per month</th>
            </tr>
            <tr>
            </tr>
          </tbody></table>
      </div>
      
                      
    )
}

export default Subscription
