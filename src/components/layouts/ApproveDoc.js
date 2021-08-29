import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'
import DeclineModal from './DeclineModal'

function ApproveDoc({ status }) {
  const { error } = useSelector((state) => state.profile)
  const { approveVerify } = useActions()
  const [modalstate, setmodalstate] = useState(false)

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
      <a
        className="text-light text-center bg-danger"
        onClick={setmodalstate(!modalstate)}
      >
        Decline
      </a>
      <DeclineModal modalstate={modalstate} status={status} />
    </div>
  ) : null
}

export default ApproveDoc
