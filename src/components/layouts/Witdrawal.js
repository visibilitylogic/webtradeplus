import { useState } from 'react'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

const Witdrawal = ({ status }) => {
  const { approveMAnagerWithdrawal, declineManagerWithdrawal } = useActions()
  const { error } = useSelector((state) => state.profile)
  const { _id } = status
  const [accept, setAccept] = useState('Accept')
  const [decline, setDecline] = useState('Declined')

  const handleApproWithdraw = async () => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      const details = {
        id: _id,
        message: 'Withdrawal has been approved',
      }
      await approveMAnagerWithdrawal(details)
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
        id: _id,
        message: 'withdrawal has been declined',
      }
      await declineManagerWithdrawal(details)
      setAccept('accept')
      setDecline(null)

      message.success('withdrawal was declined')
    }
  }
  return status.status === 'Pending' ? (
    <div className="d-flex flex-column" style={{ fontSize: '8px' }}>
      <div onClick={handleApproWithdraw}>
        <a className="text-light text-center p-0 bg-success mb-1">{accept}</a>
      </div>
      <div onClick={handledeclineWithdraw}>
        <a className="text-light text-center bg-danger mb-0">{decline}</a>
      </div>
    </div>
  ) : status.status === 'Declined' ? (
    <a
      className="text-light text-center p-0 bg-success mb-1"
      onClick={handleApproWithdraw}
    >
      Approve
    </a>
  ) : null
}

export default Witdrawal
