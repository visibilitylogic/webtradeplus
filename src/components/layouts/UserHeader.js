import React from 'react'
import icon from './icon.png'
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
                src={img ? img : icon}
                alt="profile-pics"
                style={{ width: '60px', borderRadius: '50%', height: '60px' }}
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
