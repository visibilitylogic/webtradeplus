import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Modal, Form, Button } from 'react-bootstrap'
export const AllUser = () => {
  const { singleUserVerifedDetails } = useSelector((state) => state.profile)
  const [drivestate, setDriveState] = useState(false)
  const [passortState, setpassortState] = useState(false)
  const [proofState, setproofState] = useState(false)
  const {
    name,
    Img,
    documentName,
    documentFile,
    proofDocument,
  } = singleUserVerifedDetails

  return (
    <>
      {singleUserVerifedDetails && (
        <div>
          <div
            style={{ width: '400px' }}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="rounded mr-1 " onClick={() => setDriveState(true)}>
              <small className="bg-dark py-1 px-3 text-light">Document</small>
            </div>
            <div className="rounded mr-1" onClick={() => setpassortState(true)}>
              <small className="bg-dark py-1 px-3  px-3 text-light">
                {/* {' '}
                //href="#"
                #P
                assport */}
                Passport
              </small>
            </div>
            <div className="rounded" onClick={() => setproofState(true)}>
              <small className="bg-dark py-1 px-3  text-light" href="">
                PROOF DOCUMENT
              </small>
            </div>
          </div>
          {drivestate ? (
            <Modal
              show={drivestate}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton onHide={() => setDriveState(false)}>
                {documentName ? documentName : 'FILE TO BE UPLOADED'}
              </Modal.Header>
              <Modal.Body>
                <Container fluid style={{ width: ' 90%' }}>
                  <img
                    src={documentFile}
                    alt={documentName}
                    style={{ width: '95%', height: '200px' }}
                  />
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex justify-content-flex-end">
                  <Button onClick={() => setDriveState(false)}>Close</Button>
                  <div className="ml-3">
                    <a className="btn btn-danger" href={documentFile}>
                      Open full File
                    </a>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          ) : null}

          {/* 2 */}
          {passortState ? (
            <Modal
              show={passortState}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton onHide={() => setpassortState(false)}>
                <h6 className="text-capitalize text-center">ID card</h6>
              </Modal.Header>
              <Modal.Body>
                <Container fluid style={{ width: ' 90%' }}>
                  <img
                    src={Img}
                    alt={name}
                    style={{ width: '95%', height: '200px' }}
                  />
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex justify-content-flex-end">
                  <Button onClick={() => setpassortState(false)}>Close</Button>
                  <div className="ml-3">
                    <a className="btn btn-danger" href={Img}>
                      Open full File
                    </a>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          ) : null}

          {proofState ? (
            <Modal
              show={proofState}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton onHide={() => setproofState(false)}>
                <h6 className="text-capitalize text-center">
                  {proofDocument ? 'PROOF DOCUMENT' : 'Document'}
                </h6>
              </Modal.Header>
              <Modal.Body>
                <Container fluid style={{ width: ' 90%' }}>
                  <img
                    src={proofDocument}
                    alt={name}
                    style={{ width: '95%', height: '200px' }}
                  />
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex justify-content-flex-end">
                  <Button onClick={() => setproofState(false)}>Close</Button>
                  <div className="ml-3">
                    <a className="btn btn-danger" href={proofDocument}>
                      Open full File
                    </a>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      )}
    </>
  )
}
export default React.memo(AllUser)
