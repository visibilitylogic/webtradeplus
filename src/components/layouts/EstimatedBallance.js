import React from 'react'
import { useSelector } from 'react-redux'

function EstimatedBallance() {
  const { singleUser} = useSelector((state) => state.profile)
  const { wallet } = singleUser
  return (
    <>
      <div className="estimated-card">
        <div className="font-size-14 font-weight-bold">
          ESTIMATE BALANCE IN <span style={{ color: '#ff7700' }}>USD</span>
        </div>
        <div>
          <h2
            className="mt-3 text-warning"
            style={{
              color: '#29c359',
            }}
          >
            {new Intl.NumberFormat('en-US').format(wallet)} USD
          </h2>
        </div>
      </div>
    </>
  )
}

export default EstimatedBallance
