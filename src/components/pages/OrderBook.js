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
function OrderBook() {
  const {getOrder} = useActions();
  const {user} = useSelector(state=> state.auth);
  const {trade_orders} = useSelector(state=> state.orders)
  const [display,setDisplay] = useState("order-book");
  useEffect(()=>{
    getOrder(user && user._id)
  }, [])
  const bodyDisplay = ()=>{
    switch(display){
      case "order-book":
        return (
          <Table>
          <tbody style={{textAlign:"left"}}>
          {
            DummyData.map(data=>(
              <tr style={{borderBottom:".1px solid wheat", marginBottom:"-30px"}} className="tableRoww" key={data.id}>
              <td>
                <span className="order_span">{Date.now()} </span>
                <p style={{color:"wheat"}} >Date</p>
              </td>
              <td>
                <span className="order_span">{data.nameOfAsset} </span>
                <p style={{color:"wheat"}} >TypeofAsset </p>
              </td>
              <td>
                <span className="order_span">{data.openRateOfAsset} </span>
                <p style={{color:"wheat"}} >amount</p>
              </td>
              <td>
                <span className="order_span" style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag} </span>
                <p style={{color:"wheat"}} >tag</p>
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
            <tr style={{borderBottom:".1px solid wheat", marginBottom:"-30px"}} className="tableRoww" key={data.id}>
              <td>
                <span className="order_span">{Date.now()} </span>
                <p style={{color:"wheat"}} >Date</p>
              </td>
              <td>
                <span className="order_span">{data.nameOfAsset} </span>
                <p style={{color:"wheat"}} >TypeofAsset </p>
              </td>
              <td>
                <span className="order_span">{data.openRateOfAsset} </span>
                <p style={{color:"wheat"}} >amount</p>
              </td>
              <td>
                <span className="order_span" style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag} </span>
                <p style={{color:"wheat"}} >tag</p>
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
            <tr  style={{borderBottom:".1px solid wheat"}} className="tableRoww" key={data.id}>
            <td>
              <span className="order_span">{Date.now()} </span>
              <p style={{color:"wheat"}} >Date</p>
            </td>
            <td>
              <span className="order_span">{data.nameOfAsset} </span>
              <p style={{color:"wheat"}} >TypeofAsset </p>
            </td>
            <td>
              <span className="order_span">{data.openRateOfAsset} </span>
              <p style={{color:"wheat"}} >amount</p>
            </td>
            <td>
              <span className="order_span" style={{color: data.tag === "Buy" ? "green" : "red"}}>{data.tag} </span>
              <p style={{color:"wheat"}} >tag</p>
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
              <h2 id="order-header" style={{textAlign:"center", marginBottom:"25px", fontFamily:"arial", marginTop:"20px"}}>Order Book</h2>
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
              </div>
            </div>
          </div>
        </div>
  )
}

export default OrderBook
