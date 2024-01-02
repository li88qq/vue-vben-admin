<template>
  <a-space>
    <a-button type="link" size="small" @click="emitAc('view')">
      <template #icon>
        <ProfileOutlined />
      </template>
    </a-button>
    <a-button type="link" size="small" @click="emitAc('edit')">
      <template #icon>
        <EditOutlined />
      </template>
    </a-button>
    <a-button
      type="link"
      size="small"
      danger
      @click="emitAc('delete')"
      :disabled="props.data['id'] === 1"
    >
      <template #icon>
        <DeleteOutlined />
      </template>
    </a-button>
  </a-space>
</template>
<script setup lang="ts">
  import { EditOutlined, ProfileOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    data: {
      type: Object,
    },
  });

  const emit = defineEmits(['view', 'edit', 'delete']);

  const emitAc = (key) => {
    emit(key, props.data);
  };
</script>
