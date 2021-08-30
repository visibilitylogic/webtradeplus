import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'

function ApproveDeposit({ status }) {
  const { error } = useSelector((state) => state.profile)
  const [ApproveState, setApproveState] = useState(status.status)
  const [accept, setAccept] = useState('Accept')
  const [pending, setPending] = useState('Pending')
  const [decline, setDecline] = useState('Declined')
  const { approveDeposit, declineDeposit } = useActions()

  const handleApproveDeposit = async () => {
    console.log(status)

    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: status._id,
        message: 'Deposit was Approved',
      }
      await approveDeposit(details)
      setAccept(null)
      setPending(false)
      setDecline(false)

      message.success('Identity Was Successfully Approved')
    }
  }
  const handleDeclineDeposit = async () => {
    console.log(status)

    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: status._id,
        message: 'Deposit has been declined',
      }
      await declineDeposit(details)
      setAccept(null)
      setPending(false)
      setDecline('Declined')

      message.success('Deposited was declined')
    }
  }

  return status.status === 'Pending' ? (
    <div className="d-flex flex-column" style={{ fontSize: '8px' }}>
      <div onClick={handleApproveDeposit}>
        <a className="text-light text-center p-0 bg-success mb-1">
          {accept ? accept : null}
        </a>
      </div>
      <div onClick={handleDeclineDeposit}>
        <a className="text-light text-center bg-danger mb-0">
          {ApproveState ? decline : null}
        </a>
      </div>
    </div>
  ) : status.status === 'Declined' ? (
    <a
      className="text-light text-center p-0 bg-success mb-1"
      onClick={handleApproveDeposit}
    >
      {accept}
    </a>
  ) : null
}

export default React.memo(ApproveDeposit)
