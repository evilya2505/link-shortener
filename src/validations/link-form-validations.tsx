import * as yup from "yup";

export const linkSchema = yup.object({
  link: yup
    .string()
    .max(65536, "Ссылка слишком длинная. Максимальная длина - 65536 символов.")
    .required("Поле обязательное."),
});