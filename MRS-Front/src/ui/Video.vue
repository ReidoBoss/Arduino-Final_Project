<template>
    <NavBar />
    <div class="flex flex-col items-center justify-center h-full px-4 py-8">
    <h1 class="text-3xl text-gray-800 mb-4">{{time}}</h1>
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{type}}</h1>
      <div v-if="error" class="text-red-500 text-center">
        <p>Error loading video: {{ error }}</p>
      </div>
      <div v-else-if="!isPlaying && image" class="flex items-center">
        <img :src="image" alt="Video Preview" class="w-full h-auto object-cover rounded shadow-md" />

      </div>

      <div v-else class="text-gray-500 text-center">
        <p>Loading video...</p>
      </div>
    </div>
  </template>
<script setup>
import NavBar from "../ui/NavBar.vue"
import {ref} from "vue";
import { useRoute } from "vue-router";

const cam_ip = localStorage.getItem("cam_ip")
const esp_ip = localStorage.getItem("esp_ip")
const server_ip = localStorage.getItem("server_ip")
const time = localStorage.getItem("camStamp");
console.log (time);
const route = useRoute();
const id = route.params.id;

const image = ref(null);
const type = ref();
let index = 1; 

const getVideo = async () => {
    try {
        const response = await fetch(`http://${server_ip}:8080/getVideoByID/${id}`);
        const data = await response.json();
        console.log(data[0])
        type.value = data[0].type;
        const intervalId = setInterval(async () => {
            image.value = await convertBlob(data[0][`frame_${index}`].data);

            index++;

            if (index > 50) {
                clearInterval(intervalId);
                console.log("End of video.");
            }
        }, 200);
    } catch (error) {
        console.error('Error fetching video:', error);
    }
};

getVideo();


const convertBlob = (image) => {
      return new Promise((resolve, reject) => {
        if (image) {
          const blob = new Blob([new Uint8Array(image)], { type: "image/jpeg" });
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const dataURL = reader.result;
            resolve(dataURL);
          };
        }
      });
};

</script>