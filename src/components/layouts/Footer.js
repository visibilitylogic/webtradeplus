import { Fragment } from "react";
import "./Footer.css";

const Footer = ({ data }) => {
  return (
    <Fragment>
      <div className="form__footer py-1 px-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="leftlinks">
            <a
              href={data && data.termsOfServicesLink}
              target="_blank"
              className="pl-2"
              rel="noreferrer"
            >
              Terms of Service
            </a>
            <span className="separator"></span>
            <a
              href={data && data.privacyPolicyLink}
              target="_blank"
              className="pl-2"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </div>
          <div>
            <p className="mb-0">
              {data && data.title}&nbsp; &copy; Copyright 2021 &nbsp;
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
