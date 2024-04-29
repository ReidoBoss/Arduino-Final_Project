<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div class="w-full max-w-md p-8 rounded-md shadow-md bg-white">
        <div class="flex justify-center mb-8">
          <img class="w-20 h-20 rounded-full" src="https://cdn.freebiesupply.com/logos/large/2x/mrs-logo-png-transparent.png" alt="Logo" />
        </div>
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="login"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </button>
          <button
          @click="configure"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full md:w-auto"
        >
          Configure
        </button>

        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm mt-4">{{ errorMessage }}</div>
      </div>
    </div>
  </template>
<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router"

const router = useRouter();
const username = ref();
const password = ref();
const errorMessage = ref();

const cam_ip = localStorage.getItem("cam_ip")
const esp_ip = localStorage.getItem("esp_ip")
const server_ip = localStorage.getItem("server_ip")

const login = async () =>{
  try{
    const response = await fetch(`http://${server_ip}:8080/getUsers`);
    const data = await response.json();

    if(data[0].username==username.value){
        if(data[0].password==password.value){
            router.push("/dash");
            console.log("true")
        }
        else{
            errorMessage.value =""
        }
        errorMessage.value =""
    }
    else{
        errorMessage.value = "Wrong credentials"
    }
  }
  catch(error){
    errorMessage.value=error;
  }

}
const configure = () =>{router.push("/configure")}

</script>