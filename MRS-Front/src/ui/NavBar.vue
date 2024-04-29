<template>
    <nav class="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <img src="https://cdn.freebiesupply.com/logos/large/2x/mrs-logo-png-transparent.png" alt="Your Logo" class="w-10 h-10 rounded" />
        <span class="text-xl font-bold">MRS</span>
      </div>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/dash" class="hover:text-gray-400">Controls</router-link>
        </li>
        <li>
          <router-link to="/history" class="hover:text-gray-400">History</router-link>
        </li>
        <li>
          <router-link to="/configure" class="hover:text-gray-400">Configure</router-link>
        </li>
      </ul>
    </nav>
  </template>
