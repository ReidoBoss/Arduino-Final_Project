<template>
    <NavBar />
    <div class="flex flex-col px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">History</h1>
      <div v-if="videos.length === 0" class="text-gray-500 text-center">
        <p>No video history available</p>
      </div>
      <template v-for="video in videos" :key="video.id">
        <div @click="seeVideo(video.id)" class="flex flex-col bg-gray-100 rounded p-4 mb-4 shadow-md">
          <div class="flex items-center space-x-4">
            <p class="text-gray-700">{{ video.timestamp }}</p>
            <p class="text-gray-700 font-bold">{{ video.type }}</p>
            <img :src="video.img" alt="Video Preview" class="w-20 h-20 rounded object-cover" />
          </div>

        </div>
      </template>
    </div>
  </template>
<script setup>
import NavBar from "../ui/NavBar.vue"
import {ref,onMounted} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const cam_ip = localStorage.getItem("cam_ip")
const esp_ip = localStorage.getItem("esp_ip")
const server_ip = localStorage.getItem("server_ip")
onMounted(()=>{
    getVideos();
});
const videos = ref([]);

const getVideos = async () => {
    const response = await fetch(`http://${server_ip}:8080/getVideo`);
    const data = await response.json();
    
    for (var i = 0; i < data.length; i++) {
        const timestamp = new Date(data[i].timestamp);
        
        const dateName = timestamp.toLocaleString('en-US', { weekday: 'long' });
        const time = timestamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        videos.value.push({
            id: data[i].video_id,
            type : data[i] .type,
            timestamp: `${dateName}, ${time}`,
            img: await convertBlob(data[i].frame_1.data),
        });
    }
}
const getVidTime = async (index) => {
    const response = await fetch(`http://${server_ip}:8080/getVideo`);
    const data = await response.json();
    for (var i = 0; i < data.length; i++) {
        if (index == data[i].video_id) {
            return new Date(data[i].timestamp); // Returning the Date object
        }
    }
    return null; // Returning null if no match found
}

const formatDate = (date) => {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${month} ${day}, ${year} ${time}`;
};


const seeVideo = async (index) => {
    const timestamp = await getVidTime(index);
    if (timestamp) {
        const formattedDate = formatDate(timestamp);
        localStorage.setItem("camStamp", formattedDate); 
        router.push(`/video/${index}`);
    } else {
        console.log("Video not found");
    }
}


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