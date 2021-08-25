import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions'

const DummyData = 
[
  {
    id:1,
    isOpen:true,
    nameOfAsset: "Bitcoin",
    tag:"Buy",
    openRateOfAsset: 2000
  },

  {
    id:2,
    isOpen:false,
    nameOfAsset: "Ethereum",
    tag:"Sell",
    openRateOfAsset: 2000
  },

  {
    id:3,
    isOpen:true,
    nameOfAsset: "Bitcoin",
    tag:"Buy",
    openRateOfAsset: 5000
  }

]

const openData = DummyData && DummyData.filter(data=> data.isOpen === true)
console.log(openData);

function OrderBook() {
  const {getOrder} = useActions();
  const {user} = useSelector(state=> state.auth);
  const {trade_orders} = useSelector(state=> state.orders)
  const [display,setDisplay] = useState("order-book");
  useEffect(()=>{
    getOrder(user && user._id)
  }, [])
  console.log(trade_orders)
  const bodyDisplay = ()=>{
    switch(display){
      case "order-book":
        return (
          <Table>
              <tbody style={{textAlign:"left"}}>
              {
                DummyData.map(data=>(
                  <tr key={data.id}>
                  <td>
                    <h4>22-12-2018</h4>
                    <p style={{color:"black", fontSize:"19px"}} >Date</p>
                  </td>
                  <td>
                    <h4>{data.nameOfAsset}</h4>
                    <p style={{color:"black", fontSize:"19px"}} >TypeofAsset </p>
                  </td>
                  <td>
                    <h4>{data.openRateOfAsset}</h4>
                    <p style={{color:"black" , fontSize:"19px"}} >amount</p>
                  </td>
                  <td>
                    <h4 style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag}</h4>
                    <p style={{color:"black" , fontSize:"19px"}} >tag</p>
                  </td>
                </tr>
                ))
              }

              </tbody>
          </Table>
        )
      break;
    
    case "open_position":
      return (
        <Table>
        <tbody style={{textAlign:"left"}}>
        {
          openData.map(data=>(
            <tr key={data.id}>
            <td>
              <h4>{Date.now()}</h4>
              <p style={{color:"black" , fontSize:"19px"}} >Date</p>
            </td>
            <td>
              <h4>{data.nameOfAsset}</h4>
              <p style={{color:"black" , fontSize:"19px"}} >TypeofAsset </p>
            </td>
            <td>
              <h4>{data.openRateOfAsset}</h4>
              <p style={{color:"black" , fontSize:"19px"}} >amount</p>
            </td>
            <td>
              <h4 style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag}</h4>
              <p style={{color:"black" , fontSize:"19px"}} >tag</p>
            </td>
          </tr>
          ))
        }

        </tbody>
    </Table>
      )
    break;
    case "auto_trades":
      return (
        <Table>
        <tbody style={{textAlign:"left"}}>
        {
          DummyData.map(data=>(
            <tr key={data.id}>
            <td>
              <h4>{Date.now()}</h4>
              <p style={{color:"black"}} >Date</p>
            </td>
            <td>
              <h4>{data.nameOfAsset}</h4>
              <p style={{color:"black"}} >TypeofAsset </p>
            </td>
            <td>
              <h4>{data.openRateOfAsset}</h4>
              <p style={{color:"black"}} >amount</p>
            </td>
            <td>
              <h4 style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag}</h4>
              <p style={{color:"black"}} >tag</p>
            </td>
          </tr>
          ))
        }

        </tbody>
    </Table>
      )
    break;
    default: return  " "
    }
  }
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
                <a className={display === "order-book" ? "active" : " "} dash-tab="order-book" onClick ={ () => setDisplay("order-book")}>Trading History</a>
                <a className={display === "open_position" ? "active" : " "} onClick ={ () => setDisplay("open_position") }> Opened Positions</a>
                <a className={display === "auto_trades" ? "active" : " "} onClick ={ () => setDisplay("auto_trades")}> Auto Trades</a>
            </div>
            <div>
              {
                bodyDisplay()
              }
              {/* {
                display === "order-book" &&
                <div className="dash-tab-sec" dash-tab-sec="order-book">
                  <h1>Order Book</h1>
                </div> 
              }
              {
                display === "open_position" &&
                 <div  className="dash-tab-sec"dash-tab-sec="opened-position">
                  <h1>Opened Position</h1> 
                </div>
              }
              { display === "autotrades" &&
                <div className="dash-tab-sec" dash-tab-sec="opened-pos">
                  <h1>Opened pos</h1>
              </div>
              } */}

            </div>
              {/* <div className="dash-tab-sec" dash-tab-sec="order-book">
                <h1>Order Book</h1>
              </div>
              <div  className="dash-tab-sec"dash-tab-sec="opened-position">
                <h1>Opened Position</h1> 
              </div>
              <div className="dash-tab-sec" dash-tab-sec="opened-pos">
                <h1>Opened pos</h1>
              </div>  */}
            </div>
          </div>
        </div>
  )
}

export default OrderBook
