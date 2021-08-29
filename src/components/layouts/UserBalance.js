import React, { useState } from 'react'

function UserBalance({
  handleUpdateWalletBalance,
  singleUser,
  setAmount,
  setCredit,
  text,
}) {
  return (
    <>
    {singleUser  &&
      <div className="public-card white-card" style={{ marginTop: '15px' }}>
        <div className="each-row dash-row">
          <div className="dtls">
            <h4>Select balance</h4>
          </div>
          <div className="actions">
            <select className="dash-select-short">
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="each-row dash-row">
          <div className="dtls">
            <h4>Modification type</h4>
          </div>
          <div className="actions">
            <select
              className=" form-control"
              onChange={(e) => setCredit(JSON.parse(e.target.value))}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="Bonus">Debit</option>
            </select>
          </div>
        </div>
        <div className="each-row dash-row">
          <div className="dtls">
            <h4>Modification value</h4>
          </div>
          <div className="actions">
            <input
              className=" form-control form-control-lg"
              type="number"
              name="text"
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      <div className="save-btn">
        <button onClick={() => handleUpdateWalletBalance(singleUser)}>Save</button>
      </div>
      </div>
}
    </>

  )
}

export default UserBalance
