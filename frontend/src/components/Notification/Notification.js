import React, { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext"; // adjust the path as needed
import "./Notification.css"; // import the CSS file, adjust the path as needed

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) {
    return null;
  }

  const notificationClass = `notification ${notification.type}`;

  return <div className={notificationClass}>{notification.message}</div>;
};

export default Notification;
