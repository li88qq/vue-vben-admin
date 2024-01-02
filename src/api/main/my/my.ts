import { mainAxios as axios } from '@/utils/http/axios';

const API = {
  GET_INFO: '/my/info',
  GET_MENU_LIST: '/my/menuList',
};

export const getInfo = (params?, opt?) => axios.get({ url: API.GET_INFO, params }, opt);
export const getMenuList = (params?, opt?) => axios.get({ url: API.GET_MENU_LIST, params }, opt);
