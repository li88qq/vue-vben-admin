import { mainAxios as axios } from '@/utils/http/axios';

const API = {
  GET_LIST: '/role/list',
  GET_PAGE: '/role/page',
  GET_INFO: '/role/info',
  GET_VIEW: '/role/view',
  SAVE: '/role/save',
  UPDATE: '/role/update',
  DELETE: '/role/delete',
};

export const getList = (params?, opt?) => axios.get({ url: API.GET_LIST, params }, opt);
export const getPage = (params?, opt?) => axios.get({ url: API.GET_PAGE, params }, opt);
export const getInfo = (params?, opt?) => axios.get({ url: API.GET_INFO, params }, opt);
export const getView = (params?, opt?) => axios.get({ url: API.GET_VIEW, params }, opt);
export const saveRole = (params?, opt?) => axios.post({ url: API.SAVE, params }, opt);
export const updateRole = (params?, opt?) => axios.post({ url: API.UPDATE, params }, opt);
export const deleteRole = (params?, opt?) => axios.post({ url: API.DELETE, params }, opt);
