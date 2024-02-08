import React from "react";
import notificationStyles from './notification.module.css';

interface INotificationProps {

}

const Notification: React.FC<INotificationProps> = ({  }: INotificationProps): JSX.Element => {
  return (
    <div className={notificationStyles.notification}>
      <p className={notificationStyles.text}>Сессия истекла. Требуется авторизация.</p>
    </div>
  );
};

export default Notification;