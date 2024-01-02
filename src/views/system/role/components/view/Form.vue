<template>
  <div>
    <a-descriptions :column="1">
      <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script setup lang="ts">
  defineProps({
    info: {
      type: Object,
      default: () => ({}),
    },
  });
</script>
