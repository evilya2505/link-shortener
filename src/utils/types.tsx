export type FormValues = {
  username: string;
  password: string;
};

export type GoToFormValues = {
  pageNumber: number;
};

export type LinkFormValues = {
  link: string;
};

export type AdditionalText = {
  text: string;
  route: string;
  buttonText: string;
};

export type TUserInfo = {
  username: string;
};

export type TLoginResult = {
  access_token: string;
  token_type: string;
};

export type TSqueezeObj = {
  id: number;
  short: string;
  target: string;
  counter: number;
};

export type TSqueezeRequest = {
  order?: TOrder;
  offset?: number;
  limit?: number;
};

export type TOrder = {
  short?: string;
  target?: string;
  counter?: string;
};

export type IOption = {
  id: string;
  label: string;
};
