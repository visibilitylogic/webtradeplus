import React, { useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";

const ScrollToView = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <Fragment>{props.children}</Fragment>;
};

export default ScrollToView;
