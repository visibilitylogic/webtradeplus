import React from "react";
import { useSelector } from "react-redux";
import "./finances.css";
function Finaces() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "25px",
          fontFamily: "arial",
          marginTop: "20px",
        }}
      >
        {" "}
        Finances{" "}
      </h1>
      <div
        className="first_div"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <div className="flex_row1">
          <div>
            <h2 className="h2P">Deposits</h2>
            <h1 classname="h11">
              {new Intl.NumberFormat("en-US").format(user.deposit).slice(0, 8)}
            </h1>
          </div>
          <div>
            <h2 className="h2P">Bonus</h2>
            <h1 classname="h11">
              {new Intl.NumberFormat("en-US").format(user.bonus).slice(0, 8)}
            </h1>
          </div>
          <div>
            <div style={{ borderBottom: ".3px solid white" }}>
              <h2 className="h2P">Profit</h2>
              <h1 classname="h11" style={{ fontSize: "22px", color: "white" }}>
                {new Intl.NumberFormat("en-US").format(user.profit).slice(0, 8)}
              </h1>
            </div>
            <div>
              <h2 className="h2P">Loss</h2>
              <h1 classname="h11" style={{ fontSize: "22px", color: "white" }}>
                {new Intl.NumberFormat("en-US").format(user.loss).slice(0, 8)}
              </h1>
            </div>
          </div>
          {/* <div>
            <h2 className="h2P">Equity</h2>
            <h1 classname="h11">
              {new Intl.NumberFormat("en-US").format(user.equity).slice(0, 8)}
            </h1>
          </div> */}
        </div>
        {/* <div className="flex_row1"> */}
          {/* <div>
            <h2 className="h2P">Margin</h2>
            <h1 classname="h11">
              {new Intl.NumberFormat("en-US").format(user.margin).slice(0, 8)}
            </h1>
          </div> */}
          {/* <div>
            <h2 className="h2P">Free Margin</h2>
            <h1 classname="h11">
              {new Intl.NumberFormat("en-US")
                .format(user.freeMargin)
                .slice(0, 8)}
            </h1>
          </div> */}
          {/* <div>
            <div style={{ borderBottom: ".3px solid white" }}>
              <h2 className="h2P">Profit</h2>
              <h1 classname="h11" style={{ fontSize: "22px", color: "white" }}>
                {new Intl.NumberFormat("en-US").format(user.profit).slice(0, 8)}
              </h1>
            </div>
            <div>
              <h2 className="h2P">Loss</h2>
              <h1 classname="h11" style={{ fontSize: "22px", color: "white" }}>
                {new Intl.NumberFormat("en-US").format(user.loss).slice(0, 8)}
              </h1>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Finaces;
