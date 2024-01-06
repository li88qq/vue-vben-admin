<template>
  <div>
    <a-card size="small">
      <a-checkbox v-model:checked="formRt.isAllMenu">授权全部菜单</a-checkbox>
    </a-card>
    <a-card size="small" v-if="!formRt.isAllMenu">
      <a-tree v-bind="treeRt" @check="onCheck">
        <template #title="{ title, children }">
          <div>
            <span class="tree-title">{{ title }}</span>
            <template v-if="children?.length > 0">
              <a-checkbox>全选</a-checkbox>
            </template>
          </div>
        </template>
      </a-tree>
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRaw, watch } from 'vue';
  import { getList } from '@/api/main/system/menu';
  import { getAuthMenus } from '@/api/main/system/role';
  import { cloneDeep } from 'lodash-es';

  const props = defineProps({
    data: {
      type: Object,
    },
  });

  const formRt = reactive({
    isAllMenu: false,
    menuIds: [],
  });

  // 保存菜单原数据
  const mentData = {
    idMap: {}, //idMap
    menus: [], //菜单列表
  };

  const treeRt = reactive({
    checkable: true,
    treeData: [],
    checkedKeys: [],
    height: 700, // 使用该属性,虚拟滚动
    checkStrictly: true, // checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
  });

  const init = async () => {
    try {
      const { id } = toRaw(props).data;
      const res = await Promise.all([getList(), getAuthMenus({ id })]);
      initForm(res[1]);
      initMenu(res[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const initForm = (data) => {
    const { isAllMenu, menuIds } = data;
    formRt.isAllMenu = isAllMenu === 1;
    formRt.menuIds = menuIds || [];
  };

  const initMenu = (data) => {
    mentData.menus = cloneDeep(data);
    const tree = buildTree(data);
    treeRt.treeData = tree;
    treeRt.checkedKeys = formRt.menuIds;
  };

  const buildTree = (data = []) => {
    const idMap = {};
    data.forEach((item, index) => {
      const { id, name } = item;
      idMap[id] = index;
      item['title'] = name;
      item['key'] = id;
    });
    mentData.idMap = idMap;
    data.forEach((item) => {
      const { parentId } = item;
      if (parentId > 0) {
        const index = idMap[parentId];
        if (index > -1) {
          const parent = data[index];
          if (!parent['children']) {
            parent['children'] = [];
            // parent['checkable'] = false; //设置为不可选
          }
          parent['children'].push(item);
        }
      }
    });
    return data.filter((item) => item.parentId === 0);
  };

  /**
   * 校验并返回数据
   */
  const validate = async () => {
    const { isAllMenu } = toRaw(formRt);
    const {
      checkedKeys: { checked },
    } = toRaw(treeRt);
    return {
      isAllMenu: isAllMenu ? 1 : 0,
      menuIds: checked,
    };
  };

  const onCheck = (checkedKeys) => {
    treeRt.checkedKeys = checkedKeys;
  };

  watch(
    () => props.data,
    () => {
      init();
    },
    { immediate: true, deep: true },
  );

  defineExpose({
    validate,
  });
</script>
<style scoped lang="less">
  .tree-title {
    margin-right: 24px;
  }
</style>
