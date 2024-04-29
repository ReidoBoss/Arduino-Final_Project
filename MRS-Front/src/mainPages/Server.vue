<template>

</template>
  
  <script setup>
  import { ref,onMounted } from 'vue';
  import axios from "axios";

const cam_ip = localStorage.getItem("cam_ip")
const esp_ip = localStorage.getItem("esp_ip")
const server_ip = localStorage.getItem("server_ip")

const imageUrl = ref(`http://${cam_ip}/capture`);
const frames = ref([]);
const canUpload = ref(false);
let loadInterval;
const messages = ref([]);
  const messageToSend = ref('');
  let ws;
  function handleIncomingMessage(event) {
    const data = event.data;
    if(data == "Letter A Pressed!"){
      submitRecording("Shopee Delivery");
      sendEmail("A","SHOPEE DELIVERY","Shopee delivery");
    }
    else if(data == "Letter B Pressed!"){
      submitRecording("Maningil Utang");
      sendEmail("B","Maningils Utang","Utang naningil");
    }
    else if(data == "Letter C Pressed!"){
      submitRecording("Somebody Arrived");
      sendEmail("C","Naabot na ko","Naabot na ko");
    }
    else if(data == "Letter D Pressed!"){
      submitRecording("Doorbell");
      sendEmail("D","Doorbell Rang","Doorbell pressed");
    }
    else if(data== "Max is Reached!"){
      sendEmail("Too many times","Somebody tried to access your door","Robber!");
      submitRecording();
    }
    console.log(data);
    messages.value.push({ id: messages.value.length + 1, content: data });
  }
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

const submitRecording = async (type) => {
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
                
                formData.append(`type`, type);

                await axios.post(`http://${server_ip}:8080/addVideo`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Reset state
                canUpload.value = false;
                frames.value = [];

                console.log("Added!");
            } catch (error) {
                console.error("Error sending recording:", error);
            }
        };
    } catch (error) {
        console.error("Error:", error);
    }
};

const sendEmail = async (letter,message,subject) => {

try{
    const formData = new FormData();

    formData.append('email',"bryansagarino222@gmail.com");
    formData.append('subject',subject);
    formData.append('letter',letter);
    formData.append('message',message);

    await axios.post(`http://${server_ip}:8080/sendMail`,formData,{
    headers: {
    "Content-Type" : "multipart/form-data",
        },
    });
}   
catch(error){

    alert(error);
}

}
onMounted(() => {
    // Replace 'ws://172.16.30.13/ws' with your WebSocket server URL
    ws = new WebSocket(`ws://${esp_ip}/ws`);
  
    // Listen for WebSocket open event
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
  
    // Listen for WebSocket message event
    ws.onmessage = handleIncomingMessage;
  
    // Listen for WebSocket close event
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  
    // Listen for WebSocket error event
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    // Clean up when the component is unmounted
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  });



  </script>
  