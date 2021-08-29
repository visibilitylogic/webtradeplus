import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Card, Form, Row, Col, Table } from 'react-bootstrap'
import { Button, Tag, DatePicker, message } from 'antd'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import PropTypes from 'prop-types'
import axios from 'axios'
import Moment from 'react-moment'
import Switch from 'react-switch'
import styled from 'styled-components'
import 'moment-timezone'
import PaymentDetailsPopOver from '../utils/modals/PaymentDetailsPopOver'
import VerifyDetailsPopOver from '../utils/modals/VerifyDetailsPopOver'
import VerifyDocModal from '../utils/modals/VerifyDocModal'
import EditAutoCopyTrade from '../utils/EditAutoCopyTrade'
import WithdrawDetailsModal from '../utils/modals/WithdrawalDetailsPopOver'
import BasicTable from './BasicTable'
import { Columns } from './TableHeader'
import { depositHeader } from './depositHeader'
import { withdrawalHeader } from './withdrawalHeader'
import { allTradesHeader } from './allTradesHeader'
import { allVerifiedUsersHeader } from './allVerifiedUsersHeader'
import { bankTransferHeader } from './bankTransferHeader'
import { tradeApprovalHeader } from './tradeApprovalHeader'
import UserBalance from './UserBalance'
import UserArea from './UserArea'
import SingleUser from './SingleUser'
import { paymentHeader } from './paymentHeader'
import { singleUserWithdrawal } from './singleUserWithdrawal'
import EstimatedBallance from './EstimatedBallance'
import UserHeader from './UserHeader'

const ManagerContents = (props) => {
  const history = useHistory()
  const { displayC, setDisplayC, setEditProfile } = props
  const {
    error,
    allDeposits,
    allWithdrawals,
    allVerifiedUsers,
    bankTransfers,
    allTrades,
    allUsers,
    singleDeposit,
    userAutoCopyTrade,
    tradeApproval,
    singleUser,
    singleWithdrawals,
    allSingleDeposits,
  } = useSelector((state) => state.profile)

  const { user } = useSelector((state) => state.auth)
  console.log(allTrades)
  // ACTION CREATORS
  const {
    updateWalletBalance,
    setLiveTrade,
    setIsTrading,
    setAutoTrade,
    setNotificationEnabled, // expecting end point
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
    getUserAutoCopyTrade,
    addUserAutoCopyTrade,
    deleteUserAutoCopyTrade,
    getSingleWithdrawals,
    getSingleDeposit,
    managerDeactiveUser,
    singleUserDeposit,
  } = useActions()

  const [loading, setLoading] = useState(false)
  const [profitLoss, setProfitLoss] = useState(false)
  const [market, setMarket] = useState('')
  const [amount, setAmount] = useState(0)
  const [asset, setAsset] = useState('')
  const [bal, setBal] = useState(false)
  const [execution, setExecution] = useState(false)
  const [withd, setWithd] = useState(false)
  const [secu, setSecu] = useState(false)
  const [card, setCard] = useState(true)
  const [payments, setPayments] = useState(false)
  const [orderT, setOrderT] = useState(false)
  const [text, setText] = useState('')
  const [checkDate, setCheckDate] = useState(false)
  const [copyTradeBtn, setCopyTradeBtn] = useState(true)
  const [schedule, setSchedule] = useState(false)
  const [credit, setCredit] = useState(true)
  const [scheduledTime, setScheduledTime] = useState('')
  const [decline, setDecline] = useState(false)
  const [declinedMessage, setDeclinedMessage] = useState('')
  const [userLevel, setUserLevel] = useState('')
  const [currentDeposit, setCurrentDeposit] = useState([])

  // const [toggle, setToggle] = useState({
  //   id: singleUser._id,
  //   liveTrade: singleUser.liveTrade,
  // })

  //
  //setAutoTrade
  const [trade, setTrade] = useState({
    id: user._id,
    authEnabled: false,
  })
  const [notification, setNotification] = useState({
    id: user._id,
    notificationEnabled: user.notificationsEnabled,
  })
  const [auth, setAuth] = useState({
    id: user._id,
    authEnabled: false,
    // user.notificationsEnabled,
  })

  // auth
  const setAuth0 = useCallback(() => {
    setAuth(!auth)
    // setAuthEnabled({
    //   id: user._id,
    //   notificationEnabled: !user.notificationsEnabled,
    // })
  }, [auth])

  // istrading
  const [trading, setTrading] = useState({
    id: user._id,
    notificationEnabled: user.isTrading,
  })

  // notification
  const setNotifications = useCallback(() => {
    setNotification(!notification)
    setNotificationEnabled({
      id: user._id,
      notificationEnabled: !user.notificationsEnabled,
    })
  }, [notification])

  const deleteAutoCopyTrade = async () => {
    setLoading(true)

    if (error) {
      message.error('Error Deleting Auto-trade')
    } else {
      deleteUserAutoCopyTrade(user._id)
      message.success('Successfully Deleted Auto-trade')
    }

    setLoading(false)
  }

  const submitAutoCopyTrade = async (payload) => {
    setLoading(true)
    if (error) {
      message.error('Error Adding Auto-Trade')
    } else {
      addUserAutoCopyTrade(payload)
      setProfitLoss(false)
      setMarket('')
      setAmount(0)
      setAsset('')
      setScheduledTime('')
      message.success('Successfully Added Auto-trade')
    }

    setLoading(false)
  }

  const handleLiveTrade = () => {
    setLiveTrade({
      id: user._id,
      liveTrade: !user.liveTrade,
    })
  }

  const onChangeDate = (value, dateString) => {
    setCheckDate(false)
    if (new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0))) {
      setCopyTradeBtn(true)
    } else if (
      new Date(dateString) >= new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      setCopyTradeBtn(false)
    }
  }

  const handleSetCard = () => {
    setCard(true)
    setWithd(false)
    setBal(false)
    setExecution(false)
    setPayments(false)
    setSecu(false)
    setOrderT(false)
    ;(async () => {
      const { data } = await axios(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/deposit/${user._id}`,
      )
      setCurrentDeposit(data)
    })()
  }

  const handleSetWithd = () => {
    getSingleWithdrawals(singleUser._id)
    setWithd(true)
    setCard(false)
    setBal(false)
    setExecution(false)
    setPayments(false)
    setSecu(false)
    setOrderT(false)
  }

  const handleSetBal = () => {
    setBal(true)
    setCard(false)
    setExecution(false)
    setPayments(false)
    setSecu(false)
    setWithd(false)
    setOrderT(false)
  }

  const handleSetSecu = () => {
    setSecu(true)
    setBal(false)
    setCard(false)
    setExecution(false)
    setPayments(false)
    setWithd(false)
    setOrderT(false)
  }

  const handleSetOrder = () => {
    setOrderT(true)
    setSecu(false)
    setBal(false)
    setCard(false)
    setExecution(false)
    setPayments(false)
    setWithd(false)
  }

  const handleSetExecution = () => {
    setExecution(true)
    setOrderT(false)
    setSecu(false)
    setBal(false)
    setCard(false)
    setPayments(false)
    setWithd(false)
  }

  const handleSetPayments = () => {
    setPayments(true)
    setExecution(false)
    setOrderT(false)
    setSecu(false)
    setBal(false)
    setCard(false)
    setWithd(false)
  }

  const handleUpdateWalletBalance = (user) => {
    if (loading) {
      setText('Updating...')
    } else if (!credit && parseInt(amount) > user.wallet) {
      message.error(
        'This transaction is not valid as it will result in a negative balance',
      )
    } else {
      updateWalletBalance({
        id: user.id,
        amount,
        action: credit,
      })

      setText('Saved')
      message.success('Balance updated')
      window.location.reload()
    }
  }

  const handleApproveDeposit = (id) => {
    if (error) {
      message.error('Deposit Not Approved')
    } else {
      approveDeposit({
        id,
        message: 'Deposit Was Successfully Approved',
      })
      message.success('Deposit Was Successfully Approved')
    }
  }

  const handleDeclineDeposit = (id) => {
    if (error) {
      message.error('Deposit Approval Was Not Declined')
    } else {
      declineDeposit({
        id,
        message: 'Deposit Request Successfully Declined',
      })
      message.success('Deposit Was Successfully Declined')
    }
  }

  const handleDeclineVerify = (id) => {
    if (error) {
      message.error('Identity Decline Was not Successfull')
    } else {
      declineVerify({
        id,
        message: declinedMessage,
      })
    }

    setDeclinedMessage('')
    setDecline(false)
  }

  const handleApproveVerify = (id) => {
    if (error) {
      message.error('Identity Approval Was Not Successful')
    } else {
      approveVerify({
        id,
        message: 'Identity Was Successfully Approved',
      })
      message.success('Identity Was Successfully Approved')
    }
  }

  const handleDeclineWithdrawal = (id) => {
    if (error) {
      message.error('Withdrawal Approval Was Not Declined')
    } else {
      declineWithdrawal({
        id,
        message: 'Withdrawal Was Successfully Declined',
      })
      message.success('Withdrawal Was Successfully Declined')
    }
  }

  const handleApproveWithdrawal = (id) => {
    if (error) {
      message.error('Withdrawal Approval Was Not Successfull')
    } else {
      approveWithdrawal({
        id,
        message: 'Withdrawal Was Successfully Approved',
      })
      message.success('Withdrawal Was Successfully Approved')
    }
  }

  const handleMakeAdmin = (id) => {
    if (error) {
      message.error('Error making an Admin')
    } else {
      makeAdmin({ id })
      message.success('Successfully made an Admin')
    }
  }

  const handleMakeManager = (id) => {
    if (error) {
      message.error('Error making a Manager')
    } else {
      makeManager({ id })
      message.success('Successfully made a Manager')
    }
  }

  const handleRemoveManager = (id) => {
    if (error) {
      message.error('Error removing as a Manager')
    } else {
      removeManager({ id })
      message.success('Successfully removed as a Manager')
    }
  }

  const handleRemoveAdmin = (id) => {
    if (error) {
      message.error('Error removing as an Admin')
    } else {
      removeAdmin({ id })
      message.success('Successfully removed as an Admin')
    }
  }

  const handleDeleteUser = (id) => {
    if (error) {
      message.error('Try again')
    } else {
      deleteUser({ id })
      message.success('User was successfully deleted from the database')
      history.push('/dashboard/manager')
    }
  }

  useEffect(() => {
    getUserAutoCopyTrade(user._id)
  }, [])
  return (
    <div className="manager-tabs-details">
      <div className="manager-tab-dtls" manager-tab-dtls="statistics">
        <div className="dash-row dash-row-centralized">
          <div className="split-50">
            <h3 style={{ fontWeight: 'normal' }}>
              Statistics - 04/02/2021 to 13/02/2021
            </h3>
          </div>
          <div className="split-50" />
        </div>
        <div className="chart" />
        <div className="dash-row" style={{ margin: '15px 0' }}>
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
          <TableContainer>
            <BasicTable
              allUsers={allVerifiedUsers}
              user={user}
              column={allVerifiedUsersHeader}
              type="verifiedUsers"
            />
          </TableContainer>
        )}
      </div>

      {/* Table */}
      <div className="manager-tab-dtls" manager-tab-dtls="users">
        {!displayC && allUsers && allUsers.length > 0 && (
          <div className="first-sec">
            <TableContainer>
              <BasicTable
                allUsers={allUsers}
                setDisplayC={setDisplayC}
                setUserLevel={setUserLevel}
                user={user}
                column={Columns}
                type="EveryUser"
              />
            </TableContainer>
          </div>
        )}

        {displayC && (
          <div className="second-sec" style={{ display: 'block' }}>
            <div className="user-dtls-tab" style={{ display: 'block' }}>
              <div
                className={card ? 'live' : ''}
                onClick={handleSetCard}
                dash-user-dtls-tab="card"
              >
                Profile
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetBal}
                className={bal ? 'live' : ''}
              >
                Balances
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetExecution}
                className={execution ? 'live' : ''}
              >
                Auto Copy Trading
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetPayments}
                className={payments ? 'live' : ''}
              >
                Deposits
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetWithd}
                className={withd ? 'live' : ''}
              >
                Withdrawal
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetOrder}
                className={orderT ? 'live' : ''}
              >
                Orders
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetSecu}
                className={secu ? 'live' : ''}
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
                        setNotifications={setNotifications}
                        setAuth0={setAuth0}
                        singleUser={singleUser}
                        checked2={auth.authEnabled}
                        setDisplayC={setDisplayC}
                        checked={notification.notificationsEnabled}
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
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {bal && (
                <div
                  dash-user-dtls-tab-dtls="balances"
                  style={{ display: 'block' }}
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
                    <UserBalance
                      handleUpdateWalletBalance={handleUpdateWalletBalance}
                    />
                  )}
                  {/* <div
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
                  </div> */}
                  <div className="dash-row">
                    {/* <div className="width-50">
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
                    </div>*/}
                  </div>
                </div>
              )}
              {execution && singleUser && (
                // auto copying
                <Row className="px-3" style={{ marginBottom: '10%' }}>
                  <Col md={4} className="mt-5">
                    <Card style={{ background: '#fff' }}>
                      <Card.Body>
                        <h6>
                          Current Balance:{' '}
                          <span
                            style={{
                              fontSize: '1.2rem',
                              color: 'green',
                              fontWeight: 'bold',
                            }}
                          >
                            $
                            {new Intl.NumberFormat('en-US').format(
                              singleUser.wallet,
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
                                    setSchedule(true)
                                    setCopyTradeBtn(true)
                                    setScheduledTime(null)
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
                                    setSchedule(false)
                                    setCheckDate((prev) => !prev)
                                    setCopyTradeBtn((prev) => !prev)
                                    setScheduledTime((prev) =>
                                      prev ? new Date() : null,
                                    )
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
                                'Apply'
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
                          marginTop: '7%',
                        }}
                      >
                        <h4 style={{ color: 'white' }}>
                          {' '}
                          AutoCopy Trader - Queue :{' '}
                        </h4>
                      </div>
                      <div>
                        <h3
                          style={{ color: 'white' }}
                        >{`$ ${new Intl.NumberFormat('en-US').format(
                          singleUser.estimatedBalance,
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
                                {new Intl.NumberFormat('en-US').format(
                                  data.amount,
                                )}
                              </td>
                              <td>{data.profitLoss ? 'Profit' : 'Loss'}</td>
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
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Edit
                                  </Tag>
                                </EditAutoCopyTrade>
                                <Tag
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => deleteAutoCopyTrade()}
                                  color="red"
                                >
                                  {loading ? (
                                    <i className="fa fa-spin fa-spinner"></i>
                                  ) : (
                                    'Delete'
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
                  style={{ display: 'block' }}
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

                    {/* for use */}

                    {payments &&
                      allSingleDeposits &&
                      allSingleDeposits.length > 0 && (
                        <BasicTable
                          allUsers={allSingleDeposits}
                          column={paymentHeader}
                          type="payment"
                        />
                      )}

                    {/* <table>
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
                    </table> */}
                  </div>
                </div>
              )}

              {/* {withd && singleUserWithdrawal
                ? `<div> No History</div>`
                : singleUserWithdrawal && (
                    <BasicTable
                      allUsers={singleUserWithdrawal}
                      user={user}
                      column={singleUserWithdrawal}
                      type="withdrawal"
                    />
                  )} */}
              {/* <div className="manager-tab-dtls" manager-tab-dtls="identity"> */}
              {withd && (
                <div
                  dash-user-dtls-tab-dtls="withdraw"
                  style={{ display: 'block' }}
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
                </div>
              )}

              {/* single person withdrawal */}
              {withd && singleWithdrawals && (
                <BasicTable
                  allUsers={singleWithdrawals}
                  user={user}
                  column={singleUserWithdrawal}
                  type="withdrawal"
                />
              )}

              {orderT && (
                <div
                  dash-user-dtls-tab-dtls="orders"
                  style={{ display: 'block' }}
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
                  </div>
                </div>
              )}

              {secu && (
                <div
                  dash-user-dtls-tab-dtls="security"
                  style={{ display: 'block' }}
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
  )
}

ManagerContents.propTypes = {
  displayC: PropTypes.bool,
  setDisplayC: PropTypes.func.isRequired,
  setEditProfile: PropTypes.func.isRequired,
}

export default React.memo(ManagerContents)

const TableContainer = styled.div`
  background: white;
  margin: 1.2rem auto 0 auto;
  width: 96%;
  height: 90%;
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
    max-height: 40px;
  }
  table tr {
    padding-left: 20px;
  }

  table th {
    padding-top: 3px;
    padding-bottom: 2px;
    text-align: left;
    background: #e9ecf2;
    color: black;
  }

  table tr:hover {
    background-color: #ddd;
  }
`
