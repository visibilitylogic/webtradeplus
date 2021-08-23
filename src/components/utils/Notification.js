import { useState } from "react";
import { useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <div className="notification alarm-notification">
      <a href="#">
        <BsBell
          size={25}
          color={isDarkMode ? "#fff" : "#171b29"}
          className="lnr lnr-alarm animated"
          style={{ marginBottom: "-35%" }}
          id="lnr-alarm"
          onClick={() => setShowNotifications((prev) => !prev)}
          title="alarm"
        />
      </a>
      {showNotifications && (
        <div className="notification-box" style={{ display: "block" }}>
          {user && user.notify.length > 0 ? (
            user.notify.map((item) => (
              <div className="notification">
                <span className="title">{item.topic}</span>
                <span className="desc">{item.desc}</span>
                <span className="desc">{item.des}</span>
              </div>
            ))
          ) : (
            <h3 style={{ color: "rgb(19, 23, 34)" }}>No Notification</h3>
          )}
          <span className="close" onClick={() => setShowNotifications(false)}>
            <svg id="lnr-cross " viewBox="0 0 1024 1024">
              <title>cross</title>
              <path
                className="path1"
                d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default Notification;
