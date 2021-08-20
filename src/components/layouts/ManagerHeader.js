import PropTypes from "prop-types";

const ManagerHeader = (props) => {
  const {
    allBankTransfers,
    allDeposits,
    allWithdrawals,
    allVerify,
    allUsers,
    orders,
    setDisplayC,
  } = props;
  return (
    <div className="tabs manager-tabs">
      <div manager-tab="statistics" className="tab active">
        <span>Statistics</span>
      </div>
      <div manager-tab="bank-transfers" className="tab">
        <span>Bank Transfers</span>
        <span className="notify">
          <small>{allBankTransfers.length}</small>
        </span>
      </div>
      <div manager-tab="payments" className="tab">
        <span>Payments</span>
        <span className="notify">
          <small>
            {
              allDeposits.filter((deposit) => deposit.status === "Pending")
                .length
            }
          </small>
        </span>
      </div>
      <div manager-tab="subscriptions" className="tab">
        <span>Subscriptions</span>
      </div>
      <div manager-tab="identity" className="tab">
        <span>Identity</span>
        <span className="notify">
          <small>
            {allVerify.filter((verify) => verify.status === "Pending").length}
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
          <small>{orders.length}</small>
        </span>
      </div>
      <div manager-tab="withdraw" className="tab">
        <span>Withdraw</span>
        <span className="notify">
          <small>
            {allWithdrawals.length > 0 &&
              allWithdrawals.filter(
                (withdrawal) => withdrawal.status === "Pending"
              ).length}
          </small>
        </span>
      </div>
      <div manager-tab="traders-approval" className="tab">
        <span>Traders Approvals</span>
      </div>
    </div>
  );
};

ManagerHeader.propTypes = {
  allBankTransfers: PropTypes.array.isRequired,
  allDeposits: PropTypes.array.isRequired,
  allWithdrawals: PropTypes.array.isRequired,
  allVerify: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  setDisplayC: PropTypes.func.isRequired,
};

export default ManagerHeader;
