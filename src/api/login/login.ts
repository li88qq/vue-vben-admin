import { loginAxios as axios } from '@/utils/http/axios';

const API = {
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const login = (params, opt?) => axios.post({ url: API.LOGIN, params }, opt);
export const logout = (params?, opt?) => axios.post({ url: API.LOGOUT, params }, opt);
