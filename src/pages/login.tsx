import React, { useEffect, useState } from "react";
import { FormValues } from "../utils/types";
import Form from "../components/form/form";
import page from "./page.module.css";
import { useDispatch } from "../services/hooks";
import { login } from "../services/actions/auth";
import Notification from "../components/notification/notification";
import { useSelector } from "../services/hooks";

const LoginPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const onSubmit = (data: FormValues) => {
    dispatch(login(data));
  };
  const [isOnTokenError, setIsOnTokenError] = useState<boolean>(false);
  const [isOnRegisterSuccess, setIsOnRegisterSuccess] =
    useState<boolean>(false);
  const [isOnLoginError, setIsOnLoginError] = useState<boolean>(false);
  const isLoginError = useSelector((store) => store.auth.loginFailed);
  const errorText = useSelector((store) => store.auth.errorText);

  function onCloseNotification(name: string) {
    switch (name) {
      case "loginError":
        setIsOnLoginError(false);
        break;
      case "registerSuccess":
        setIsOnRegisterSuccess(false);
        break;
      case "tokenError":
        setIsOnTokenError(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    console.log(localStorage.getItem("token_error"));
    if (localStorage.getItem("token_error")) {
      if (localStorage.getItem("token_error") === "true") {
        setIsOnTokenError(true);
        localStorage.removeItem("token_error");
      }
    }

    if (localStorage.getItem("register_success")) {
      if (localStorage.getItem("register_success") === "true") {
        setIsOnRegisterSuccess(true);
        localStorage.removeItem("register_success");
      }
    }
  }, []);

  useEffect(() => {
    if (isLoginError) setIsOnLoginError(true);
  }, [isLoginError]);

  return (
    <section className={page.formPage}>
      <ul className={page.errors}>
        {isOnLoginError ? (
          <li className={page.error}>
            <Notification
              handleNotificationClosing={onCloseNotification}
              type="red"
              text={`${
                `${errorText} Попробуйте снова.` ||
                "Произошла ошибка. Попробуйте снова."
              }`}
              name="loginError"
            />
          </li>
        ) : (
          <></>
        )}
        {isOnRegisterSuccess ? (
          <li className={page.error}>
            <Notification
              handleNotificationClosing={onCloseNotification}
              type="green"
              text="Вы успешно зарегистрированы."
              name="registerSuccess"
            />
          </li>
        ) : (
          <></>
        )}
        {isOnTokenError ? (
          <li className={page.error}>
            <Notification
              handleNotificationClosing={onCloseNotification}
              type="red"
              text="Сессия истекла. Требуется авторизация."
              name="tokenError"
            />
          </li>
        ) : (
          <></>
        )}
      </ul>

      <Form
        formTitle="Авторизация"
        buttonText="Войти"
        additionalText={{
          text: "Еще не зарегистрированы?",
          route: "/register",
          buttonText: "Регистрация",
        }}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default LoginPage;
