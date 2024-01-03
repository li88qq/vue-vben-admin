<template>
  <BasicModal v-bind="modalRt" @register="registerModal" @ok="closeModal">
    <Form name="user_view" :info="formRt" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, defineAsyncComponent, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getView } from '@/api/main/system/menu';

  const Form = defineAsyncComponent(() => import('./Form.vue'));

  const searchInfoRt = reactive({
    id: 0,
  });

  const formRt = reactive({
    name: '',
    href: '',
    icon: '',
    openType: '',
    sort: 0,
    createDate: 0,
    updateDate: 0,
    parentName: '',
  });

  const modalRt = reactive({
    title: '详情',
    destroyOnClose: true,
  });

  const initData = async () => {
    const params = toRaw(searchInfoRt);
    const data = await getView(params);
    for (const key in data) {
      formRt[key] = data[key];
    }
  };

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    searchInfoRt.id = data['id'];
    await initData();
  });
</script>
