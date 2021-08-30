import { minutesToSeconds } from 'date-fns'
import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
const ViewWithDrawalDetails = () => {
  const [state, setstate] = useState(false)
  const { singleUserVerifedDetails } = useSelector((state) => state.profile)

  const {
    method,
    name,
    email,
    amount,
    total,
    methodDetails,
  } = singleUserVerifedDetails

  return (
    <>
      <a
        className="text primary"
        onClick={() => setstate(true)}
        style={{ color: 'blue' }}
      >
        View Details
      </a>
      {state ? (
        <Modal show={state} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton onHide={() => setstate(false)}>
            <h6 className="text-capitalize text-center">
              {method === 'Cryptocurrency'
                ? 'Crypto Transfer'
                : 'Card Bearer Details'}
            </h6>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <TextHeader>
                {method && method === 'Cryptocurrency' ? (
                  methodDetails.map((mtn) => (
                    <div>
                      <div className="text-container">
                        <h6 className="mr-auto">Name</h6>
                        <h6>{minutesToSeconds.name}</h6>
                      </div>
                      <div className="text-container">
                        <h6 className="mr-auto">Crypto Currency Name</h6>
                        <h6>{mtn.cryptoCurrencyName}</h6>
                      </div>
                      <div className="text-container">
                        <h6 className="mr-auto">Crypto Currency address</h6>
                        <h6>{mtn.cryptoCurrencyAddress}</h6>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <div className="text-container">
                        <h6 className="mr-auto">Card Holder Name</h6>
                        <h6>{name}</h6>
                      </div>
                      <div className="text-container">
                        <h6 className="mr-auto">Email</h6>
                        <h6>{email}</h6>
                      </div>
                      <div className="text-container">
                        <h6 className="mr-auto">Total</h6>
                        <h6>{total}</h6>
                      </div>
                      <div className="text-container">
                        <h6 className="mr-auto">Amount</h6>
                        <h6>{amount}</h6>
                      </div>
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

export default ViewWithDrawalDetails

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
