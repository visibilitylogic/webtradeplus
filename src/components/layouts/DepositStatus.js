import React, { useState } from 'react'
import { message } from 'antd'

import { useActions } from '../hooks/useActions'
const { approveDeposit, declineDepositForManager } = useActions()

export function DepositStatus({ status }) {
  const { _id } = status
  const [depositState] = useState(status.status)

  const handleApproveDeposit = async () => {
    try {
      await approveDeposit({
        id: _id,
        message: 'successfull approved',
      })

      message.success('Deposit Was Successfully Approved')
    } catch (error) {
      message.error('Deposit Not Approved')
    }
  }

  return (
    <button
      disabled={depositState === 'Approved'}
      onClick={handleApproveDeposit}
      className={
        depositState.status === 'Pending' || depositState.status === 'Declined'
          ? 'btn btn-danger'
          : 'btn btn-success'
      }
    >
      {depositState}
    </button>
  )
}

export function DepositCancel({ status }) {
  const [depositCancel] = useState(status.status)

  const handlesetdepositCancel = async () => {
    try {
      await declineDepositForManager({
        id: _id,
        message: 'cancelled',
      })
      message.success('Deposit Was Successfully Cancelled')
    } catch (error) {
      message.error('Something went Wrong')
    }
  }
  if (depositCancel === 'Pending') {
    return (
      <button
        onClick={handlesetdepositCancel}
        className={depositCancel === 'Declined' ? 'btn btn-danger' : ''}
      >
        Decline
      </button>
    )
  } else return null
}
