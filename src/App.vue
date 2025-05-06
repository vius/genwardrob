<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-4 box-border flex flex-col">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-blue-800">Travel Wardrobe Demo</h1>
    </header>

    <main class="flex-1 overflow-auto py-3">
      <RouterView />
    </main>

    <footer class="mt-12 text-center text-gray-500 text-sm">
      <p>© {{ new Date().getFullYear() }} Travel Wardrobe App</p>
    </footer>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
