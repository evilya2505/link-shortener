import React from "react";
import submitFormButton from './submit-form-button.module.css';

interface ISubmitFormButtonProps {
  text: string;
  isDisabled: boolean;
}

const SubmitFormButton: React.FC<ISubmitFormButtonProps> = ({ text, isDisabled }: ISubmitFormButtonProps): JSX.Element => {
  return (
    <button type="submit" className={submitFormButton.button} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default SubmitFormButton;