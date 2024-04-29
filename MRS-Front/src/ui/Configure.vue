<template>
    <NavBar />

    <div class="container mx-auto max-w-md p-8 rounded-lg shadow-md bg-white">
      <form @submit.prevent="set">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Network Settings</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center">
            <label class="text-sm font-medium text-gray-700 mr-2">Camera IP</label>
            <input v-model="cam_ip" type="text" class="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 w-full">
          </div>
          <div class="flex items-center">
            <label class="text-sm font-medium text-gray-700 mr-2">ESP 32 IP</label>
            <input v-model="esp_ip" type="text" class="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 w-full">
          </div>
          <div class="flex items-center">
            <label class="text-sm font-medium text-gray-700 mr-2">Server IP</label>
            <input v-model="server_ip" type="text" class="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 w-full">
          </div>
        </div>
        <button type="submit" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">Set</button>
      </form>
    </div>
  </template>
  
<script setup>
import NavBar from "../ui/NavBar.vue"
import {ref} from "vue";

const cam_ip = ref();
const esp_ip = ref();
const server_ip = ref();

cam_ip.value = localStorage.getItem("cam_ip");
esp_ip.value = localStorage.getItem("esp_ip");
server_ip.value = localStorage.getItem("server_ip");

const set = () =>{
    localStorage.setItem('cam_ip', cam_ip.value);
    localStorage.setItem('esp_ip', esp_ip.value);
    localStorage.setItem('server_ip', server_ip.value);
}
</script>