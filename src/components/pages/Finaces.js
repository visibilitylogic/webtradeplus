import React from 'react'
import { useSelector } from 'react-redux'
import './finances.css'
function Finaces() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <h1 className="h1"> Finances Tab</h1>
      <h1
        style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: '25px',
          fontFamily: 'arial',
          marginTop: '20px',
        }}
      >
        {' '}
        Finances Tab
      </h1>
      <div
        className="first_div"
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        <div className="flex_row1">
          <div>
            <h2>Deposits</h2>
            <h1>{user.deposit}</h1>
          </div>
          <div>
            <h2>Bonus</h2>
            <h1>{user.bonus}</h1>
          </div>
          <div>
            <h2>Equity</h2>
            <h1>{user.equity}</h1>
          </div>
        </div>
        <div className="flex_row1">
          <div>
            <h2>Margin</h2>
            <h1>{user.margin}</h1>
          </div>
          <div>
            <h2 className="h2P">Free Margin</h2>
            <h1 classname="h11">{user.freeMargin}</h1>
          </div>
          <div>
            <div style={{ borderBottom: '.3px solid white' }}>
              <h2 className="h2P">Profit</h2>
              <h1 classname="h11" style={{ fontSize: '22px', color: 'white' }}>
                {user.profit}
              </h1>
            </div>
            <div>
              <h2 className="h2P">Loss</h2>
              <h1 classname="h11" style={{ fontSize: '22px', color: 'white' }}>
                {user.profit}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finaces
