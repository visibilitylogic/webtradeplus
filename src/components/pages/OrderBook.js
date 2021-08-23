import React from 'react'

function OrderBook() {
  return (
    <div>
     <div
className="order-book-section orderBookComponent"
style={{ display: "block" }}
>
<div className="order-book-sec">
  <h2 id="order-header">Order Book</h2>
  <div
    className="tabs"
    style={{ borderBottom: "1px solid #4a4a4d" }}
  >
    <a className="active" dash-tab="order-book">
      Trading History
    </a>
    <a dash-tab="opened-position"> Opened Positions</a>

    <a dash-tab="opened-pos"> Auto Trades</a>
  </div>
  </div>
  </div> 
    </div>
  )
}

export default OrderBook
