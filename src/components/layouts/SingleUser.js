import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'
import { useSelector } from 'react-redux'

function SingleUser({ singleUser }) {
  const { error } = useSelector((state) => state.profile)
  const { approveSingleUserVerify, DeactivateUser, ActivateUser } = useActions()
  const {
    name,
    country,
    phoneNumber,
    currency,
    time,
    _id,
    isAdmin,
    isManager,
    verify,
    isActive,
  } = singleUser
  const [verifystate, setverifystate] = useState(verify)
  const [activestate] = useState(isActive)
  const [active, setActive] = useState(true)
  const [deactivate, setdeActivate] = useState(' DEACTIVATE USER')
  const [activate, setActivate] = useState(' ACTIVATE USER')

  console.log(_id)

  const handleApproveVerify = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      await approveSingleUserVerify(_id)
      setverifystate(!verify)

      message.success('Identity Was Successfully Approved')
    }
  }
  const handleActivate = async () => {
    if (error) {
      message.error('Activation Was Not Successful')
    } else {
      await ActivateUser(_id)
      setActive(true)

      message.success('Identity Was Successfully Activated')
    }
  }
  const handleDeActivate = async () => {
    if (error) {
      message.error('Deactivation Was Not Successful')
    } else {
      await DeactivateUser(_id)
      setActive(false)
      message.success('Identity Was Successfully Deactivated')
    }
  }

  console.log('singleUser from prop')

  return (
    <>
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
              {phoneNumber ? phoneNumber : 'No phone number attached'}
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
                  verifystate
                    ? 'bg-success p-2  text-light'
                    : 'text-light p-2 bg-danger'
                }
              >
                {verifystate ? 'VERIFIED' : 'PENDING'}
              </span>

              {!verifystate ? (
                <div>
                  <a
                    className="text-light p-2  ml-3 text-bold  bg-success"
                    onClick={handleApproveVerify}
                  >
                    VERIFY USER
                  </a>
                </div>
              ) : null}

              <div className="ml-2"></div>
            </div>
          </div>

          <div className="dash-row dash-row-centralized">
            <div className="th">Created date</div>
            <div className="td">{time ? time.slice(0, 10) : ''}</div>
          </div>
          <div className="dash-row dash-row-centralized">
            <div className="th">
              {isManager
                ? 'MANAGER STATUS '
                : isAdmin
                ? 'ADMIN STATUS'
                : 'USER STATUS'}
            </div>
            <div className="td">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className={
                    active
                      ? 'text-light p-2 bg-success mr-2'
                      : 'text-light p-2 bg-danger mr-2'
                  }
                >
                  <a>{active ? 'ACTIVE' : 'INACTIVE'}</a>
                </div>
                <div
                  className={
                    active
                      ? 'text-light p-2 bg-danger'
                      : 'text-light p-2 bg-success'
                  }
                  onClick={active ? handleDeActivate : handleActivate}
                >
                  <a href="#" className="text-light text-bold">
                    {active ? deactivate : activate}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleUser
