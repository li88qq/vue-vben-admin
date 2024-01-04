<template>
  <a-space>
    <a-tooltip title="授权菜单">
      <a-button type="link" size="small" @click="emitAc('authMenu')">
        <template #icon>
          <CheckOutlined />
        </template>
      </a-button>
    </a-tooltip>
  </a-space>
</template>
<script setup lang="ts">
  import { CheckOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    data: {
      type: Object,
    },
  });

  const emit = defineEmits(['authMenu']);

  const emitAc = (key) => {
    emit(key, props.data);
  };
</script>
