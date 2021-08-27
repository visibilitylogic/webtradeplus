import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { Card, message } from "antd";
import { userDetails, userId } from '../../store/utils/getUserDetails';
import axios from 'axios';
function AutoTrade() {
    const {user, userId  } = useSelector(state => state.auth);
    const idArray = user && user.subcriptionPlan;
    const {loading , trades} = useSelector(state=> state.adminData);
    const [singleTrade, setSingleTrade] = useState({});
    const [singleTradeLoading, setSingleTradeLoading] = useState(false);
    const [sub, setSub] = useState(false);
    const [isAgree, setISAgree] = useState(false)
    const {get_all_auto_trades} = useActions()
   
    const subscribeTrade = (id) =>{
        axios
        .get(`https://trade-backend-daari.ondigitalocean.app/api/copytrade/${id}`)
        .then((response) => {
          // console.log(user.wallet, response.data.subscriptionFee);
          if (user.wallet < response.data.subscriptionFee) {
            message.warning(
              "Insufficient funds, kindly fund your wallet and try again"
            ); 
           
          } else {
            setSub(true);
            setSingleTrade(response.data)
           
          }
        });
    
    }
    const unsubscribeAutotrade = (id) => {
      setSingleTradeLoading( true);
      axios
        .put(
          `https://trade-backend-daari.ondigitalocean.app/api/copytrade/unsubscribe/${id}`,
          { userId: user ?  user._id : null }
        )
        .then((response) => {
          const res = axios.put(
            `https://trade-backend-daari.ondigitalocean.app/api/profile/autoTrade`,
            {
              id: user ?  user._id : null,
              autoTrade: false,
              isTrading: true,
            }
          );
          if (res) {
            message.success("auto trade has been disabled");
          }
          setSub(false);
          setSingleTradeLoading(true)
          message.success("subscription was ended");
        });
    };

    useEffect(()=>{
      get_all_auto_trades()  
  }, [])
    const subscribeAutotrade = (id) => {
      setSingleTradeLoading(true);
      axios
        .put(
          `https://trade-backend-daari.ondigitalocean.app/api/copytrade/subscribe/${id}`,
          { userId: user ?  user._id : null }
        )
        .then(async(response) => {
          const res = await axios.put(
            `https://trade-backend-daari.ondigitalocean.app/api/profile/autoTrade`,
            {
              id:user ? user._id : null,
              autoTrade: true,
              isTrading: false,
            }
          );
          if (res) {
            message.success("auto trade has been enabled");
          }
          setSub(false)
          setSingleTradeLoading(true)
          message.success("subscription was successful", ()=> window.location.reload());
        });
    };
    return (
        <div className="dash-contents">
        <div className="dash-row">
            {loading &&   <Spinner style={{display:"flex", justifyContent:"center", alignItems:"center"}} animation="grow" />}
                      
                <div className="center_orders">
                  <div className="text-center">
                    <h4 className="my-4" style={{ color: "#fff", textAlign:"center" }}>
                      Subscribe Now to Auto Copy our Top Performing Traders
                    </h4>
                  </div>
                  <Row style={{ marginBottom: "10%" }}>
                    {trades && trades.map((data, index) => (
                      <Col md={4} className="mt-3" key={index}>
                        <Card className="card_style">
                          <p>Username: {data.userName}</p>
                          <p>Profit % = {data.profitPercentage}%</p>
                          <p>
                            Subscription Fee: $
                            {new Intl.NumberFormat('en-US').format(data.subscriptionFee)}
                          </p>
                          <div className="text-center mt-3">
                           
                            {idArray.some(subPlan => subPlan._id === data._id) ? (
                              <Button
                                onClick={() =>
                                    
                                  unsubscribeAutotrade(data._id)
                                }
                              >
                                Unsubscribe
                              </Button>
                            ) : ( 
                              <Button
                                onClick={() =>
                                  subscribeTrade(data._id)
                                }
                              >
                                Subscribe
                              </Button>
                             )} 
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              

              {
                sub ? (
                  <section
                  className="withdraw-modal-box personal-data-modal"
                  style={{ display: "block" }}
                >
                  <div className="withdraw-modal personal-modal w-50">
                    <div className="header">Subscribe</div>
                    <div className="dash-row">
                      <div className="content">
                        <div className="billing-form text-left">
                          <p className="text-white">
                            Confirm that you want to copy{" "}
                            {singleTrade.userName} trade activity for
                            the period of 30 days
                          </p>
                          <p className="text-white">
                            Subscription = $
                            {new Intl.NumberFormat('en-US').format(singleTrade.subscriptionFee)}
                          </p>
                          <Form>
                            <Form.Check
                              type="checkbox"
                              className="my-1 mr-sm-2 text-white "
                              id="agreement"
                              label="I agree"
                              custom
                              onChange={(e) =>
                                setISAgree( e.target.checked )
                              }
                            />
                            <div className="d-flex justify-content-between mt-4">
                              <div>
                                <Button
                                  variant="light"
                                  onClick={() =>
                                    setSub(false )
                                  }
                                >
                                  Cancel
                                </Button>
                              </div>
                              <div>
                                <Button
                                  style={{}}
                                  onClick=""
                                  variant="primary"
                                  className="mb-4"
                                  disabled={!isAgree}
                                  onClick={() => {
                                    subscribeAutotrade(singleTrade._id);
                                  }}
                                >
                                  {singleTradeLoading
                                    ? "Subscribing..."
                                    : "Confirm"}
                                </Button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <span
                      className="close"
                      onClick={() => setSub( false )}
                    >
                      <svg id="lnr-cross " viewBox="0 0 1024 1024">
                        <title>cross</title>
                        <path
                          className="path1"
                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                        />
                      </svg>
                    </span>{" "}
                  </div>
                </section>
                ):(" ")
              }
              </div>
              </div>
            
        
    )
}

export default AutoTrade
