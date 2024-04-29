<template>
    <div>
      <input type="text" v-model="messageToSend" placeholder="Type a message...">
      <button @click="sendMessage">Send</button>
      <button @click="closedoor">Close Door</button>
      <button @click="opendoor">Open Door</button>

      <h1>WebSocket Messages:</h1>
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.content }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  const messages = ref([]);
  const messageToSend = ref('');
  let ws;
  
  // Function to handle incoming messages from the WebSocket server
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
      sendEmail("D","Rybryb ni","Door");
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
      ws.send("180");
    }
  }
  function closedoor() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("1");
    }
  }
  
  onMounted(() => {
    // Replace 'ws://172.16.30.13/ws' with your WebSocket server URL
    ws = new WebSocket('ws://172.16.30.13/ws');
  
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


const sendEmail = async (letter,message,subject) => {

  try{
      const formData = new FormData();

      formData.append('email',"marianneleighreyes27@gmail.com");
      formData.append('subject',subject);
      formData.append('letter',letter);
      formData.append('message',message);

      await axios.post("http://localhost:8080/sendMail",formData,{
      headers: {
      "Content-Type" : "multipart/form-data",
          },
      });
  }   
  catch(error){

      alert(error);
  }

}
  </script>
  