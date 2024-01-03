<template>
  <div>
    <a-descriptions :column="1">
      <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="上级名称">{{ info.parentName }}</a-descriptions-item>
      <a-descriptions-item label="路径">{{ info.href }}</a-descriptions-item>
      <a-descriptions-item label="图标">{{ info.icon }}</a-descriptions-item>
      <a-descriptions-item label="打开方式">
        <template v-if="info?.openType === 0">
          <a-tag color="green">直接打开</a-tag>
        </template>
        <template v-else-if="info?.openType === 1">
          <a-tag color="green">新窗口打开</a-tag>
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="排序">{{ info.sort }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ timestampToTime(info.createDate) }}
      </a-descriptions-item>
      <a-descriptions-item label="修改时间">
        {{ timestampToTime(info.updateDate) }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script setup lang="ts">
  import { timestampToTime } from '@/utils/dateUtil';

  defineProps({
    info: {
      type: Object,
      default: () => ({}),
    },
  });
</script>
