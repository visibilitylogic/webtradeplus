import { Fragment } from "react";

export const RiskTaking = () => {
  return (
    <div className="risk-taking text-center">
      <p className="mb-0">Risk Taking</p>
      <div className="text-left">
        <span>
          All trading involves risk. Only risk capital you're prepared to lose.
        </span>
      </div>
    </div>
  );
};

export const RiskWarning = () => {
  return (
    <Fragment>
      <div className="my-5 pb-2">
        <hr />
      </div>
      <div className="w-50 mx-auto pb-4">
        <div
          className="risk-taking text-left"
          style={{
            padding: "16px 30px",
          }}
        >
          <p className="mb-0">Risk Warning</p>
          <div
            className="text-left"
            style={{
              width: "auto",
            }}
          >
            <span>
              The Financial Products offered by the company include Contracts
              for Difference ('CFDs') and other complex financial products.
              Trading CFDs carries a high level of risk since leverage can work
              both to your advantage and disadvantage. As a result, CFDs may not
              be suitable for all investors because it is possible to lose all
              of your invested capital. You should never invest money that you
              cannot afford to lose. Before trading in the complex financial
              products offered, please ensure to understand the risks involved.
            </span>
          </div>
        </div>
        <p className="exclusive text-left pb-5">
          You are granted limited non-exclusive non-transferable rights to use
          the IP provided on this website for personal and non-commercial
          purposes in relation to the services offered on the Website only.
        </p>
      </div>
    </Fragment>
  );
};
