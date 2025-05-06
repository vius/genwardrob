<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWardrobeStore } from '../stores/wardrobe'
import ImageUploader from '../components/ImageUploader.vue'

const router = useRouter()
const store = useWardrobeStore()
const faceImage = ref<File | null>(null)
const outfitImage = ref<File | null>(null)
const description = ref('')

const handleFaceUpload = (file: File) => {
  faceImage.value = file
}

const handleOutfitUpload = (file: File) => {
  outfitImage.value = file
}

const handleGenerate = () => {
  // In a real application, you would send the images and description to your backend
  // For now, we'll just navigate to the processing view

  // Store the data in Pinia store
  if (faceImage.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        store.setFaceImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(faceImage.value)
  }

  if (outfitImage.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        store.setOutfitImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(outfitImage.value)
  }

  store.setDescription(description.value)

  // Navigate to the processing view
  router.push('/processing')
}
</script>

<template>
  <div class="mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold mb-6">User Input</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p class="text-sm text-gray-600 mb-2">Face Photo</p>
          <ImageUploader
            label="Upload"
            @file-selected="handleFaceUpload"
            :preview-class="'h-40 w-full object-cover'"
          />
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-2">Outfit Photo</p>
          <ImageUploader
            label="Upload"
            @file-selected="handleOutfitUpload"
            :preview-class="'h-40 w-full object-cover'"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-lg font-medium mb-2">Text Description</label>
        <textarea
          v-model="description"
          class="w-full border border-gray-300 rounded-md p-2 h-32"
          placeholder="Enter description of your travel wardrobe needs..."
        ></textarea>
      </div>

      <button
        @click="handleGenerate"
        class="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-md text-lg font-medium transition-colors"
        :disabled="!faceImage || !outfitImage"
      >
        Generate
      </button>
    </div>
  </div>
</template>
