import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useActions } from '../hooks/useActions'
import CountryList from 'react-select-country-list'

const UserHeader = ({ singleUser }) => {
  const {
    checkUserOnlineStatus, // expecting end point
  } = useActions()

  const { email, country, name, img, _id, isOnline } = singleUser
  const [userState, setUserState] = useState(isOnline)

  useEffect(() => {
    setUserState(checkUserOnlineStatus(_id, { isOnline: true }))
  }, [])

  return (
    <>
      {singleUser && (
        <>
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              <img
                className=" image-fluid w-30"
                src={
                  img
                    ? img
                    : 'https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png'
                }
                alt="profile-pics"
                style={{ width: '50px', borderRadius: '50%' }}
              />
            </div>
            <div className="dtls">
              <div className="d-flex justify-content-center align-items-center mr-2">
                <div className="name font-weight-bold font-size-18">{name}</div>
                <div
                  className={isOnline ? 'bg-success' : 'bg-danger'}
                  style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                />
              </div>
              <div className="email font-size-14">{email}</div>
              <div className="dash-row dash-row-centralized font-size-12">
                <div className="ml-2">
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                    }}
                  />
                </div>
                <div className="country text-uppercase">{country}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UserHeader
