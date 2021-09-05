import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const DocumentFile = () => {
  const { singleUserVerifedDetails } = useSelector((state) => state.profile)
  const { name, phoneNumber, address } = singleUserVerifedDetails

  const [state, setstate] = useState(false)

  return (
    <>
      <a className="text primary" onClick={() => setstate(true)}>
        View Details
      </a>
      {state ? (
        <Modal show={state} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton onHide={() => setstate(false)}>
            <h6 className="text-capitalize text-center">
              User Verification Details
            </h6>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <TextHeader>
                <div className="text-container">
                  <h6 className="mr-auto">Name</h6>
                  <h6>{name}</h6>
                </div>
                <div className="text-container">
                  <h6 className="mr-auto">Phone Number</h6>
                  <h6>{phoneNumber}</h6>
                </div>
                <div className="text-container">
                  <h6 className="mr-auto">Address</h6>
                  <h6>{address}</h6>
                </div>
              </TextHeader>
            </Container>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  )
}

export default React.memo(DocumentFile)

const TextHeader = styled.div`
  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-container h6 {
    font-weight: 300;
    font-size: 1rem;
  }
`
