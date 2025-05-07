<template>
  <Card class="transition-all duration-300 py-4" :class="{ hidden: !isActive }">
    <CardContent class="flex flex-col gap-y-5 flex-1 px-3 sm:px-5">
      <div class="flex flex-col gap-y-2">
        <h3 class="text-lg font-medium text-foreground">Image</h3>
        <p class="text-sm text-muted-foreground">
          Please upload one portrait photo and one full-body photo of yourself.
        </p>
        <!-- Image upload section -->
        <section class="w-full flex gap-2 sm:gap-x-12 flex-col sm:flex-row">
          <ImageUploader class="flex-1" label="Click to upload portrait photo"></ImageUploader>
          <ImageUploader class="flex-1" label="Click to upload full-body photo"></ImageUploader>
        </section>
      </div>
      <div class="flex flex-col gap-y-2">
        <h3 class="text-lg font-medium text-foreground">Text Description</h3>
        <p class="text-sm text-muted-foreground">
          Please upload a brief descriptive statement outlining your travel time, destination, and
          purpose of travel
        </p>
        <Textarea
          v-model="travelDescription"
          class="h-36 sm:h-48"
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
// import { Camera, UserCircle } from 'lucide-vue-next'
import { FileUpload, FileUploadGrid } from '@/components/ui/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
// import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ImageUploader from './ImageUploader.vue'

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

const portraitPreview = ref(null)
const fullBodyPreview = ref(null)
const travelDescription = ref('')

const handlePortraitUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    portraitPreview.value = URL.createObjectURL(file)
  }
}

const handleFullBodyUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    fullBodyPreview.value = URL.createObjectURL(file)
  }
}

const triggerPortraitUpload = () => {
  document.getElementById('portrait-upload').click()
}

const triggerFullBodyUpload = () => {
  document.getElementById('fullbody-upload').click()
}

const handleGenerate = (e) => {
  // Animation to show processing
  const button = e.target
  button.innerText = 'Generating...'
  button.disabled = true

  // Emit the data to the parent component
  emit('generate', {
    portraitImage: portraitPreview.value,
    fullBodyImage: fullBodyPreview.value,
    description: travelDescription.value,
  })

  setTimeout(() => {
    button.innerText = 'Generate'
    button.disabled = false

    // For mobile, automatically move to the next tab after generating
    if (props.isMobile) {
      emit('next-tab')
    }
  }, 1500)
}
</script>
