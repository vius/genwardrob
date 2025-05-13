<template>
  <div class="w-full mx-auto flex flex-col gap-2 sm:grid-cols-3 sm:grid sm:gap-3">
    <div
      v-for="(card, index) in props.cards"
      :key="index"
      :ref="() => props.itemRefs"
      :class="[
        'relative rounded-sm overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-md min-h-32  flex justify-center items-center bg-zinc-100',
        isSelected(index) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
      ]"
      @click="toggleSelection(index)"
      tabindex="0"
      @keydown="handleKeyDown($event, index)"
      role="checkbox"
      :aria-checked="isSelected(index)"
      :aria-label="card.title"
    >
      <div
        v-if="isSelected(index)"
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

      <slot :data="card" :index="index"></slot>
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
  itemRefs: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['update:modelValue'])

const selectedCards = ref([])

const isSelected = (index) => {
  return selectedCards.value.includes(index)
}

const toggleSelection = (index) => {
  if (isSelected(index)) {
    selectedCards.value = selectedCards.value.filter((idx) => idx !== index)
  } else {
    selectedCards.value.push(index)
  }
  emit('update:modelValue', selectedCards.value)
}

// Handle keyboard navigation
const handleKeyDown = (event, index) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleSelection(index)
  }
}
</script>
