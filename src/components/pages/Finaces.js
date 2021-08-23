import React from 'react'
import "./finances.css"
function Finaces() {
    return (
        <div>
            <h1 className="h1"> Finances Tab</h1>
            <div className="first_div" style={{display:"flex", flexDirection:"column", maxWidth:"1200px", margin:"auto"}}> 
                <div className="flex_row1">
                    <div>
                        <h2>Deposites</h2>
                        <h1>1000</h1>
                    </div>
                    <div>
                    <h2>Bonus</h2>
                        <h1>1000</h1>
                    </div>
                    <div>
                    <h2>Equity</h2>
                        <h1>1000</h1>
                    </div>
                </div>
                <div className="flex_row1">
                <div>
                <h2>Margin</h2>
                        <h1>1000</h1>
                </div>
                    <div>  
                        <h2>Free Margin</h2>
                        <h1>1000</h1>
                    </div>
                    <div style={{height:"300px", padding:"15px 0px"}}> 
                        <div style={{borderBottom:"1px solid white", padding:"-5px" }}>
                            <h2>Profit</h2>
                            <h1>1000</h1>
                        </div> 
                        <div style={{marginTop:"10px"}}>
                            <h2>Loss</h2>
                            <h1>1000</h1>
                        </div>  
                       
                    </div>
                </div>
            </div>    
               
        </div>
    
    )
}

export default Finaces
