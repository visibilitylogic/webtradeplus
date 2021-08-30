import React, {useState, useEffect} from 'react'
import {Select, message} from "antd";
import { useSelector } from 'react-redux';
import {countryList}  from "../../helpers/dataset/countryList";
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import getToken from '../../store/utils/gettoken';
const {Option} = Select;
function General_setting() {
  const {change_admin_data, get_admin_data} = useActions();
  const {adminData} = useSelector(state=> state.adminInfo)
  const [siteLogo, setLogo] = useState("");
  const [siteLogoWhite, setsiteLogoWhite]=useState("");
  const [useWhiteLogo, setuseWhiteLogo ]=useState(null)
  const [siteFav, setFav] = useState("");
  const [donationText, setDonationText] = useState("");
  const [siteTitle, setTitle] = useState("");
  const [donationAddress, setDonationAddress] = useState("");
  const [enableDonation, setEnableDonation] = useState(null);
  const [blackListedCountry, setBlackListedCountry] = useState([]);
  const [cookiePopupText, setCookiePopupText] = useState("");
  const [cookiePopupTitle, setCookiePopupTitle] = useState("");
  const [enableCookiePopup, setEnableCookiePopup] = useState(null);
  const [googleAnalytics, setGoogleAnalytics] = useState("");
  const [enablePOEditorLanguage, setEnablePOEditorLanguage] = useState(null);
  const [POEditorAPIKey, setPOEditorAPIKey] = useState("");
  const [language, setLanguage] = useState("");
  const [numberFormat, setNumberFormat] = useState("");
  const [englishEnableAutolanguage, setEnglishEnableAutolanguage] = useState("");
  const [disableChart, setDisableChart] = useState(null);
  const [allowUsersswitchView, setAllowUsersswitchView] = useState(null);
  const [switchChartTradingView, setSwitchChartTradingView] = useState(null);
  const [maintenanceMode, setMaintenanceMode] = useState(null);
  const [currencyPosition, setCurrencyPosition] = useState(null);
  const [appDescription, setAppDescription] = useState(null);
  const [startWatchUserSignUp, setStartWatchUserSignUp] = useState(null);
  const [startWatchNewUserSignUp, setStartWatchNewUserSignUp] = useState(null);
  const [enableGoogleAd, setEnableGoogleAds] = useState(null);
  const [googleAdClient, setGoogleAdClient] = useState("");
  const [googleSlot, setGoogleSlot] = useState("");
  const [privacyPolicyLink, setprivacyPolicyLink]=useState("")
  const [termsOfServicesLink, settermsOfServicesLink]=useState("")
  const [loading, setLoading] = useState(false);
  function handleChangeCountry(value) {
    setBlackListedCountry(value);
  }

  useEffect(() => {
    if (adminData) {
      setDonationAddress(adminData.donationAddress);
      setDonationText(adminData.donationText);
      setEnableDonation(adminData.enableDonation);
      setBlackListedCountry(adminData.blacklistedCountries);
      setCookiePopupText(adminData.cookiePopupText);
      setCookiePopupTitle(adminData.cookiePopupTitle);
      setEnableCookiePopup(adminData.enableCookiePopup);
      setGoogleAnalytics(adminData.googleAnalytics);
      setEnablePOEditorLanguage(adminData.enablePOEEditorLanguage);
      setPOEditorAPIKey(adminData.POEditorAPIKeys);
      setLanguage(adminData.siteLanguage);
      setEnglishEnableAutolanguage(adminData.enableAutoLanguage);
      setDisableChart(adminData.disableChart);
      setSwitchChartTradingView(adminData.allowUsersswitchView);
      setAllowUsersswitchView(adminData.switchChartTradingView);
      setMaintenanceMode(adminData.maintenanceMode);
      setCurrencyPosition(adminData.currencyPosition);
      setAppDescription(adminData.appDescription);
      setStartWatchUserSignUp(adminData.startWatchUserSignUp);
      setStartWatchNewUserSignUp(adminData.startWatchNewUserSignUp);
      setNumberFormat(adminData.numberFormat);
      setEnableGoogleAds(adminData.enableGoogleAds);
      setGoogleAdClient(adminData.googleAdClient);
      setGoogleSlot(adminData.googleSlot);
      setTitle(adminData.siteTitle);
      setFav(adminData.siteFav);
      setLogo(adminData.siteLogo);
      setprivacyPolicyLink(adminData.privacyPolicyLink);
      settermsOfServicesLink(adminData.termsOfServicesLink);
      setsiteLogoWhite(adminData.siteLogoWhite);
      setuseWhiteLogo(adminData.useWhiteLogo )
    }
},[]);

const handleImageChangeLogo = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLogo(reader.result);
      };
    }
  };
  const handleImageChangeLogoWhite = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setsiteLogoWhite(reader.result);
      };
    }
  };

  
  const handleImageChangesiteFav = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFav(reader.result);
      };
    }
  };

  let dataAll = {
    googleAdClient: googleAdClient,
    startWatchNewUserSignUp: startWatchNewUserSignUp,
    startWatchUserSignUp: startWatchUserSignUp,
    donationAddress: donationAddress,
    donationText: donationText,
    enableDonation: enableDonation,
    blacklistedCountries: blackListedCountry,
    cookiePopupText: cookiePopupText,
    cookiePopupTitle: cookiePopupTitle,
    googleAnalytics: googleAnalytics,
    POEditorAPIKey: POEditorAPIKey,
    siteLanguage: language,
    enableAutoLanguage: englishEnableAutolanguage,
    disableChart: disableChart,
    allowUsersswitchView: allowUsersswitchView,
    switchChartTradingView: switchChartTradingView,
    maintenanceMode: maintenanceMode,
    currencyPosition: currencyPosition,
    appDescription: appDescription,
    enableGoogleAds: enableGoogleAd,
    enableCookiePopup: enableCookiePopup,
    enablePOEEditorLanguage: enablePOEditorLanguage,
    numberFormat: numberFormat,
    googleSlot: googleSlot,
    siteLogo: siteLogo,
    siteFav: siteFav,
    siteTitle: siteTitle,
    privacyPolicyLink:privacyPolicyLink,
    termsOfServicesLink:termsOfServicesLink,
    siteLogoWhite:siteLogoWhite,
    useWhiteLogo :useWhiteLogo
  };
  const url = "https://trade-backend-daari.ondigitalocean.app/api/site/generalsettings"
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
                        <h4 className>Your logo</h4>
                        <p>
                          It's recommended to use a SVG logo for increase the
                          quality
                        </p>
                        <p>Max upload size : 64 MB</p>
                      </div>
                      <div className="actions">
                        <img className="logo" src={siteLogo} />
                        <input
                          type="file"
                          name="siteLogo"
                          onChange={handleImageChangeLogo}
                        />
                      </div>

                      <div className="save-btn">
                        
                        <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
                      </div>
                    </div>
                    

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4 className>Your White logo</h4>
                        <p>
                          It's recommended to use a SVG logo for increase the
                          quality
                        </p>
                        <p>Max upload size : 64 MB</p>
                      </div>
                      <div className="actions">
                        <img className="logo" src={siteLogoWhite} />
                        <input
                          type="file"
                          name="siteLogo"
                          onChange={handleImageChangeLogoWhite}
                        />
                        
                      </div>
                      <div className="save-btn">
                         
                         <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
                    </div>

                     
                    </div>
                 
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4 className>Your FavIcon </h4>
                        <p>
                          It's recommended to use a SVG logo for increase the
                          quality
                        </p>
                        <p>Max upload size : 64 MB</p>
                      </div>
                      <div className="actions">
                        <img className="logo" src={siteFav} />
                        <input
                          type="file"
                          name="siteFav"
                          onChange={handleImageChangesiteFav}
                        />
                      </div>
                      <div className="save-btn">                         
                           <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Title</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="text"
                          name="siteTitle"
                          placeholder="Title"
                          value={siteTitle}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>App description</h4>
                      </div>
                      <div className="actions">
                        <textarea
                          onChange={(e) => setAppDescription(e.target.value)}
                          value={appDescription}
                          placeholder="Your description here..."
                          className="dash-text-area"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Privacy Policy Link</h4>
                      </div>
                      <div className="actions">
                        <input type="text"
                          onChange={(e) => setprivacyPolicyLink(e.target.value)}
                          value={privacyPolicyLink}
                          placeholder="https://www.google.com/"
                          className="dash-input"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Terms Of Services Link</h4>
                      </div>
                      <div className="actions">
                        <input type="text"
                          onChange={(e) => settermsOfServicesLink(e.target.value)}
                          value={termsOfServicesLink}
                          placeholder="https://www."
                          className="dash-input"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Use White Logo</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setuseWhiteLogo(e.target.checked ? true : false)
                            }
                            type="radio"
                            id="use-white-logo-one"
                            name="use-white-logo"
                            defaultValue="yes"
                            // defaultChecked
                            checked={useWhiteLogo === true ? true : false}
                          />
                          <label htmlFor="use-white-logo-one">ON</label>
                          <input
                            type="radio"
                            onChange={(e) =>
                              setuseWhiteLogo(e.target.checked ? false : true)
                            }
                            id="use-white-logo-two"
                            name="use-white-logo"
                            defaultValue="no"
                            checked={useWhiteLogo === false ? true : false}
                          />
                          <label htmlFor="use-white-logo-two">OFF</label>
                        </div>
                      </div>
                    </div>


                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Maintenance mode</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setMaintenanceMode(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="maintenance-mode-one"
                            name="maintenance-mode"
                            defaultValue="yes"
                            // defaultChecked
                            checked={maintenanceMode === true ? true : false}
                          />
                          <label htmlFor="maintenance-mode-one">ON</label>
                          <input
                            onChange={(e) =>
                              setMaintenanceMode(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="maintenance-mode-two"
                            name="maintenance-mode"
                            defaultValue="no"
                            checked={maintenanceMode === false ? true : false}
                          />
                          <label htmlFor="maintenance-mode-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Number format</h4>
                      </div>
                      <div className="actions">
                        <select
                          onChange={(e) => setNumberFormat(e.target.value)}
                          value={numberFormat}
                          className="dash-select-short"
                        >
                          <option value="5,500.50">5,500.50</option>
                          <option value="5,500.50">5.500.50</option>
                          <option value="5,500.50">5,500.50</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Currency position</h4>
                      </div>
                      <div className="actions">
                        <select
                          onChange={(e) => setCurrencyPosition(e.target.value)}
                          value={currencyPosition}
                          className="dash-select-short"
                        >
                          <option value="Left">Left</option>
                          <option value="Right">Right</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Switch charts to tradingview charts</h4>
                        <p>
                          Some exchanges / pairs can be not available<span className="red-color">!</span>
                        </p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setSwitchChartTradingView(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="switch-charts-one"
                            name="switch-charts"
                            defaultValue="yes"
                            // defaultChecked
                            checked={
                              switchChartTradingView === true ? true : false
                            }
                          />
                          <label htmlFor="switch-charts-one">ON</label>
                          <input
                            onChange={(e) =>
                              setSwitchChartTradingView(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="switch-charts-two"
                            name="switch-charts"
                            defaultValue="no"
                            checked={
                              switchChartTradingView === false ? true : false
                            }
                          />
                          <label htmlFor="switch-charts-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Allow user to switch chart type</h4>
                        <p>
                          User will be able to choose between default chart and
                          tradingview chart library
                        </p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setAllowUsersswitchView(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="allow-user-one"
                            name="allow-user"
                            defaultValue="yes"
                            // defaultChecked
                            checked={
                              allowUsersswitchView === true ? true : false
                            }
                          />
                          <label htmlFor="allow-user-one">ON</label>
                          <input
                            onChange={(e) =>
                              setAllowUsersswitchView(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="allow-user-two"
                            name="allow-user"
                            defaultValue="no"
                            checked={
                              allowUsersswitchView === false ? true : false
                            }
                          />
                          <label htmlFor="allow-user-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Disable chat</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setDisableChart(e.target.checked ? true : false)
                            }
                            type="radio"
                            id="disable-chart-one"
                            name="disable-chart"
                            defaultValue="yes"
                            // defaultChecked
                            checked={disableChart === true ? true : false}
                          />
                          <label htmlFor="disable-chart-one">ON</label>
                          <input
                            type="radio"
                            onChange={(e) =>
                              setDisableChart(e.target.checked ? false : true)
                            }
                            id="disable-chart-two"
                            name="disable-chart"
                            defaultValue="no"
                            checked={disableChart === false ? true : false}
                          />
                          <label htmlFor="disable-chart-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Starting pair when new user signup</h4>
                        <p>Only 1 pair is allowed</p>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) =>
                            setStartWatchUserSignUp(e.target.value)
                          }
                          value={startWatchUserSignUp}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>
                          Starting watching list pair when new user signup
                        </h4>
                        <p>1 pair each for each line</p>
                        <p>Format : MARKET:SYMBOL/CURRENCY</p>
                        <p>Format : MARKET:SYMBOL/CURRENCY</p>
                      </div>
                      <div className="actions">
                        <textarea
                          onChange={(e) =>
                            setStartWatchNewUserSignUp(e.target.value)
                          }
                          className="dash-text-area"
                          defaultValue={""}
                          onChange={startWatchNewUserSignUp}
                          name="start-watch-list"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Remove the .php to the dashboard page extension</h4>
                        <p>Mod rewrite is : Disable</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setMaintenanceMode(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="remove-ext-one"
                            name="remove-ext"
                            defaultValue="yes"
                            defaultChecked
                          />
                          <label htmlFor="remove-ext-one">ON</label>
                          <input
                            type="radio"
                            id="remove-ext-two"
                            name="remove-ext"
                            defaultValue="no"
                          />
                          <label htmlFor="remove-ext-two">OFF</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Language</h4>
                      </div>
                      <div className="actions">
                        <select
                          onChange={(e) => setLanguage(e.target.value)}
                          value={language}
                          className="dash-select-short"
                          name
                        >
                          <option value="English">English</option>
                          <option value="Espanyol">Espanyol</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Enable autolanguage</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setEnglishEnableAutolanguage(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="auto-language-one"
                            name="auto-language"
                            defaultValue="yes"
                            checked={
                              englishEnableAutolanguage === true ? true : false
                            }
                          />
                          <label htmlFor="auto-language-one">ON</label>
                          <input
                            onChange={(e) =>
                              setEnglishEnableAutolanguage(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="auto-language-two"
                            name="auto-language"
                            defaultValue="no"
                            checked={
                              englishEnableAutolanguage === false ? true : false
                            }
                          />
                          <label htmlFor="auto-language-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Enable POEditor Language</h4>
                        <p>
                          Editor link :{" "}
                          <a target="_blank" href="https://poeditor.com">
                            https://poeditor.com
                          </a>
                        </p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setEnablePOEditorLanguage(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="po-editor-language-one"
                            name="po-editor-language"
                            defaultValue="yes"
                            // defaultChecked
                            checked={
                              enablePOEditorLanguage === true ? true : false
                            }
                          />
                          <label htmlFor="po-editor-language-one">ON</label>
                          <input
                            onChange={(e) =>
                              setEnablePOEditorLanguage(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="po-editor-language-two"
                            name="po-editor-language"
                            defaultValue="no"
                            checked={
                              enablePOEditorLanguage === false ? true : false
                            }
                          />
                          <label htmlFor="po-editor-language-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>POEditor API Key</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) => setPOEditorAPIKey(e.target.value)}
                          value={POEditorAPIKey}
                          className="dash-input"
                          type="text"
                          name="setpoe-key"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>POEditor Project Selector</h4>
                      </div>
                      <div className="actions">
                        <p className="small">
                          You need to enable POEditor, set your API Key access
                          and save for select your project
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Google Analytics</h4>
                      </div>
                      <div className="actions">
                        <textarea
                          onChange={(e) => setGoogleAnalytics(e.target.value)}
                          className="dash-text-area"
                          value={googleAnalytics}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Enable Google Ad</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setEnableGoogleAds(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="google-ad-one"
                            name="google-ad"
                            defaultValue="yes"
                            // defaultChecked
                            checked={enableGoogleAd === true ? true : false}
                          />
                          <label htmlFor="google-ad-one">ON</label>
                          <input
                            onChange={(e) =>
                              setEnableGoogleAds(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="google-ad-two"
                            name="google-ad"
                            defaultValue="no"
                            checked={enableGoogleAd === false ? true : false}
                          />
                          <label htmlFor="google-ad-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Google Ad Client</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) => setGoogleAdClient(e.target.value)}
                          value={googleAdClient}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Google Ad Slot</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) => setGoogleSlot(e.target.value)}
                          value={googleSlot}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Enable Cookie popup</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setEnableCookiePopup(
                                e.target.checked ? true : false
                              )
                            }
                            type="radio"
                            id="cookie-popup-one"
                            name="cookie-popup"
                            defaultValue="yes"
                            checked={enableCookiePopup === true ? true : false}
                          />
                          <label htmlFor="cookie-popup-one">ON</label>
                          <input
                            onChange={(e) =>
                              setEnableCookiePopup(
                                e.target.checked ? false : true
                              )
                            }
                            type="radio"
                            id="cookie-popup-two"
                            name="cookie-popup"
                            defaultValue="no"
                            checked={enableCookiePopup === false ? true : false}
                          />
                          <label htmlFor="cookie-popup-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Cookie Popup title</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) => setCookiePopupTitle(e.target.value)}
                          value={cookiePopupTitle}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Cookie Popup text</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={(e) => setCookiePopupText(e.target.value)}
                          value={cookiePopupText}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Blacklisted countries</h4>
                      </div>
                      <div className="actions">
                        <Select
                          className="dash-select-short"
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="select one country"
                          defaultValue={
                            (adminData && adminData.blacklistedCountries)
                              ? adminData.blacklistedCountries.map(
                                  (e) => e
                                )
                              : null
                          }
                          onChange={handleChangeCountry}
                          optionLabelProp="label"
                        >
                          { countryList && countryList.map((country) => (
                            <Option
                              style={{ color: "black" }}
                              key={country}
                              value={country}
                              label={country}
                            >
                              <div className="demo-option-label-item">
                                {country}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Enable Donation</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            onChange={(e) =>
                              setEnableDonation(e.target.checked ? true : false)
                            }
                            type="radio"
                            id="donation-one"
                            name="donation"
                            defaultValue="yes"
                            checked={enableDonation === true ? true : false}
                          />
                          <label htmlFor="donation-one">ON</label>
                          <input
                            onChange={(e) =>
                              setEnableDonation(e.target.checked ? false : true)
                            }
                            type="radio"
                            id="donation-two"
                            name="donation"
                            defaultValue="no"
                            checked={enableDonation === false ? true : false}
                          />
                          <label htmlFor="donation-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Donation text</h4>
                      </div>
                      <div className="actions">
                        <input className="dash-input" type="text" name="text" />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Donation address list</h4>
                        <p>Put 1 address per line</p>
                        <p>Line format : BTC:ADDRESS</p>
                      </div>
                      <div className="actions">
                        <textarea
                          className="dash-text-area"
                          onChange={(e) => setDonationAddress(e.target.value)}
                          value={donationAddress}
                        />
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

export default General_setting
