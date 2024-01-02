import type { AppRouteRecordRaw } from '@/router/types';
import { cloneDeep } from 'lodash-es';
import { LAYOUT } from '@/router/constant';

/**
 * 菜单转换
 */
export const userMenu = (routeList: []) => {
  let modules = null;
  const Dev = () => import('@/views/error/dev.vue');

  /**
   * 构建菜单树
   */
  const buildTree = () => {
    const menuList = cloneDeep(routeList);
    if (menuList.length === 0) {
      return [];
    }
    const idMap = {};
    menuList.forEach((item, index) => {
      const { id } = item;
      idMap[id] = index;
    });
    menuList.forEach((item) => {
      const { parentId } = item;
      if (parentId > 0) {
        const index = idMap[parentId];
        if (index > -1) {
          const parent = menuList[index];
          if (!parent['children']) {
            parent['children'] = [];
          }
          parent['children'].push(item);
        }
      }
    });
    const tree = menuList.filter((item) => item['parentId'] === 0);
    return tree;
  };

  /**
   * 后台菜单转换
   */
  const convertToMenu = (): AppRouteRecordRaw[] => {
    const tree = buildTree();
    if (tree.length === 0) {
      return [];
    }

    modules = import.meta.glob('@/views/**/*.vue');

    const routes = convertChildren(tree);
    return routes;
  };

  const getComponent = (children: [], href: string) => {
    if (!href) {
      return LAYOUT;
    }
    if (href.startsWith('http')) {
      return LAYOUT;
    }

    const component = modules[`/src/views${href}/index.vue`] || Dev;
    return component;
  };

  const convertChildren = (tree: []): AppRouteRecordRaw[] => {
    return tree.map((item) => {
      const { id, children, name, href, icon } = item;
      const route: AppRouteRecordRaw = {
        path: href ? href : `/${id}`,
        name: `${id}`,
        meta: {
          title: `${name}`,
          icon: `${icon}`,
        },
      };
      route.component = getComponent(children, href);
      if (children) {
        const items = convertChildren(children);
        if (items && items.length > 0) {
          route.children = items;
        }
      }
      return route;
    });
  };

  return {
    convertToMenu,
  };
};
