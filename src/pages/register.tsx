import React from "react";
import registerStyles from './register.module.css';
import { FormValues } from "../utils/types";
import Form from "../components/form/form";
import page from './page.module.css';
import { useDispatch } from "../services/hooks";
import { register } from "../services/actions/auth";

interface IRegisterPageProps {
}

const RegisterPage: React.FC<IRegisterPageProps> = ({}: IRegisterPageProps): JSX.Element => {
    const dispatch = useDispatch();
    const onSubmit = (data: FormValues) => {
        dispatch(register(data));
    };
  
    return (
    <section className={page.formPage}>
        <Form 
            formTitle="Регистрация"
            buttonText="Зарегистрироваться" 
            additionalText={ { text: "Уже зарегистрированы?", route: "/login", buttonText: "Войти" } }
            onSubmit={onSubmit}
        />
    </section>
  );
};

export default RegisterPage;