export type FormValues = {
    username: string;
    password: string;
};

export type GoToFormValues= {
    pageNumber: number;
}

export type LinkFormValues = {
    link: string;
}

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
}

export type TSqueezeObj = {
    id: number;
    short: string;
    target: string;
    counter: number;
}

export type TSqueezeRequest = {
    order?: string;
    offset?: number;
    limit?: number;
}

export type TDisplay = {
    maxWidth: number,
    itemsPerPage: number
}

export type TDisplayConfig = {
    desktopLarge: TDisplay;
    desktop: TDisplay;
    tablet: TDisplay;
    phoneLarge: TDisplay;
}