<template>
    <div>
        <button @click="submitRecording">record</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from "axios";

const imageUrl = ref('http://172.16.30.15/capture');
const frames = ref([]);
const canUpload = ref(false);
let loadInterval;

const loadImageAsBlob = async () => {
    try {
        const response = await fetch(imageUrl.value);
        const blob = await response.blob();
        
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        frames.value.push(file);
        
        // Check if maximum number of frames (50) is reached
        if (frames.value.length >= 50) {
            clearInterval(loadInterval);
            canUpload.value = true;
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

const submitRecording = async () => {
    try {
        loadInterval = setInterval(loadImageAsBlob, 200);

        // This flag ensures that the recording is only sent once
        let sentRecording = false;

        // Check if canUpload is true and all frames are loaded
        const checkCanUpload = () => {
            if (canUpload.value && frames.value.length >= 50 && !sentRecording) {
                sentRecording = true; // Set flag to prevent multiple submissions
                clearInterval(loadInterval); // Clear the interval
                sendRecording(); // Send the recording
            }
        };

        // Check if recording can be sent at regular intervals
        const intervalId = setInterval(checkCanUpload, 200);

        // Function to send the recording
        const sendRecording = async () => {
            try {
                const formData = new FormData();
                for (let i = 0; i < 50; i++) {
                    formData.append(`frame_${i + 1}`, frames.value[i]);
                }

                await axios.post("http://localhost:8080/addVideo", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Reset state
                canUpload.value = false;
                frames.value = [];

                alert("Added!");
            } catch (error) {
                console.error("Error sending recording:", error);
            }
        };
    } catch (error) {
        console.error("Error:", error);
    }
};




const handleFileImage = async (event) => {
  const file = (event.target.files || [])[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = async () => {
    const canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const compressedImageDataUrl = canvas.toDataURL('image/jpeg', 0.7); 

    const compressedImageBlob = await fetch(compressedImageDataUrl).then(res => res.blob());

    main_image.value = compressedImageBlob;

  };
};
  </script>
  