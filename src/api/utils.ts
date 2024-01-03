import { COOKIE_AUTH_TOKEN } from 'apps/constants';
import axios, { AxiosRequestConfig, Method } from 'axios';
import Cookies from 'js-cookie';
import _formatString from 'string-format';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const formatString = (...params: Parameters<typeof _formatString>) => {
  const formatString = _formatString(...params);
  if (formatString.includes('?')) {
    const [url, query] = formatString.split('?', 2);
    const queryParams = query
      .split('&')
      .filter((param) => param && (!param.includes('=') || param.split('=')[1]));
    if (queryParams.length === 0) {
      return url;
    }
    return `${url}?${queryParams.join('&')}`;
  }
  return formatString;
};

export const getApiPath = (
  path: string,
  params?: { [key: string]: string | number },
  version?: string
) => {
  return BASE_API_URL + `api/${version || 'v1'}/` + formatString(path, { ...params });
};

export default function str2base64(str: string): string {
  return Buffer.from(str).toString('base64');
}

export const createAxiosWithInterceptor = (token: string, tokenType: string) => {
  const apiInstance = axios.create();
  apiInstance.interceptors.request.use(
    (config) => {
      // @ts-ignore
      config.headers = {
        Authorization: `${tokenType} ${token}`,
      };
      config.timeout = 10000;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return apiInstance;
};

export const callApi = async (url: string, method: Method, options?: AxiosRequestConfig) => {
  try {
    const res = await axios({ url, method, timeout: 10000, ...options });
    if (res) return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  return null;
};

export const callApiWithAuth = async (
  url: string,
  method: Method,
  options?: AxiosRequestConfig
) => {
  try {
    const token = Cookies.get(COOKIE_AUTH_TOKEN);
    if (token && token.length) {
      const authAxios = createAxiosWithInterceptor(token, 'Bearer');
      const res = await authAxios({ url, method, ...options });
      const status = res.status;
      if (res) return { _header_status: status, ok: true, ...res.data };
    }
  } catch (reason: any) {
    console.error(reason);
    return {
      ...reason.response.data,
      _header_status: reason.response?.status,
      _error_message: reason.message || '',
    };
  }
  return null;
};

export const callApiWithBasicAuth = async (
  url: string,
  username: string,
  password: string,
  options?: AxiosRequestConfig
) => {
  try {
    const res = await axios({
      url,
      method: 'POST',
      auth: {
        username,
        password,
      },
      data: {
        username,
        password,
      },
      ...options,
    });
    const status = res.status;
    if (res) return { _header_status: status, ...res.data };
  } catch (reason: any) {
    console.error(reason);
    return {
      ...reason.response.data,
      _header_status: reason.response?.status,
      _error_message: reason.message || '',
    };
  }
  return null;
};
