<template>
  <Card class="transition-all duration-300" :class="{ hidden: !isActive }">
    <CardContent class="px-3 sm:px-5 flex-1">
      <CardSelect :cards="cards" v-model="selectedBackground" class="grid grid-cols-3 gap-3">
        <template #default="{ data }">
          <img :src="data.id" />
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

const cards = [
  {
    id: 'https://loremflickr.com/400/400?lock=8220500560465192',
  },
  {
    id: 'https://loremflickr.com/400/400?lock=3333786447001369',
  },
  {
    id: 'https://loremflickr.com/400/400?lock=3333786447001369',
  },
  {
    id: 'https://loremflickr.com/400/400?lock=3333786447001369',
  },
  {
    id: 'https://loremflickr.com/400/400?lock=3333786447001369',
  },
  {
    id: 'https://loremflickr.com/400/400?lock=3333786447001369',
  },
]
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

const emit = defineEmits(['download', 'outfit-selected'])

// Wardrobe section
const outfits = ref([
  {
    image: '/result/beach-outfit.jpg',
    selected: true,
  },
  { image: null, selected: false },
  {
    image: '/result/beach-outfit.jpg',
    selected: false,
  },
  { image: null, selected: false },
  {
    image: '/result/beach-outfit.jpg',
    selected: false,
  },
  { image: null, selected: false },
])

const toggleOutfitSelection = (index) => {
  outfits.value[index].selected = !outfits.value[index].selected
  emit('outfit-selected', { index, selected: outfits.value[index].selected })
}

const handleDownload = (e) => {
  // Animation to show processing
  const button = e.target
  button.innerText = 'Downloading...'
  button.disabled = true

  // Get selected outfits
  const selectedOutfits = outfits.value
    .filter((outfit) => outfit.selected && outfit.image)
    .map((outfit) => outfit.image)

  // Emit the data to the parent component
  emit('download', selectedOutfits)

  setTimeout(() => {
    button.innerText = 'Download'
    button.disabled = false
  }, 1500)
}
</script>
