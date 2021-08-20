import { useState, Fragment, useEffect } from "react";
import ManagerHeader from "../layouts/ManagerHeader";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import EditProfile from "../utils/modals/EditProfile";
import ManagerContents from "../layouts/ManagerContents";
import axios from "axios";

const Manager = () => {
  const { user, userId } = useSelector((state) => state.auth);

  const [allBankTransfers, setAllBankTransfers] = useState([]);
  const [allDeposits, setAllDeposits] = useState([]);
  const [allWithdrawals, setAllWithdrawals] = useState([]);
  const [allVerify, setAllVerify] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allTrades, setAllTrades] = useState([]);
  const [orders, setOrders] = useState([]);
  const [displayC, setDisplayC] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [numVerified, setNumVerified] = useState(0);

  const savedAllOrders0 = JSON.parse(localStorage.getItem("allOrders0"))
    ? JSON.parse(localStorage.getItem("allOrders0"))
    : [];
  const savedAllusers = JSON.parse(localStorage.getItem("allUsers"))
    ? JSON.parse(localStorage.getItem("allUsers"))
    : [];

  const savedAllWithdrawals = JSON.parse(localStorage.getItem("ALLwith"))
    ? JSON.parse(localStorage.getItem("ALLwith"))
    : [];
  const savedAllDepos = JSON.parse(localStorage.getItem("allDepos"))
    ? JSON.parse(localStorage.getItem("allDepos"))
    : [];
  const savedAlltrades = JSON.parse(localStorage.getItem("allTrades"))
    ? JSON.parse(localStorage.getItem("allTrades"))
    : [];
  const savedAllver = JSON.parse(localStorage.getItem("allver"))
    ? JSON.parse(localStorage.getItem("allver"))
    : [];

  useEffect(() => {
    const getAllWithdrawals = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/api/withdraw/AllHistory`
      );
      const bankTransfers = data.filter(
        (transfer) => transfer.method === "Bank Transfer"
      );
      setAllWithdrawals(data);
      setAllBankTransfers(bankTransfers);

      let a = { allWithdrawals: data };

      localStorage.setItem("ALLwith", JSON.stringify(a));
    };
    getAllWithdrawals();
  }, [allWithdrawals]);

  useEffect(() => {
    const getAllOrders = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          user && userId
        }`
      );

      setOrders(data);

      let a = { orders: data };

      localStorage.setItem("allOrders0", JSON.stringify(a));
    };

    getAllOrders();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/allUser`
      );

      let verifiedUsers = data.filter((user) => user.verify);
      setAllUsers(data);
      setNumVerified(verifiedUsers.length);
      let a = { allUsers: data };

      localStorage.setItem("allUsers", JSON.stringify(a));
    };

    getAllUsers();
  }, [allUsers]);

  useEffect(() => {
    const getDepositHistory = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/api/deposit/AllHistory`
      );

      setAllDeposits(data);
      let a = { allDeposit: data };

      localStorage.setItem("allDepos", JSON.stringify(a));
    };

    getDepositHistory();
  }, [allDeposits]);

  useEffect(() => {
    const getAllTrades = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/allTrade`
      );

      setAllTrades(data);

      let a = { allTrades: data };

      localStorage.setItem("allTrades", JSON.stringify(a));
    };

    getAllTrades();
  }, [allTrades]);

  useEffect(() => {
    const getAllVerified = async () => {
      const { data } = await axios.get(
        `https://trade-backend-daari.ondigitalocean.app/api/verify`
      );

      setAllVerify(data);
      let a = { allVerify: data };

      localStorage.setItem("allver", JSON.stringify(a));
    };

    getAllVerified();
  }, [allVerify]);
  

  useEffect(() => {
    if (user) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script.async = true;

      document.body.appendChild(script);
    }
  }, []);

  return (
    <Fragment>
      <div className="full-width" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <ManagerHeader
          allBankTransfers={allBankTransfers}
          setAllBankTransfers={setAllBankTransfers}
          allDeposits={allDeposits}
          allUsers={allUsers}
          allVerify={allVerify}
          allWithdrawals={allWithdrawals}
          setDisplayC={setDisplayC}
          orders={orders}
        />
        <ManagerContents
          displayC={displayC}
          setDisplayC={setDisplayC}
          allBankTransfers={allBankTransfers}
          allDeposits={allDeposits}
          allTrades={allTrades}
          allUsers={allUsers}
          allVerify={allVerify}
          allWithdrawals={allWithdrawals}
          numVerified={numVerified}
          savedAllWithdrawals={savedAllWithdrawals}
          savedAlltrades={savedAlltrades}
          savedAllusers={savedAllusers}
          setEditProfile={setEditProfile}
        />
      </div>
      {editProfile && (
        <section
          className="withdraw-modal-box personal-data-modal"
          style={{ display: "block" }}
        >
          <EditProfile setEditProfile={setEditProfile} />
        </section>
      )}
    </Fragment>
  );
};

export default Manager;
