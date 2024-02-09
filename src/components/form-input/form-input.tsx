import React from "react";
import formInput from "./form-input.module.css";
import { UseFormRegister } from "react-hook-form";

interface IInputProps {
  id: string;
  type: string;
  placeholder: string;
  title: string;
  errorMessage: string | undefined;
  register: UseFormRegister<any>;
}

const FormInput: React.FC<IInputProps> = ({
  errorMessage,
  id,
  type,
  placeholder,
  title,
  register,
}: IInputProps): JSX.Element => {
  return (
    <div className={formInput.inputContainer}>
      <label className={formInput.inputLabel}>{title}</label>
      <input
        id={id}
        {...register(id)}
        type={type}
        className={formInput.input}
        placeholder={placeholder}
      />
      <span className={formInput.inputError}>{errorMessage || " "}</span>
    </div>
  );
};

export default FormInput;
