import React from 'react'

function Market() {
    return (
        <div>
            <h2 style={{color:"white", textAlign:"left"}}>Market List</h2>
            <div style={{ width: "100%", textAlign: "right"  }}>
                      <input
                        type="search"
                        name="search"
                        placeholder="Search exchange / pair /syn"
                      />
                    </div>
             <table className="tabled">
                    <tbody>
                      <tr>
                        <th>Market</th>
                        <th>Pair</th>
                        <th>Price</th>
                        <th>Direct Vol. 24H</th>
                        <th>Total Vol. 24H</th>
                        <th>Market Cap</th>
                        <th>Chg. 24H</th>
                        <th>24h High/Low</th>
                      </tr>
                      </tbody>
                </table>
        </div>
    )
}

export default Market
