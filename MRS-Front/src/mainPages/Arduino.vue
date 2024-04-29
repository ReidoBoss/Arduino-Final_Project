<template>
  <div>
    <img :src="videoStreamUrl" alt="Video Stream">
  </div>
</template>

<script setup>
import { ref } from 'vue';

const videoStreamUrl = ref('http://172.16.30.15/');
</script>
