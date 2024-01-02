<template>
  <div>
    <a-descriptions :column="1">
      <a-descriptions-item label="用户名">{{ info.username }}</a-descriptions-item>
      <a-descriptions-item label="角色">{{ info.roleName }}</a-descriptions-item>
      <a-descriptions-item label="昵称">{{ info.nickname }}</a-descriptions-item>
      <a-descriptions-item label="手机号码">{{ info.mobile }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ timestampToTime(info.createDate) }}
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
