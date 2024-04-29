<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div class="flex flex-col items-center justify-center py-8 px-4 space-y-8"
      >
      <h1 class="text-2xl text-gray-800">{{ status }}</h1>

        <h1 class="text-3xl font-bold text-gray-800">Door Controls</h1>
        <div class="flex flex-col space-y-2">
          <button
            @click="opendoor"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Open Door
          </button>
          <button
            @click="closedoor"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close Door
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Lock Door
          </button>
          <button
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            @click="lightSwitch"
            >
            On/Off Light
          </button>
        </div>
        <div class="w-full">
          <p class="text-xl font-bold text-gray-800">Live Camera</p>
          <img :src="videoStreamUrl" alt="Video Stream" class="w-full rounded shadow-md" />
        </div>
        <div class="w-full bg-gray-200 rounded p-4">
          <p class="text-gray-800 font-bold">Chat</p>
          <div class="flex flex-col space-y-2 md:flex-row md:items-center">
            <input type="text" v-model="messageToSend" placeholder="Type a message..." class="bg-gray-300 rounded px-2 py-1 flex-grow md:w-3/4" />
            <button @click="sendMessage" class="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-1/4">
              Send
            </button>
          </div>
          <div class="overflow-y-auto h-20 mt-2" v-if="messages.length > 0">
            <ul class="list-none space-y-2">
              <li v-for="message in messages" :key="message.id" class="flex items-center space-x-2">
                <span class="text-gray-700 font-bold">{{ message.id }}</span>
                <span class="text-gray-600">{{ message.content }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import NavBar from "../ui/NavBar.vue"

import { ref, onMounted ,onUnmounted } from 'vue';
import axios from "axios";

const cam_ip = localStorage.getItem("cam_ip")
const esp_ip = localStorage.getItem("esp_ip")
const server_ip = localStorage.getItem("server_ip")

const status = ref("Not yet connected");

const videoStreamUrl = ref(`http://${cam_ip}/`);

  const messages = ref([]);
  const messageToSend = ref('');
  let ws;
  
  function handleIncomingMessage(event) {
    const data = event.data;
    if(data == "Letter A Pressed!"){
      sendEmail("A","SHOPEE DELIVERY","Shopee delivery");
    }
    else if(data == "Letter B Pressed!"){
      sendEmail("B","Maningils Utang","Utang naningil");
    }
    else if(data == "Letter C Pressed!"){
      sendEmail("C","Naabot na ko","Naabot na ko");
    }
    else if(data == "Letter D Pressed!"){
      sendEmail("D","Rybryb ni","Naabot na si Rybryb");
    }
    else if(data== "Max is Reached!"){
      sendEmail("Too many times","Somebody tried to access your door","Robber!");
    }
    messages.value.push({ id: messages.value.length + 1, content: data });
  }
  
  // Function to send a message to the WebSocket server
  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(messageToSend.value);
      messageToSend.value = ''; // Clear the input field after sending the message
    }
  }

  function opendoor() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("open");
    }
  }
  function closedoor() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("lock");
    }
  }
  let light = false;

const lightSwitch = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // Toggle the state of the light
        light = !light;
        
        // Send the appropriate command based on the new state
        if (light) {
            ws.send("on");
        } else {
            ws.send("off");
        }
        
        // Provide feedback to the user or perform other actions as needed
        console.log("Light is now " + (light ? "on" : "off"));
    } else {
        console.error("WebSocket connection is not open");
        // Handle the case where the WebSocket connection is not open
    }
}

  const connectWebSocket = () => {
    // Replace 'ws://172.16.30.13/ws' with your WebSocket server URL
    // esp link
    ws = new WebSocket(`ws://${esp_ip}/ws`);

    // Listen for WebSocket open event
    ws.onopen = () => {
        console.log('Connected to WebSocket server');
        status.value = "Connected";
    };

    // Listen for WebSocket message event
    ws.onmessage = handleIncomingMessage;

    // Listen for WebSocket close event
    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
        status.value = "Disconnected";

        // Automatically reconnect after a short delay
        setTimeout(connectWebSocket, 1000); // Adjust delay as needed
    };

    // Listen for WebSocket error event
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

// Call the connectWebSocket function initially
connectWebSocket();

// Clean up when the component is unmounted
onUnmounted(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
    }
});


</script>