import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../utils/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
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
