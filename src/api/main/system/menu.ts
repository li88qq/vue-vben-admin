import { mainAxios as axios } from '@/utils/http/axios';

const API = {
  GET_INFO: '/menu/info',
  GET_PAGE: '/menu/page',
  SAVE: '/menu/save',
};

export const getInfo = (params?, opt?) => axios.get({ url: API.GET_INFO, params }, opt);
export const getPage = (params?, opt?) => axios.get({ url: API.GET_PAGE, params }, opt);
export const saveMenu = (params?, opt?) => axios.post({ url: API.SAVE, params }, opt);
