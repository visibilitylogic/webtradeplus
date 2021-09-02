import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function SuccessModal({ success }) {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {success && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title color="black">Success</Modal.Title>
          </Modal.Header>
          <Modal.Body color="black">{success}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default SuccessModal
