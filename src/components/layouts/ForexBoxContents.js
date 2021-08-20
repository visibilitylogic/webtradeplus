import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import Ibox from "../utils/Ibox";

const ForexBoxContents = ({
  selectedStock,
  setSelectedStock,
  setOpenForex,
}) => {
  const { crypto, commodities, forex, iex, etf, loading } = useSelector(
    (state) => state.stock
  );

  const { setCurrentSelectedStock } = useActions();

  const [showIbox, setShowIbox] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [filterText, setFilterText] = useState("");

  const handleCurrentItem = (item) => {
    setShowIbox(true);
    setCurrentItem(item);
  };

  return (
    <div className="second">
      <div className="all">
        <div className="header">
          <form>
            <input
              type="search"
              name="search"
              value={filterText}
              placeholder="Search Asset"
              onChange={(event) => {
                setFilterText(event.target.value);
                setSelectedStock(0);
              }}
            />
          </form>
        </div>
        {showIbox && (
          <Ibox setShowIbox={setShowIbox} currentItem={currentItem} />
        )}
        <table>
          <tbody>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>Leverage</th>
              <th>Today Change</th>
            </tr>
            {!loading &&
              selectedStock === 1 &&
              crypto.length > 0 &&
              crypto.map((item, index) => (
                <tr
                  key={index}
                  onMouseMove={() => handleCurrentItem(item)}
                  onMouseLeave={() => setShowIbox(false)}
                  onClick={() => {
                    setCurrentSelectedStock(item);
                    setOpenForex(false);
                  }}
                  className="childIsh"
                >
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <span className="instrument">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.price}</td>
                  <td>x10</td>
                  <td>
                    <div className="dash-row dash-row-centralized space-around">
                      <div>
                        <span>-4.18%</span>
                      </div>
                      <div>
                        <i className="jam jam-star-f" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading &&
              selectedStock === 2 &&
              forex.length > 0 &&
              forex.map((item, index) => (
                <tr
                  key={index}
                  onMouseMove={() => handleCurrentItem(item)}
                  onMouseLeave={() => setShowIbox(false)}
                  onClick={() => {
                    setCurrentSelectedStock(item);
                    setOpenForex(false);
                  }}
                  className="childIsh"
                >
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <span className="instrument">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.price}</td>
                  <td>x10</td>
                  <td>
                    <div className="dash-row dash-row-centralized space-around">
                      <div>
                        <span>-4.18%</span>
                      </div>
                      <div>
                        <i className="jam jam-star-f" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading &&
              selectedStock === 3 &&
              iex.length > 0 &&
              iex.map((item, index) => (
                <tr
                  key={index}
                  onMouseMove={() => handleCurrentItem(item)}
                  onMouseLeave={() => setShowIbox(false)}
                  onClick={() => {
                    setCurrentSelectedStock(item);
                    setOpenForex(false);
                  }}
                  className="childIsh"
                >
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <span className="instrument">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.price}</td>
                  <td>x10</td>
                  <td>
                    <div className="dash-row dash-row-centralized space-around">
                      <div>
                        <span>-4.18%</span>
                      </div>
                      <div>
                        <i className="jam jam-star-f" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading &&
              selectedStock === 4 &&
              commodities.length > 0 &&
              commodities.map((item, index) => (
                <tr
                  onMouseMove={() => handleCurrentItem(item)}
                  onMouseLeave={() => setShowIbox(false)}
                  onClick={() => {
                    setCurrentSelectedStock(item);
                    setOpenForex(false);
                  }}
                  className="childIsh"
                >
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <span className="instrument">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.price}</td>
                  <td>x10</td>
                  <td>
                    <div className="dash-row dash-row-centralized space-around">
                      <div>
                        <span>-4.18%</span>
                      </div>
                      <div>
                        <i className="jam jam-star-f" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading &&
              selectedStock === 5 &&
              etf.length > 0 &&
              etf.map((item) => (
                <tr
                  onMouseMove={() => handleCurrentItem(item)}
                  onMouseLeave={() => setShowIbox(false)}
                  onClick={() => {
                    setCurrentSelectedStock(item);
                    setOpenForex(false);
                  }}
                  className="childIsh"
                >
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <span className="instrument">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.price}</td>
                  <td>x10</td>
                  <td>
                    <div className="dash-row dash-row-centralized space-around">
                      <div>
                        <span>-4.18%</span>
                      </div>
                      <div>
                        <i className="jam jam-star-f" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading &&
              selectedStock === 0 &&
              (crypto.length > 0 ||
                forex.length > 0 ||
                iex.length > 0 ||
                commodities.length > 0 ||
                etf.length > 0) &&
              [...crypto, ...forex, ...iex, ...commodities, ...etf]
                .filter((stock) => {
                  if (!filterText) {
                    return stock;
                  } else if (
                    stock.symbol
                      .toLowerCase()
                      .includes(filterText.toLowerCase())
                  ) {
                    return stock;
                  }
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentSelectedStock(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <span className="instrument">{item.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.price}</td>
                    <td>x10</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ForexBoxContents.propTypes = {
  selectedStock: PropTypes.number.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
  setOpenForex: PropTypes.func.isRequired,
};

export default ForexBoxContents;
