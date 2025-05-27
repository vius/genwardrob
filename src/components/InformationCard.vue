<template>
  <Card class="transition-all duration-300 p-0 pb-3 sm:pb-5" :class="{ hidden: !isActive }">
    <CardContent class="px-3 sm:px-5 flex-1">
      <Accordion
        type="single"
        collapsible
        class="w-full"
        :default-value="defaultValue"
        :unmountOnHide="false"
      >
        <AccordionItem value="user-profile">
          <AccordionTrigger data-orientation="horizontal" class="justify-between w-full">
            <span class="text-base font-medium text-foreground">
              (1) U_Profile — Users' personal information
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div class="rounded-lg h-auto sm:h-72 bg-zinc-100 flex justify-center items-center">
              <img :src="data.profile" alt="user profile" class="w-full h-full !object-contain" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="search-info">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (2) Q1 — Database search information
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <pre class="text-sm whitespace-pre-wrap bg-black text-white p-4 rounded">{{
              JSON.stringify(props.data.query1, null, 2)
            }}</pre>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="search-results">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (3) R1 — Database search return results
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <pre class="text-sm whitespace-pre-wrap bg-black text-white p-4 rounded">{{
              JSON.stringify(props.data.result1, null, 2)
            }}</pre>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="background-selection">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (4) R2 — Select your favorite background
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <!-- <CardSelect :cards="props.data.result2" v-model="selectedBackground">
              <template #default="{ data }">
                <img :src="data.url" />
              </template>
            </CardSelect> -->
            <pre class="text-sm whitespace-pre-wrap bg-black text-white p-4 rounded">{{
              JSON.stringify(props.data.result2, null, 2)
            }}</pre>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recommended-outfits">
          <AccordionTrigger>
            <span class="text-base font-medium text-foreground">
              (5) R3 — Recommended outfits
            </span>
          </AccordionTrigger>
          <AccordionContent class="sm:grid sm:grid-cols-3 sm:gap-3">
            <img
              :src="item.base64"
              v-for="(item, index) in props.data.result3"
              :key="index"
              class="rounded"
            />
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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import CardSelect from './CardSelect.vue'
import { toast } from 'vue-sonner'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['generate'])
const defaultValue = 'user-profile'
const selectedBackground = ref([])

const handleGenerate = (e) => {
  emit('generate')
}
</script>
