<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWardrobeStore } from '../stores/wardrobe'

const router = useRouter()
const store = useWardrobeStore()
const selectedBackground = ref<number>(store.selectedBackground)
const userProfile = ref({})
const searchQuery = ref({})
const searchResults = ref({})

// Mock data for demonstration
const mockUserProfile = {
  name: 'User',
  preferences: 'Casual beach style',
  skinTone: 'Medium',
  bodyType: 'Average',
}

const mockSearchQuery = {
  style: 'Beach vacation',
  season: 'Summer',
  colors: 'Neutral, Blue',
  occasion: 'Casual outings',
}

const mockSearchResults = {
  outfits: ['Beach dress', 'Linen pants', 'Swimwear'],
  accessories: ['Sunglasses', 'Beach hat', 'Sandals'],
  recommendations: 'Light, breathable fabrics suitable for beach weather',
}

onMounted(() => {
  // In a real application, you would fetch this data from your backend
  // For now, we'll just use mock data
  userProfile.value = mockUserProfile
  searchQuery.value = mockSearchQuery
  searchResults.value = mockSearchResults

  // Simulate a delay to show processing
  setTimeout(() => {
    // In a real application, you would wait for the backend to process the images
  }, 1000)
})

const handleBackgroundSelect = (index: number) => {
  selectedBackground.value = index
  store.setSelectedBackground(index)
}

const handleContinue = () => {
  // Store the selected background in Pinia store
  store.setSelectedBackground(selectedBackground.value)

  // In a real application, you would send the data to your backend for processing
  // For demo purposes, we'll set a mock result image
  store.setResultImage('/result/beach-outfit.jpg')

  // Navigate to the result view
  router.push('/result')
}
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6">User Information Extraction and Confirmation</h1>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-2">(1) U_Profile —— Users' personal information</h2>
        <div class="border border-gray-300 rounded-md p-4 min-h-24">
          <pre class="text-sm whitespace-pre-wrap">{{ JSON.stringify(userProfile, null, 2) }}</pre>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-2">(2) Query 1 —— Search Information</h2>
        <div class="border border-gray-300 rounded-md p-4 min-h-24">
          <pre class="text-sm whitespace-pre-wrap">{{ JSON.stringify(searchQuery, null, 2) }}</pre>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-2">(3) R1 —— Search Return Results</h2>
        <div class="border border-gray-300 rounded-md p-4 min-h-24">
          <pre class="text-sm whitespace-pre-wrap">{{
            JSON.stringify(searchResults, null, 2)
          }}</pre>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-2">(4) R2 —— Select your favorite background</h2>
        <div class="grid grid-cols-3 gap-2 sm:gap-4">
          <div
            class="relative border border-gray-300 rounded-md overflow-hidden cursor-pointer"
            :class="{ 'ring-2 ring-blue-500': selectedBackground === 0 }"
            @click="handleBackgroundSelect(0)"
          >
            <img
              src="/backgrounds/beach1.jpg"
              alt="Beach"
              class="w-full h-16 sm:h-24 object-cover"
            />
            <div
              v-if="selectedBackground === 0"
              class="absolute bottom-2 right-2 bg-white rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div
            class="relative border border-gray-300 rounded-md overflow-hidden cursor-pointer"
            :class="{ 'ring-2 ring-blue-500': selectedBackground === 1 }"
            @click="handleBackgroundSelect(1)"
          >
            <img
              src="/backgrounds/beach2.jpg"
              alt="Beach"
              class="w-full h-16 sm:h-24 object-cover"
            />
            <div
              v-if="selectedBackground === 1"
              class="absolute bottom-2 right-2 bg-white rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div
            class="relative border border-gray-300 rounded-md overflow-hidden cursor-pointer"
            :class="{ 'ring-2 ring-blue-500': selectedBackground === 2 }"
            @click="handleBackgroundSelect(2)"
          >
            <img
              src="/backgrounds/beach3.jpg"
              alt="Beach"
              class="w-full h-16 sm:h-24 object-cover"
            />
            <div
              v-if="selectedBackground === 2"
              class="absolute bottom-2 right-2 bg-white rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="handleContinue"
        class="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-md text-lg font-medium transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
</template>
