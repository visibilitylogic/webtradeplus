import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions'

function Market() {
  const { market, loading} = useSelector(state=> state.markets);
  const {getmarket } = useActions();
  useEffect(()=>{
    getmarket();
  }, [])
 
  // market && setsearchMarket(market)
  
    return (
        <div>
            <h1 style={{color:"white", fontSize:"35px", textAlign:"center"}}>Market List</h1>
            <div style={{ width: "100%", textAlign: "right"  }}>
                      {/* <input
                        type="search"
                        name="search"
                        placeholder="Search exchange / pair /syn"
                        onChange={(e)=> setSearch(e.target.value)}
                      /> */}
                      {/* <button onClick={handleSearch}>Search</button> */}
                    </div>
             <table className="tabled">
                    <thead>
                      <tr>
                        <th>Market</th>
                        <th>Pair</th>
                        <th>Price</th>
                        {/* <th>Direct Vol. 24H</th>
                        <th>Total Vol. 24H</th> */}
                        <th>Market Cap</th>
                        {/* <th>Chg. 24H</th>
                        <th>24h High/Low</th> */}
                      </tr>
                      </thead>
                      <tbody>
                        {loading && <div>Loading</div>}
                        {
                          market && market.map(item=>(
                            <tr>
                              <td>{item.symbol}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              {/* <td>{item.price}</td>
                              <td>{item.price}</td> */}
                              <td>{item.marketCap ? item.marketCap : "No market Cap"}</td>
                              {/* <td>{item.change}</td>
                              <td>{item.dayHigh} / {item.dayLow}</td>  */}
                            </tr>
                          ))
                        }
                      </tbody>
                </table>
        </div>
    )
}

export default Market
