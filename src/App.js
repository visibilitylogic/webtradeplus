import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/routes/Routes";
import setAuthToken from "./store/utils/setAuthToken";
import { LOGOUT } from "./store/action-types";
import { useActions } from "./components/hooks/useActions";
import { useSelector } from "react-redux";
import { store } from "./store";

function App() {
  const { userId } = useSelector((state) => state.auth);
  const { loadUser } = useActions();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser(userId && userId);
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
