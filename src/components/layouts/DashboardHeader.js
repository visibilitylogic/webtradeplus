import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { stockAssets as stocks } from "../../helpers/dataset/stocks";
import useFormInput from "../hooks/useFormInput";
import { message, notification } from "antd";
import PropTypes from "prop-types";
import "./DashboardHeader.css";
import Notification from "../utils/Notification";
import CryptoStepFive from "../utils/modals/deposit/crypto-steps/CryptoStepFive";
import VerificationModal from "../utils/modals/kyc/VerificationModal";
import ForexBox from "../layouts/ForexBox";

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

const DashboardHeader = ({
  data,
  bitP,
  tslaP,
  ethP,
  aaplP,
  handleViewUpdate,
}) => {
  const history = useHistory();
  const { user, loading } = useSelector((state) => state.auth);

  const { logout, setCurrentSelectedStock } = useActions();

  const [selectedStock, setSelectedStock] = useState(1);
  const [personalData, setPersonalData] = useState(false);
  const [support, setSupport] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawalSettings, setWithdrawalSettings] = useState(false);
  const [bankTransferSelected, setBankTransferSelected] = useState(false);
  const [cryptoCurrencySelected, setCryptoCurrencySelected] = useState(false);
  const [cryptoStepFive, setCryptoStepFive] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [openForex, setOpenForex] = useState(false);

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
    // setBankTransferSelected(false);
    setCryptoCurrencySelected(true);
  };

  const handleOpenVerification = () => {
    if (user.verify) {
      message.success("You have been verified");
    } else {
      setOpenVerification(true);
    }
  };

  return (
    !loading && (
      <Fragment>
        <Navbar variant="dark">
          <Navbar.Brand>
            <img
              style={{ width: " 100%", height: "4.5ch" }}
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
                  onClick={() => {
                    setSelectedStock(stock.id);
                    setOpenForex(true);
                  }}
                  className={`stock-nav-item ${
                    selectedStock === stock.id
                      ? "active-stock"
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
              <div className="profile-wrapper">
                <h6 className="mb-1">{`${user && user.name} ${
                  user && user.lastname
                }`}</h6>
                <p>{user && user.email}</p>
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
                    <span>Date Registered</span>
                    <p>14 Feb 2021</p>
                  </div>
                  <div>
                    <span>User ID</span>
                    <p>93220945</p>
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
              <div className="features-wrapper">
                <NavDropdown.Item onClick={() => setPersonalData(true)}>
                  <Pen className="mr-2" />
                  Personal Data
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowCredit(true)}>
                  <PlusCircle className="mr-2" />
                  Deposit
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setWithdraw(true)}>
                  <WalletFill className="mr-2" />
                  Withdraw Funds
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => setWithdrawalSettings(true)}>
                  <GearFill className="mr-2" style={{ width: "6rem" }} />
                  Withdraw Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setSupport(true)}>
                  <QuestionCircleFill className="mr-2" />
                  Contact Support
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <BoxArrowDownRight className="mr-2" />
                  Logout
                </NavDropdown.Item>
              </div>
            </NavDropdown>
            <NavDropdown
              title={
                <div className="account-wrapper">
                  <h6 className="mb-0">
                    {user && user.currency}
                    {new Intl.NumberFormat("en-US").format(0)
                      ? new Intl.NumberFormat("en-US").format(
                          user && user.wallet
                        )
                      : 0.0}
                  </h6>
                </div>
              }
              id="collasible-nav-dropdown"
              className="ml-2 balance-wrapper"
            >
              <div className="profile-wrapper">
                <h6 className="mb-1">{user && user.name}</h6>
                <p>{user && user.email}</p>
                {/* <div className="tour-wrapper">
                <div className="d-flex">
                  <div></div>
                  <div>
                    <p className="mb-0">
                      Finish the guided tour to your first real trade
                    </p>
                  </div>
                </div>
              </div> */}
                <NavDropdown.Divider className="mt-3" />
                <br />
                <div className="date-wrapper d-flex justify-content-between">
                  <div>
                    <span>Date Registered</span>
                    <p>14 Feb 2021</p>
                  </div>
                  <div>
                    <span>User ID</span>
                    <p>93220945</p>
                  </div>
                </div>
              </div>
              <div className="features-wrapper p-2 pt-3">
                <div className="d-flex justify-content-between mb-1">
                  <div>
                    <h6 className="pl-2">MY BALANCES</h6>
                  </div>
                  <div>
                    <p>Always show the "Total" amount</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 real-account">
                  <div>
                    <h6>REAL ACCOUNT</h6>
                    <p className="amount mb-0">
                      {user && user.currency}
                      {new Intl.NumberFormat("en-US").format(0)
                        ? new Intl.NumberFormat("en-US").format(0)
                        : new Intl.NumberFormat("en-US").format(0)}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      className="btn-deposit"
                      onClick={() => setShowCredit(true)}
                    >
                      Deposit
                    </Button>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 practice-account">
                  <div>
                    <h6>
                      Total ACCOUNT{" "}
                      <span>
                        = {user && user.currency}
                        {new Intl.NumberFormat("en-US").format(
                          user && user.wallet
                        )
                          ? new Intl.NumberFormat("en-US").format(
                              user && user.wallet
                            )
                          : new Intl.NumberFormat("en-US").format(
                              user && user.wallet
                            )}
                      </span>
                    </h6>
                    <p className="amount mb-0">
                      {user && user.currency}
                      {new Intl.NumberFormat("en-US").format(
                        user && user.wallet
                      )
                        ? new Intl.NumberFormat("en-US").format(
                            user && user.wallet
                          )
                        : new Intl.NumberFormat("en-US").format(
                            user && user.wallet
                          )}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      className="btn-deposit"
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
              <ArrowRepeat className="mr-3" />
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
              setCryptoStepFive={setCryptoStepFive}
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
        {user && user.autoTrade && (
          <div className="levC1" style={{ display: "block" }}>
            <AutoTrade />
          </div>
        )}
        <CryptoStepFive
          cryptoStepFive={cryptoStepFive}
          setCryptoStepFive={setCryptoStepFive}
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
  bitP: PropTypes.object.isRequired,
  tslaP: PropTypes.object.isRequired,
  ethP: PropTypes.object.isRequired,
  aaplP: PropTypes.object.isRequired,
  handleViewUpdate: PropTypes.func.isRequired,
};

export default DashboardHeader;
