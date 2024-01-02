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
  import { getPage, deleteUser } from '@/api/main/system/user';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '@/components/Modal';
  import { getList } from '@/api/main/system/role';
  import ActionCell from './components/actioncell/index.vue';

  const AddModal = defineAsyncComponent(() => import('./components/add/index.vue'));
  const EditModal = defineAsyncComponent(() => import('./components/edit/index.vue'));
  const ViewModal = defineAsyncComponent(() => import('./components/view/index.vue'));

  const searchInfo = reactive<Recordable>({});

  const [addModal, { openModal: openAdd }] = useModal();
  const [editModal, { openModal: openEdit }] = useModal();
  const [viewModal, { openModal: openView }] = useModal();

  const [registerTable, { reload, getForm }] = useTable({
    // title: '账号列表',
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

  // 初始化角色
  const initRole = async () => {
    await getList().then((res) => {
      const roleList = res as any as [];
      const options_role = roleList.map((item) => {
        const { id, name } = item;
        return {
          value: id,
          label: name,
        };
      });
      getForm().updateSchema({
        field: 'roleId',
        componentProps: {
          options: options_role,
        },
      });
      return Promise.resolve();
    });
  };

  // 初始化
  const init = async () => {
    await Promise.all([initRole(), reload()]).catch((err) => {
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
    await deleteUser({ id });
    await reload();
  };

  onMounted(() => {
    init();
  });
</script>
