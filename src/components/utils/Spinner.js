import Loader from "react-loader-spinner";
const Spinner = () => (
  <div style={spinner}>
    <Loader type="Watch" color="#00BFFF" height={50} width={50} />
  </div>
);

const spinner = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#1d2435",
};

export default Spinner;
