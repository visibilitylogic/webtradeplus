import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Container, Card, Form, Row, Col, Table } from "react-bootstrap";
import { Button, Tag, DatePicker, message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import styled from "styled-components";
import "moment-timezone";
import EditAutoCopyTrade from "../utils/EditAutoCopyTrade";
import BasicTable from "./BasicTable";
import { Columns } from "./TableHeader";
import { depositHeader } from "./depositHeader";
import { withdrawalHeader } from "./withdrawalHeader";
import { allTradesHeader } from "./allTradesHeader";
import { allVerifiedUsersHeader } from "./allVerifiedUsersHeader";
import { bankTransferHeader } from "./bankTransferHeader";
import { tradeApprovalHeader } from "./tradeApprovalHeader";
import UserBalance from "./UserBalance";
import UserArea from "./UserArea";
import SingleUser from "./SingleUser";
import { paymentHeader } from "./paymentHeader";
import EstimatedBallance from "./EstimatedBallance";
import UserHeader from "./UserHeader";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import CustomTable from "../../helpers/customTable/CustomTable";
import { singleUserWithdrawal } from "./singleWithdrawalStatuss";
import { getAllUsers } from "../../store/action-creators/profileActions";

const ManagerContents = (props) => {
  const data = [
    { name: "User", uv: 400, pv: 2400, amt: 2400 },
    { name: "Deposit", uv: 100, pv: 200, amt: 2500 },
    { name: "KYC", uv: 300, pv: 1400, amt: 1400 },
    { name: "Orders", uv: 600, pv: 6400, amt: 6400 },
    { name: "Withdrawal", uv: 400, pv: 2400, amt: 2400 },
  ];

  const history = useHistory();
  const { displayC, setDisplayC, setEditProfile } = props;
  const {
    error,
    allDeposits,
    allWithdrawals,
    allVerifiedUsers,
    bankTransfers,
    allTrades,
    allUsers,
    singleDeposit,
    userTrades,
    userAutoCopyTrade,
    tradeApproval,
    singleUser,
    singleWithdrawals,
    allSingleDeposits,
  } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.auth);

  // ACTION CREATORS
  const {
    updateWalletBalance,
    setNotificationEnabled, // expecting end point
    deleteUser,
    getAllUsers,
    getUserAutoCopyTrade,
    addUserAutoCopyTrade,
    deleteUserAutoCopyTrade,
    getSingleWithdrawals,
  } = useActions();

  const [loading, setLoading] = useState(false);
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
  const [state, setstate] = useState("");

  //

  console.log(singleWithdrawals);

  const deleteAutoCopyTrade = async () => {
    setLoading(true);

    if (error) {
      message.error("Error Deleting Auto-trade");
    } else {
      deleteUserAutoCopyTrade(user._id);
      message.success("Successfully Deleted Auto-trade");
    }

    setLoading(false);
  };

  const submitAutoCopyTrade = async (payload) => {
    setLoading(true);
    if (error) {
      message.error("Error Adding Auto-Trade");
    } else {
      addUserAutoCopyTrade(payload);
      setProfitLoss(false);
      setMarket("");
      setAmount(0);
      setAsset("");
      setScheduledTime("");
      message.success("Successfully Added Auto-trade");
    }

    setLoading(false);
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

  const handleDeleteUser = (id) => {
    if (error) {
      message.error("Try again");
    } else {
      deleteUser({ id });
      message.success("User was successfully deleted from the database");
      history.push("/dashboard/manager");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [singleUser]);

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
        <div className="chart">
          <LineChart width={1900} height={410} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        <div className="dash-row" style={{ margin: "15px 0" }}>
          <div className="into-6">
            <h5 className="text-uppercase">New user</h5>
            <h2>{allUsers.length}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Deposit</h5>
            <h2>{allDeposits.length}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Withdrawal</h5>
            <h2>{allWithdrawals.length}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Identity verification</h5>
            <h2>{allVerifiedUsers.length}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">Order passed</h5>
            <h2>{allTrades.length}</h2>
          </div>
          <div className="into-6">
            <h5 className="text-uppercase">New subscription</h5>
            <h2>0</h2>
          </div>
        </div>
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="bank-transfers">
        {bankTransfers && bankTransfers.length > 0 && (
          <TableContainer>
            <BasicTable
              allUsers={bankTransfers}
              user={user}
              column={bankTransferHeader}
              type="transfer"
            />
          </TableContainer>
        )}
      </div>

      <div className="manager-tab-dtls" manager-tab-dtls="payments">
        {allDeposits && allDeposits.length > 0 && (
          <TableContainer>
            <BasicTable
              allUsers={allDeposits}
              user={user}
              column={depositHeader}
              type="deposit"
            />
          </TableContainer>
        )}
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
        {allVerifiedUsers && allVerifiedUsers.length > 0 && (
          // <CustomTable
          //   allUsers={allVerifiedUsers}
          //   user={user}
          //   column={allVerifiedUsersHeader}
          //   type="verifiedUsers"
          //   key={allVerifiedUsers}
          // />
          <TableContainer>
            <BasicTable
              allUsers={allVerifiedUsers}
              user={user}
              key={allVerifiedUsers}
              column={allVerifiedUsersHeader}
              type="verifiedUsers"
            />
          </TableContainer>
        )}
      </div>

      {/* Table */}
      <div
        className="manager-tab-dtls"
        manager-tab-dtls="users"
        style={{ marginLeft: "%" }}
      >
        {!displayC && allUsers && allUsers.length > 0 && (
          <div className="first-sec">
            <TableContainer>
              <BasicTable
                allUsers={allUsers}
                setDisplayC={setDisplayC}
                setUserLevel={setUserLevel}
                user={user}
                column={Columns}
                key={allUsers}
                type="EveryUser"
              />
            </TableContainer>
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
                Profile
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
                Deposits
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetWithd}
                className={withd ? "live" : ""}
              >
                Withdrawal
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetOrder}
                className={orderT ? "live" : ""}
              >
                Orders
              </div>
              {/* <div
                dash-user-dtls-tab="balances"
                onClick={handleSetSecu}
                className={secu ? 'live' : ''}
              >
                Security
              </div> */}
            </div>
            <div className="user-dtls-tab-dtls">
              {card && singleUser && (
                <div dash-user-dtls-tab-dtls="card">
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}

                        {/* userArea */}
                        {singleUser && (
                          <UserArea
                            // toggle={toggle}
                            singleUser={singleUser}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
                      </div>
                      <div className="hr" />
                    </div>

                    {/* left hand side of user profile */}
                    {singleUser && (
                      <SingleUser
                        singleUser={singleUser}
                        setDisplayC={setDisplayC}
                      />
                    )}
                  </div>
                  <div className="dash-row">
                    <div className="deposit-history">
                      {currentDeposit && currentDeposit.length > 0 && (
                        <BasicTable
                          allUsers={currentDeposit}
                          column={depositHeader}
                          type="currentDeposit"
                          user={user}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {bal && (
                <div
                  dash-user-dtls-tab-dtls="balances"
                  style={{ display: "block" }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}

                        {singleUser && (
                          <UserArea
                            singleUser={singleUser}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {singleUser && (
                    <UserBalance singleUser={singleUser} error={error} />
                  )}

                  <div className="dash-row"></div>
                </div>
              )}
              {execution && singleUser && (
                // auto copying
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
                            {new Intl.NumberFormat("en-US").format(
                              singleUser.wallet
                            )}
                          </span>
                        </h6>
                        <h6>
                          Name:
                          {singleUser.name}
                        </h6>
                        <h6>
                          Email:
                          {singleUser.email}
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
                          {schedule && (
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
                          )}
                          <div className="text-right">
                            <Button
                              disabled={copyTradeBtn}
                              type="primary"
                              onClick={() =>
                                submitAutoCopyTrade({
                                  profitLoss,
                                  singleUser,
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
                          singleUser.estimatedBalance
                        )}`}</h3>
                        <p>Estimated balance on</p>
                        <p>
                          <Moment format="DD MMMM YYYY">
                            {singleUser.lastAutoTradeDate}
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
                        {userAutoCopyTrade.length > 0 &&
                          userAutoCopyTrade.map((data, index) => (
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
                                  callback={() =>
                                    getUserAutoCopyTrade(singleUser._id)
                                  }
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
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}
                        {singleUser && (
                          <UserArea
                            singleUser={singleUser}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
                      </div>
                    </div>
                    {/* deposit for single user */}
                    {payments && allSingleDeposits.length <= 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <h2 className="p-2 m-2">No deposit</h2>
                      </div>
                    ) : (
                      <BasicTable
                        allUsers={allSingleDeposits}
                        column={paymentHeader}
                        user={user}
                        type="payment"
                      />
                    )}
                    {/* for use */}
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
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}
                        {singleUser && (
                          <UserArea
                            singleUser={singleUser}
                            user={user}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
                      </div>
                    </div>
                    {/* single person withdrawal */}
                    {withd && singleWithdrawals <= 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <h2 className="p-2 m-2">No Withdrawal</h2>
                      </div>
                    ) : (
                      // <CustomTable
                      //   allUsers={singleWithdrawals}
                      //   user={user}
                      //   column={singleUserWithdrawal}
                      //   type="withdrawal"
                      // />
                      <BasicTable
                        allUsers={singleWithdrawals}
                        user={user}
                        column={singleUserWithdrawal}
                        type="withdrawal"



                      />
                    )}
                    {/* sdfdsj */}
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
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        {/* userbalnce */}
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}

                        {singleUser && (
                          <UserArea
                            singleUser={singleUser}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
                      </div>
                    </div>
                    {orderT && userTrades <= 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <h2 className="p-2 m-2">No Order History</h2>
                      </div>
                    ) : (
                      <BasicTable
                        allUsers={userTrades}
                        column={allTradesHeader}
                        user={user}
                        type="withdrawal"
                      />
                    )}
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
                        {singleUser && <UserHeader singleUser={singleUser} />}
                      </div>

                      <div className="estimate dash-row dash-row-centralized">
                        {/* userbalance */}
                        {singleUser && (
                          <EstimatedBallance singleUser={singleUser} />
                        )}

                        {singleUser && (
                          <UserArea
                            singleUser={singleUser}
                            setEditProfile={setEditProfile}
                            handleDeleteUser={handleDeleteUser}
                          />
                        )}
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
        {allTrades && allTrades.length > 0 && (
          <TableContainer>
            <BasicTable
              allUsers={allTrades}
              column={allTradesHeader}
              type="trades"
            />
          </TableContainer>
        )}
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="withdraw">
        {allWithdrawals && allWithdrawals.length > 0 && (
          <TableContainer>
            <BasicTable
              allUsers={allWithdrawals}
              user={user}
              column={withdrawalHeader}
              type="withdrawal"
            />
          </TableContainer>
        )}
      </div>

      {/* trade approval */}
      <div className="manager-tab-dtls" manager-tab-dtls="traders-approval">
        {tradeApproval && tradeApproval.length > 0 && (
          <TableContainer>
            <BasicTable
              allUsers={tradeApproval}
              user={user}
              column={tradeApprovalHeader}
              type="approval"
            />
          </TableContainer>
        )}
      </div>
    </div>
  );
};

ManagerContents.propTypes = {
  displayC: PropTypes.bool,
  setDisplayC: PropTypes.func.isRequired,
  setEditProfile: PropTypes.func.isRequired,
};

export default ManagerContents;

const TableContainer = styled.div`
  background: white;
  width: 96%;
  height: 90%;
  padding-bottom: 20px;
  table {
    border-collapse: collapse;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    color: black;
    padding: 0 20px;
    height: 90%;
  }

  table td,
  table th {
    border: 1px solid #ddd;
    text-align: left;
  }

  table tr,
  table td,
  table th {
    border: 0;
  }
  tabel td {
    max-height: 20px;
  }
  table tr {
    padding-left: 20px;
  }

  table th {
    padding-top: 3px;
    text-align: left;
    background: #e9ecf2;
    color: black;
  }

  table tr:hover {
    background-color: #ddd;
  }
`;
