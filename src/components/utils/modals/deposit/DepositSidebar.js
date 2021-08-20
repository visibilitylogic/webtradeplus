import { Nav } from "react-bootstrap";
import mastercard from "../../../../assets/images/mastercard.svg";

const creditOptions = [
  {
    name: "MasterCard",
    title: "Credit/Debit",
    logo: mastercard,
    type: "credit",
  },
  {
    name: "BTC",
    title: "Bitcoin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    type: "crypto",
  },
];

const DepositSidebar = () => {
  return (
    <div className="sidebar">
      <div className="links">
        <Nav className="flex-column">
          {creditOptions.map((option, index) => (
            <Nav.Item key={index}>
              <Nav.Link eventKey={option.type}>
                <div className="dash-row dash-row-centralized">
                  <div>
                    <img
                      style={{
                        width: "40px",
                        paddingRight: "15px",
                      }}
                      src={option.logo}
                      alt={`${option.name} logo`}
                    />
                  </div>
                  <div>
                    <span className="font-size-15">{option.title}</span>
                    <span className="font-size-10">Instant</span>
                  </div>
                </div>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default DepositSidebar;
