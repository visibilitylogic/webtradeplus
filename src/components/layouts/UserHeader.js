import React from 'react'
import ReactCountryFlag from 'react-country-flag'

import CountryList from 'react-select-country-list'
import { useSelector } from 'react-redux'

const UserHeader = () => {
  const { singleUser } = useSelector((state) => state.profile)
  const { email, country, name, img, isOnline } = singleUser

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
                style={{ width: '50px', borderRadius: '50%', height: '50px' }}
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
                {/* <div className="ml-2">
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                    }}
                  />
                </div> */}
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
