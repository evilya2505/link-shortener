import React, { useEffect, useState } from "react";
import loginStyles from "./login.module.css"
import { FormValues, TUserInfo } from "../utils/types";
import Form from "../components/form/form";
import page from './page.module.css'
import { useDispatch, useSelector } from "../services/hooks";
import { login } from "../services/actions/auth";
import Notification from "../components/notification/notification";

interface ILoginPageProps {
}

const LoginPage: React.FC<ILoginPageProps> = ({}: ILoginPageProps): JSX.Element => {
    const dispatch = useDispatch();
    const userInfo: TUserInfo = useSelector(
        (store) => store.auth.userInfo
      );
    const onSubmit = (data: FormValues) => {
        dispatch(login(data));
    };
    const [isOnTokenError, setIsOnTokenError] = useState<boolean>(false);

    React.useEffect(() => {
        console.log(userInfo);
    }, [userInfo])

    useEffect(() => {
        if (localStorage.getItem("token_error")) {
            if (localStorage.getItem("token_error") === 'true') {
                let timer: ReturnType<typeof setTimeout>;
                if (isOnTokenError) {
                    timer = setTimeout(() => {
                        setIsOnTokenError(false);
                    }, 1500);
                }
            
                return () => clearTimeout(timer);
            }
        }
    }, [])
  
    return (
        <section className={page.formPage}>
            {isOnTokenError && <Notification />}
            <Form 
                formTitle="Авторизация"
                buttonText="Войти" 
                additionalText={ { text: "Еще не зарегистрированы?", route: "/register", buttonText: "Регистрация" } }
                onSubmit={onSubmit}
            />
        </section>
  );
};

export default LoginPage;