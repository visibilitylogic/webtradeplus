import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'

const WithdrawalStatus = ({ status }) => {
  const { approveWithdrawal, declineWithdrawal } = useActions()
  const { singleUserVerifedDetails, error } = useSelector(
    (state) => state.profile,
  )
  const { userId } = singleUserVerifedDetails
  const [accept, setAccept] = useState('Accept')
  const [decline, setDecline] = useState('Declined')

  const handleApproWithdraw = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: userId,
        message: 'Withdrawal has been approved',
      }
      await approveWithdrawal(details)
      setAccept(null)

      setDecline(null)

      message.success('Withdrawal approved')
    }
  }
  const handledeclineWithdraw = async () => {
    if (error) {
      message.error('Decline  Was Not Successful')
    } else {
      const details = {
        id: userId,
        message: 'withdrawal has been declined',
      }
      await declineWithdrawal(details)
      setAccept('accept')
      setDecline(null)

      message.success('withdrawal was declined')
    }
  }
  return status === 'Pending' ? (
    <div className="d-flex flex-column" style={{ fontSize: '8px' }}>
      <div onClick={handleApproWithdraw}>
        <a className="text-light text-center p-0 bg-success mb-1">{accept}</a>
      </div>
      <div onClick={handledeclineWithdraw}>
        <a className="text-light text-center bg-danger mb-0">{decline}</a>
      </div>
    </div>
  ) : status === 'Declined' ? (
    <a
      className="text-light text-center p-0 bg-success mb-1"
      onClick={handleApproWithdraw}
    >
      Approve
    </a>
  ) : null
}

export default WithdrawalStatus
