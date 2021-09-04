import { useState } from 'react'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

const SinglePayment = ({ status }) => {
  const { approveDepositForManager, declineDepositForManager } = useActions()
  const { error } = useSelector((state) => state.profile)
  const { _id } = status

  const [accept, setAccept] = useState('Accept')
  const [decline, setDecline] = useState('Declined')

  const handleApproDeposit = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: _id,
        message: 'Deposit has been approved',
      }
      await approveDepositForManager(details)
      setAccept(null)

      setDecline(null)

      message.success('Deposit approved')
    }
  }
  const handleDeclineDeposit = async () => {
    if (error) {
      message.error('Decline  Was Not Successful')
    } else {
      const details = {
        id: _id,
        message: 'withdrawal has been declined',
      }
      await declineDepositForManager(details)
      setAccept('accept')
      setDecline(null)

      message.success('withdrawal was declined')
    }
  }
  return status.status === 'Pending' ? (
    <div className="d-flex flex-column" style={{ fontSize: '8px' }}>
      <div onClick={handleApproDeposit}>
        <a className="text-light text-center p-0 bg-success mb-1">{accept}</a>
      </div>
      <div onClick={handleDeclineDeposit}>
        <a className="text-light text-center bg-danger mb-0">{decline}</a>
      </div>
    </div>
  ) : status.status === 'Declined' ? (
    <a
      className="text-light text-center p-0 bg-success mb-1"
      onClick={handleApproDeposit}
    >
      Approve
    </a>
  ) : null
}

export default SinglePayment
