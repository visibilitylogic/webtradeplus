import { message } from 'antd';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import "./Mail.css";
function Template() {
  const {adminData} = useSelector(state=> state.adminInfo);  
  const {change_admin_data} = useActions();
  const {loading,success, error} = useSelector(state=> state.adminInfo)
  const [suc, setSuc] = useState("")
  const [e, setE] = useState("")
    const[privacyPolicy,setprivacyPolicy]=useState("")
    const[termsOfServices,settermsOfServices]=useState("")
    const[newUserWelcomeMail,setnewUserWelcomeMail]=useState("")
    const[activateUserAccountMail,setactivateUserAccountMail]=useState("")
    const[adminWithdrawRequestMail,setadminWithdrawRequestMail]=useState("")
    const[confirmWithdrawRequestMail,setconfirmWithdrawRequestMail]=useState("")
    const[wthdrawRequestProcessedMail,setwthdrawRequestProcessedMail]=useState("")
    const[userResetPasswordMail,setuserResetPasswordMail]=useState("")
    const[userResetPasswordConfirmationMail ,setuserResetPasswordConfirmationMail]=useState("")
    const[userSubscriptionEExpirationMail ,setuserSubscriptionEExpirationMail]=useState("")
    const[userNewIPDetectedMail,setuserNewIPDetectedMail]=useState("")
    const [submitLoading, setSubmitLoading] = useState(false);
  

    let dataAll = {
        privacyPolicy :privacyPolicy,
          termsOfServices :termsOfServices,
          newUserWelcomeMail :newUserWelcomeMail,
          activateUserAccountMail :activateUserAccountMail,
          adminWithdrawRequestMail :adminWithdrawRequestMail,
          confirmWithdrawRequestMail :confirmWithdrawRequestMail,
          wthdrawRequestProcessedMail :wthdrawRequestProcessedMail,
          userResetPasswordMail :userResetPasswordMail,
          userResetPasswordConfirmationMail :userResetPasswordConfirmationMail,
          userSubscriptionEExpirationMail :userSubscriptionEExpirationMail,
          userNewIPDetectedMail :userNewIPDetectedMail
      };
      useState(()=>{
        if (adminData) {
          setprivacyPolicy(adminData.privacyPolicy);
          settermsOfServices(adminData.termsOfServices);
          setnewUserWelcomeMail(adminData.newUserWelcomeMail);
          setactivateUserAccountMail(adminData.activateUserAccountMail);
          setadminWithdrawRequestMail(adminData.adminWithdrawRequestMail);
          setconfirmWithdrawRequestMail(adminData.confirmWithdrawRequestMail);
          setadminWithdrawRequestMail(adminData.adminWithdrawRequestMail);
          setwthdrawRequestProcessedMail(adminData.wthdrawRequestProcessedMail);
          setuserResetPasswordMail(adminData.userResetPasswordMail);
          setuserResetPasswordConfirmationMail (adminData.userResetPasswordConfirmationMail );
          setuserSubscriptionEExpirationMail(adminData.userSubscriptionEExpirationMail);
          setuserNewIPDetectedMail(adminData.userNewIPDetectedMail);
          
        }
      })
      const url = "https://trade-backend-daari.ondigitalocean.app/api/site/mailtemplates"
      const onSaved = ()=>{
        if(window.confirm("Are you to update the data")){
            change_admin_data(url, dataAll);
            if(success && success.length > 0){
              setSuc(success)
            }else if (error && error.length> 0){
              setE(error)
            }
          }
      }
    return (
        <div style={{width:"100%"}}>
          {
            (!loading && success ) && message.success(success)
          }
          {/* {
                  suc && message.success(suc, ()=> setSuc("")),
                  e && message.error(e, ()=> setE(""))
              } */}
            <div>
                    <h3>Page configuration</h3>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Privacy policy</h4>
                        </div>
                        <div className="actions">
                          <textarea value={privacyPolicy} onChange={e=>setprivacyPolicy(e.target.value)}  className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                        <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Terms of service</h4>
                        </div>
                        <div className="actions">
                          <textarea value={termsOfServices} onChange={e=>settermsOfServices(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <h3>Templates configuration</h3>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New user account, welcome email</h4>
                        </div>
                        <div className="actions">
                          <textarea value={newUserWelcomeMail} onChange={e=>setnewUserWelcomeMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Active user account</h4>
                        </div>
                        <div className="actions">
                          <textarea value={activateUserAccountMail} onChange={e=>setactivateUserAccountMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Admin withdraw request</h4>
                        </div>
                        <div className="actions">
                          <textarea value={adminWithdrawRequestMail} onChange={e=>setadminWithdrawRequestMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Confirm withdraw request</h4>
                        </div>
                        <div className="actions">
                          <textarea value={confirmWithdrawRequestMail} onChange={e=>setconfirmWithdrawRequestMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Withdraw request processed</h4>
                        </div>
                        <div className="actions">
                          <textarea  value={wthdrawRequestProcessedMail} onChange={e=>setwthdrawRequestProcessedMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User reset password</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userResetPasswordMail} onChange={e=>setuserResetPasswordMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User reset password done</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userResetPasswordConfirmationMail} onChange={e=>setuserResetPasswordConfirmationMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Subscription expiration user</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userSubscriptionEExpirationMail} onChange={e=>setuserSubscriptionEExpirationMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New login IP detected for a user</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userNewIPDetectedMail} onChange={e=>setuserNewIPDetectedMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>{loading ? "Saving":"Save"}</button>
                      </div>
                    </div>
                  </div>
                </div>
        
    )
}

export default Template
