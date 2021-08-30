import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../utils/Spinner";

const spinnerStyle = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#1d2435",
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner style={spinnerStyle} />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
