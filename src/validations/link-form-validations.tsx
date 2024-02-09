import * as yup from "yup";
import { isValidUrl } from "../utils/utils";

export const linkSchema = yup.object({
  link: yup
    .string()
    .max(65536, "Ссылка слишком длинная. Максимальная длина - 65536 символов.")
    .test(
      "is-url-valid",
      "Неверный формат ссылки.",
      (value) => !value || isValidUrl(value)
    )
    .required("Поле обязательное."),
});
