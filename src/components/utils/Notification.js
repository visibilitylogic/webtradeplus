import { useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="notification">
      <a href="#">
        <svg
          style={{ marginBottom: "-35%" }}
          id="lnr-alarm"
          width="25"
          height="25"
          fill="#fff"
          className="lnr lnr-alarm animated"
          viewBox="0 0 1024 1024"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <title>alarm</title>
          <path
            className="path1"
            d="M860.171 773.15c-58.576-44-92.171-111.194-92.171-184.35v-153.6c0-128.661-86.733-237.442-204.798-270.954l-0.002-36.246c0-42.347-34.451-76.8-76.8-76.8-42.347 0-76.8 34.453-76.8 76.8v36.245c-118.067 33.512-204.8 142.294-204.8 270.955v153.6c0 73.157-33.595 140.349-92.171 184.35-8.808 6.616-12.395 18.125-8.907 28.573 3.486 10.448 13.267 17.496 24.283 17.496h232.982c-1.709 8.384-2.587 16.955-2.587 25.581 0 70.579 57.421 128 128 128s128-57.421 128-128c0-8.626-0.878-17.197-2.584-25.581h232.981c11.016 0 20.795-7.046 24.283-17.496s-0.101-21.957-8.909-28.573zM460.8 128c0-14.115 11.485-25.6 25.6-25.6s25.6 11.485 25.6 25.6v26.774c-8.435-0.763-16.97-1.176-25.6-1.176s-17.166 0.413-25.6 1.176v-26.774zM563.2 844.8c0 42.347-34.453 76.8-76.8 76.8s-76.8-34.453-76.8-76.8c0-8.76 1.515-17.411 4.394-25.581h144.813c2.878 8.168 4.394 16.821 4.394 25.581zM191.571 768.019c13.075-15.826 24.437-33.051 33.744-51.27 20.362-39.858 30.685-82.906 30.685-127.949v-153.6c0-127.043 103.357-230.4 230.4-230.4s230.4 103.357 230.4 230.4v153.6c0 45.043 10.323 88.091 30.685 127.949 9.307 18.219 20.669 35.445 33.744 51.27h-589.658z"
          ></path>
        </svg>{" "}
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
