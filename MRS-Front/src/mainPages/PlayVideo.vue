<template>
    <img :src="image">
</template>
<script setup>
import { ref,onMounted } from "vue";

const image = ref(null);

let index = 1; 

const getVideo = async () => {
    try {
        const response = await fetch('http://localhost:8080/getVideoByID/14');
        const data = await response.json();

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