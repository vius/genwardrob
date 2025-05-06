<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  label: string;
  previewClass?: string;
}>();

const emit = defineEmits<{
  (e: 'file-selected', file: File): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    emit('file-selected', selectedFile.value);
    
    // Create a preview URL
    previewUrl.value = URL.createObjectURL(selectedFile.value);
  }
};

const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const previewClasses = computed(() => {
  return props.previewClass || 'h-32 w-full object-cover';
});
</script>

<template>
  <div class="border border-gray-300 rounded-md overflow-hidden">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />
    
    <div 
      @click="handleClick"
      class="cursor-pointer"
    >
      <div v-if="!previewUrl" class="flex flex-col items-center justify-center h-40 bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-500">{{ label }}</span>
      </div>
      
      <div v-else class="relative">
        <img :src="previewUrl" :class="previewClasses" alt="Preview" />
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
          <span class="text-white font-medium">Change</span>
        </div>
      </div>
    </div>
  </div>
</template>
