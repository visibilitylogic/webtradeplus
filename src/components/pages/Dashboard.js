import { useEffect, useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import DashboardAside from "../layouts/DashboardAside";
import DashboardHeader from "../layouts/DashboardHeader";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import "./Dashboard.css";
import Board from "./Board";
import Manager from "./Manager";
import Admin from "./Admin";
import useInterval from "../hooks/useInterval";
import DashboardFooter from "../layouts/DashboardFooter";
import { asideList } from "./../../helpers/dataset/asideNavList";
import OrderBook from "./OrderBook";
import Market from "./Market";
import AutoTrade from "../pages/AutoTrade";
import Finaces from "./Finaces";
import Calculator from "../layouts/Calculator";
import News from "../pages/News";
import LeaderBoard from "./LeaderBoard";

const Dashboard = () => {
  const token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  const fetchOrder = () => JSON.parse(localStorage.getItem("orders")) || [];
  const [calcDisplay, setCalcDisplay] = useState(false);
  // const {open } = useSelector(state=> state.toggle)
  const [selectedTab, setSelectedTab] = useState(0);
  const [adminSelected, setAdminSelected] = useState(false);
  const [managerSelected, setManagerSelected] = useState(false);
  const [view, setView] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [intervalId1, setIntervalId1] = useState(null);
  const [totalUp, setTotalUp] = useState(0);
  const [levIsh, setLevIsh] = useState(false);
  const [order, setOrder] = useState(fetchOrder);
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);
  const [buysell, setBuysell] = useState(false);
  const [data, setData] = useState({});
  const [orderIsh, setOrderIsh] = useState({});
  const [support, setSupport] = useState(false);

  const myRef3 = useRef("");

  // Action creators
  const {
    getWebData,
    setIsTrading,
    setDefaultSelectedStock,
    setCurrentSelectedStock,
    getCryptoAssets,
    getCommodityStocks,
    getInvestorsExchange,
    getExchangeTradedFund,
    getForexStocks,
    getAllStockAssets,
  } = useActions();

  // Redux state data
  const { webData } = useSelector((state) => state.web);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentSelectedStock } = useSelector((state) => state.stock);

  const closeSetlevIsh = () => {
    if (!user.liveTrade) {
      message.warning("Live trade turned off. Contact admin");
    } else setLevIsh(false);
  };

  const handleBuyStock = () => {
    if (user && user.isTrading) {
      message.warning(
        `AutoCopy Trader is Active, Turn off AutoCopy Trader to trade manually`
      );
    } else if (user && user.wallet <= 0) {
      message.warning(`You need to make a Deposit in your wallet.`);
    }
  };

  const handleSellStock = () => {
    if (user && user.isTrading) {
      message.warning(
        `AutoCopy Trader is Active, Turn off AutoCopy Trader to trade manually`
      );
    } else if (user && user.wallet <= 0) {
      message.warning(`You need to make a Deposit in your wallet.`);
    }
  };

  const handleTrading = (e) => {
    if (user && user.isTrading) {
      message.success(`AutoCopy Trader Disabling...`);
    } else {
      message.success(`AutoCopy Trader Enabling...`);
    }

    setIsTrading({ id: user._id, isTrading: !user.isTrading });

    // getIsTrading(userId);

    setTimeout(() => window.location.reload(), 2000);
  };

  useEffect(() => {
    getWebData();
  }, []);

  // A custom hook for rerendering the dashboard component after 10 secondays
  // To keep track of asset changes

  // useInterval(() => {
  //
  //     ?
  //     :
  // }, );

  useEffect(() => {
    getCryptoAssets();
    getCommodityStocks();
    getInvestorsExchange();
    getExchangeTradedFund();
    getForexStocks();
    getAllStockAssets();
  }, []);

  useInterval(() => {
    if (Object.keys(currentSelectedStock).length > 0) {
      setCurrentSelectedStock(currentSelectedStock);
      getCryptoAssets();
      getCommodityStocks();
      getInvestorsExchange();
      getExchangeTradedFund();
      getForexStocks();
    } else {
      setDefaultSelectedStock();
    }
  }, 10000);

  useEffect(() => {
    setDefaultSelectedStock();
  }, []);

  useEffect(() => {
    [...asideList].forEach((tab) => {
      switch (window.location.pathname) {
        case tab.path:
          if (selectedTab !== tab.id) {
            setSelectedTab(tab.id);
            setAdminSelected(false);
            setManagerSelected(false);
          }
          break;
        case "/dashboard/manager":
          if (!managerSelected) {
            setManagerSelected(true);
            setSelectedTab(null);
            setAdminSelected(false);
          }
          break;
        case "/dashboard/admin":
          if (!adminSelected) {
            setAdminSelected(true);
            setSelectedTab(null);
            setManagerSelected(false);
          }
          break;
        default:
          break;
      }
    });
  }, [selectedTab, adminSelected, managerSelected]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div
      ref={myRef3}
      style={{
        minHeight: "100vh",
        background: "#131722",
        position: "relative",
      }}
    >
      <DashboardHeader
        data={webData}
        support={support}
        setSupport={setSupport}
      />
      <section className="dash-contents">
        <div className="dash-row">
          <DashboardAside
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setAdminSelected={setAdminSelected}
            setManagerSelected={setManagerSelected}
            managerSelected={managerSelected}
            adminSelected={adminSelected}
          />

          {selectedTab === 0 && (
            <Board
              orders={orders}
              view={view}
              handleTrading={handleTrading}
              buysell={buysell}
              setBuysell={setBuysell}
              setTotalUp={setTotalUp}
              levIsh={levIsh}
              setLevIsh={setLevIsh}
              closeSetlevIsh={closeSetlevIsh}
              handleBuyStock={handleBuyStock}
              handleSellStock={handleSellStock}
            />
          )}

          {/* Renders the  order book page*/}
          {selectedTab === 1 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <OrderBook orders={orders} />
            </div>
          )}

          {/* Renders the  order book page*/}
          {selectedTab === 3 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Market />
            </div>
          )}

          {selectedTab === 2 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Finaces />
            </div>
          )}

          {selectedTab === 4 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <AutoTrade />
            </div>
          )}

          {selectedTab === 5 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Calculator />
            </div>
          )}

          {selectedTab === 6 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <News />
            </div>
          )}

          {selectedTab === 7 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <LeaderBoard />
            </div>
          )}

          {/* Renders the  manager page if user is a manager*/}
          {managerSelected && (
            <Fragment>
              <Manager />
            </Fragment>
          )}

          {/* Renders the  Admin page if user is an Admin*/}
          {adminSelected && (
            <Fragment>
              <Admin />
            </Fragment>
          )}
        </div>
      </section>

      <DashboardFooter setSupport={setSupport} />
    </div>
  );
};

export default Dashboard;
