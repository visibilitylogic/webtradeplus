import React, { useState } from 'react'
import { message } from 'antd'

export function DepositStatus({ status }) {
  const [depositState, setdepositState] = useState({
    id: status._id,
    status: status.status,
  })
  console.log(depositState)

  const handleApproveDeposit = async (depositState) => {
    try {
      await setdepositState({
        id: depositState.id,
        status: 'success',
      })
      message.success('Deposit Was Successfully Approved')
    } catch (error) {
      message.error('Deposit Not Approved')
    }
  }

  return (
    <button
      disabled={depositState.status === 'Approved'}
      onClick={handleApproveDeposit}
      className={
        depositState.status === 'Pending' || depositState.status === 'Declined'
          ? 'btn btn-danger'
          : 'btn btn-success'
      }
    >
      {depositState.status}
    </button>
  )
}

export function DepositCancel({ status }) {
  const [depositCancel, setdepositCancel] = useState({
    id: status._id,
    status: status.status,
  })

  const handlesetdepositCancel = async (depositCancel) => {
    try {
      await setdepositCancel({
        id: depositCancel.id,
        status: 'cancelled',
      })
      message.success('Deposit Was Successfully Cancelled')
    } catch (error) {
      message.error('Something went Wrong')
    }
  }
  if (
    depositCancel.status === 'Declined' ||
    depositCancel.status === 'Pending'
  ) {
    return (
      <button
        onClick={handlesetdepositCancel}
        className={
          depositCancel.status === 'Pending' ||
          depositCancel.status === 'Declined'
            ? 'btn btn-danger'
            : ''
        }
      >
        {depositCancel.status}
      </button>
    )
  } else return null
}
