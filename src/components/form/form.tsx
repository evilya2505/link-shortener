import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdditionalText, FormValues } from "../../utils/types";
import { formSchema } from "../../validations/form-validations";
import FormInput from "../form-input/form-input";
import SubmitFormButton from "../submit-form-button/submit-form-button";
import formStyles from "./form.module.css";

interface IFormProps {
  formTitle: string;
  buttonText: string;
  additionalText: AdditionalText;
  onSubmit: (data: FormValues) => void;
}

const Form: React.FC<IFormProps> = ({
  formTitle,
  onSubmit,
  buttonText,
  additionalText,
}: IFormProps): JSX.Element => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <form
      className={formStyles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h1 className={formStyles.title}>{formTitle}</h1>
      <fieldset className={formStyles.fieldset}>
        <FormInput
          title="Юзернейм"
          id="username"
          type="text"
          placeholder="Юзернейм"
          errorMessage={errors.username?.message}
          register={register}
        />
        <FormInput
          title="Пароль"
          id="password"
          type="password"
          placeholder="Пароль"
          errorMessage={errors.password?.message}
          register={register}
        />
        <SubmitFormButton
          text={buttonText}
          isDisabled={
            !(formState.dirtyFields.username && formState.dirtyFields.password)
          }
        />
        <p className={formStyles.text}>
          {additionalText.text}{" "}
          <Link to={additionalText.route} className={formStyles.link}>
            {additionalText.buttonText}
          </Link>
        </p>
      </fieldset>
    </form>
  );
};

export default Form;
