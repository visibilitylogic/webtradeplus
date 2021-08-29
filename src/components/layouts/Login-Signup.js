import { message } from 'antd';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import getToken from '../../store/utils/gettoken';
import { useActions } from '../hooks/useActions';
function LoginSignup() {
    const {adminData} = useSelector(state=> state.adminInfo)
    const {change_admin_data, get_admin_data} = useActions();
    const {success, error} = useSelector(state=> state.adminInfo)
    const [suc, setSuc] = useState("")
    const [e, setE] = useState("")
    const[allowsignup,setAlowSignup] = useState()
    const[phoneNumberRequired, setPhoneNumberRequired]= useState() 
    const[userNeedVerifyAccount, setUserVerifiedAccount] = useState()
    const[needCaptchaSignup,setNeedRecaptcha] = useState()
    const[googleRecaptchaSiteKey , setGoogleRecaptchaSiteKey]= useState() 
    const[googleRecaptchaSiteKeySecret, setGoogleRecaptchaSiteKeySecret] = useState() 
    const[signWithGoogle,setSignWithGoogle] = useState()
    const[googleAppID,setGoogleAppID] = useState() 
    const[googleAppSecret,setGoogleAppSecret]  = useState() 
    const[authorizationRedirectUrl,setAuthorizationRedirectUrl] = useState() 
    const[signInFacebook,setSignInFacebook ] = useState()
    const[facebookAppId,setFacebookAppId ]= useState()
    const[facebookAppSecret,setFacebookAppSecret] = useState() 
    const[URIOauthValid, setURIOauthValid]= useState() 
    const [loading, setLoading]=useState(false);


    useEffect(()=>{
        if (adminData) {
    setAlowSignup(adminData.allowsignup)
    setPhoneNumberRequired(adminData.phoneNumberRequired)
    setUserVerifiedAccount(adminData.userNeedVerifyAccount)
    setNeedRecaptcha(adminData.needCaptchaSignup)
    setGoogleRecaptchaSiteKey(adminData.googleRecaptchaSiteKey)    
    setGoogleRecaptchaSiteKeySecret(adminData.googleRecaptchaSiteKeySecret)
    setSignWithGoogle(adminData.signWithGoogle)
    setSignInFacebook(adminData.signInFacebook)
    setGoogleAppSecret(adminData.googleAppSecret)
    setGoogleAppID(adminData.googleAppID)
    setAuthorizationRedirectUrl(adminData.authorizationRedirectUrl)
    setFacebookAppId(adminData.facebookAppId)
    setFacebookAppSecret(adminData.facebookAppSecret)
    setURIOauthValid(adminData.URIOauthValid)
    }
    }, [])
    const dataAll =  {
        allowsignup :allowsignup,
        phoneNumberRequired :phoneNumberRequired,
        userNeedVerifyAccount :userNeedVerifyAccount,
        needCaptchaSignup :needCaptchaSignup,
        googleRecaptchaSiteKey :googleRecaptchaSiteKey,
        googleRecaptchaSiteKeySecret:googleRecaptchaSiteKeySecret,
        signWithGoogle :signWithGoogle,
        googleAppID :googleAppID,
        googleAppSecret :googleAppSecret,
        authorizationRedirectUrl :authorizationRedirectUrl,
        signInFacebook:signInFacebook,
        facebookAppId :facebookAppId,
        facebookAppSecret :facebookAppSecret,
        URIOauthValid :URIOauthValid
       }
       const url = "https://trade-backend-daari.ondigitalocean.app/api/site/loginAppearance"
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
                          <h4>Allow signup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setAlowSignup(e.target.checked?true:false)}

                              type="radio"
                              id="allow-signup-one"
                              name="allow-signup"
                              defaultValue="yes"
                              // defaultChecked
                              checked={allowsignup===true?true:false}
                            />
                            <label htmlFor="allow-signup-one">ON</label>
                            <input
                              onChange={e=>setAlowSignup(e.target.checked?false:true)}

                              type="radio"
                              id="allow-signup-two"
                              name="allow-signup"
                              defaultValue="no"
                              checked={allowsignup===false?true:false}
                            />
                            <label htmlFor="allow-signup-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Phone number required</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setPhoneNumberRequired(e.target.checked?true:false)}
                              type="radio"
                              id="phone-number-one"
                              name="phone-number"
                              defaultValue="yes"
                              // defaultChecked
                              checked={phoneNumberRequired===true?true:false}

                            />
                            <label htmlFor="phone-number-one">ON</label>
                            <input
                              onChange={e=>setPhoneNumberRequired(e.target.checked?false:true)}

                              type="radio"
                              id="phone-number-two"
                              name="phone-number"
                              defaultValue="no"
                              checked={phoneNumberRequired===false?true:false}

                            />
                            <label htmlFor="phone-number-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User need verify account</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setUserVerifiedAccount(e.target.checked?true:false)}
                              type="radio"
                              id="verify-account-one"
                              name="verify-account"
                              defaultValue="yes"
                              checked={userNeedVerifyAccount===true?true:false}

                              // defaultChecked
                            />
                            <label htmlFor="verify-account-one">ON</label>
                            <input
                            onChange={e=>setUserVerifiedAccount(e.target.checked?false:true)}

                              type="radio"
                              id="verify-account-two"
                              name="verify-account"
                              defaultValue="no"
                              checked={userNeedVerifyAccount===false?true:false}

                            />
                            <label htmlFor="verify-account-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Need captcha signup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setNeedRecaptcha(e.target.checked?true:false)}

                              type="radio"
                              id="need-captcha-one"
                              name="need-captcha"
                              defaultValue="yes"
                              checked={needCaptchaSignup===true?true:false}

                            />
                            <label htmlFor="need-captcha-one">ON</label>
                            <input
                              onChange={e=>setNeedRecaptcha(e.target.checked?false:true)}
                              type="radio"
                              id="need-captcha-two"
                              name="need-captcha"
                              defaultValue="no"
                              checked={needCaptchaSignup===false?true:false}

                            />
                            <label htmlFor="need-captcha-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Google Recaptcha Site Key</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setGoogleRecaptchaSiteKey(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={googleRecaptchaSiteKey}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Google Recaptcha Secret Key</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setGoogleRecaptchaSiteKeySecret(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={googleRecaptchaSiteKeySecret}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Authorised redirect url</h4>
                        </div>
                        <div className="actions">
                          <small className="text-fade">
                            https://linkinvest.pro/app/modules/kr-googleoauth/src/actions/callback.php
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Sigin with Facebook</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setSignInFacebook(e.target.checked?true:false)}
                              type="radio"
                              id="facebook-signin-one"
                              name="facebook-signin"
                              defaultValue="yes"
                              checked={signInFacebook===true?true:false}

                            />
                            <label htmlFor="facebook-signin-one">ON</label>
                            <input
                              onChange={e=>setSignInFacebook(e.target.checked?false:true)}

                              type="radio"
                              id="facebook-signin-two"
                              name="facebook-signin"
                              defaultValue="no"
                              checked={signInFacebook===false?true:false}


                            />
                            <label htmlFor="facebook-signin-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook App ID</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setFacebookAppId(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={facebookAppId}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook App Secret</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setFacebookAppSecret(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={facebookAppSecret}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook URI Oauth Valid</h4>
                        </div>
                        <div className="actions">
                          <small className="text-fade">
                            https://linkinvest.pro/app/modules/kr-facebookoauth/src/actions/callback.php
                          </small>
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

export default LoginSignup
