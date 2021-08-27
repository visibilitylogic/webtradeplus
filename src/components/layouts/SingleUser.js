import React from 'react'
import SwitchBtn from './Switch'
import Switch from 'react-switch'

function SingleUser({
  setNotifications,
  handleApproveVerify,
  setAuth0,
  checked2,
  checked,
  singleUser,
}) {
  const {
    name,
    country,
    phone,
    currency,
    time,
    _id,
    isVerified,
    isActive,
  } = singleUser
  return (
    <>
      {singleUser && (
        <div className="dash-row white-card">
          <div className="table">
            <div className="dash-row dash-row-centralized">
              <div className="th">Name</div>
              <div className="td">{name}</div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="th">Last location</div>
              <div className="td">{country ? country : ''}</div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="th">Phone</div>
              <div className="td">
                {phone ? phone : 'No phone number attached'}
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="th">Currency use</div>
              <div className="td"> {currency}</div>
            </div>
          </div>
          <div className="table">
            <div className="dash-row dash-row-centralized">
              <div className="th">Signup with</div>
              <div className="td">Standard</div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="th ">Identity verification</div>
              <div className="td d-flex justify-content-space-between align-items-center">
                <span
                  className={
                    isVerified
                      ? 'bg-success p-2  text-light'
                      : 'text-light p-2 bg-danger'
                  }
                >
                  {isVerified ? 'VERIFIED' : 'PENDING'}
                </span>
                <div className="ml-2">
                  <Switch
                    onChange={() => handleApproveVerify(_id)}
                    checked={isVerified}
                    className="react-switch"
                    onColor="#54AC40"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    offColor="#000000"
                  />
                </div>
              </div>
            </div>
            {/* <div className="dash-row dash-row-centralized">
              <div className="th">Notification</div>
              <div className="td">
                <label>
                  <SwitchBtn
                    onChange={() => setNotifications()}
                    checked={checked}
                  />
                </label>
              </div>
            </div> */}
            {/* <div className="dash-row dash-row-centralized">
              <div className="th">2 Step Authentification</div>
              <div className="td">
                <Switch
                  // onChange={handleClick}
                  checked={checkButton}
                  className="react-switch"
                  onColor="#54AC40"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#000000"
                />
              </div>
            </div> */}
            <div className="dash-row dash-row-centralized">
              <div className="th">Created date</div>
              <div className="td">{time ? time.slice(0, 10) : ''}</div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="th">User status</div>
              <div className="td">
                {isActive ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-light p-2 bg-success">ACTIVE</span>
                    </div>
                    <div className="ml-4 bg-danger p-2">
                      <a href="#" className="text-light py-2 text-bold">
                        DEACTIVE USER
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-light p-4 text-bold  bg-danger">
                        DEACTIVATED
                      </span>
                    </div>

                    <div className="ml-4 bg-success">
                      <a href="#" className="text-light p-4">
                        ACTIVATE USER
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleUser
