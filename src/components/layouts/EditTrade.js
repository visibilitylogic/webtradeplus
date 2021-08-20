import React, {useEffect,useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "./AutoTrading.css"
import { useActions } from '../hooks/useActions';
function EditTrade({isOpen, id,  toggle, trade}) {
    const [userName, setUserName] = useState(trade.userName);
    const [profitPercentage, setProfitPercentage] = useState(trade.profitPercentage);
    const [subscriptionFee, setSubscriptionFee] = useState(trade.subscriptionFee);
    const {update_auto_trade} = useActions();
    const [open, setOpen] = useState(false)
    const {specificTrade} = useSelector(state=> state.adminData)
    // useEffect(() => { 
         
    // }, []);
    
    const handleUpdate = (e)=>{
      e.preventDefault();
      const data = { userName, subscriptionFee, profitPercentage };
      console.log("update", data);
      update_auto_trade(id, data)
    }
    const handleClose = ()=>{
      toggle()
      setSubscriptionFee(null)
      setProfitPercentage(null)
      setUserName("")
    }

    
      // if(isOpen){
      // setSubscriptionFee(trade.subscriptionFee)
      // setUserName(trade.userName)
      // setProfitPercentage(trade.profitPercentage)
      // }
    
    return (
        <div>
        <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="edit_header">Edit Auto Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                specificTrade && 
                <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="userName" value={userName} onChange = {(e)=> setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Profit</Form.Label>
                  <Form.Control type="number" name="profitPercentage" value={profitPercentage} onChange = {(e)=> setProfitPercentage(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Subscription</Form.Label>
                  <Form.Control type="number" name="subscriptionFee" value={subscriptionFee} onChange = {(e)=> setSubscriptionFee(e.target.value)}/>
                </Form.Group>
                <Modal.Footer>
                       
                       <Button type="submit" variant="primary" disabled>Update</Button>
                     </Modal.Footer>
              </Form>
            }
        </Modal.Body>
      
      </Modal>
  
        </div>
    )
}

export default EditTrade
