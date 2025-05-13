<template>
  <Card class="transition-all duration-300 py-4" :class="{ hidden: !isActive }">
    <CardContent
      class="gap-y-5 flex-1 px-3 w-full flex flex-col gap-2 sm:px-5 sm:gap-x-12 sm:flex-row"
    >
      <div class="w-full flex flex-col gap-y-2">
        <h3 class="text-lg font-medium text-foreground">Image</h3>
        <p class="text-sm text-muted-foreground">Please upload one full-body photo of yourself.</p>
        <ImageUploader
          class="flex-1"
          label="Click to upload full-body photo"
          @file-selected="handleFullBodyUpload"
        ></ImageUploader>
      </div>
      <div class="flex flex-col gap-y-2 w-full">
        <h3 class="text-lg font-medium text-foreground">Text Description</h3>
        <p class="text-sm text-muted-foreground">
          Please upload a brief descriptive statement outlining your travel time, destination, and
          purpose of travel
        </p>
        <Textarea
          v-model="travelDescription"
          class="h-full min-h-56"
          placeholder="I'm traveling to Bali for a week-long beach vacation in July..."
        />
      </div>
    </CardContent>
    <CardFooter class="px-3 sm:px-5">
      <Button class="w-full" size="lg" @click="handleGenerate"> Generate </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ImageUploader from './ImageUploader.vue'
import { toast } from 'vue-sonner'
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['generate', 'next-tab'])

const fullBodyPreview = ref(null)
const travelDescription = ref('')

const handleFullBodyUpload = (file) => {
  if (file) {
    // file文件转base64 字符串
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      fullBodyPreview.value = reader.result
    }
  }
}

const handleGenerate = (e) => {
  // 校验数据
  if (!fullBodyPreview.value) {
    toast.error('Please upload a full-body photo')
    return
  }
  if (!travelDescription.value) {
    toast.error('Please enter a travel description')
    return
  }
  const button = e.target
  button.innerText = 'Generating...'
  button.disabled = true

  emit('generate', {
    fullbodyshot: fullBodyPreview.value,
    description: travelDescription.value,
  })

  setTimeout(() => {
    button.innerText = 'Generate'
    button.disabled = false
  }, 2000)
}
</script>
