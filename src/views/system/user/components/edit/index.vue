<template>
  <BasicModal v-bind="modalRt" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="form_edit" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './data';
  import { updateUser, getInfo } from '@/api/main/system/user';

  const emit = defineEmits(['success', 'register']);

  const formRt = reactive({
    id: 0,
  });

  const modalRt = reactive({
    title: '编辑',
    destroyOnClose: true,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    formRt.id = data['id'];
    await initData(data);
  });

  const [registerForm, { validate, setFieldsValue }] = useForm({
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
      setModalProps({ confirmLoading: true });
      const values = await validate();
      const { id } = toRaw(formRt);
      const params = { id, ...values };
      await updateUser(params);
      // TODO custom api
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  // 初始化数据
  const initData = async (data) => {
    await getInfo(data).then((res) => {
      setFieldsValue(res);
    });
  };
</script>
