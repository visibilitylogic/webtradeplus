import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./AutoTrading.css";
import { useActions } from "../hooks/useActions";
import axios from "axios";
function EditTrade({ isOpen, id, toggle, trade, setisOpen }) {
  const [userName, setuserName] = useState("");
  const [profitPercentage, setprofitPercentage] = useState("");
  const [subscriptionFee, setsubscriptionFee] = useState("");
  const { update_auto_trade, get_all_auto_trades } = useActions();
  const [open, setOpen] = useState(false);
  const { specificTrade } = useSelector((state) => state.adminData);
  // useEffect(() => {

  // }, []);
  const getsingleTrade = (_id) => {
    axios
      .get(
        `https://trade-backend-daari.ondigitalocean.app/api/copytrade/${_id}`
      )
      .then(
        (response) => {
          setuserName(response.data.userName);
          setprofitPercentage(response.data.profitPercentage);
          setsubscriptionFee(response.data.subscriptionFee);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    getsingleTrade(id);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { userName, subscriptionFee, profitPercentage };
    update_auto_trade(id, data);
    setisOpen(false);
    get_all_auto_trades();
  };
  // const handleClose = ()=>{
  //   setisOpen(false)
  //   setSubscriptionFee(null)
  //   setProfitPercentage(null)
  //   setUserName("")
  // }
  return (
    <div>
      <Modal
        show={isOpen}
        onHide={() => setisOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="edit_header">Edit Auto Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {specificTrade && (
            <Form onSubmit={handleUpdate}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Profit</Form.Label>
                <Form.Control
                  type="number"
                  name="profitPercentage"
                  value={profitPercentage}
                  onChange={(e) => setprofitPercentage(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Subscription</Form.Label>
                <Form.Control
                  type="number"
                  name="subscriptionFee"
                  value={subscriptionFee}
                  onChange={(e) => setsubscriptionFee(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditTrade;
