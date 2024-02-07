import React, { useEffect, useState } from "react";
import page from './page.module.css'
import newLinkStyles from './new-link.module.css';
import copyIcon from '../images/copy.png';
import Header from "../components/header/header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkFormValues, TSqueezeObj } from "../utils/types";
import { linkSchema } from "../validations/link-form-validations";
import { useDispatch, useSelector } from "../services/hooks";
import { squeezeLink } from "../services/actions/statistics";

interface INewLinkPageProps {
}

const NewLinkPage: React.FC<INewLinkPageProps> = ({}: INewLinkPageProps): JSX.Element => {
    const dispatch = useDispatch();
    const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
    const lastResult: TSqueezeObj | null = useSelector(
        (store) => store.statistics.lastSqueezeResult
        );
    const form = useForm<LinkFormValues>({
        defaultValues: {
          link: "",
        },
        resolver: yupResolver(linkSchema),
        mode: "onChange",
    });

    const { register, handleSubmit, formState } = form;
    const { isValid } = formState;

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (notificationVisible) {
            timer = setTimeout(() => {
                setNotificationVisible(false);
            }, 1500);
        }
    
        return () => clearTimeout(timer);
    }, [notificationVisible]);
    

    function onSubmit(data: LinkFormValues) {
        dispatch(squeezeLink(data.link));
        console.log(data);
    }

    const copyToClipboard = async () => {
        try {
            if (lastResult?.short !== undefined) {
                await navigator.clipboard.writeText(`https://front-test.hex.team/s/${lastResult.short}`);
                setNotificationVisible(true);
            }
        } catch (err) {
            console.error("Ошибка при копировании: ", err);
        }
    };
    return (
        <section className={newLinkStyles.section}>
            <Header />
            <div className={newLinkStyles.container}>
                <h2 className={newLinkStyles.containerTitle}>Создание короткой ссылки</h2>
                <form className={newLinkStyles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <fieldset className={newLinkStyles.fieldset}>
                        <input
                            className={newLinkStyles.input}
                            placeholder="Вставьте ссылку"
                            id="link"
                            {...register("link")}
                        />
                        <button disabled={!isValid} className={newLinkStyles.button} type="submit">
                            Создать ссылку
                        </button>
                    </fieldset>
                </form>
                <div className={`${newLinkStyles.resultContainer} ${lastResult && newLinkStyles.resultContainerVisible}`}>
                    <p className={newLinkStyles.resultText}>{`${lastResult ? `https://front-test.hex.team/s/${lastResult.short}` : 'Ссылка'}`}</p>
                    <button type="button" onClick={copyToClipboard} className={newLinkStyles.resultButton}>
                        <img className={newLinkStyles.buttonIcon} src={copyIcon} alt="скопировать"/>
                    </button>
                    <div className={`${newLinkStyles.notification} ${notificationVisible && newLinkStyles.notificationVisible}`}>Ссылка скопирована.</div>
                </div>
            </div>
        </section>
  );
};

export default NewLinkPage;