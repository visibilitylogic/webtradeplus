import React, { Fragment } from "react";
import "./SwitchButton.css";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const SwitchButton = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { setDarkTheme } = useActions();
  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="checkbox"
        className="checkbox"
        checked={!isDarkMode}
        onChange={setDarkTheme}
      />
      <label htmlFor="checkbox" className="mb-0 checkbox__label">
        <HiOutlineMoon size={15} className="checkbox__icon--moon" />
        <HiOutlineSun size={15} className="checkbox__icon--sun" />
        <div className="ball checkbox__ball"></div>
      </label>
    </div>
  );
};

export default SwitchButton;
