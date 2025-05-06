<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWardrobeStore } from '../stores/wardrobe'

const router = useRouter()
const store = useWardrobeStore()
const resultImage = computed(() => store.resultImage || '/result/beach-outfit.jpg')

const handleDownload = () => {
  // Create a link element
  const link = document.createElement('a')
  link.href = resultImage.value
  link.download = 'travel-wardrobe-result.jpg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleNewGeneration = () => {
  // Reset the store and navigate back to the input view
  store.reset()
  router.push('/')
}
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold mb-6">Result</h1>

      <div class="mb-6">
        <img :src="resultImage" alt="Generated outfit" class="w-full rounded-md shadow-md" />
      </div>

      <div class="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          @click="handleDownload"
          class="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-md text-lg font-medium transition-colors"
        >
          Download
        </button>

        <button
          @click="handleNewGeneration"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md text-lg font-medium transition-colors"
        >
          Create New
        </button>
      </div>
    </div>
  </div>
</template>
