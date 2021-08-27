import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Switch from 'react-switch'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

const UserArea = ({ handleDeleteUser, setEditProfile, singleUser }) => {
  const {
    setLiveTrade,
    setAutoTrade,
    setNotificationEnabled, // expecting end point
  } = useActions()

  const setTradeFunc = () => {
    setAutoTrade(singleUser._id)
  }

  const setToggles = () => {
    setLiveTrade(singleUser._id)
  }

  return (
    <>
      {singleUser && (
        <UserAreaContainer>
          <h3 className="text-center">USER</h3>
          <div className="d-flex justify-content-flex-start w-75  align-items-center mb-3">
            <i
              className="fas fa-2x fa-edit mr-auto"
              onClick={() => setEditProfile(true)}
            />

            <i
              className="delete-profile fas  fa-2x fa-user-minus"
              onClick={() => handleDeleteUser(singleUser._id)}
            />
          </div>
          <div className="d-flex justify-content-flex-start w-75 mx-auto flex-column align-items-center">
            <div className="d-flex  w-100 justify-content-flex-start align-items-center">
              <div className="mr-auto">
                <h6>Live Trade</h6>
              </div>
              <div>
                <Switch
                  onChange={setToggles}
                  checked={singleUser.liveTrade}
                  className="react-switch"
                  onColor="#54AC40"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#000000"
                />
              </div>
            </div>
            <div className="d-flex  w-100 justify-content-flex-start align-items-center">
              <div className="mr-auto">
                <h6>Auto Trade</h6>
              </div>
              <div>
                <Switch
                  onChange={setTradeFunc}
                  checked={singleUser.autoTrade}
                  className="react-switch"
                  onColor="#54AC40"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#000000"
                />
              </div>
            </div>
          </div>
        </UserAreaContainer>
      )}
    </>
  )
}

export default React.memo(UserArea)

const UserAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: auto;
  box-shadow: 0px 1px 8px -1px rgba(0, 0, 0, 0.75);
  border-radius: 5px;

  .fa-user-minus {
    margin-left: auto;
    color: red;
  }
  .fa-edit {
    color: blue;
  }
`
