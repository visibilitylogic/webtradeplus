import Login from "./Login";
import Register from "./Register";

const Homepage = ({ toggleRegister }) => {
  return (
    <div style={{ background: "#f2f2f2" }}>
      {!toggleRegister ? <Login /> : <Register />}
    </div>
  );
};

export default Homepage;
