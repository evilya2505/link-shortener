import React from "react";
import notificationStyles from "./notification.module.css";
import closeIcon from "../../images/close.png";

interface INotificationProps {
  handleNotificationClosing: (name: string) => void;
  type: "green" | "red";
  text: string;
  name: string;
}

const Notification: React.FC<INotificationProps> = ({
  text,
  handleNotificationClosing,
  type,
  name,
}: INotificationProps): JSX.Element => {
  return (
    <div
      className={`${notificationStyles.notification} ${
        type === "green"
          ? notificationStyles.notificationGreen
          : notificationStyles.notificationRed
      }`}
    >
      <p className={notificationStyles.text}>{text}</p>
      <button
        className={notificationStyles.button}
        onClick={() => handleNotificationClosing(name)}
        type="button"
      >
        <img
          className={notificationStyles.icon}
          src={closeIcon}
          alt="иконка закрытия уведомления"
        />
      </button>
    </div>
  );
};

export default Notification;
