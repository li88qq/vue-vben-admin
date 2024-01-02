<template>
  <BasicModal v-bind="modalRt" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="form_add" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './data';
  import { saveUser } from '@/api/main/system/user';

  const emit = defineEmits(['success', 'register']);

  const modalRt = reactive({
    title: '新增',
    destroyOnClose: true,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });

  const [registerForm, { validate }] = useForm({
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
      await saveUser(values);
      // TODO custom api
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
