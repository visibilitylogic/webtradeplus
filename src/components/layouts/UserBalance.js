import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'
import { message } from 'antd'

const UserBalance = ({ singleUser, error }) => {
  const { _id } = singleUser
  const { singleUserBalance } = useActions()
  const [state, setstate] = useState({
    pulseType: 'bonus',
    profitLoss: false,
    amount: 0,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      await singleUserBalance(_id, state)
      setstate({
        pulseType: '',
        profitLoss: false,
        amount: 0,
      })
      message.success('Successfully Approved')
    }
  }

  return (
    <>
      {singleUser && (
        <form onSubmit={handleSubmit}>
          <div
            className="public-card white-card mb-3"
            style={{
              margin: '15px auto 0 auto',
              maxWidth: '800px',
              borderRadius: '6px',
            }}
          >
            <div className="d-flex justify-content-center align-items-center py-4">
              <div className="mr-auto ">
                <h6>Pause:</h6>
              </div>
              <div className="ml-4 w-75">
                <select
                  className=" form-control "
                  value={state.pulseType}
                  name="select"
                  onChange={(e) =>
                    setstate({ ...state, pulseType: e.target.value })
                  }
                >
                  <option value="bonus">Bonus</option>
                  <option value="deposit">Deposit</option>
                  <option value="profit">Profit</option>
                  <option value="loss">Loss</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center py-2">
              <div className="mr-auto ">
                <h6>Modification Type:</h6>
              </div>
              <div className="ml-4 w-75">
                <select
                  className="form-control"
                  name="selectType"
                  value={state.profitLoss}
                  onChange={(e) =>
                    setstate({ ...state, profitLoss: Boolean(e.target.value) })
                  }
                >
                  <option value="true">Credit</option>
                  <option value="false">Debit</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center py-2">
              <div className="mr-auto ">
                <h6>Modification value:</h6>
              </div>
              <div className="ml-4 w-75">
                <input
                  className=" form-control form-control-lg"
                  type="text"
                  name="text"
                  required
                  placeholder="0.00"
                  value={state.amount}
                  onChange={(e) =>
                    setstate({ ...state, amount: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div
              className="d-flex justify-content-center p-2"
              style={{ width: '50%', margin: 'auto' }}
            >
              <button
                type="submit"
                className="btn btn-success w-75"
                role="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default UserBalance
