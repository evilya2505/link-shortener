import React, { useEffect, useState } from "react";
import { FormValues } from "../utils/types";
import Form from "../components/form/form";
import page from "./page.module.css";
import { useDispatch, useSelector } from "../services/hooks";
import { register } from "../services/actions/auth";
import Notification from "../components/notification/notification";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: FormValues) => {
    dispatch(register(data));
  };
  const isRegisterError = useSelector((store) => store.auth.registerFailed);
  const errorText = useSelector((store) => store.auth.errorText);
  const [isVisible, setIsVisible] = useState(false);

  function onCloseNotification(name: string) {
    setIsVisible(false);
  }

  useEffect(() => {
    if (isRegisterError) setIsVisible(true);
  }, [isRegisterError]);

  useEffect(() => {
    if (localStorage.getItem("register_success") === "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <section className={page.formPage}>
      <ul className={page.errors}>
        <li className={page.error}>
          {isVisible && (
            <Notification
              text={`${errorText || "Произошла ошибка. Попробуйте снова."}`}
              type="red"
              handleNotificationClosing={onCloseNotification}
              name="registerError"
            />
          )}
        </li>
      </ul>
      <Form
        formTitle="Регистрация"
        buttonText="Зарегистрироваться"
        additionalText={{
          text: "Уже зарегистрированы?",
          route: "/login",
          buttonText: "Войти",
        }}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default RegisterPage;
