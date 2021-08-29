import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'

function ApproveDoc({ status }) {
  const { error } = useSelector((state) => state.profile)
  const { declineVerify, approveVerify } = useActions()

  const handledecline = async () => {
    if (error) {
      message.error('Denial Was Not Successful')
    } else {
      await declineVerify(status.userId)

      message.success('Identity Was Successfully Declined')
    }
  }
  const handleapproveVerify = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      await approveVerify(status.userId)

      message.success('Successfully Approved')
    }
  }

  return status.status === 'Pending' || status.status === 'Declined' ? (
    <div className="d-flex flex-column">
      <a
        className="text-light text-center bg-success mb-2"
        onClick={handleapproveVerify}
      >
        Accept
      </a>
      <a className="text-light text-center bg-danger" onClick={handledecline}>
        Decline
      </a>
    </div>
  ) : null
}

export default ApproveDoc
