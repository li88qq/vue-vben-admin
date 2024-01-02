import { mainAxios as axios } from '@/utils/http/axios';

const API = {
  GET_PAGE: '/user/page',
  GET_INFO: '/user/info',
  GET_VIEW: '/user/view',
  SAVE: '/user/save',
  UPDATE: '/user/update',
  DELETE: '/user/delete',
};

export const getPage = (params?, opt?) => axios.get({ url: API.GET_PAGE, params }, opt);
export const getInfo = (params?, opt?) => axios.get({ url: API.GET_INFO, params }, opt);
export const getView = (params?, opt?) => axios.get({ url: API.GET_VIEW, params }, opt);
export const saveUser = (params?, opt?) => axios.post({ url: API.SAVE, params }, opt);
export const updateUser = (params?, opt?) => axios.post({ url: API.UPDATE, params }, opt);
export const deleteUser = (params?, opt?) => axios.post({ url: API.DELETE, params }, opt);
