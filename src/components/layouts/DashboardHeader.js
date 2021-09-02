import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { stockAssets as stocks } from "../../helpers/dataset/stocks";
import useFormInput from "../hooks/useFormInput";
import { message } from "antd";
import PropTypes from "prop-types";
import "./DashboardHeader.css";
import Notification from "../utils/Notification";
import VerificationModal from "../utils/modals/kyc/VerificationModal";
import ForexBox from "../layouts/ForexBox";
import useInterval from "../hooks/useInterval";

import {
  X,
  Pen,
  PlusCircle,
  WalletFill,
  QuestionCircleFill,
  ArrowRepeat,
  GearFill,
  BoxArrowDownRight,
} from "react-bootstrap-icons";
import CreditModalContents from "../utils/modals/deposit/CreditModalContents";
import PersonalData from "../utils/modals/PersonalData";
import Support from "../utils/modals/Support";
import WithdrawalSettings from "../utils/modals/withdrawal/WithdrawalSettings";
import BankPaymentForm from "../utils/modals/withdrawal/BankPaymentForm";
import CryptoPaymentForm from "../utils/modals/withdrawal/CryptoPaymentForm";
import AutoTrade from "../utils/modals/AutoTrade";
import { useActions } from "../hooks/useActions";
import Withdrawals from "../utils/modals/withdrawal/Withdrawals";
import CryptoStepSix from "../utils/modals/deposit/crypto-steps/CryptoStepSix";

const DashboardHeader = ({ support, setSupport, data }) => {
  const history = useHistory();
  const { user, loading } = useSelector((state) => state.auth);
  const { profile, activeTrade } = useSelector((state) => state.profile);
  const { isDarkMode } = useSelector((state) => state.theme);

  const { logout, setCurrentSelectedStock } = useActions();

  const [selectedStock, setSelectedStock] = useState(1);
  const [personalData, setPersonalData] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawalSettings, setWithdrawalSettings] = useState(false);
  const [bankTransferSelected, setBankTransferSelected] = useState(false);
  const [cryptoCurrencySelected, setCryptoCurrencySelected] = useState(false);
  const [cryptoStepSix, setCryptoStepSix] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [openForex, setOpenForex] = useState(false);
  const [hideAutoTradeModal, setHideAutoTradeModal] = useState(false);

  const [paymentDetails, handlePaymentDetails] = useFormInput({
    bankName: "",
    bankAddress: "",
    bankCity: "",
    bankCountry: "",
    accountNumber: "",
    swiftCode: "",
    fullName: "",
    yourAddress: "",
    yourCountry: "",
    yourCity: "",
  });

  const balance = user && user.wallet + user.bonus;

  //   MODAL STATES
  const [showCredit, setShowCredit] = useState(false);

  const handleLogout = () => {
    logout();

    setCurrentSelectedStock({});

    history.push("/");
  };

  const handleBankTransfer = () => {
    setWithdrawalSettings(false);
    setBankTransferSelected(true);
    // setCryptoCurrencySelected(false);
  };

  const handleCryptoSettings = () => {
    setWithdrawalSettings(false);
    setCryptoCurrencySelected(true);
  };

  const handleOpenVerification = () => {
    if (user.verify) {
      message.success("You have been verified");
    } else {
      setOpenVerification(true);
    }
  };

  // useInterval(() => {
  //   loadUser(user && userId);
  // }, 10000);

  return (
    !loading && (
      <Fragment>
        <Navbar
          variant={isDarkMode ? "dark" : "light"}
          style={{ background: isDarkMode ? "#1a202d" : "#f3f3f3" }}
        >
          <Navbar.Brand>
            <img
              style={{ width: "100%" }}
              src={
                data
                  ? data.useWhiteLogo
                    ? data.siteLogoWhite
                    : data.siteLogo
                  : ""
              }
              alt="logo"
            />
          </Navbar.Brand>
          <nav className="stock-nav">
            <ul className="stock-nav-list mb-0">
              {stocks.map((stock) => (
                <li
                  style={{ color: isDarkMode ? "#fff" : "#000" }}
                  onClick={() => {
                    setSelectedStock(stock.id);
                    setOpenForex(true);
                  }}
                  className={`stock-nav-item ${
                    isDarkMode
                      ? "stock-nav-item--dark"
                      : "stock-nav-item--light"
                  } ${
                    selectedStock === stock.id && isDarkMode
                      ? "active-stock--dark"
                      : selectedStock === stock.id && !isDarkMode
                      ? "active-stock--light"
                      : "stock-nav-item"
                  }`}
                  key={stock.id}
                >
                  {stock.name}
                </li>
              ))}
            </ul>
          </nav>

          <div className="emptyDIV" onClick={() => setOpenForex(false)}></div>
          <Notification user={user} />
          <Nav
            className="ml-auto align-items-center"
            onClick={() => setOpenForex(false)}
          >
            <NavDropdown
              title={
                <div className="camera-wrapper">
                  {/* <CameraFill /> */}
                  <X />

                  {user && user.isPendingVerification && !user.verify ? (
                    <X />
                  ) : user && user.verify && !user.isPendingVerification ? (
                    <img
                      src={user.img}
                      className="camera-wrapper"
                      alt="Display avatar"
                    />
                  ) : null}
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <div
                className={`profile-wrapper ${
                  isDarkMode
                    ? "profile-wrapper--dark"
                    : "profile-wrapper--light"
                }`}
              >
                <h6
                  className="mb-1"
                  style={{ color: isDarkMode ? "#fff" : "#4c5268" }}
                >{`${user && user.name} ${user && user.lastname}`}</h6>
                <p style={{ color: isDarkMode ? "#fff" : "#777" }}>
                  {user && user.email}
                </p>
                <div className="tour-wrapper">
                  <div className="d-flex">
                    <div></div>
                    <div>
                      <p className="mb-0 ">
                        {user && user.verify && !user.isPendingVerification
                          ? "You are Verified"
                          : user && user.isPendingVerification
                          ? "Kindly wait for verification feedback, to enable you perform your first trade"
                          : "Kindly verify your account"}
                      </p>
                    </div>
                  </div>
                </div>
                <NavDropdown.Divider className="mt-3" />
                <br />
                <div className="date-wrapper d-flex justify-content-between">
                  <div>
                    <span style={{ color: isDarkMode ? "#fff" : "#777" }}>
                      Date Registered
                    </span>
                    <p style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      14 Feb 2021
                    </p>
                  </div>
                  <div>
                    <span style={{ color: isDarkMode ? "#fff" : "#777" }}>
                      User ID
                    </span>
                    <p style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      93220945
                    </p>
                  </div>
                </div>

                <div
                  className={`verify ver ${
                    user && !user.verify ? "redNavbar" : ""
                  }`}
                >
                  <a id="verify-me " href="#!" onClick={handleOpenVerification}>
                    {user && user.isPendingVerification
                      ? "Pending"
                      : user && !user.verify && !user.isPendingVerification
                      ? "Not Verified"
                      : "Verified"}
                  </a>
                </div>
              </div>
              <div
                className={`features-wrapper ${
                  isDarkMode
                    ? "features-wrapper--dark"
                    : "features-wrapper--light"
                }`}
              >
                <NavDropdown.Item
                  onClick={() => setPersonalData(true)}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <Pen
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                  />
                  Personal Data
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setShowCredit(true)}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <PlusCircle
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                  />
                  Deposit
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => setWithdraw(true)}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <WalletFill
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                  />
                  Withdraw Funds
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => setWithdrawalSettings(true)}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <GearFill
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                    style={{ width: "6rem" }}
                  />
                  Withdraw Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setSupport(true)}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <QuestionCircleFill
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                  />
                  Contact Support
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  className={`${isDarkMode ? "nav--dark" : "nav--light"}`}
                >
                  <BoxArrowDownRight
                    className={`mr-2 ${
                      isDarkMode ? "nav--dark" : "nav--light"
                    }`}
                  />
                  Logout
                </NavDropdown.Item>
              </div>
            </NavDropdown>
            <NavDropdown
              title={
                <div className="account-wrapper">
                  <h6 className="mb-0">
                    {user && user.currency === "USD"
                      ? "$"
                      : user && user.currency}
                    {Object.keys(activeTrade).length > 0
                      ? new Intl.NumberFormat("en-US")
                          .format(balance - activeTrade.margin)
                          .slice(0, 9)
                      : new Intl.NumberFormat("en-US")
                          .format(balance)
                          .slice(0, 9)}
                  </h6>
                </div>
              }
              id="collasible-nav-dropdown"
              className="ml-2 balance-wrapper"
            >
              <div
                className={`profile-wrapper ${
                  isDarkMode
                    ? "profile-wrapper--dark"
                    : "profile-wrapper--light"
                }`}
              >
                <h6
                  className="mb-1"
                  style={{ color: isDarkMode ? "#fff" : "#4c5268" }}
                >
                  {user && user.name}
                </h6>
                <p style={{ color: isDarkMode ? "#fff" : "#777" }}>
                  {user && user.email}
                </p>
                <NavDropdown.Divider className="mt-3" />
                <br />
                <div className="date-wrapper d-flex justify-content-between">
                  <div>
                    <span style={{ color: isDarkMode ? "#fff" : "#777" }}>
                      Date Registered
                    </span>
                    <p style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      14 Feb 2021
                    </p>
                  </div>
                  <div>
                    <span style={{ color: isDarkMode ? "#fff" : "#777" }}>
                      User ID
                    </span>
                    <p style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      93220945
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`features-wrapper p-2 pt-3 ${
                  isDarkMode
                    ? "features-wrapper--dark"
                    : "features-wrapper--light"
                }`}
              >
                <div className="d-flex justify-content-between mb-1">
                  <div>
                    <h6
                      className="pl-2"
                      style={{ color: isDarkMode ? "#fff" : "#4c5268" }}
                    >
                      MY BALANCES
                    </h6>
                  </div>
                  <div>
                    <p style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      Always show the "Total" amount
                    </p>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between p-3 ${
                    isDarkMode ? "real-account--dark" : "real-account--light"
                  }`}
                >
                  <div>
                    <h6 style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      REAL ACCOUNT
                    </h6>
                    <p className="amount mb-0">
                      {user && user.currency === "USD"
                        ? "$"
                        : user && user.currency}
                      {new Intl.NumberFormat("en-US").format(0)
                        ? new Intl.NumberFormat("en-US").format(0)
                        : new Intl.NumberFormat("en-US").format(0)}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      className={`btn-deposit ${
                        isDarkMode ? "btn-deposit--dark" : "btn-deposit--light"
                      }`}
                      onClick={() => setShowCredit(true)}
                    >
                      Deposit
                    </Button>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between p-3 practice-account ${
                    isDarkMode
                      ? "practice-account--dark"
                      : "practice-account--light"
                  }`}
                >
                  <div>
                    <h6 style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                      Total ACCOUNT{" "}
                      <span style={{ color: isDarkMode ? "#fff" : "#4c5268" }}>
                        ={" "}
                        {user && user.currency === "USD"
                          ? "$"
                          : user && user.currency}
                        {Object.keys(activeTrade).length > 0
                          ? new Intl.NumberFormat("en-US")
                              .format(balance - activeTrade.margin)
                              .slice(0, 9)
                          : new Intl.NumberFormat("en-US")
                              .format(balance)
                              .slice(0, 9)}
                      </span>
                    </h6>
                    <p
                      className="amount mb-0"
                      style={{ color: isDarkMode ? "#fff" : "#4c5268" }}
                    >
                      {user && user.currency === "USD"
                        ? "$"
                        : user && user.currency}
                      {Object.keys(activeTrade).length > 0
                        ? new Intl.NumberFormat("en-US")
                            .format(balance - activeTrade.margin)
                            .slice(0, 9)
                        : new Intl.NumberFormat("en-US")
                            .format(balance)
                            .slice(0, 9)}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      className={`btn-deposit ${
                        isDarkMode ? "btn-deposit--dark" : "btn-deposit--light"
                      }`}
                      onClick={() => setWithdraw(true)}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </NavDropdown>
            <Button
              variant="outline-success d-flex align-items-center deposit ml-3 "
              onClick={() => setShowCredit(true)}
            >
              <ArrowRepeat className="mr-3 hideArrow" />
              Deposit
            </Button>
          </Nav>
        </Navbar>
        {withdraw && (
          <section className="withdraw-modal-box" style={{ display: "block" }}>
            <Withdrawals
              country={paymentDetails.yourCountry}
              setWithdraw={setWithdraw}
            />
          </section>
        )}
        {showCredit && (
          <section className="credit-modal-box" style={{ display: "block" }}>
            <CreditModalContents
              web={data}
              setShowCredit={setShowCredit}
              setCryptoStepSix={setCryptoStepSix}
            />
          </section>
        )}
        {personalData && (
          <section
            className="withdraw-modal-box personal-data-modal"
            style={{ display: "block" }}
          >
            <PersonalData web={data} setPersonalData={setPersonalData} />
          </section>
        )}
        {support && (
          <section className="withdraw-modal-box" style={{ display: "block" }}>
            <Support web={data} setSupport={setSupport} />
          </section>
        )}
        {withdrawalSettings && (
          <section className="withdraw-modal-box" style={{ display: "block" }}>
            <WithdrawalSettings
              setWithdrawalSettings={setWithdrawalSettings}
              handleBankTransfer={handleBankTransfer}
              handleCryptoSettings={handleCryptoSettings}
            />
          </section>
        )}
        {bankTransferSelected && (
          <section
            className="withdraw-modal-box personal-data-modal"
            style={{ display: "block" }}
          >
            <BankPaymentForm
              web={data}
              setBankTransferSelected={setBankTransferSelected}
              paymentDetails={paymentDetails}
              handlePaymentDetails={handlePaymentDetails}
            />
          </section>
        )}
        {cryptoCurrencySelected && (
          <section
            className="withdraw-modal-box personal-data-modal"
            style={{ display: "block" }}
          >
            <CryptoPaymentForm
              web={data}
              setCryptoCurrencySelected={setCryptoCurrencySelected}
            />
          </section>
        )}
        {/* {user && user.autoTrade && (
          <div
            className="levC1"
            style={{ display: hideAutoTradeModal ? "none" : "block" }}
          >
            <AutoTrade setHideAutoTradeModal={setHideAutoTradeModal} />
          </div>
        )} */}
        <CryptoStepSix
          cryptoStepSix={cryptoStepSix}
          setCryptoStepSix={setCryptoStepSix}
        />
        {openVerification && (
          <section
            className="verification-modal-box"
            style={{ display: "block" }}
          >
            <VerificationModal setOpenVerification={setOpenVerification} />
          </section>
        )}
        {openForex && (
          <ForexBox
            openForex={openForex}
            setOpenForex={setOpenForex}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
          />
        )}
      </Fragment>
    )
  );
};

DashboardHeader.propTypes = {
  data: PropTypes.object.isRequired,
  support: PropTypes.bool.isRequired,
  setSupport: PropTypes.func.isRequired,
};

export default DashboardHeader;
