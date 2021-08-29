import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AutoTrading.css";
import { useActions } from '../hooks/useActions';
import SuccessModal from '../Modals/SuccessModal';
import {Alert, Button, Spinner, Table} from "react-bootstrap";
import EditTrade from './EditTrade';
import { useHistory } from 'react-router-dom';
import EditAutoTrade from './EditAutoTrade';
import { message } from 'antd';
function AutoTrading() {
    const {success, loading, trades, error} = useSelector(state=> state.adminData);
    const {add_auto_trade, get_all_auto_trades, get_specific_trade, delete_auto_trade} = useActions();
    const [input, setInput] = useState({
        userName:"",
        profitPercentage:null,
        subscriptionFee:null
    });
    const handleInput = (e)=>{
        setInput({...input, [e.target.name]:e.target.value });
    }
    useEffect(() => {
         get_all_auto_trades()
    }, [])
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {
            userName:input.userName,
            subscriptionFee:input.subscriptionFee,
            profitPercentage:input.profitPercentage
        }
        add_auto_trade(data)
        setInput({
            userName:"",
            profitPercentage:"",
            subscriptionFee:""
        });
        
        if( success && success.length > 0) message.success("Successfully added auto trade")
        if( error && error.length > 0) message.error("error in updating")
        get_all_auto_trades()
    }
  
   

    const handleDelete = (id)=>{
        if(window.confirm("Are you sure you want to delete this trade ??")){
            delete_auto_trade(id);
        }
        get_all_auto_trades();
        
        if( success && success.length > 0) message.success("Trade Deleted")
        if( error && error.length > 0) message.error("error in deleting")
     }
    
    return (
        <div classname="AutoTrading_Wrapper">
            <div className="AutoTrading_add">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Username</h3>
                        <input type="text" name="userName" placeholder="John Doe" value={input.userName} onChange={handleInput} required />
                    </div>
                    <div>
                        <h3>Profit (in percentage)</h3>
                        <input type="number" name="profitPercentage"  value={input.profitPercentage}  onChange={handleInput} required/>
                    </div>
                    <div>
                        <h3>Subscription Fee</h3>
                        <input type="number" name="subscriptionFee" value={input.subscriptionFee} onChange={handleInput} required/>
                    </div>
                    <div>
                        <Button className ="add" type="submit" size="lg">Add</Button>
                    </div>
                </form>
                
            </div>
            <div className="AutoTrading_display">
                <div>
                <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>S/N</th>
      <th>Username</th>
      <th>Profit (in percentage)</th>
      <th>Subscription Fee</th>
      <th>Date Added</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
          loading ?
           (<Spinner animation="grow" size="lg" className="loading" variant="primary" />) :
      
      (
         trades &&  trades.map((trade, i)=> (
              <tr key={i}>
                  <td>{i}</td>
                  <td>{trade.userName}</td>
                  <td>{trade.profitPercentage}</td>
                  <td>{trade.subscriptionFee}</td>
                  <td>{trade.date.split("T")[0]}</td>
                  <td><EditAutoTrade id = {trade._id}><Button>Edit</Button></EditAutoTrade> <Button variant="danger" onClick={()=> handleDelete(trade._id)}>Delete</Button></td>
              </tr>
          ))
      )
      }

       
  
  </tbody>
</Table>
                </div>
            </div>
    </div>
  );
}

export default AutoTrading;
