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
    userAutoCopyTrade,
    tradeApproval,
  } = useSelector((state) => state.profile)

  console.log(allTrades,'ussse')
  const { user } = useSelector((state) => state.auth)

  // ACTION CREATORS
  const {
    updateWalletBalance,
    setLiveTrade,
    setIsTrading,
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
    managerDeactiveUser,
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

  const [toggle, setToggle] = useState({
    id: user._id,
    liveTrade: user.liveTrade,
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
  console.log(allUsers)
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

  //  const paginate = (num) => setCurrentPage(num)
  const setToggles = useCallback(() => {
    setToggle(!toggle.liveTrade)
    setLiveTrade({
      id: user._id,
      liveTrade: !user.liveTrade,
    })
  }, [toggle])

  // notification
  const setNotifications = useCallback(() => {
    setNotification(!notification)
    setNotificationEnabled({
      id: user._id,
      notificationEnabled: !user.notificationsEnabled,
    })
  }, [notification])

  // isTrading

  // const setTrading = useCallback(() => {}, [])

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

  const handleUpdateWalletBalance = () => {
    if (loading) {
      setText('Updating...')
    } else if (!credit && parseInt(amount) > user.wallet) {
      message.error(
        'This transaction is not valid as it will result in a negative balance',
      )
    } else {
      updateWalletBalance({
        id: user._id,
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
            <h5 className="text-uppercase">Withdraw</h5>
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
        {/* <table>
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
        </table> */}
      </div>
      {/* bank Transfer */}
      {bankTransfers && bankTransfers.length > 0 && (
        <TableContainer
          style={{
            background: 'white',
            margin: '  1.2rem auto 0 auto',
            width: '96%',
          }}
        >
          <BasicTable
            allUsers={bankTransfers}
            user={user}
            column={bankTransferHeader}
            type="transfer"
          />
        </TableContainer>
      )}

      {/* all deposit */}
      {allDeposits && allDeposits.length > 0 && (
        <TableContainer
          style={{
            background: 'white',
            margin: '  1.2rem auto 0 auto',
            width: '96%',
          }}
        >
          <BasicTable
            allUsers={allDeposits}
            user={user}
            column={depositHeader}
            type="deposit"
          />
        </TableContainer>
      )}

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

      {allVerifiedUsers && allVerifiedUsers.length > 0 && (
        <TableContainer
          style={{
            background: 'white',
            margin: '  1.2rem auto 0 auto',
            width: '96%',
          }}
        >
          <BasicTable
            allUsers={allVerifiedUsers}
            user={user}
            column={allVerifiedUsersHeader}
            type="verifiedUsers"
          />
        </TableContainer>
      )}

      {/* Table */}

      <TableContainer
        style={{
          background: 'white',
          margin: '  1.2rem auto 0 auto',
          width: '96%',
        }}
      >
        {!displayC && allUsers.length > 0 && (
          <BasicTable
            allUsers={allUsers}
            setDisplayC={setDisplayC}
            setUserLevel={setUserLevel}
            user={user}
            column={Columns}
            type="EveryUser"
          />
        )}
      </TableContainer>

      <div className="manager-tab-dtls" manager-tab-dtls="users">
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
                Payments
              </div>
              <div
                dash-user-dtls-tab="balances"
                onClick={handleSetWithd}
                className={withd ? 'live' : ''}
              >
                Withdraw
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
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}
                              USD
                            </h2>
                          </div>
                        </div>

                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                          className="d-flex justify-content-center  flex-column align-items-center"
                        >
                          <h3 className="text-center">User</h3>
                          <div className="d-flex justify-content-space-between align-items-center">
                            <button
                              className="edit-profile"
                              style={{
                                backgroundColor: '#363c4f',
                                borderRadius: '4px',
                              }}
                              onClick={() => setEditProfile(true)}
                            >
                              Edit profile
                            </button>
                            <button
                              style={{
                                backgroundColor: '#e30f0f',
                                borderRadius: '4px',
                              }}
                              className="delete-profile"
                            >
                              Delete user
                            </button>
                          </div>

                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                        </div>

                        {/* <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <label>
                              <h4>Live Trade</h4>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </label>
                          </div>

                          <button
                            className="edit-profile"
                            style={{
                              backgroundColor: '#363c4f',
                              borderRadius: '4px',
                            }}
                            onClick={() => setEditProfile(true)}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{
                              backgroundColor: '#e30f0f',
                              borderRadius: '4px',
                            }}
                            className="delete-profile"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete user
                          </button>
                        </div> */}
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
                            {user.country ? user.country : ''}
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Phone</div>
                          <div className="td">
                            {user.phone ? user.phoneNumber : ''}
                          </div>
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
                                backgroundColor: '#0579f8',
                                color: '#fff',
                                display: 'block',
                                padding: '2px 5px',
                              }}
                            >
                              IN VERIFICATION
                            </span>
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Notification</div>
                          <div className="td">
                            <label>
                              <Switch
                                onChange={setNotifications}
                                checked={notification.notificationsEnabled}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#F14700"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">2 Step Authentification</div>
                          <div className="td">
                            <Switch
                              onChange={setAuth0}
                              checked={auth.authEnabled}
                              className="react-switch"
                              onColor="#54AC40"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              offColor="#F14700"
                            />
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">Created date</div>
                          <div className="td">
                            {user.time ? user.time.slice(0, 10) : ''}
                          </div>
                        </div>
                        <div className="dash-row dash-row-centralized">
                          <div className="th">User status</div>
                          <div className="td">
                            <span
                              style={{
                                backgroundColor: '#39d95f',
                                color: '#fff',
                                display: 'block',
                                padding: '2px 5px',
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
                                    backgroundImage: 'url()',
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
                      {/* <div className="header">
                        <span className="text-uppercase font-weight-bold font-size-14">
                          Deposit History
                        </span>
                      </div> */}

                      {currentDeposit && currentDeposit.length > 0 && (
                        <BasicTable
                          allUsers={currentDeposit}
                          user={user}
                          column={currentDeposit}
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
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.gmail}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                          className="d-flex justify-content-center  flex-column align-items-center"
                        >
                          <h3 className="text-center">User</h3>
                          <div className="d-flex justify-content-space-between align-items-center">
                            <button
                              className="edit-profile"
                              style={{
                                backgroundColor: '#363c4f',
                                borderRadius: '4px',
                              }}
                            >
                              Edit profile
                            </button>
                            <button
                              style={{
                                backgroundColor: '#e30f0f',
                                borderRadius: '4px',
                              }}
                              className="delete-profile"
                            >
                              Delete user
                            </button>
                          </div>

                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                          {/* <div className="d-flex  align-items-center justify-content-space-between">
                            <button
                              className="edit-profile"
                              style={{
                                backgroundColor: '#363c4f',
                                borderRadius: '4px',
                              }}
                            >
                              Edit profile
                            </button>
                            <button
                              style={{
                                backgroundColor: '#e30f0f',
                                borderRadius: '4px',
                              }}
                              className="delete-profile"
                            >
                              Delete user
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="public-card white-card"
                    style={{ marginTop: '15px' }}
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
              )}
              {execution && (
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
                            {new Intl.NumberFormat('en-US').format(user.wallet)}
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
                          user.estimatedBalance,
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
                                    getUserAutoCopyTrade(user._id)
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
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}{' '}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                          <button
                            className="edit-profile"
                            style={{
                              backgroundColor: '#363c4f',
                              borderRadius: '4px',
                            }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{
                              backgroundColor: '#e30f0f',
                              borderRadius: '4px',
                            }}
                            className="delete-profile"
                          >
                            Delete user
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

              {/* {withd && (
          <BasicTable
            allUsers={withd}
          user={user}
            column={withdrawalHeader}
            type="withdrawal"
          />
        )} */}

              {withd && (
                <div
                  dash-user-dtls-tab-dtls="withdraw"
                  style={{ display: 'block' }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}{' '}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                          <button
                            className="edit-profile"
                            style={{ backgroundColor: '#363c4f' }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{ backgroundColor: '#e30f0f' }}
                            className="delete-profile"
                          >
                            Delete user
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
                  style={{ display: 'block' }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}{' '}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                          <button
                            className="edit-profile"
                            style={{
                              backgroundColor: '#363c4f',
                              borderRadius: '4px',
                            }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{
                              backgroundColor: '#e30f0f',
                              borderRadius: '4px',
                            }}
                            className="delete-profile"
                          >
                            Delete user
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
                  style={{ display: 'block' }}
                >
                  <div className="dtls-sec">
                    <div className="dash-row dash-row-centralized header">
                      <div className="user-detail dash-row dash-row-centralized">
                        <div
                          className="image"
                          style={{ backgroundImage: 'url()' }}
                        />
                        <div className="dtls">
                          <div className="name font-weight-bold font-size-18">
                            {user.name}
                          </div>
                          <div className="email font-size-14">{user.email}</div>
                          <div className="dash-row dash-row-centralized font-size-12">
                            <div
                              className="country-flag"
                              style={{ backgroundImage: 'url()' }}
                            />
                            <div className="country text-uppercase">
                              {user.country ? user.country : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="estimate dash-row dash-row-centralized">
                        <div className="estimated-card">
                          <div className="font-size-14 font-weight-bold">
                            ESTIMATE BALANCE IN{' '}
                            <span style={{ color: '#ff7700' }}>USD</span>
                          </div>
                          <div>
                            <h2
                              style={{
                                margin: 0,
                                marginTop: '10px',
                                color: '#29c359',
                              }}
                            >
                              {new Intl.NumberFormat('en-US').format(
                                user.wallet,
                              )}{' '}
                              USD
                            </h2>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingLeft: '20px',
                            width: '30%',
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <h5>Live Trade</h5>
                            </div>
                            <div>
                              <Switch
                                onChange={setToggles}
                                checked={toggle.liveTrade}
                                className="react-switch"
                                onColor="#54AC40"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                offColor="#000000"
                              />
                            </div>
                          </div>
                          <button
                            className="edit-profile"
                            style={{
                              backgroundColor: '#363c4f',
                              borderRadius: '4px',
                            }}
                          >
                            Edit profile
                          </button>
                          <button
                            style={{
                              backgroundColor: '#e30f0f',
                              borderRadius: '4px',
                            }}
                            className="delete-profile"
                          >
                            Delete user
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
        {allTrades && allTrades.length > 0 && (
          <TableContainer
            style={{
              background: 'white',
              margin: '  1.2rem auto 0 auto',
              width: '96%',
            }}
          >
            <BasicTable
              allUsers={allTrades}
              user={user}
              column={allTradesHeader}
              type="trades"
            />
          </TableContainer>
        )}
      </div>
      <div className="manager-tab-dtls" manager-tab-dtls="withdraw">
        {allWithdrawals && allWithdrawals.length > 0 && (
          <TableContainer
            style={{
              background: 'white',
              margin: '  1.2rem auto 0 auto',
              width: '96%',
            }}
          >
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
          <TableContainer
            style={{
              background: 'white',
              margin: '  1.2rem auto 0 auto',
              width: '96%',
            }}
          >
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
  table {
    border-collapse: collapse;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    color: black;
    padding: 0 10px;
  }

  table td,
  table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  table tr,
  table td,
  table th {
    border: 0;
  }
  table tr {
    padding-left: 20px;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background: #e9ecf2;
    color: black;
  }

  // table tr:nth-child(even) {
  //   background-color: #f2f2f2;
  // }

  table tr:hover {
    background-color: #ddd;
  }
`
