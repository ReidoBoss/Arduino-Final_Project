<template>
  <div>
    <video :src="videoStreamUrl" controls></video>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const videoStreamUrl = ref('http://172.16.30.41/');
</script>
  