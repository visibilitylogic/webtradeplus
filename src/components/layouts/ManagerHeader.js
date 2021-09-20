import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const ManagerHeader = ({ setDisplayC }) => {
  const {
    bankTransfers,
    allDeposits,
    allWithdrawals,
    allVerifiedUsers,
    allOrders,
    allTrades,
    allSubscription,
    allUsers,
  } = useSelector((state) => state.profile)

  return (
    <div className="tabs manager-tabs">
      <div manager-tab="statistics" className="tab active">
        <span>Statistics</span>
      </div>
      <div manager-tab="bank-transfers" className="tab">
        <span>Bank Transfers</span>
        <span className="notify">
          <small>{bankTransfers.length}</small>
        </span>
      </div>
      <div manager-tab="payments" className="tab">
        <span>Deposits</span>
        <span className="notify">
          <small>
            {allDeposits.length > 0
              ? allDeposits.length > 0 &&
                allDeposits.filter((deposit) => deposit.status === 'Pending')
                  .length
              : 0}
          </small>
        </span>
      </div>
      <div manager-tab="subscriptions" className="tab">
        <span>Subscription</span>
        <span className="notify">
          <small>{allSubscription.length}</small>
        </span>
      </div>
      <div manager-tab="identity" className="tab">
        <span>KYC</span>
        <span className="notify">
          <small>
            {allVerifiedUsers.length > 0
              ? allVerifiedUsers.length > 0 &&
                allVerifiedUsers.filter((verify) => verify.status === 'Pending')
                  .length
              : 0}
          </small>
        </span>
      </div>
      <div
        manager-tab="users"
        className="tab"
        onClick={() => setDisplayC(false)}
      >
        <span>Users</span>
        <span className="notify">
          <small>{allUsers.length}</small>
        </span>
      </div>
      <div manager-tab="orders" className="tab">
        <span>Orders</span>
        <span className="notify">
          <small>{Object.entries(allTrades).length}</small>
        </span>
      </div>
      <div manager-tab="withdraw" className="tab">
        <span>Withdrawals</span>
        <span className="notify">
          <small>
            {allWithdrawals.length > 0
              ? allWithdrawals.length > 0 &&
                allWithdrawals.filter(
                  (withdrawal) => withdrawal.status === 'Pending',
                ).length
              : 0}
          </small>
        </span>
      </div>
      <div manager-tab="traders-approval" className="tab">
        <span>Traders Approvals</span>
        <span className="notify">
          <small>
            {allOrders.length > 0
              ? allOrders.length > 0 &&
                allOrders.filter((order) => order.status === 'Pending').length
              : 0}
          </small>
        </span>
      </div>
    </div>
  )
}

ManagerHeader.propTypes = {
  setDisplayC: PropTypes.func.isRequired,
}

export default ManagerHeader
