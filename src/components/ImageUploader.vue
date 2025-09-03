<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ImageUp, CircleX, ZoomIn, Download } from 'lucide-vue-next'

const props = defineProps<{
  previewClass?: string
}>()

const emit = defineEmits<{
  'file-selected': [file: File],
  'remove-image': []
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isPreviewOpen = ref(false)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
    emit('file-selected', selectedFile.value)
    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const previewClasses = computed(() => {
  return props.previewClass || 'object-cover'
})

const removeImage = () => {
  selectedFile.value = null
  previewUrl.value = null
  isPreviewOpen.value = false
  emit('remove-image')
}

const previewImage = () => {
  if (previewUrl.value) {
    isPreviewOpen.value = true
  }
}
const downloadImage = () => {
  if (previewUrl.value && selectedFile.value) {
    const link = document.createElement('a')
    link.href = previewUrl.value
    link.download = selectedFile.value.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getImageDimensions = (): string => {
  // This would require loading the image to get dimensions
  // For now, return a placeholder
  return 'Image'
}
</script>

<template>
  <!-- Upload Button (when no image) -->
  <div @click="handleClick" v-if="!previewUrl">
    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />
    <Button variant="ghost" size="icon" class="rounded-full">
      <ImageUp :size="28" />
    </Button>
  </div>

  <!-- Image Preview (when image is selected) -->
  <div class="w-auto h-auto flex relative" v-else>
    <div class="relative group cursor-pointer" @click="previewImage">
      <img :src="previewUrl" :class="previewClasses" alt="Preview"
        class="max-w-48 max-h-48 !object-contain transition-opacity group-hover:opacity-80" />
      <!-- Hover overlay with zoom icon -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded">
        <ZoomIn :size="24" class="text-white" />
      </div>
    </div>
    <!-- Remove button -->
    <CircleX :size="16"
      class="absolute -top-1 -right-1 rounded-full cursor-pointer bg-white text-gray-600 hover:text-red-500 transition-colors shadow-sm"
      @click.stop="removeImage" />
  </div>

  <!-- Full Screen Preview Modal -->
  <Sheet v-model:open="isPreviewOpen">
    <SheetContent side="bottom" class="h-full w-full max-w-none p-0 border-0 ">
      <div class="relative h-full w-full flex items-center justify-center">
        <!-- Header with controls -->
        <SheetHeader class="absolute top-0 left-0 right-8 z-10 py-1.5 px-4 to-transparent">
          <div class="flex items-center justify-between">
            <SheetTitle class="text-lg">
              {{ selectedFile?.name || 'Image Preview' }}
            </SheetTitle>
            <div class="flex items-center gap-2">
              <!-- Download button -->
              <Button variant="ghost" size="icon" class="" @click="downloadImage">
                <Download :size="20" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <!-- Main image display -->
        <div class="w-full h-full flex items-center justify-center p-16">
          <img v-if="previewUrl" :src="previewUrl" alt="Full size preview"
            class="max-w-full max-h-full object-contain" />
        </div>

        <!-- Footer with image info -->
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div class="text-white text-sm text-center opacity-75">
            <span v-if="selectedFile">
              {{ formatFileSize(selectedFile.size) }} • {{ getImageDimensions() }}
            </span>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
