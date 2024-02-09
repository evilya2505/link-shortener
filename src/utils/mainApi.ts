import {
  FormValues,
  TLoginResult,
  TSqueezeObj,
  TSqueezeRequest,
  TUserInfo,
} from "./types";

class MainApi {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(options: { baseUrl: string; headers: Record<string, string> }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private getTotalCountFromRes(res: Response): number {
    const totalCount = res.headers.get("x-total-count");
    return totalCount !== null ? parseInt(totalCount, 10) : 0;
  }

  private _getRequestResult<T>(
    res: Response,
    includeTotalCount: boolean
  ): Promise<{ result: T; totalCount?: number }> {
    return new Promise((resolve, reject) => {
      if (res.ok) {
        res
          .json()
          .then((body) => {
            const result: T = body;

            if (includeTotalCount) {
              const totalCount = this.getTotalCountFromRes(res);
              resolve({ result, totalCount });
            } else {
              resolve({ result });
            }
          })
          .catch((error) => reject(error));
      } else {
        reject(`Ошибка: ${res.status}`);
      }
    });
  }

  register(userData: FormValues): Promise<TUserInfo> {
    const queryParams = new URLSearchParams({
      username: userData.username,
      password: userData.password,
    }).toString();

    return fetch(`${this._baseUrl}/api/register?${queryParams}`, {
      method: "POST",
      headers: this._headers,
    }).then(async (res) => {
      const resultData = await this._getRequestResult<TUserInfo>(res, false);

      return resultData.result;
    });
  }

  login(userData: FormValues): Promise<TLoginResult> {
    return fetch(`${this._baseUrl}/api/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(async (res) => {
      const resultData = await this._getRequestResult<TLoginResult>(res, false);

      return resultData.result;
    });
  }

  postSqueeze(link: string): Promise<TSqueezeObj> {
    const encodedLink = encodeURIComponent(link);

    return fetch(`${this._baseUrl}/api/squeeze?link=${encodedLink}`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(async (res) => {
      const resultData = await this._getRequestResult<TSqueezeObj>(res, false);

      return resultData.result;
    });
  }

  getStatistics(
    data: TSqueezeRequest
  ): Promise<{ result: TSqueezeObj[]; totalCount?: number }> {
    const queryParams = new URLSearchParams();

    if (data.order !== undefined) {
      if (data.order.counter) queryParams.append("order", data.order.counter);
      if (data.order.target) queryParams.append("order", data.order.target);
      if (data.order.short) queryParams.append("order", data.order.short);
    }

    if (data.offset !== undefined) {
      queryParams.append("offset", data.offset.toString());
    }
    if (data.limit !== undefined) {
      queryParams.append("limit", data.limit.toString());
    }

    // console.log(`${this._baseUrl}/api/statistics?${queryParams.toString()}`);
    return fetch(`${this._baseUrl}/api/statistics?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((res) => this._getRequestResult<TSqueezeObj[]>(res, true));
  }
}

// Создание экземпляра класса Api
const mainApi = new MainApi({
  baseUrl: "https://front-test.hex.team",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
