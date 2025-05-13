<template>
  <div class="min-h-screen flex items-center flex-col gap-y-3 p-4 overflow-auto">
    <!-- <h1 class="text-2xl md:text-5xl font-bold mb-5 text-foreground">Travel Wardrobe</h1> -->
    <HyperText
      text="Travel Wardrobe"
      class="text-4xl font-bold"
      :duration="800"
      :animate-on-load="true"
    />
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
        :data="informationData"
        class="overflow-y-auto"
      />

      <!-- Wardrobe Section -->
      <WardrobeCard :is-active="step === 3" class="overflow-y-auto" :data="resultData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import UserInputCard from '@/components/UserInputCard.vue'
import InformationCard from '@/components/InformationCard.vue'
import WardrobeCard from '@/components/WardrobeCard.vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import HyperText from '@/components/ui/hyper-text/HyperText.vue'
import {
  Stepper,
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
const step = ref(3)

const userInputData = ref({})
const informationData = ref({})
const resultData = ref()
const getImageTypeFromUrl = (url) => {
  if (url.includes('.')) {
    return url.split('.').pop()
  }
  return 'jpg'
}
resultData.value = [
  {
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
    url: 'https://www.popsci.com/wp-content/uploads/2023/01/10/Ocean-1010062.png',
    text: 'You look so pretty',
  },
].map((item) => {
  return {
    ...item,
    type: getImageTypeFromUrl(item.url),
  }
})

const handleNextTab = () => {
  step.value = step.value + 1
}

const handleUserInputGenerate = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/submit`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  const { errNo, errMsg } = result
  if (!response.ok || errNo !== 0) {
    const text = errMsg || response.statusText || 'Request failed'
    toast.error(text)
    return
  }
  userInputData.value = data
  informationData.value = result.data
  handleNextTab()
}

const handleInformationGenerate = async (data) => {
  console.log('data.selectedBackground', data)
  const { selectedBackground = [] } = data
  const imageList = informationData.value?.result2
    .filter((_, index) => selectedBackground.includes(index))
    .map((item) => item.url)
  const params = new URLSearchParams({
    selectedImageList: imageList,
    id: informationData.value?.id,
  })
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/getResults?${params.toString()}`,
    {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    },
  )
  const result = await response.json()
  const { errNo, errMsg } = result
  if (!response.ok || errNo !== 0) {
    const text = errMsg || response.statusText || 'Request failed'
    toast.error(text)
    return
  }
  resultData.value = (result.data?.list || []).map((item) => {
    return {
      text: item.text,
      ...item.image,
    }
  })
  console.log('resultData', resultData.value)
  handleNextTab()
}
</script>

<style></style>
