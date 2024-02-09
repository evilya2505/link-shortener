import React from "react";
import goToFormStyles from "./go-to-form.module.css";
import { useForm } from "react-hook-form";
import { GoToFormValues } from "../../utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { goToFormSchema } from "../../validations/go-to-validations";
import { useSelector } from "../../services/hooks";
import rightArrow from "../../images/right-arrow.png";

interface IGoToFormProps {
  choosePage: (pageNumber: number) => void;
  isDisabled: boolean;
}

const GoToForm: React.FC<IGoToFormProps> = ({
  choosePage,
}: IGoToFormProps): JSX.Element => {
  const totalPages: number = useSelector(
    (store) => store.pagination.totalPages
  );
  const isLoading: boolean = useSelector((store) => store.statistics.request);

  const form = useForm<GoToFormValues>({
    defaultValues: {
      pageNumber: 0,
    },
    resolver: yupResolver(goToFormSchema),
  });

  const { register, handleSubmit } = form;

  function onSubmit(data: GoToFormValues) {
    if (data.pageNumber <= totalPages && data.pageNumber > 0) {
      choosePage(data.pageNumber);
    }
  }

  return (
    <form
      className={goToFormStyles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className={goToFormStyles.formTitle}>Перейти на страницу</p>
      <fieldset className={goToFormStyles.fieldset}>
        <input
          {...register("pageNumber")}
          id="pageNumber"
          className={goToFormStyles.input}
          maxLength={totalPages ? totalPages.toString().split("").length : 0}
        />
        <button
          type="submit"
          className={goToFormStyles.circle}
          disabled={isLoading}
        >
          <img
            src={rightArrow}
            className={goToFormStyles.icon}
            alt="стрелка вправо"
          />
        </button>
      </fieldset>
    </form>
  );
};

export default GoToForm;
