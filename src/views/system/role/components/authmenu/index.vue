<template>
  <BasicDrawer v-bind="drawerRt" @register="registerDrawer" @ok="handleSubmit">
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 8px;
      "
    >
      <a-space>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
        <a-button type="default" @click="closeDrawer">取消</a-button>
      </a-space>
    </div>
    <Form ref="formRef" :data="formRt" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, reactive, toRaw, defineAsyncComponent } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { authMenu } from '@/api/main/system/role';

  const Form = defineAsyncComponent(() => import('./Form.vue'));

  const emit = defineEmits(['success', 'register']);

  const formRef = ref();

  const formRt = reactive({
    id: 0,
  });

  const drawerRt = reactive({
    title: '编辑',
    destroyOnClose: true,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    formRt.id = data['id'];
  });

  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true });
      const values = await formRef.value.validate();
      const { id } = toRaw(formRt);
      const params = { roleId: id, ...values };
      await authMenu(params);
      // TODO custom api
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
