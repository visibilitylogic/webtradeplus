import { message } from 'antd'
import React, { useState, useEffect } from 'react'
import { WindowSidebar } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
// import { get_admin_data } from '../../store/action-creators/AdminActions/Admin';
// import { useActions } from '../hooks/useActions';
import { useActions } from '../hooks/useActions'
import './Mail.css'
function Mail() {
  const { adminData } = useSelector((state) => state.adminInfo)
  const { change_admin_data } = useActions()
  const { success, error } = useSelector((state) => state.adminInfo)
  const [suc, setSuc] = useState('')
  const [e, setE] = useState('')
  const [smtp, setSMTP] = useState(true)
  const [mailEngine, setmailEngine] = useState('')
  const [mailForm, setmailForm] = useState('')
  const [SMTPServer, setSMTPServer] = useState('')
  const [SMTPPort, setSMTPPort] = useState('')
  const [SMTPMail, setSMTPMail] = useState('')
  const [SMTPPassword, setSMTPPassword] = useState('')
  const [EmailSenderName, setEmailSenderName] = useState('')
  const [emailSendName, setemailSendName] = useState('')
  const [supportMail, setsupportMail] = useState('')
  const [supportPhone, setsupportPhone] = useState('')
  const [supportAddress, setsupportAddress] = useState('')
  const [DPOPhone, setDPOPhone] = useState('')
  const [DPOEmail, setDPOEmail] = useState('')
  const [sendWelcomeMail, setsendWelcomeMail] = useState(false)
  const [welcomeMail, setwelcomeMail] = useState('')
  const [newUserWelcomeMailTitle, setnewUserWelcomeMailTitle] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (adminData) {
      console.log(adminData)
      setmailEngine(adminData.mailEngine)
      setSMTPPort(adminData.SMTPPort)
      setSMTPServer(adminData.SMTPServer)
      setSMTPMail(adminData.SMTPMail)
      setSMTPPassword(adminData.SMTPPassword)
      setEmailSenderName(adminData.EmailSenderName)
      setmailForm(adminData.mailForm)
      setemailSendName(adminData.emailSendName)
      setsupportMail(adminData.supportMail)
      setsupportPhone(adminData.supportPhone)
      setsupportAddress(adminData.supportAddress)
      setDPOPhone(adminData.DPOPhone)
      setDPOEmail(adminData.DPOEmail)
      setsendWelcomeMail(adminData.sendWelcomeMail)
      setwelcomeMail(adminData.welcomeMail)
      setnewUserWelcomeMailTitle(adminData.newUserWelcomeMailTitle)
    }
  }, [])
  const dataAll = {
    mailEngine: mailEngine,
    SMTPServer: SMTPServer,
    SMTPPort: SMTPPort,
    SMTPMail: SMTPMail,
    SMTPPassword: SMTPPassword,
    EmailSenderName: EmailSenderName,
    mailForm: mailForm,
    emailSendName: emailSendName,
    supportMail: supportMail,
    supportPhone: supportPhone,
    supportAddress: supportAddress,
    DPOPhone: DPOPhone,
    DPOEmail: DPOEmail,
    sendWelcomeMail: sendWelcomeMail,
    welcomeMail: welcomeMail,
    newUserWelcomeMailTitle: newUserWelcomeMailTitle,
  }
  const url =
    'https://trade-backend-daari.ondigitalocean.app/api/site/mailsettings'
  const saveData = () => {
    change_admin_data(url, dataAll)
    if (success && success.length > 0) {
      setSuc(success)
    } else if (error && error.length > 0) {
      setE(error)
    }
  }
  return (
    <div>
      <div>
        {
          (suc && message.success(suc, () => setSuc('')),
          e && message.error(e, () => setE('')))
        }
        <div className="public-card">
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Mail engine</h4>
            </div>
            <div className="actions">
              <select
                value={mailEngine}
                className="dash-select-short"
                onChange={(e) => setmailEngine(e.target.value)}
              >
                <option value="Send emails with default mail function of the server">
                  Send emails with default mail function of the server
                </option>
                <option value="Send emails with SMTP credentials">
                  Send emails with SMTP credentials
                </option>
              </select>
            </div>
          </div>

          {smtp ? (
            <>
              <div className="each-row dash-row">
                <div className="dtls">
                  <h4>SMTP Server</h4>
                  <p>your smtp host</p>
                </div>
                <div className="actions">
                  <input
                    className="dash-input"
                    type="text"
                    name="text"
                    value={SMTPServer}
                    onChange={(e) => setSMTPServer(e.target.value)}
                    placeholder="your sending mails address"
                  />
                </div>
              </div>

              <div className="each-row dash-row">
                <div className="dtls">
                  <h4>SMTP Port</h4>
                  <p>your smtp port</p>
                </div>
                <div className="actions">
                  <input
                    className="dash-input"
                    type="text"
                    name="text"
                    value={SMTPPort}
                    onChange={(e) => setSMTPPort(e.target.value)}
                    placeholder="your sending mails address"
                  />
                </div>
              </div>
              <div className="each-row dash-row">
                <div className="dtls">
                  <h4>SMTP Mail</h4>
                  <p>your smtp mail</p>
                </div>
                <div className="actions">
                  <input
                    className="dash-input"
                    type="text"
                    name="text"
                    placeholder="your sending mails address"
                    value={SMTPMail}
                    onChange={(e) => setSMTPMail(e.target.value)}
                  />
                </div>
              </div>
              <div className="each-row dash-row">
                <div className="dtls">
                  <h4>SMTP Password</h4>
                  <p>your smtp password</p>
                </div>
                <div className="actions">
                  <input
                    className="dash-input"
                    type="password"
                    name="text"
                    placeholder="your sending mails address"
                    value={SMTPPassword}
                    onChange={(e) => setSMTPPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="each-row dash-row">
              <div className="dtls">
                <h4>Mail from</h4>
                <p>Exemple : no-reply@mycompany.com</p>
              </div>
              <div className="actions">
                <input
                  className="dash-input"
                  type="text"
                  name="text"
                  placeholder="your sending mails address"
                />
              </div>
            </div>
          )}

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Email sender name</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Trade"
                value={EmailSenderName}
                onChange={(e) => setEmailSenderName(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Support mail</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Support mail
                            "
                value={supportMail}
                onChange={(e) => setsupportMail(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Support Phone</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Support Phone

                            "
                value={supportPhone}
                onChange={(e) => setsupportPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Support Address</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Support Address"
                value={supportAddress}
                onChange={(e) => setsupportAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>DPO mail</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="DPO mail"
                value={DPOEmail}
                onChange={(e) => setDPOEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>DPO Phone</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="DPO Phone"
                value={DPOPhone}
                onChange={(e) => setDPOPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Send welcome mail</h4>
              <p>You need to refresh the page after change</p>
            </div>
            <div className="actions switch-field">
              <div className="switch-field-round">
                <input
                  type="radio"
                  id="footer-bar-one"
                  name="footer-bar"
                  defaultValue="yes"
                  onChange={(e) =>
                    setsendWelcomeMail(e.target.checked ? true : false)
                  }
                  checked={sendWelcomeMail === true ? true : false}
                />
                <label htmlFor="footer-bar-one">ON</label>
                <input
                  type="radio"
                  id="footer-bar-two"
                  name="footer-bar"
                  defaultValue="no"
                  onChange={(e) =>
                    setsendWelcomeMail(e.target.checked ? false : true)
                  }
                  checked={sendWelcomeMail === false ? true : false}
                />
                <label htmlFor="footer-bar-two">OFF</label>
              </div>
            </div>
          </div>

          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Welcome mail subject</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Welcome mail subject "
                value={newUserWelcomeMailTitle}
                onChange={(e) => setnewUserWelcomeMailTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="each-row dash-row">
            <div className="dtls">
              <h4>Welcome mail message</h4>
            </div>
            <div className="actions">
              <input
                className="dash-input"
                type="text"
                name="text"
                placeholder="Welcome mail subject "
                value={welcomeMail}
                onChange={(e) => setwelcomeMail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="save-btn">
          <button onClick={saveData}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Mail
