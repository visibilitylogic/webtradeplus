import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Modal, Form, Button } from 'react-bootstrap'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

const DeclineModal = ({ modalstate, status, handledeclineVerify }) => {
  const [declinedMessage, setDeclinedMessage] = useState('')
  const { ManagerdeclineVerify } = useActions()
  const { error } = useSelector((state) => state.profile)
  const [state, setstate] = useState(modalstate)

  // const handledecline = async () => {
  //   if (error) {
  //     message.error('Denial Was Not Successful')
  //   } else {
  //     const details = {
  //       id: status.userId,
  //       message: declinedMessage,
  //     }

  //     ManagerdeclineVerify(details)
  //     setDeclinedMessage('')

  //     //   setDecline(false);
  //     message.success('Identity Was Successfully Declined')
  //   }
  // }
  console.log(state)
  if (!state) {
    return null
  } else if (state) {
    return (
      <>
        <Modal show={state} aria-labelledby="contained-modal-title-vcenter">
          <ModalHeader>
            <Modal.Header>
              <h5 className="py-2 text-capitalize">Decline Identity</h5>
            </Modal.Header>
          </ModalHeader>
          <Modal.Body>
            <Container fluid>
              <Form className="text-left">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="py-4" style={{ color: '#fff' }}>
                    Write below the reason for rejection
                  </Form.Label>
                  <Form.Control
                    value={declinedMessage}
                    onChange={(e) => setDeclinedMessage(e.target.value)}
                    as="textarea"
                    rows={5}
                  />
                </Form.Group>
                <div className="text-right w-100 d-flex justify-content-end">
                  <Button
                    variant="primary "
                    className="mr-2"
                    onClick={() => setstate(!state)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => handledeclineVerify}>
                    Confirm
                  </Button>
                </div>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default React.memo(DeclineModal)

const ModalHeader = styled.div`
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
`
