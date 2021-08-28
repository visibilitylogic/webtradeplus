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
import Bitcoin from "../layouts/Bitcoin";
const Admin = (props) => {
  const location = useLocation();
  const { get_admin_data } = useActions();
  const pathname = location.pathname.split("/")[2];

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
      case "admin":
        return <AdminDashboard />;
        break;
      case "auto-trading":
        return <AutoTrading />;
        break;
      case "general_settings":
        return <General_setting />;
        break;
      case "general_appearance":
        return <General_appearance />;
        break;
      case "mail":
        return <Mail />;
        break;
      case "payment":
        return <Payment />;
      case "template":
        return <Template />;
        break;
      case "loginsignup":
        return <LoginSignup />;
      case "additional":
        return <Additional />;
        break;
      case "trading":
        return <Trading />;
        break;
      case "search":
        return <Search />;
        break;
      case "bankaccounts":
        return <Bank />;
        break;
      case "identity":
        return <Identity />;
        break;
      case "subscriptions":
        return <Subscription />;
        break;
      case "loginpage":
        return <LoginPage />;
        break;
      case "mastercard":
        return <MasterCard />;
        break;
      case "bitcoin":
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
