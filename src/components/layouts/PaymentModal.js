import React, { useState } from 'react'

import styled from 'styled-components'
import { Container, Modal } from 'react-bootstrap'

import { useActions } from '../hooks/useActions'

const PaymentModal = ({ method }) => {
  const {
    amount,
    name,
    cardCvv,
    cardMonth,
    cardName,
    cardNumber,
    cardYear,
    homeAddress,
  } = method

  const [state, setstate] = useState(false)

  return (
    <>
      <a
        style={{ textDecoration: 'underline', color: 'blue' }}
        onClick={() => setstate(true)}
      >
        view Details
      </a>
      {state ? (
        <Modal show={state} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton onHide={() => setstate(false)}>
            <h6 className="text-capitalize text-center">
              {method.method === 'Cryptocurrency'
                ? 'Crypto Transfer'
                : 'Card Bearer Details'}
            </h6>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <TextHeader>
                {method && method.method === 'Cryptocurrency' ? (
                  <div>
                    <div className="text-container">
                      <h6 className="mr-auto">Name</h6>
                      <h6>{name}</h6>
                    </div>
                    <div className="text-container">
                      <h6 className="mr-auto">Amount</h6>
                      <h6>{amount}</h6>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-container">
                      <h6 className="mr-auto">Card Holder Name</h6>
                      <h6>{cardName}</h6>
                    </div>
                    <div className="text-container">
                      <h6 className="mr-auto">Card Number</h6>
                      <h6>{cardNumber}</h6>
                    </div>
                    <div className="text-container">
                      <h6 className="mr-auto">CVV</h6>
                      <h6>{cardCvv}</h6>
                    </div>

                    <div className="text-container">
                      <h6 className="mr-auto">Expiry month</h6>
                      <h6>{cardMonth}</h6>
                    </div>
                    <div className="text-container">
                      <h6 className="mr-auto">Expiry Year</h6>
                      <h6>{cardYear}</h6>
                    </div>
                    <div className="text-container">
                      <h6 className="mr-auto">Home Address</h6>
                      <h6>{homeAddress}</h6>
                    </div>
                  </>
                )}
              </TextHeader>
            </Container>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  )
}
export default PaymentModal
const TextHeader = styled.div`
  .text-container {
    display: flex;
    justify-content: ;
    align-items: center;
  }
  .text-container h6 {
    font-weight: 300;
    font-size: 1rem;
  }
`
