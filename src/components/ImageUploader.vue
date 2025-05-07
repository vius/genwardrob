<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  label: string
  previewClass?: string
}>()

const emit = defineEmits<{
  'file-selected': [file: File]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
    emit('file-selected', selectedFile.value)

    // Create a preview URL
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
</script>

<template>
  <div class="border rounded-md border-zinc-100">
    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />

    <div @click="handleClick" class="cursor-pointer flex justify-center items-center bg-zinc-100">
      <div v-if="!previewUrl" class="flex flex-col items-center justify-center h-40 bg-muted/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-muted-foreground mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-muted-foreground">{{ label }}</span>
      </div>

      <img
        v-else
        :src="previewUrl"
        :class="previewClasses"
        alt="Preview"
        class="max-h-40 sm:max-h-40 max-w-full object-fill"
      />
    </div>
  </div>
</template>
