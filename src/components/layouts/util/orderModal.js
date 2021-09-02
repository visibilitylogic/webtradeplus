import React, { useState } from "react";
import styled from "styled-components";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";

const UpdateOrderModals = ({ modalstate, setModalState, id, ordersObject }) => {
  const { getAllOrders } = useActions();
  const [HasUpdate, setHasUpdate] = useState(false);
  const [orders, setorders] = useState({
    tag: "",
    nameOfAsset: "",
    typeOfAsset: "",
    openRateOfAsset: "",
    closeRateOfAsset: "",
    margin: "",
    takeProfit: "",
    takeLoss: "",
    stockAmount: "",
  });

  const { error } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    e.preventDefault();

    setorders((order) => ({ ...order, [e.target.name]: e.target.value }));
  };

  const BASE_URL = "https://trade-backend-daari.ondigitalocean.app";

  const handleSubmitUpdatedOrder = async () => {
    await axios
      .put(`${BASE_URL}/api/trade/${id}`, orders, {
        "Content-Type": "application/json",
      })
      .then(async (res) => {
        getAllOrders();
        setHasUpdate(true);

        setModalState(() => false);
        window.location.reload();

      })
      .catch((err) =>
        err.response === undefined ? false : console.error(err.response.data)
      );
  };

  useEffect(() => {
    let subscribe = true;

    const addSelectedRowToState = () => {
      const {
        tag,
        nameOfAsset,
        typeOfAsset,
        openRateOfAsset,
        closeRateOfAsset,
        margin,
        takeProfit,
        takeLoss,
        stockAmount,
      } = ordersObject && ordersObject;

      subscribe &&
        setorders((order) => ({
          ...order,
          tag,
          nameOfAsset,
          typeOfAsset,
          openRateOfAsset,
          closeRateOfAsset,
          margin,
          takeProfit,
          takeLoss,
          stockAmount,
        }));
    };
    addSelectedRowToState();

    let settimeout;
    const removeUpdateFlag = () => {
      settimeout = window.setTimeout(() => setHasUpdate(false), 3000);
    };

    removeUpdateFlag();
    return () => {
      subscribe = false;
      clearTimeout(settimeout);
    };
  }, [ordersObject, id, HasUpdate]);

  const {
    tag,
    nameOfAsset,
    typeOfAsset,
    openRateOfAsset,
    closeRateOfAsset,
    margin,
    takeProfit,
    takeLoss,
    stockAmount,
  } = orders;

  return (
    <>
      <Modal show={modalstate} aria-labelledby="contained-modal-title-vcenter">
        <ModalHeader>
          <Modal.Header>
            <h5 className="py-2 text-capitalize">Update orders</h5>
          </Modal.Header>
        </ModalHeader>
        <Modal.Body>
          <Container fluid>
            <Form className="text-left d-flex">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <p style={{ color: "black" }}>Add Tag</p>
                <Form.Control
                  value={tag}
                  name="tag"
                  onChange={handleChange}
                  placeholder="Add Tag"
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Asset Name</p>

                <Form.Control
                  value={nameOfAsset}
                  name="nameOfAsset"
                  placeholder="Add Asset Name"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Asset Type</p>

                <Form.Control
                  value={typeOfAsset}
                  name="typeOfAsset"
                  placeholder="Add Asset Type"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Asset Open Rate</p>

                <Form.Control
                  value={openRateOfAsset}
                  name="openRateOfAsset"
                  placeholder="Add Asset Open Rate"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Asset CLose Rate</p>

                <Form.Control
                  value={closeRateOfAsset}
                  name="closeRateOfAsset"
                  placeholder="Add Asset Close Rate"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
              </Form.Group>

              <Form.Group>
              <p style={{ color: "black" }}>Add Margin</p>

                <Form.Control
                  value={margin}
                  name="margin"
                  placeholder="Add Margin"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Take Profit</p>

                <Form.Control
                  value={takeProfit}
                  name="takenProfit"
                  placeholder="Add Take Profit"
                  onChange={handleChange}

                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Stop Loss</p>

                <Form.Control
                  value={takeLoss}
                  name="takeLoss"
                  placeholder="Add Stop Loss"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
                <p style={{ color: "black" }}>Add Stock Amount</p>

                <Form.Control
                  value={stockAmount}
                  name="stockAmount"
                  placeholder="Add Stock Amount"
                  onChange={handleChange}
                  //   as="textarea"
                  //   rows={5}
                />
              </Form.Group>
            </Form>
            <div className="text-right w-100 d-flex justify-content-end">
              <Button
                variant="primary "
                className="mr-2"
                onClick={() => setModalState(() => false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmitUpdatedOrder()}
              >
                Update
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(UpdateOrderModals);

const ModalHeader = styled.div`
display: 'flex',
justifyContent: 'center',
alignItems: 'center',

`;

// Endpoint Url: PUT baseUrl/api/trade/:id
// Req from front-end
// tag
// nameOfAsset
// typeOfAsset
// openRateOfAsset
// CloseRateOfAsset
// margin
// takeProfit
// takeLoss
// stockAmount
