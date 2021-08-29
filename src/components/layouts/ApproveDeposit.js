import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'

function ApproveDeposit({ status }) {
  const { error } = useSelector((state) => state.profile)
  const { approveDeposit } = useActions()

  const handleApproveDeposit = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      await approveDeposit(status._id)

      message.success('Identity Was Successfully Approved')
    }
  }

  return status.status === 'Pending' || status.status === 'Declined' ? (
    <div className="d-flex flex-column">
      <a
        className="text-light text-center bg-success mb-2"
        onClick={handleApproveDeposit}
      >
        Accept
      </a>
      <a className="text-light text-center bg-danger">Decline</a>
    </div>
  ) : null
}

export default ApproveDeposit
