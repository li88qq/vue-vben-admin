<template>
  <BasicModal v-bind="modalRt" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="form_add" @register-ok="onInit" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './data';
  import { saveMenu, getList } from '@/api/main/system/menu';

  const emit = defineEmits(['success', 'register']);

  const modalRt = reactive({
    title: '新增',
    destroyOnClose: true,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });

  const [registerForm, { validate, updateSchema }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await saveMenu(values);
      // TODO custom api
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /**
   * 初始化菜单树
   */
  const initMenuTree = async () => {
    try {
      const data = await getList();
      console.log(data);
      const list = data as any as [];
      const tree = buildTree(list);
      await updateSchema({
        field: 'parentId',
        componentProps: {
          treeData: tree,
          fieldNames: {
            children: 'children',
            label: 'name',
            value: 'id',
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 构建树
   */
  const buildTree = (list = []) => {
    const idMap = {};
    list.forEach((item, index) => {
      const { id } = item;
      idMap[id] = index;
    });
    list.forEach((item) => {
      const { parentId } = item;
      if (parentId > 0) {
        const index = idMap[parentId];
        if (index > -1) {
          const parent = list[index];
          if (!parent['children']) {
            parent['children'] = [];
          }
          parent['children'].push(item);
        }
      }
    });
    return list.filter((item) => !item['parentId']);
  };

  const onInit = async () => {
    await initMenuTree();
  };
</script>
