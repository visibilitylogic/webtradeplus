import React from 'react'

function LeaderBoard() {
    return (
        <div className="leader_container">
           <h1> Leader Board </h1> 
           <div className="wrapper">
               <div className="content">
                   <div>
                       <div><img src={"https://image.freepik.com/free-vector/illustration-nigeria-flag_53876-27148.jpg"}/></div>
                       <span style= {{display:"block"}}>0</span>
                       <span>Week profit</span> <b>0000$</b>
                   </div>
                   <div>
                       <div><img  src={"https://image.freepik.com/free-vector/illustration-nigeria-flag_53876-27148.jpg"}/></div>
                       
                       <span style= {{display:"block"}}>0</span>
                       <span>Week profit</span> <b>0000$</b>
                   </div>
                   <div>
                       <div><img  src={"https://image.freepik.com/free-vector/illustration-nigeria-flag_53876-27148.jpg"}/></div>
                       <span style= {{display:"block"}}>0</span>
                       <span>Week profit</span> <b>0000$</b>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default LeaderBoard
