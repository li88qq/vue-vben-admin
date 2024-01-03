import { mainAxios as axios } from '@/utils/http/axios';

const API = {
  GET_INFO: '/menu/info',
  GET_VIEW: '/menu/view',
  GET_PAGE: '/menu/page',
  GET_LIST: '/menu/list',
  SAVE: '/menu/save',
  DELETE: '/menu/delete',
  UPDATE: '/menu/update',
};

export const getInfo = (params?, opt?) => axios.get({ url: API.GET_INFO, params }, opt);
export const getView = (params?, opt?) => axios.get({ url: API.GET_VIEW, params }, opt);
export const getPage = (params?, opt?) => axios.get({ url: API.GET_PAGE, params }, opt);
export const getList = (params?, opt?) => axios.get({ url: API.GET_LIST, params }, opt);
export const saveMenu = (params?, opt?) => axios.post({ url: API.SAVE, params }, opt);
export const deleteMenu = (params?, opt?) => axios.post({ url: API.DELETE, params }, opt);
export const updateMenu = (params?, opt?) => axios.post({ url: API.UPDATE, params }, opt);
