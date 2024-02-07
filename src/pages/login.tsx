import React from "react";
import loginStyles from "./login.module.css"
import { FormValues, TUserInfo } from "../utils/types";
import Form from "../components/form/form";
import page from './page.module.css'
import { useDispatch, useSelector } from "../services/hooks";
import { login } from "../services/actions/auth";

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

    React.useEffect(() => {
        console.log(userInfo);
    }, [userInfo])
  
    return (
        <section className={page.formPage}>
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