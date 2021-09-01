import AdminSidebar from "../layouts/AdminAside";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AutoTrading from "../layouts/Auto-Trading";
import AdminDashboard from "../layouts/AdminDashboard";
import General_appearance from "../layouts/General_appearance";
import General_setting from "../layouts/General_setting";
import Mail from "../layouts/Mail";
import Template from "../layouts/Template";
import Payment from "../layouts/Payment";
import Additional from "../layouts/Additional";
import LoginSignup from "../layouts/Login-Signup";
import Trading from "../layouts/Trading";
import Subscription from "../layouts/Subscription";
import Search from "../layouts/Search";
import Bank from "../layouts/Bank";
import Identity from "../layouts/Identity";
import LoginPage from "../layouts/LoginPage";
import { useActions } from "../hooks/useActions";
import MasterCard from "../layouts/MasterCard";
import Bitcoin from "../layouts/Bitcoin.js";

const Admin = (props) => {
  const location = useLocation();
  const { get_admin_data } = useActions();
  const pathname = location.pathname.slice(10);
  const { allUsers } = props;
  const [url, setUrl] = useState("");

  useEffect(() => {
    get_admin_data();
  }, []);
  useEffect(() => {
    setUrl(pathname);
  }, [pathname]);

  const display = (link) => {
    switch (link) {
      case "/admin":
        return <AdminDashboard />;
        break;
      case "/admin/auto-trading":
        return <AutoTrading />;
        break;
      case "/admin/general_settings":
        return <General_setting />;
        break;
      case "/admin/general_appearance":
        return <General_appearance />;
        break;
      case "/admin/mail":
        return <Mail />;
        break;
      case "/admin/payment":
        return <Payment />;
      case "/admin/template":
        return <Template />;
        break;
      case "/admin/loginsignup":
        return <LoginSignup />;
      case "/admin/additional":
        return <Additional />;
        break;
      case "/admin/trading":
        return <Trading />;
        break;
      case "/admin/search":
        return <Search />;
        break;
      case "/admin/bankaccounts":
        return <Bank />;
        break;
      case "/admin/identity":
        return <Identity />;
        break;
      case "/admin/subscriptions":
        return <Subscription />;
        break;
      case "/admin/loginpage":
        return <LoginPage />;
        break;
      case "/admin/mastercard":
        return <MasterCard />;
        break;
      case "/admin/bitcoin":
        return <Bitcoin />;
        break;
      default:
        return null;
        break;
    }
  };
  return (
    <div
      className="full-width dash-row"
      style={{
        paddingLeft: 0,
        paddingBottom: 35,
        overflow: "hidden",
        paddingTop: 0,
        marginTop: -6,
      }}
    >
      <AdminSidebar />
      {/* <AdminAside /> */}

      <div className="admin-content">{url && display(url)}</div>
    </div>
  );
};

export default Admin;
