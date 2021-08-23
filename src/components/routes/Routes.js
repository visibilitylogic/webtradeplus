import { useEffect, Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import Dashboard from "../pages/Dashboard";
import DashboardFooter from "../layouts/DashboardFooter";
import Admin from "../pages/Admin";

import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const { getWebData } = useActions();
  const { webData } = useSelector((state) => state.web);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [toggleRegister, setToggleRegister] = useState(false);

  useEffect(() => {
    getWebData();

    let fav = document.querySelector("#favicon");
    let title = document.getElementById("title");
    if (fav) {
      fav.href = webData && webData.siteFav;
    }
    title.innerHTML = webData && webData.siteTitle;
  }, []);

  return (
    <Fragment>
      {!isAuthenticated && (
        <Header
          data={webData}
          path={toggleRegister ? "/" : "/signup"}
          title={toggleRegister ? "Login" : "Register"}
          setToggleRegister={setToggleRegister}
        />
      )}

      <div style={{ background: "#f2f2f2" }}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Homepage {...props} toggleRegister={toggleRegister} />
            )}
          />
          <Route
            path="/login"
            component={(props) => <Login {...props} data={webData} />}
          />
          <Route
            path="/signup"
            render={(props) => <Register {...props} data={webData} />}
          />
          <PrivateRoute path={`/dashboard`} component={Dashboard}/>
          <PrivateRoute path={`/dashboard/:slug`} exact component={Admin}/>
          <PrivateRoute path={`/dashboard`} component={Dashboard} />
          <PrivateRoute path={`/dashboard/admin/:slug`} component={Admin} />
        </Switch>
      </div>
      {!isAuthenticated && <Footer data={webData} />}
    </Fragment>
  );
};

export default Routes;
