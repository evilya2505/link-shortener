import * as yup from "yup";

export const goToFormSchema = yup.object({
  pageNumber: yup
    .number()
    .required("Поле обязательное."),
});