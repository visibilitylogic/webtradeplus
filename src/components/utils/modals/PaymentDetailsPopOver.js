import { Fragment } from "react";
import { Popover, Button } from "antd";

const PaymentDetails = ({ details }) => {
  const content = (
    <div style={{ maxWidth: "450px" }}>
      {details && details.method === "Card Deposit" ? (
        <div className="shadowed">
          <div className="dash-row dash-row-centralized">
            <div style={{ width: "50%", textAlign: "left" }}>
              Card Bearer Details
            </div>
            <div
              style={{ width: "100%", fontSize: "14px", padding: "10px 0" }}
              className="details"
            >
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Card Holder Name
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.cardName}
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Card Number
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.cardNumber}
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>CVV</div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.cardCvv}
                </div>
              </div>

              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Expiry Month
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.cardMonth}
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Expiry Year
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.cardYear}
                </div>
              </div>
              {details.homeAddress && (
                <div className="dash-row dash-row-centralized">
                  <div style={{ width: "50%", textAlign: "left" }}>
                    Home Address
                  </div>
                  <div style={{ width: "50%", textAlign: "right" }}>
                    {details.homeAddress}
                  </div>
                </div>
              )}
              {details.yourCountry && (
                <div className="dash-row dash-row-centralized">
                  <div style={{ width: "50%", textAlign: "left" }}>Country</div>
                  <div style={{ width: "50%", textAlign: "right" }}>
                    {details.yourCountry}
                  </div>
                </div>
              )}
              {details.yourState && (
                <div className="dash-row dash-row-centralized">
                  <div style={{ width: "50%", textAlign: "left" }}>City</div>
                  <div style={{ width: "50%", textAlign: "right" }}>
                    {details.yourState}
                  </div>
                </div>
              )}
              {details.zipCode && (
                <div className="dash-row dash-row-centralized">
                  <div style={{ width: "50%", textAlign: "left" }}>
                    Zip Code
                  </div>
                  <div style={{ width: "50%", textAlign: "right" }}>
                    {details.zipCode}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : details && details.method === "Cryptocurrency" ? (
        <div className="shadowed">
          <div className="dash-row dash-row-centralized">
            <div style={{ width: "50%", textAlign: "left" }}>
              Crypto Transfer
            </div>
            <div
              style={{ width: "100%", fontSize: "14px", padding: "10px 0" }}
              className="details"
            >
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>Name</div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.name}
                </div>
              </div>
            </div>
            <div
              style={{ width: "100%", fontSize: "14px", padding: "10px 0" }}
              className="details"
            >
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>Amount</div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {details.amount}
                </div>
              </div>
            </div>
            {/* 
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">    
                <div style={{ width: '50%', textAlign: 'left' }}>crypto currency address</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].cryptoCurrencyAddress}</div>
              </div>
            </div> */}
          </div>
        </div>
      ) : null}
    </div>
  );
  return (
    <Fragment>
      <Popover placement={"right"} content={content}>
        <Button type="link">Show Details</Button>
      </Popover>
    </Fragment>
  );
};

export default PaymentDetails;
