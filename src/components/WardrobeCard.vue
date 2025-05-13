<template>
  <Card class="transition-all duration-300" :class="{ hidden: !isActive }">
    <CardContent class="px-3 sm:px-5 flex-1">
      <CardSelect
        :cards="props.data"
        v-model="selectedImages"
        :itemRefs="itemRefs"
        class="grid grid-cols-3 gap-3"
      >
        <template #default="{ data, index }">
          <img :src="data.url" :class="{ 'selected-image': selectedImages.includes(index) }" />
        </template>
      </CardSelect>
    </CardContent>
    <CardFooter class="px-3 sm:px-5">
      <Button class="w-full" size="lg" @click="handleDownload"> Download </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import CardSelect from './CardSelect.vue'
import { downloadExistingImage } from '@/utils/downloadImage'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [],
  },
})

const itemRefs = ref([])
setTimeout(() => {
  console.log('itemRefs', itemRefs.value)
}, 8000)
const selectedImages = ref([])
const handleDownload = (e) => {
  // Animation to show processing
  const button = e.target
  button.innerText = 'Downloading...'
  button.disabled = true
  // image base64数据 前端下载
  // Download selected images
  const selectedImageNodeList = document.querySelectorAll('.selected-image')
  // 遍历节点下载图片
  for (const item of selectedImageNodeList) {
    downloadExistingImage(item, 'wardrobe-image.jpg')
  }
  console.log('selectedImages', selectedImages)
  setTimeout(() => {
    button.innerText = 'Download'
    button.disabled = false
  }, 1500)
}
</script>
