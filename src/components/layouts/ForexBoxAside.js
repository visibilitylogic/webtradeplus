import PropTypes from "prop-types";

const ForexBoxAside = ({ selectedStock, setSelectedStock }) => {
  return (
    <div className="first">
      <a
        onClick={() => {
          setSelectedStock(0);
        }}
        className={selectedStock === 0 ? "active" : ""}
        href="#!"
      >
        All
      </a>
      {menus.map((menu) => (
        <a
          className={`${selectedStock === menu.id ? "active" : ""}`}
          href="#!"
          key={menu.id}
          onClick={() => setSelectedStock(menu.id)}
        >
          {menu.title}
        </a>
      ))}
    </div>
  );
};

const menus = [
  { id: 1, title: "Crypto" },
  { id: 2, title: "Forex" },
  { id: 3, title: "Stocks" },
  { id: 4, title: "Commodities" },
  { id: 5, title: "INDICES" },
];

ForexBoxAside.propTypes = {
  selectedStock: PropTypes.number.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
};

export default ForexBoxAside;
