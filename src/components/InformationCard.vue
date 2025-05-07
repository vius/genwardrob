<template>
  <Card class="transition-all duration-300 p-0 pb-3 sm:pb-5" :class="{ hidden: !isActive }">
    <CardContent class="px-3 sm:px-5 flex-1">
      <Accordion type="single" collapsible class="w-full" :default-value="defaultValue">
        <!-- User Profile Section -->
        <AccordionItem value="user-profile">
          <AccordionTrigger data-orientation="horizontal" class="justify-between w-full">
            <span class="text-base font-medium text-foreground">
              (1) U_Profile — Users' personal information
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div class="border border-border rounded-lg p-3 min-h-24 bg-muted/20">
              <pre class="text-sm whitespace-pre-wrap">{{
                JSON.stringify(userProfile, null, 2)
              }}</pre>
            </div>
          </AccordionContent>
        </AccordionItem>

        <!-- Database Search Information Section -->
        <AccordionItem value="search-info">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (2) Q1 — Database search information
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div class="grid grid-cols-3 gap-3">
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <!-- Search Results Section -->
        <AccordionItem value="search-results">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (3) R1 — Database search return results
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div class="grid grid-cols-3 gap-3">
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
              <div class="border border-border rounded-lg p-3 bg-muted/20"></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <!-- Background Selection Section -->
        <AccordionItem value="background-selection">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (4) R2 — Select your favorite background
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <CardSelect :cards="cards" v-model="selectedBackground">
              <template #default="{ data }">
                <img :src="data.id" />
              </template>
            </CardSelect>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooter class="px-3 sm:px-5">
      <Button class="w-full" size="lg" @click="handleGenerate"> Generate </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import CardSelect from './CardSelect.vue'

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
]

const emit = defineEmits(['generate', 'next-tab', 'background-selected'])
const defaultValue = 'user-profile'
const userProfile = ref({
  name: 'User',
  preferences: 'Casual beach style',
  skinTone: 'Medium',
  bodyType: 'Average',
})

const selectedBackground = ref([])

const handleGenerate = (e) => {
  // Animation to show processing
  const button = e.target
  button.innerText = 'Generating...'
  button.disabled = true

  // Emit the data to the parent component
  emit('generate', {
    selectedBackground: selectedBackground.value,
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
