<template>
  <div class="flex-1 flex items-center justify-center p-4 bg-background">
    <div class="w-full mx-auto lg:px-16 sm:px-8 px-3 flex-1">
      <div class="text-center space-y-4 mb-6 flex-1">
        <h1 class="text-3xl md:text-4xl font-bold text-foreground">
          What would you like to wear today?
        </h1>

        <p class="text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto">
          You can click the button in the dialog box to upload a full-body photo and enter your travel
          description (location, time, and purpose) in the dialog box to get GenWardrobe
        </p>
      </div>

      <div
        class="max-w-3xl m-auto bg-background border border-gray-200 p-2.5 flex-1 flex w-full cursor-text flex-col items-center justify-center overflow-clip bg-clip-padding contain-inline-size rounded-3xl">
        <Textarea id="travel-description" v-model="travelDescription"
          placeholder="Please enter your travel description here, for example: 'I'm planning to travel to Singapore in July. Could you recommend suitable outfits for the trip?'"
          class="min-h-[120px] resize-none border-0 focus-visible:ring-ring/0 focus-visible:shadow-none shadow-none"
          :disabled="isLoading" />
        <div class="flex w-full justify-between items-end mt-3">
          <ImageUploader @file-selected="handleFileSelected" @remove-image="handleImageRemoved"
            preview-class="object-contain" />
          <Button size="icon" class="rounded-full" @click="generateWardrobe" :disabled="!canGenerate || isLoading">
            <UploadIcon />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'vue-sonner'
import { UploadIcon } from 'lucide-vue-next'
import ImageUploader from '@/components/ImageUploader.vue'
// Reactive data
const travelDescription = ref('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)

// Computed properties
const canGenerate = computed(() => {
  return travelDescription.value.trim().length > 0 && selectedFile.value !== null
})

// File handling methods
const handleFileSelected = (file: File) => {
  selectedFile.value = file
  toast.success('Image uploaded successfully!')
}

const handleImageRemoved = () => {
  selectedFile.value = null
}

const generateWardrobe = async () => {
  if (!canGenerate.value) return

  isLoading.value = true

  try {
    // Here you would typically make an API call
    // For now, we'll simulate the process
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success('Wardrobe generated successfully!')

    // You could emit an event or navigate to results page here
    // emit('wardrobe-generated', { description: travelDescription.value, file: selectedFile.value })

  } catch (error) {
    toast.error('Failed to generate wardrobe. Please try again.')
    console.error('Error generating wardrobe:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
