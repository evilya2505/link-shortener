import * as yup from "yup";

export const formSchema = yup.object({
  username: yup.string().required("Поле обязательное."),
  password: yup.string().required("Поле обязательное."),
});
