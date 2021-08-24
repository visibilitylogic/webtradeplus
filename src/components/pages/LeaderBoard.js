import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions'

function LeaderBoard() {
    const {get_all_auto_trades} = useActions();
    const {trades} = useSelector(state=> state.adminData);
    const compare = (a,b)=> (a.profitPercentage >  b.profitPercentage) ? -1 : (a.profitPercentage < b.profitPercentage) ?  1 : 0 ;
    const sortedTrades = trades && trades.sort(compare)
    console.log("sorted", sortedTrades);
    useEffect(()=>{
        get_all_auto_trades()
    },[])
    function random (){
        const flagArray = ["https://www.countryflags.io/us/flat/64.png","https://www.countryflags.io/ua/flat/64.png","https://www.countryflags.io/al/flat/64.png","https://www.countryflags.io/ng/flat/64.png"];
        const index = Math.floor(Math.random() * flagArray.length);
        return flagArray[index]
    }
    return (
        <div className="leader_container">
           <h1> Leader Board </h1> 
           <div className="wrapper">
               <div className="content">
                {
                   sortedTrades && sortedTrades.map((sorted)=> (
                        <div key = {sorted._id}>
                            <div><img src={random()}/></div>
                            <span style= {{display:"block"}}>{sorted.userName}</span>
                            <span>Profit Percent:</span> <b>{sorted.profitPercentage}</b>
                        </div>
                    ))
                }
                   
                  
               </div>
           </div>
        </div>
    )
}

export default LeaderBoard
