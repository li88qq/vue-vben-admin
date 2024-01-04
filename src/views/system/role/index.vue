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
        <template v-else-if="column['dataIndex'] === 'ops'">
          <OpsCell :data="record" @auth-menu="authMenuAc" />
        </template>
      </template>
    </BasicTable>
    <AddModal @register="addModal" @success="handleSuccess" />
    <EditModal @register="editModal" @success="handleSuccess" />
    <AuthMenuDrawer @register="authMenuDrawer" @success="handleSuccess" />
    <ViewModal @register="viewModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { reactive, onMounted, defineAsyncComponent } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getPage, deleteRole } from '@/api/main/system/role';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '@/components/Modal';
  import { useDrawer } from '@/components/Drawer';
  import ActionCell from './components/actioncell/index.vue';
  import OpsCell from './components/opscell/index.vue';

  const AddModal = defineAsyncComponent(() => import('./components/add/index.vue'));
  const EditModal = defineAsyncComponent(() => import('./components/edit/index.vue'));
  const ViewModal = defineAsyncComponent(() => import('./components/view/index.vue'));
  const AuthMenuDrawer = defineAsyncComponent(() => import('./components/authmenu/index.vue'));

  const searchInfo = reactive<Recordable>({});

  const [addModal, { openModal: openAdd }] = useModal();
  const [editModal, { openModal: openEdit }] = useModal();
  const [viewModal, { openModal: openView }] = useModal();
  const [authMenuDrawer, { openDrawer: openAuthMenuDrawer }] = useDrawer();

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
  });

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
    await deleteRole({ id });
    await reload();
  };
  //授权菜单
  const authMenuAc = async ({ id }) => {
    await openAuthMenuDrawer(true, { id });
  };

  onMounted(() => {
    init();
  });
</script>
