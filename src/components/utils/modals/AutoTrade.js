import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useActions } from "../../hooks/useActions";
import { message } from "antd";

const AutoTrade = () => {
  const { setAutoTrade } = useActions();
  const { loading, user } = useSelector((state) => state.auth);

  const { error } = useSelector((state) => state.profile);

  const handleAutoTradeEnabled = () => {
    if (error) {
      message.error("Enabling Auto trade failed");
    } else {
      setAutoTrade({
        id: user && user._id,
        autoTrade: user && !user.autoTrade,
      });
    }
  };

  return (
    <Fragment>
      <div className="levHeader1">Auto Trade</div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        <br /> Do you agree?
      </p>
      <div className="text-right">
        <Button
          disabled={loading}
          variant="primary mt-3"
          onClick={handleAutoTradeEnabled}
        >
          I Agree
        </Button>
      </div>
    </Fragment>
  );
};

export default AutoTrade;
