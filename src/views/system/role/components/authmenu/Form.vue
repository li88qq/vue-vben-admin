<template>
  <div>
    <a-card size="small">
      <a-checkbox v-model:checked="formRt.isAllMenu">授权全部菜单</a-checkbox>
    </a-card>
    <a-card size="small" v-if="!formRt.isAllMenu">
      <a-tree v-bind="treeRt" @check="onCheck" />
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRaw, watch } from 'vue';
  import { getList } from '@/api/main/system/menu';
  import { getAuthMenus } from '@/api/main/system/role';

  const props = defineProps({
    data: {
      type: Object,
    },
  });

  const formRt = reactive({
    isAllMenu: false,
    menuIds: [],
  });

  const treeRt = reactive({
    checkable: true,
    treeData: [],
    fieldNames: {
      children: 'children',
      title: 'name',
      key: 'id',
    },
    checkedKeys: [],
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
    const tree = buildTree(data);
    treeRt.treeData = tree;
    treeRt.checkedKeys = formRt.menuIds;
  };

  const buildTree = (data = []) => {
    const idMap = {};
    data.forEach((item, index) => {
      const { id } = item;
      idMap[id] = index;
    });
    data.forEach((item) => {
      const { parentId } = item;
      if (parentId > 0) {
        const index = idMap[parentId];
        if (index > -1) {
          const parent = data[index];
          if (!parent['children']) {
            parent['children'] = [];
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
    const { checkedKeys } = toRaw(treeRt);
    return {
      isAllMenu: isAllMenu ? 1 : 0,
      menuIds: checkedKeys,
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
