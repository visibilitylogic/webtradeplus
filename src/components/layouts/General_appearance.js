import { message } from 'antd';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import getToken from '../../store/utils/gettoken';
import { useActions } from '../hooks/useActions';
import "./Admin_side.css";

function General_appearance() {
  const {adminData} = useSelector(state=> state.adminInfo);
  const {get_admin_data} = useActions();
  const [yourMainColor, setYourMainColor] = useState("");
  const [siteMenuType, setsiteMenuType] = useState("");
  const [showFooterBar, setShowFooterBar] = useState(null);
  const [defaultThemeColor, setdefaultThemeColor] = useState("");
  const [userCanChangeTheme, setuserCanChangeTheme] = useState(null);
  const [showTimeInFooter, setshowTimeInFooter] = useState(null);
  const [showContactInFooter, setshowContactInFooter] = useState(null);
  const [showCalcaulator, setshowCalcaulator] = useState(null);
  const [loading, setLoading] = useState(false);
  

    useEffect(() => {
        if (adminData) {
          setYourMainColor(adminData.yourMainColor);
          setsiteMenuType(adminData.siteMenuType);
          setShowFooterBar(adminData.showFooterBar);
          setdefaultThemeColor(adminData.defaultThemeColor);
          setuserCanChangeTheme(adminData.userCanChangeTheme);
          setshowTimeInFooter(adminData.showTimeInFooter);
          setshowContactInFooter(adminData.showContactInFooter);
          setshowCalcaulator(adminData.showCalcaulator);
        }
      }, []);
    let dataAll = {
        yourMainColor: yourMainColor,
        siteMenuType: siteMenuType,
        showFooterBar: showFooterBar,
        defaultThemeColor: defaultThemeColor,
        userCanChangeTheme: userCanChangeTheme,
        showTimeInFooter: showTimeInFooter,
        showContactInFooter: showContactInFooter,
        showCalcaulator: showCalcaulator,
      };
      const url = "https://trade-backend-daari.ondigitalocean.app/api/site/generalappearance"
      const onSaved = ()=>{
        setLoading(true)
        axios
          .put(url, dataAll, getToken())
          .then(res=> {
            setLoading(false)
            message.success("Data Updated Successfully");
            get_admin_data()
          })
          .catch(err=>{
            message.error("Error occured while updataing")
          })
      }
    return (
        <div>
            <div>
             
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Your main color</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions">
                        <input
                          value={yourMainColor}
                          onChange={(e) => setYourMainColor(e.target.value)}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Menu type</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions">
                        <select
                          value={siteMenuType}
                          onChange={(e) => setsiteMenuType(e.target.value)}
                          className="dash-select-short"
                        >
                          <option value="Left, vertical">Left, vertical</option>
                          <option value="Top, horizontal">
                            Top, horizontal
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show footer bar</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="footer-bar-one"
                            name="footer-bar"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setShowFooterBar(e.target.checked ? true : false)
                            }
                            checked={showFooterBar === true ? true : false}
                          />
                          <label htmlFor="footer-bar-one">ON</label>
                          <input
                            onChange={(e) =>
                              setShowFooterBar(e.target.checked ? false : true)
                            }
                            checked={showFooterBar === false ? true : false}
                            type="radio"
                            id="footer-bar-two"
                            name="footer-bar"
                            defaultValue="no"
                          />
                          <label htmlFor="footer-bar-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>User can change theme</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="change-theme-one"
                            name="change-theme"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setuserCanChangeTheme(
                                e.target.checked ? true : false
                              )
                            }
                            checked={userCanChangeTheme === true ? true : false}
                          />
                          <label htmlFor="change-theme-one">ON</label>
                          <input
                            type="radio"
                            id="change-theme-two"
                            name="change-theme"
                            defaultValue="no"
                            onChange={(e) =>
                              setuserCanChangeTheme(
                                e.target.checked ? false : true
                              )
                            }
                            checked={
                              userCanChangeTheme === false ? true : false
                            }
                          />
                          <label htmlFor="change-theme-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Default theme color</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div
                        onChange={(e) => setdefaultThemeColor(e.target.value)}
                        value={defaultThemeColor}
                        className="actions"
                      >
                        <select className="dash-select-short">
                          <option value="Dark">Dark</option>
                          <option value="Light">Light</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show time in footer</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions">
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="time-in-footer-one"
                              name="time-in-footer"
                              defaultValue="yes"
                              // defaultChecked
                              onChange={(e) =>
                                setshowTimeInFooter(
                                  e.target.checked ? true : false
                                )
                              }
                              checked={showTimeInFooter === true ? true : false}
                            />
                            <label htmlFor="time-in-footer-one">ON</label>
                            <input
                              onChange={(e) =>
                                setshowTimeInFooter(
                                  e.target.checked ? false : true
                                )
                              }
                              checked={
                                showTimeInFooter === false ? true : false
                              }
                              type="radio"
                              id="time-in-footer-two"
                              name="time-in-footer"
                              defaultValue="no"
                            />
                            <label htmlFor="time-in-footer-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show contact in footer</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="contact-in-footer-one"
                            name="contact-in-footer"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setshowContactInFooter(
                                e.target.checked ? true : false
                              )
                            }
                            checked={
                              showContactInFooter === true ? true : false
                            }
                          />
                          <label htmlFor="contact-in-footer-one">ON</label>
                          <input
                            onChange={(e) =>
                              setshowContactInFooter(
                                e.target.checked ? false : true
                              )
                            }
                            checked={
                              showContactInFooter === false ? true : false
                            }
                            type="radio"
                            id="contact-in-footer-two"
                            name="contact-in-footer"
                            defaultValue="no"
                          />
                          <label htmlFor="contact-in-footer-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show calculator</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="show-calculator-one"
                            name="show-calculator"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setshowCalcaulator(
                                e.target.checked ? true : false
                              )
                            }
                            checked={showCalcaulator === true ? true : false}
                          />
                          <label htmlFor="show-calculator-one">ON</label>
                          <input
                            type="radio"
                            id="show-calculator-two"
                            name="show-calculator"
                            defaultValue="no"
                            onChange={(e) =>
                              setshowCalcaulator(
                                e.target.checked ? false : true
                              )
                            }
                            checked={showCalcaulator === false ? true : false}
                          />
                          <label htmlFor="show-calculator-two">OFF</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="save-btn">
                    <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
                  </div>
                </div>
        </div>
    )
}

export default General_appearance
