<template>
  <div class="min-h-screen flex items-center flex-col gap-y-3 p-4 overflow-auto">
    <h1 class="text-2xl md:text-5xl font-bold mb-5 text-foreground">Travel Wardrobe</h1>
    <Stepper class="flex w-full items-start gap-2" v-model="step">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        v-slot="{ state }"
        class="relative flex w-full flex-col items-center justify-center"
        :step="item.step"
      >
        <StepperSeparator
          v-if="item.step !== steps[steps.length - 1].step"
          class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />

        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 !rounded-full shrink-0"
            :class="[
              state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background ',
            ]"
            :disabled="state !== 'completed' && item.step !== step"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
          </Button>
        </StepperTrigger>

        <div class="mt-1 flex flex-col items-center text-center">
          <StepperTitle
            :class="[state === 'active' && 'text-primary']"
            class="text-sm font-semibold transition lg:text-base"
          >
            {{ item.title }}
          </StepperTitle>
        </div>
      </StepperItem>
    </Stepper>

    <div class="grid grid-cols-1 gap-4 w-full sm:px-12 mt-4 flex-1">
      <!-- User Input Section -->
      <UserInputCard
        :is-active="step === 1"
        @generate="handleUserInputGenerate"
        @next-tab="handleNextTab"
      />

      <!-- Information Section -->
      <InformationCard
        :is-active="step === 2"
        @generate="handleInformationGenerate"
        @next-tab="handleNextTab"
        @background-selected="handleBackgroundSelected"
        class="overflow-y-auto"
      />

      <!-- Wardrobe Section -->
      <WardrobeCard
        :is-active="step === 3"
        @download="handleWardrobeDownload"
        @outfit-selected="handleOutfitSelected"
        class="overflow-y-auto"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import UserInputCard from '@/components/UserInputCard.vue'
import InformationCard from '@/components/InformationCard.vue'
import WardrobeCard from '@/components/WardrobeCard.vue'
import { Button } from '@/components/ui/button'

import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { Check, Circle, Dot } from 'lucide-vue-next'

const steps = [
  {
    step: 1,
    title: 'User Input',
  },
  {
    step: 2,
    title: 'Information',
  },
  {
    step: 3,
    title: 'Results',
  },
]
// Tab navigation
const tabs = ['UserInput', 'Information', 'Wardrobe']
const step = ref(1)
const windowWidth = ref(window.innerWidth)

// App state
const userInputData = ref(null)
const selectedBackground = ref(2)
const selectedOutfits = ref([])

// Resize handler for responsive behavior
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleNextTab = () => {
  step.value = step.value + 1
}

const handleUserInputGenerate = (data) => {
  console.log('User input data:', data)
  userInputData.value = data
  handleNextTab()
}

const handleInformationGenerate = (data) => {
  console.log('Information data:', data)
  handleNextTab()
}

const handleWardrobeDownload = (selectedOutfitImages) => {
  console.log('Downloading outfits:', selectedOutfitImages)
}

const handleBackgroundSelected = (backgroundId) => {
  console.log('Background selected:', backgroundId)
  selectedBackground.value = backgroundId
}

const handleOutfitSelected = (data) => {
  console.log('Outfit selection changed:', data)
  // Update the selected outfits
  if (data.selected) {
    selectedOutfits.value.push(data.index)
  } else {
    const index = selectedOutfits.value.indexOf(data.index)
    if (index !== -1) {
      selectedOutfits.value.splice(index, 1)
    }
  }
}
</script>

<style></style>
