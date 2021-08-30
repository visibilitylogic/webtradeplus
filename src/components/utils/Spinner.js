import Loader from "react-loader-spinner";
const Spinner = ({ style }) => (
  <div style={style}>
    <Loader type="Watch" color="#00BFFF" height={50} width={50} />
  </div>
);

export default Spinner;
