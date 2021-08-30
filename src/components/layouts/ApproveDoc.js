import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'
import DeclineModal from './DeclineModal'

import { Container, Modal, Form, Button } from 'react-bootstrap'

function ApproveDoc({ status }) {
  const { declineVerify, approveVerify } = useActions()
  const { singleUserVerifedDetails, error } = useSelector(
    (state) => state.profile,
  )
  const { userId } = singleUserVerifedDetails
  const [accept, setAccept] = useState('Accept')
  const [decline, setDecline] = useState('Declined')
  const [modalstate, setmodalstate] = useState(false)

  const handleapproveVerify = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: userId,
        message: 'Document was succesffully approved',
      }
      await approveVerify(details)
      setAccept(null)

      setDecline(false)
      message.success('Successfully Approved')
    }
  }
  const handledeclineVerify = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: userId,
        message: 'Document was succesffully approved',
      }
      await declineVerify(details)

      message.success('Successfully Declined')
    }
  }

  return status === 'Pending' ? (
    <div className="d-flex flex-column" style={{ fontSize: '8px' }}>
      <div onClick={handleapproveVerify}>
        <a className="text-light text-center p-0 bg-success mb-1">
          {accept ? accept : null}
        </a>
      </div>
      <div onClick={handledeclineVerify}>
        <a className="text-light text-center bg-danger mb-0">
          {status ? decline : null}
        </a>
      </div>
    </div>
  ) : status === 'Declined' || status === 'Pending' ? (
    <a
      className="text-light text-center p-0 bg-success mb-1"
      onClick={setmodalstate(true)}
      // onClick={handleapproveVerify}
    >
      <DeclineModal modalstate={modalstate} status={status} />
      {accept}
    </a>
  ) : null
}

export default ApproveDoc
