import React, { Fragment } from "react";
import { asideList } from "../../helpers/dataset/asideNavList";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Calc from "../pages/Calc";
import News from "../pages/News";

const DashboardAside = ({
  selectedTab,
  setSelectedTab,
  setAdminSelected,
  setManagerSelected,
  managerSelected,
  adminSelected,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <Fragment>
      <div
        className="sidebar"
        style={{ backgroundColor: isDarkMode ? "#131722" : "#f2f2f2" }}
      >
        <ul>
          {asideList.map((aside) => (
            <li
              onClick={() => {
                setSelectedTab(aside.id);
                setAdminSelected(false);
                setManagerSelected(false);
              }}
              key={aside.id}
            >
              <NavLink
                to={aside.path}
                className={selectedTab === aside.id ? "active" : ""}
              >
                {React.createElement(aside.icon, { size: 20, color: "#fff" })}
                <span style={{ whiteSpace: "pre-wrap" }}>{aside.title}</span>
              </NavLink>
            </li>
          ))}
          {user && (user.isManager || user.isAdmin) && (
            <li
              onClick={() => {
                setManagerSelected(true);
                setAdminSelected(false);
                setSelectedTab(null);
              }}
            >
              <NavLink
                to="/dashboard/manager"
                className={managerSelected ? "active" : ""}
              >
                <AiOutlinePieChart />
                <span>Manager</span>
              </NavLink>
            </li>
          )}
          {/* removed this code user.isAdmin && to test my admin page */}
          {user && (
            <li
              onClick={() => {
                setAdminSelected(true);
                setManagerSelected(false);
                setSelectedTab(null);
              }}
            >
              <NavLink
                to="/dashboard/admin"
                className={adminSelected ? "active" : ""}
              >
                <IoSettingsOutline />
                <span>Admin</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <Calc />
      <News />
    </Fragment>
  );
};

DashboardAside.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  setAdminSelected: PropTypes.func.isRequired,
  setManagerSelected: PropTypes.func.isRequired,
};

export default DashboardAside;
