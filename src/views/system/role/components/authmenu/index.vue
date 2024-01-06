<template>
  <a-drawer v-bind="drawerRt">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="saveAc">保存</a-button>
        <a-button type="default" @click="close">取消</a-button>
      </a-space>
    </template>
    <Form ref="formRef" :data="formRt" />
  </a-drawer>
</template>
<script lang="ts" setup>
  import { ref, reactive, toRaw, defineAsyncComponent } from 'vue';
  import { authMenu } from '@/api/main/system/role';

  const Form = defineAsyncComponent(() => import('./Form.vue'));

  const emit = defineEmits(['success']);

  const formRef = ref();

  const formRt = reactive({
    id: 0,
  });

  const drawerRt = reactive({
    open: false,
    title: '角色菜单授权',
    destroyOnClose: true,
    closable: false,
    size: 'large',
  });

  const open = (data) => {
    Object.assign(formRt, data);
    drawerRt.open = true;
  };

  const close = () => {
    drawerRt.open = false;
  };

  const saveAc = async () => {
    try {
      const values = await formRef.value.validate();
      const { id } = toRaw(formRt);
      const params = { roleId: id, ...values };
      await authMenu(params);
      // // TODO custom api
      close();
      emit('success');
    } catch (err) {
      console.error(err);
    }
  };

  defineExpose({
    open,
    close,
  });
</script>
