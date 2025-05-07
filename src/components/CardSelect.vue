<template>
  <div class="w-full mx-auto grid-cols-3 grid gap-3">
    <div
      v-for="(card, index) in props.cards"
      :key="card.id || index"
      :class="[
        'relative rounded-sm overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-md  flex justify-center items-center',
        isSelected(card.id)
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50',
      ]"
      @click="toggleSelection(card.id)"
      tabindex="0"
      @keydown="handleKeyDown($event, card.id)"
      role="checkbox"
      :aria-checked="isSelected(card.id)"
      :aria-label="card.title"
    >
      <div
        v-if="isSelected(card.id)"
        class="absolute top-2 right-2 h-5 w-5 text-primary bg-white rounded-full flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <slot :data="card"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Using an array to track multiple selections
const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['update:modelValue'])

const selectedCards = ref([])

const isSelected = (cardId) => {
  return selectedCards.value.includes(cardId)
}

const toggleSelection = (cardId) => {
  if (isSelected(cardId)) {
    selectedCards.value = selectedCards.value.filter((id) => id !== cardId)
  } else {
    selectedCards.value.push(cardId)
  }
  emit('update:modelValue', selectedCards.value)
}

// Handle keyboard navigation
const handleKeyDown = (event, cardId) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleSelection(cardId)
  }
}
</script>
