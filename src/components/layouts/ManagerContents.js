import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Row, Col, Table } from "react-bootstrap";
import { Button, Tag, DatePicker, message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import PaymentDetailsPopOver from "../utils/modals/PaymentDetailsPopOver";
import VerifyDetailsPopOver from "../utils/modals/VerifyDetailsPopOver";
import VerifyDocModal from "../utils/modals/VerifyDocModal";
import EditAutoCopyTrade from "../utils/EditAutoCopyTrade";
import WithdrawDetailsModal from "../utils/modals/WithdrawalDetailsPopOver";

const ManagerContents = (props) => {
  const history = useHistory();
  const {
    allDeposits,
    allWithdrawals,
    allVerify,
    allUsers,
    allTrades,
    allBankTransfers,
    numVerified,
    savedAllWithdrawals,
    savedAllusers,
    savedAlltrades,
    displayC,
    setDisplayC,
    setEditProfile,
  } = props;
  const { error } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.auth);

  // ACTION CREATORS
  const {
    updateWalletBalance,
    setLiveTrade,
    approveDeposit,
    declineVerify,
    approveVerify,
    declineWithdrawal,
    approveWithdrawal,
    declineDeposit,
    makeAdmin,
    makeManager,
    removeAdmin,
    removeManager,
    deleteUser,
  } = useActions();

  const [loading, setLoading] = useState(false);
  const [userAutoCopyTradeData, setUserAutoCopyTradeData] = useState([]);
  const [profitLoss, setProfitLoss] = useState(false);
  const [market, setMarket] = useState("");
  const [amount, setAmount] = useState(0);
  const [asset, setAsset] = useState("");
  const [bal, setBal] = useState(false);
  const [execution, setExecution] = useState(false);
  const [withd, setWithd] = useState(false);
  const [secu, setSecu] = useState(false);
  const [card, setCard] = useState(true);
  const [payments, setPayments] = useState(false);
  const [orderT, setOrderT] = useState(false);
  const [text, setText] = useState("");
  const [checkDate, setCheckDate] = useState(false);
  const [copyTradeBtn, setCopyTradeBtn] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [credit, setCredit] = useState(true);
  const [scheduledTime, setScheduledTime] = useState("");
  const [decline, setDecline] = useState(false);
  const [declinedMessage, setDeclinedMessage] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [currentDeposit, setCurrentDeposit] = useState([]);

  const callBackAutoTrade = () => {
    (async () => {
      const { data } = await axios(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/${user._id}`
      );
      setUserAutoCopyTradeData(data);
    })();
  };

  const deleteAutoCopyTrade = async () => {
    setLoading(true);

    try {
      await axios.delete(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/${user._id}`
      );
      callBackAutoTrade();
      message.success("Successfully Deleted Auto-trade");
    } catch (error) {
      console.log(error);
      message.error("Error Deleting Auto-trade");
    }
    setLoading(false);
  };

  const submitAutoCopyTrade = async (payload) => {
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(payload);

    try {
      await axios.post(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade`,
        body,
        config
      );
      callBackAutoTrade();
      setProfitLoss(false);
      setMarket("");
      setAmount(0);
      setAsset("");
      setScheduledTime("");
      message.success("Successfully Added Auto-trade");
    } catch (error) {
      console.log(error);
      message.error("error adding auto-trade");
    }
    setLoading(false);
  };

  const handleLiveTrade = () => {
    setLiveTrade({
      id: user._id,
      liveTrade: !user.liveTrade,
    });
  };

  const onChangeDate = (value, dateString) => {
    setCheckDate(false);
    if (new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0))) {
      setCopyTradeBtn(true);
    } else if (
      new Date(dateString) >= new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      setCopyTradeBtn(false);
    }
  };

  const handleSetCard = () => {
    setCard(true);
    setWithd(false);
    setBal(false);
    setExecution(false);
    setPayments(false);
    setSecu(false);
    setOrderT(false);

    (async () => {
      const { data } = await axios(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/desposit/${user._id}`
      );
      setCurrentDeposit(data);
    })();
  };

  const handleSetWithd = () => {
    setWithd(true);
    setCard(false);
    setBal(false);
    setExecution(false);
    setPayments(false);
    setSecu(false);
    setOrderT(false);
  };

  const handleSetBal = () => {
    setBal(true);
    setCard(false);
    setExecution(false);
    setPayments(false);
    setSecu(false);
    setWithd(false);
    setOrderT(false);
  };

  const handleSetSecu = () => {
    setSecu(true);
    setBal(false);
    setCard(false);
    setExecution(false);
    setPayments(false);
    setWithd(false);
    setOrderT(false);
  };

  const handleSetOrder = () => {
    setOrderT(true);
    setSecu(false);
    setBal(false);
    setCard(false);
    setExecution(false);
    setPayments(false);
    setWithd(false);
  };

  const handleSetExecution = () => {
    setExecution(true);
    setOrderT(false);
    setSecu(false);
    setBal(false);
    setCard(false);
    setPayments(false);
    setWithd(false);
  };

  const handleSetPayments = () => {
    setPayments(true);
    setExecution(false);
    setOrderT(false);
    setSecu(false);
    setBal(false);
    setCard(false);
    setWithd(false);
  };

  const handleUpdateWalletBalance = () => {
    if (loading) {
      setText("Updating...");
    } else if (!credit && parseInt(amount) > user.wallet) {
      message.error(
        "This transaction is not valid as it will result in a negative balance"
      );
    } else {
      updateWalletBalance({
        id: user._id,
        amount,
        action: credit,
      });

      setText("Saved");
      message.success("Balance updated");
      window.location.reload();
    }
  };

  const handleApproveDeposit = (id) => {
    if (error) {
      message.error("Deposit Not Approved");
    } else {
      approveDeposit({
        id,
        message: "Deposit Was Successfully Approved",
      });
      message.success("Deposit Was Successfully Approved");
    }
  };

  const handleDeclineDeposit = (id) => {
    if (error) {
      message.error("Deposit Approval Was Not Declined");
    } else {
      declineDeposit({
        id,
        message: "Deposit Request Successfully Declined",
      });
      message.success("Deposit Was Successfully Declined");
    }
  };

  const handleDeclineVerify = (id) => {
    if (error) {
      message.error("Identity Decline Was not Wuccessfull");
    } else {
      declineVerify({
        id,
        message: declinedMessage,
      });
    }

    setDeclinedMessage("");
    setDecline(false);
  };

  const handleApproveVerify = (id) => {
    if (error) {
      message.error("Identity Approval Was Not Successful");
    } else {
      approveVerify({
        id,
        message: "Identity Was Successfully Approved",
      });
      message.success("Identity Was Successfully Approved");
    }
  };

  const handleDeclineWithdrawal = (id) => {
    if (error) {
      message.error("Withdrawal Approval Was Not Declined");
    } else {
      declineWithdrawal({
        id,
        message: "Withdrawal Was Successfully Declined",
      });
      message.success("Withdrawal Was Successfully Declined");
    }
  };

  const handleApproveWithdrawal = (id) => {
    if (error) {
      message.error("Withdrawal Approval Was Not Successfull");
    } else {
      approveWithdrawal({
        id,
        message: "Withdrawal Was Successfully Approved",
      });
      message.success("Withdrawal Was Successfully Approved");
    }
  };

  const handleMakeAdmin = (id) => {
    if (error) {
      message.error("Error making an Admin");
    } else {
      makeAdmin({ id });
      message.success("Successfully made an Admin");
    }
  };

  const handleMakeManager = (id) => {
    if (error) {
      message.error("Error making a Manager");
    } else {
      makeManager({ id });
      message.success("Successfully made a Manager");
    }
  };

  const handleRemoveManager = (id) => {
    if (error) {
      message.error("Error removing as a Manager");
    } else {
      removeManager({ id });
      message.success("Successfully removed as a Manager");
    }
  };

  const handleRemoveAdmin = (id) => {
    if (error) {
      message.error("Error removing as an Admin");
    } else {
      removeAdmin({ id });
      message.success("Successfully removed as an Admin");
    }
  };

  const handleDeleteUser = (id) => {
    if (error) {
      message.error("Try again");
    } else {
      deleteUser({ id });
      message.success("User was successfully deleted from the database");
      history.push("/dashboard/manager");
    }
  };

  return (
    <div className="manager-tabs-details">
      <div className="manager-tab-dtls" manager-tab-dtls="statistics">
        <div className="dash-row dash-row-centralized">
          <div className="split-50">
            <h3 style={{ fontWeight: "normal" }}>
              Statistics - 04/02/2021 to 13/02/2021
            </h3>
          </div>
          <div className="split-50" />
        </div>
        <div className="chart" />
        <div className="dash-row" style={{ margin: "15px 0" }}>
          <div className="into-6">
            <h5 className="text-uppercase">New user</h5>
            <h2>
              {savedAllusers.allUsers ? savedAllusers.allUsers.length : 0}
            </h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Deposit</h5>
            <h2>{allDeposits ? allDeposits.length : 0}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Withdraw</h5>
            <h2>
              {savedAllWithdrawals.allWithdrawals
                ? savedAllWithdrawals.allWithdrawals.length
                : 0}
            </h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Identity verification</h5>
            <h2>
              {/* {this.savedAllver.savedAllver
                              ? this.savedAllver.allVerify.length
                              : 0} */}
              {numVerified}
            </h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Order passed</h5>
            <h2>
              {savedAlltrades.savedAlltrades
                ? savedAlltrades.allTrades.length
                : 0}
            </h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">New subscription</h5>
            <h2>0</h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Currency</th>
              <th>Total Trade</th>
              <th>Total Deposit</th>
              <th>Total Withdraw</th>
              <th>Fees</th>
            </tr>
            <tr>
              <td>EUR</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="bank-transfers">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Ref.</th>
              <th>Created date</th>
              <th>Status</th>
              <th>Processed</th>
              <th>Amount</th>
              <th>Bank Ref.</th>
              <th>Proof recieved</th>
              <th />
            </tr>
            {allBankTransfers.map((transfer, index) => (
              <tr>
                <td>
                  #{index + 1}- {transfer.name}
                </td>
                <td className="font-weight-bold">{transfer.Ref}</td>
                <td> {transfer.time}</td>
                <td>
                  {transfer.status === "Pending" ? (
                    <span className="pending">Pending</span>
                  ) : transfer.status === "Approved" ? (
                    <span className="validate">Approved</span>
                  ) : transfer.status === "Declined" ? (
                    <span className="btn-danger">Declined</span>
                  ) : null}
                </td>
                <td>
                  {transfer.status === "Pending" ? (
                    <span className="not-processed">Not Processed</span>
                  ) : (
                    <span className="processed">Processed</span>
                  )}
                </td>
                <td>
                  {transfer.currency} {transfer.amount}
                </td>
                <td>-</td>
                <td>No proof received</td>
                <td>
                  <div
                    className="validate"
                    onClick={() => handleApproveWithdrawal(transfer._id)}
                    style={{
                      display: transfer.status !== "Pending" && "none",
                    }}
                  >
                    Validate
                  </div>
                  <div
                    style={{
                      display: transfer.status !== "Pending" && "none",
                    }}
                    className="cancel"
                    onClick={() => handleDeclineWithdrawal(transfer._id)}
                  >
                    Cancel
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="payments">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Ref.</th>
              <th>Created date</th>
              <th>Status</th>
              <th>Amount paid</th>
              <th>Fees</th>
              <th>Wallet received</th>
              <th>Amount received</th>
              <th>Payment gateway</th>
              <th>Payment Details</th>
              <th />
            </tr>
            {allDeposits.map((deposit, index) => (
              <tr key={index}>
                <td>
                  #{index + 1} - {deposit.name}
                </td>
                <td className="font-weight-bold">{deposit.Ref}</td>
                <td>{deposit.time}</td>
                <td>
                  {deposit.status === "Pending" ? (
                    <span className="pending">Not Proccesed</span>
                  ) : deposit.status === "Approved" ? (
                    <span className="validate">Paid</span>
                  ) : deposit.status === "Declined" ? (
                    <span className="cancel">Declined</span>
                  ) : null}
                </td>
                <td>
                  {deposit.amount
                    ? new Intl.NumberFormat("en-US").format(deposit.amount)
                    : ""}
                  USD
                </td>
                <td>{deposit.fee}USD</td>
                <td>USD</td>
                <td className="font-weight-bold">{deposit.amount} USD</td>
                <td>{deposit.method}</td>
                <td>
                  <PaymentDetailsPopOver details={deposit} />
                </td>
                <td>
                  <div
                    className="validate"
                    onClick={() => handleApproveDeposit(deposit._id)}
                    style={{
                      display: deposit.status !== "Pending" && "none",
                    }}
                  >
                    Validate
                  </div>
                  <div
                    className="cancel"
                    onClick={() => {
                      handleDeclineDeposit(deposit._id);
                    }}
                    style={{
                      display: deposit.status !== "Pending" && "none",
                    }}
                  >
                    Cancel
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="subscriptions">
        <table>
          <tbody>
            <tr>
              <th>ID Subscription</th>
              <th>User</th>
              <th>Date subscription</th>
              <th>Number days</th>
              <th>Subscription expire in</th>
              <th>Type payment</th>
              <th>Charge infos.</th>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="identity">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Submited date</th>
              <th>Status</th>
              <th>Identity Info</th>
              <th>Documents</th>
              <th />
            </tr>
            {allVerify.map((verify, index) => (
              <tr key={index}>
                {decline && (
                  <section
                    className="withdraw-modal-box"
                    style={{ display: "block" }}
                  >
                    <div
                      className="withdraw-modal support-modal pb-5"
                      style={{ maxWidth: "500px" }}
                    >
                      <div className="header">Decline Identity</div>
                      <span className="close" onClick={() => setDecline(false)}>
                        <svg id="lnr-cross " viewBox="0 0 1024 1024">
                          <title>cross</title>
                          <path
                            className="path1"
                            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                          />
                        </svg>
                      </span>{" "}
                      <Container fluid>
                        <Form className="text-left">
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label
                              className="py-4"
                              style={{ color: "#fff" }}
                            >
                              Write below the reason for rejection
                            </Form.Label>
                            <Form.Control
                              value={declinedMessage}
                              onChange={(event) =>
                                setDeclinedMessage(event.target.value)
                              }
                              as="textarea"
                              rows={5}
                            />
                          </Form.Group>
                          <div className="text-right">
                            <Button
                              variant="primary mt-3"
                              onClick={() => handleDeclineVerify(verify.userId)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </Form>
                      </Container>
                    </div>
                  </section>
                )}
                <td>
                  #{index + 1}- {verify.name}
                </td>
                <td>
                  <Moment format="DD/MM/YYYY">{verify.time}</Moment>
                </td>
                <td>
                  {verify.status === "Pending" ? (
                    <span className="pending">Not Proccesed</span>
                  ) : verify.status === "Approved" ? (
                    <span className="validate">Approved</span>
                  ) : verify.status === "Declined" ? (
                    <span className="pending">Declined</span>
                  ) : null}
                </td>
                <td>{<VerifyDetailsPopOver details={verify} />}</td>
                <td>
                  <a href="#!" className="sec-bt">
                    {/* Step 1: Identity */}
                    <VerifyDocModal
                      text={verify.documentName}
                      title={verify.documentName}
                      file={verify.documentFile}
                      img={verify.Img}
                      proofDocument={verify.proofDocument}
                    />
                  </a>
                </td>
                <td>
                  <div
                    style={{
                      display: verify.status === "Approved" && "none",
                    }}
                    className="validate "
                    onClick={() => handleApproveVerify(verify.userId)}
                  >
                    Accept
                  </div>
                  <div
                    className="cancel"
                    style={{
                      display: verify.status === "Declined" && "none",
                    }}
                    onClick={() => setDecline(true)}
                  >
                    Decline
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="users">
        {!displayC && (
          <div className="first-sec">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Signin method</th>
                  <th>Last login</th>
                  <th>Notifications enabled</th>
                  <th>Currency</th>
                  <th>Auto Trade</th>
                </tr>
                {allUsers &&
                  allUsers.length > 0 &&
                  allUsers.map((user) => (
                    <tr
                      onClick={() => {
                        setDisplayC(true);
                        callBackAutoTrade();
                        setUserLevel(
                          user.isAdmin
                            ? "isAdmin"
                            : user.isManager
                            ? "isManager"
                            : "none"
                        );
                      }}
                    >
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          <div className="dash-row dash-row-centralized">
                            <div className="profile" />
                            <div className="name">
                              <span>{user.name}</span>
                            </div>
                            <div className="active" />
                          </div>
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          Standard
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          <Moment fromNow ago>
                            {user.time}
                          </Moment>
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          {user.notificationsEnabled ? "Yes" : "No"}
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          {user.currency}
                        </a>
                      </td>
                      <td>
                        <a dash-action="show-users-details" href="#!">
                          {user.isTrading ? "ON" : "Off"}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {displayC && (
          <div className="second-sec" style={{ display: "block" }}>
            <div className="user-dtls-tab" style={{ display: "block" }}>
              <div
                className={card ? "live" : ""}
                onClick={handleSetCard}
                dash-user-dtls-tab="card"
              >
                Card
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetBal}
                className={bal ? "live" : ""}
              >
                Balances
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetExecution}
                className={execution ? "live" : ""}
              >
                Auto Copy Trading
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetPayments}
                className={payments ? "live" : ""}
              >
                Payments
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetWithd}
                className={withd ? "live" : ""}
              >
                Withdraw
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetOrder}
                className={orderT ? "live" : ""}
              >
                Orders
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetSecu}
                className={secu ? "live" : ""}
              >
                Security
              </div>
            </div>
            <div className="user-dtls-tab-dtls">
              {card && (
                <div dash-user-dtls-tab-dtls="card">
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}

                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                            onClick={() => setEditProfile(true)}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                      <div className="hr" />
                    </div>
                    <div className="dash-row white-card">
                      <div className="table">
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Name</div>
                          <div className="td">{user.name}</div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Last location</div>
                          <div className="td">
                            {user.country ? user.country : ""}
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Phone</div>
                          <div className="td">
                            {user.phone ? user.phone : ""}
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Last login</div>
                          <div className="td">-</div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Language</div>
                          <div className="td"> {user.language}</div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Currency use</div>
                          <div className="td"> {user.currency}</div>
                        </div>
                      </div>
                      <div className="table">
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Signup with</div>
                          <div className="td">Standard</div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Identity verification</div>
                          <div className="td">
                            <span
                              style={{
                                backgroundColor: "#0579f8",
                                color: "#fff",
                                display: "block",
                                padding: "2px 5px",
                              }}
                            >
                              IN VERIFICATION
                            </span>
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Notification</div>
                          <div className="td">
                            <span
                              style={{
                                backgroundColor: "#ef3131",
                                color: "#fff",
                                display: "block",
                                padding: "2px 5px",
                              }}
                            >
                              DISABLED
                            </span>
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">2 Step Authentification</div>
                          <div className="td">
                            <span
                              style={{
                                backgroundColor: "#ef3131",
                                color: "#fff",
                                display: "block",
                                padding: "2px 5px",
                              }}
                            >
                              DISABLED
                            </span>
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Created date</div>
                          <div className="td">
                            {user.time ? user.time.slice(0, 10) : ""}
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">User status</div>
                          <div className="td">
                            <span
                              style={{
                                backgroundColor: "#39d95f",
                                color: "#fff",
                                display: "block",
                                padding: "2px 5px",
                              }}
                            >
                              ACTIVE
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dash-row">
                    <div className="login-history">
                      <div className="header">
                        <span className="text-uppercase font-weight-bold font-size-14">
                          Login History
                        </span>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div className="dash-row dash-row-centralized">
                                <div
                                  className="country-flag"
                                  style={{
                                    backgroundImage: "url()",
                                  }}
                                />
                                <div className="country-name">
                                  Bucharest (Romania)
                                </div>
                              </div>
                            </td>
                            <td>86.105.9.12</td>
                            <td>23/02/2021 14:07:49</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="deposit-history">
                      <div className="header">
                        <span className="text-uppercase font-weight-bold font-size-14">
                          Deposit History
                        </span>
                      </div>
                      <table>
                        <tbody>
                          {currentDeposit.length > 0 &&
                            currentDeposit.map((item) => (
                              <tr>
                                <td>{item._id}</td>
                                <td>{item.time}</td>
                                <td></td>
                                <td>Manager update {item.amount} USD</td>
                                <td>{item.amount} USD</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {bal ? (
                <div
                  dash-user-dtls-tab-dtls="balances"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.gmail}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="public-card white-card"
                    style={{ marginTop: "15px" }}
                  >
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Select balance</h4>
                      </div>
                      <div className="actions">
                        <select className="dash-select-short">
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Modification type</h4>
                      </div>
                      <div className="actions">
                        <select
                          className="dash-select-short"
                          onChange={(e) =>
                            setCredit(JSON.parse(e.target.value))
                          }
                        >
                          <option value="true">Credit</option>
                          <option value="false">Debit</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Modification value</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          name="text"
                          placeholder="0.00"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="save-btn">
                    <button onClick={handleUpdateWalletBalance}>{text}</button>
                  </div>
                  <div className="dash-row">
                    <div className="width-50">
                      <table>
                        <tbody>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="width-50">
                      <table>
                        <tbody>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                          <tr>
                            <td>USD</td>
                            <td>250.00000000 USD</td>
                            <td>250.00000000 USD</td>
                          </tr>
                          <tr>
                            <td>Binance Coin (BNB)</td>
                            <td>0.00 BNB</td>
                            <td>0.00 USD</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {execution && (
                <Row className="px-3" style={{ marginBottom: "10%" }}>
                  <Col md={4} className="mt-5">
                    <Card style={{ background: "#fff" }}>
                      <Card.Body>
                        <h6>
                          Current Balance:{" "}
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "green",
                              fontWeight: "bold",
                            }}
                          >
                            $
                            {new Intl.NumberFormat("en-US").format(user.wallet)}
                          </span>
                        </h6>
                        <h6>
                          Name:
                          {user.name}
                        </h6>
                        <h6>
                          Email:
                          {user.email}
                        </h6>

                        <Form className="user-form">
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">
                              Amount
                            </Form.Label>
                            <Form.Control
                              type="number"
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                            />
                          </Form.Group>
                          <Row>
                            <Col md={6}>
                              <Form.Check
                                onChange={(e) => setProfitLoss(true)}
                                type="radio"
                                label="Profit"
                                id="default-radio"
                                name="profitloss"

                                //   onChange={e=>this.setState({ profit:e.target.checked})}
                                //  checked={this.state.profit}
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Check
                                onChange={(e) => setProfitLoss(false)}
                                type="radio"
                                label="Loss"
                                id="default-radio"
                                name="profitloss"
                                // checked={this.state.Loss}
                              />
                            </Col>
                          </Row>
                          <Form.Group className="d-flex align-items-center mt-3">
                            <Form.Label htmlFor="markets" className="mr-3">
                              Markets
                            </Form.Label>
                            <Form.Control
                              as="select"
                              id="markets"
                              custom
                              onChange={(e) => setMarket(e.target.value)}
                              value={market}
                            >
                              <option value="stocks">Stocks</option>
                              <option value="forex">Forex</option>
                              <option value="indices">Indices</option>
                              <option value="commodities">Commodities</option>
                              <option value="cryptocurrency">
                                Cryptocurrency
                              </option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">
                              Assets
                            </Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) => setAsset(e.target.value)}
                              value={asset}
                            />
                          </Form.Group>
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">Time</Form.Label>
                            <Row>
                              <Col md={6}>
                                {/* <Form.Check
                                                type="radio"
                                                label="Schedule"
                                                id="default-radio"
                                                name="time"
                                              /> */}

                                <Form.Check
                                  type="radio"
                                  label="Schedule"
                                  id="default-radio"
                                  name="time"
                                  onChange={() => {
                                    setSchedule(true);
                                    setCopyTradeBtn(true);
                                    setScheduledTime(null);
                                  }}
                                />
                              </Col>
                              <Col md={6}>
                                <Form.Check
                                  type="radio"
                                  label="Now"
                                  id="default-radio"
                                  name="time"
                                  onChange={(e) => {
                                    setSchedule(false);
                                    setCheckDate((prev) => !prev);
                                    setCopyTradeBtn((prev) => !prev);
                                    setScheduledTime((prev) =>
                                      prev ? new Date() : null
                                    );
                                  }}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                          {schedule ? (
                            <Form.Group>
                              <Row>
                                <span className="autoTSpan">Calender</span>
                                <DatePicker
                                  showTime
                                  onChange={onChangeDate}
                                  onOk={(value) => setScheduledTime(value._d)}
                                />
                              </Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          <div className="text-right">
                            <Button
                              disabled={copyTradeBtn}
                              type="primary"
                              onClick={() =>
                                submitAutoCopyTrade({
                                  profitLoss,
                                  user,
                                  market,
                                  amount: parseFloat(amount),
                                  asset,
                                  scheduledTime,
                                })
                              }
                            >
                              {loading ? (
                                <>
                                  <i className="fa fa-spin fa-spinner"></i>
                                  Applying...
                                </>
                              ) : (
                                "Apply"
                              )}
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={8} className="mt-5">
                    <div className="autoT">
                      <div
                        style={{
                          marginTop: "7%",
                        }}
                      >
                        <h4 style={{ color: "white" }}>
                          {" "}
                          AutoCopy Trader - Queue :{" "}
                        </h4>
                      </div>
                      <div>
                        <h3
                          style={{ color: "white" }}
                        >{`$ ${new Intl.NumberFormat("en-US").format(
                          user.estimatedBalance
                        )}`}</h3>
                        <p>Estimated balance on</p>
                        <p>
                          <Moment format="DD MMMM YYYY">
                            {user.lastAutoTradeDate}
                          </Moment>
                        </p>
                      </div>
                    </div>

                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Market</th>
                          <th>Asset</th>
                          <th>Amount</th>
                          <th>P/L</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAutoCopyTradeData.length > 0 &&
                          userAutoCopyTradeData.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.market}</td>
                              <td>{data.assets}</td>
                              <td>
                                $
                                {new Intl.NumberFormat("en-US").format(
                                  data.amount
                                )}
                              </td>
                              <td>{data.profitLoss ? "Profit" : "Loss"}</td>
                              <td>
                                <Moment format="hh:mm - DD MMMM YYYY">
                                  {data.scheduledTime}
                                </Moment>
                              </td>
                              <td>
                                <EditAutoCopyTrade
                                  id={data._id}
                                  callback={() => callBackAutoTrade()}
                                >
                                  <Tag
                                    color="blue"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Edit
                                  </Tag>
                                </EditAutoCopyTrade>
                                <Tag
                                  style={{ cursor: "pointer" }}
                                  onClick={() => deleteAutoCopyTrade()}
                                  color="red"
                                >
                                  {loading ? (
                                    <i className="fa fa-spin fa-spinner"></i>
                                  ) : (
                                    "Delete"
                                  )}
                                </Tag>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}

              {payments && (
                <div
                  dash-user-dtls-tab-dtls="payments"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}{" "}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <th>User</th>
                          <th>Ref.</th>
                          <th>Created date</th>
                          <th>Status</th>
                          <th>Amount paid</th>
                          <th>Fees</th>
                          <th>Wallet received</th>
                          <th>Amount received</th>
                          <th>Payment gateway</th>
                          <th>Proof</th>
                          <th />
                        </tr>
                        <tr>
                          <td>#89 - Makin Chris</td>
                          <td className="font-weight-bold">
                            linkinvest-4OU7-3798
                          </td>
                          <td>08/02/2021 06:32:53</td>
                          <td>
                            <span className="validate">Paid</span>
                          </td>
                          <td>306.00000000 USD</td>
                          <td>0.00 USD</td>
                          <td>USD</td>
                          <td className="font-weight-bold">306.00000000 USD</td>
                          <td></td>
                          <td>-</td>
                          <td>
                            <a className="cancel" href="#!">
                              Cancel
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#89 - Makin Chris</td>
                          <td className="font-weight-bold">
                            linkinvest-4OU7-3798
                          </td>
                          <td>08/02/2021 06:32:53</td>
                          <td>
                            <span className="validate">Paid</span>
                          </td>
                          <td>306.00000000 USD</td>
                          <td>0.00 USD</td>
                          <td>USD</td>
                          <td className="font-weight-bold">306.00000000 USD</td>
                          <td></td>
                          <td>-</td>
                          <td>
                            <a className="cancel" href="#!">
                              Cancel
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>#89 - Makin Chris</td>
                          <td className="font-weight-bold">
                            linkinvest-4OU7-3798
                          </td>
                          <td>08/02/2021 06:32:53</td>
                          <td>
                            <span className="validate">Paid</span>
                          </td>
                          <td>306.00000000 USD</td>
                          <td>0.00 USD</td>
                          <td>USD</td>
                          <td className="font-weight-bold">306.00000000 USD</td>
                          <td></td>
                          <td>-</td>
                          <td>
                            <a className="cancel" href="#!">
                              Cancel
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {withd && (
                <div
                  dash-user-dtls-tab-dtls="withdraw"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}{" "}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {orderT && (
                <div
                  dash-user-dtls-tab-dtls="orders"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}{" "}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {secu && (
                <div
                  dash-user-dtls-tab-dtls="security"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: "url()" }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: "url()" }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{" "}
                            <span style={{ color: "#ff7700" }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: "10px",
                                color: "#29c359",
                              }}
                            >
                              {new Intl.NumberFormat("en-US").format(
                                user.wallet
                              )}{" "}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            width: "30%",
                          }}
                        >
                          {user.liveTrade ? (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "green",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn off Live Trade
                            </button>
                          ) : (
                            <button
                              className="autotrader"
                              style={{
                                backgroundColor: "red",
                              }}
                              onClick={handleLiveTrade}
                            >
                              Turn on Live Trade
                            </button>
                          )}
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: "#363c4f" }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: "#e30f0f" }}
                            className="delete-profile"
                          >
                            Delete profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="orders">
        <table>
          <tbody>
            <tr>
              <th>Ref</th>
              <th>Order date</th>
              <th>Exchange</th>
              <th>Type</th>
              <th>Amount</th>

              <th>Total deducted</th>
              <th>Total received</th>
              <th>Profit/Loss</th>
              <th>Open Rate </th>
            </tr>
            {allTrades.length > 0 &&
              allTrades.map((item, i) => (
                <tr>
                  <td className="font-weight-bold">ORDR-00{i + 1}</td>
                  <td>{item.time}</td>
                  <td>{item.stockName}</td>
                  <td>
                    <span className="validate">{item.tag}</span>
                  </td>
                  <td>
                    {item.stockAmount}. {item.stockName}
                  </td>
                  <td>
                    <span className="pending">- 4.53748 USD</span>
                  </td>
                  <td>
                    <span className="validate">+ 0.98 {item.stockName}</span>
                  </td>
                  <td>0.40899999999988</td>
                  <td>{item.buyW}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="withdraw">
        <table>
          <tbody>
            <tr>
              <th>Ref.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Withdraw method</th>
              <th>Withdraw infos</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Fees</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            {allWithdrawals.length > 0 &&
              allWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.Ref}>
                  <td>{withdrawal.Ref}</td>
                  <td>{withdrawal.name}</td>
                  <td>{withdrawal.email}</td>
                  <td>{withdrawal.tag}</td>
                  <td>
                    <WithdrawDetailsModal details={withdrawal.methodDetails} />
                  </td>
                  <td>{withdrawal.time}</td>
                  <td>{withdrawal.amount}</td>
                  <td>{withdrawal.fees}</td>
                  <td>{withdrawal.total}</td>
                  <td>
                    {withdrawal.status === "Pending" ? (
                      <div className="btn-warning">{withdrawal.status}</div>
                    ) : withdrawal.status === "Approved" ? (
                      <div className="btn-success">{withdrawal.status}</div>
                    ) : withdrawal.status === "Declined" ? (
                      <div className="btn-danger">{withdrawal.status}</div>
                    ) : null}
                  </td>
                  <td>
                    <div
                      className="validate"
                      onClick={(a) => handleApproveWithdrawal(withdrawal._id)}
                      style={{
                        display: withdrawal.status !== "Pending" && "none",
                      }}
                    >
                      Validate
                    </div>
                    <div
                      style={{
                        display: withdrawal.status !== "Pending" && "none",
                      }}
                      className="cancel"
                      onClick={(a) => handleDeclineWithdrawal(withdrawal._id)}
                    >
                      Cancel
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="traders-approval">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Asking date</th>
              <th>Signup date</th>
              <th>Trades</th>
              <th>Rebalance</th>
              <th>Status</th>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ManagerContents.propTypes = {
  displayC: PropTypes.bool,
  setDisplayC: PropTypes.func.isRequired,
  setEditProfile: PropTypes.func.isRequired,
  savedAllWithdrawals: PropTypes.array.isRequired,
  savedAllusers: PropTypes.array.isRequired,
  savedAlltrades: PropTypes.array.isRequired,
  allDeposits: PropTypes.array.isRequired,
  allWithdrawals: PropTypes.array.isRequired,
  allVerify: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  allTrades: PropTypes.array.isRequired,
  allBankTransfers: PropTypes.array.isRequired,
  numVerified: PropTypes.number.isRequired,
};

export default ManagerContents;
