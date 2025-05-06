<script setup lang="ts">
// This component demonstrates Tailwind CSS v4 features
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6 text-blue-600">Tailwind CSS v4 Demo</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div class="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">Gradient Background</h3>
          <p class="text-gray-600">Tailwind CSS v4 makes it easy to create beautiful gradients.</p>
          <button class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Learn More
          </button>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div class="h-48 bg-blue-500 flex items-center justify-center">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">Flexible Layouts</h3>
          <p class="text-gray-600">Create complex layouts with Tailwind's utility classes.</p>
          <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Explore
          </button>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
          <span class="text-4xl font-bold text-white">v4</span>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">Modern Features</h3>
          <p class="text-gray-600">Tailwind CSS v4 includes many new features and improvements.</p>
          <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Discover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
