<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="createAc">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column['dataIndex'] === 'action'">
          <ActionCell :data="record" @view="viewAc" @edit="editAc" @delete="deleteAc" />
        </template>
      </template>
    </BasicTable>
    <AddModal @register="addModal" @success="handleSuccess" />
    <EditModal @register="editModal" @success="handleSuccess" />
    <ViewModal @register="viewModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { reactive, onMounted, defineAsyncComponent } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getPage, deleteMenu } from '@/api/main/system/menu';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '@/components/Modal';
  import ActionCell from './components/actioncell/index.vue';
  import { cloneDeep } from 'lodash-es';

  const AddModal = defineAsyncComponent(() => import('./components/add/index.vue'));
  const EditModal = defineAsyncComponent(() => import('./components/edit/index.vue'));
  const ViewModal = defineAsyncComponent(() => import('./components/view/index.vue'));

  const searchInfo = reactive<Recordable>({});

  const [addModal, { openModal: openAdd }] = useModal();
  const [editModal, { openModal: openEdit }] = useModal();
  const [viewModal, { openModal: openView }] = useModal();

  const [registerTable, { reload }] = useTable({
    // title: '列表',
    api: getPage,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    pagination: false,
    isTreeTable: true,
    afterFetch: (data) => buildTree(data),
  });

  //构建树
  const buildTree = (data = []) => {
    const list = cloneDeep(data);
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
          const parent = list[index];
          if (!parent['children']) {
            parent['children'] = [];
          }
          parent['children'].push(item);
        }
      }
    });
    return list.filter((item) => item.parentId === 0);
  };

  //新增
  const createAc = async () => {
    await openAdd();
  };

  const handleSuccess = () => {
    reload();
  };

  // 初始化
  const init = async () => {
    await Promise.all([reload()]).catch((err) => {
      console.error(err);
    });
  };

  // 查看详情
  const viewAc = async ({ id }) => {
    await openView(true, { id });
  };
  //编辑
  const editAc = async ({ id }) => {
    await openEdit(true, { id });
  };
  //删除
  const deleteAc = async ({ id }) => {
    await deleteMenu({ id });
    await reload();
  };

  onMounted(() => {
    init();
  });
</script>
