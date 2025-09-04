<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ZoomIn, Download } from 'lucide-vue-next'

const props = defineProps<{
    previewClass?: string,
    previewUrl: string
}>()

const isPreviewOpen = ref(false)
const previewClasses = computed(() => {
    return props.previewClass || 'object-cover'
})

const previewImage = () => {
    if (props.previewUrl) {
        isPreviewOpen.value = true
    }
}
const downloadImage = () => {
    if (props.previewUrl) {
        const link = document.createElement('a')
        link.href = props.previewUrl
        link.download = 'download.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}
</script>

<template>
    <div class="relative group cursor-pointer inline-flex justify-center items-center rounded-lg overflow-hidden mr-2"
        @click="previewImage">
        <img v-if="previewUrl" :src="previewUrl" :class="previewClasses" alt="Preview"
            class="max-w-36 max-h-36 sm:max-w-64 sm:max-h-64 !object-contain transition-opacity group-hover:opacity-80" />
        <!-- Hover overlay with zoom icon -->
        <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded">
            <ZoomIn :size="24" class="text-white" />
        </div>
    </div>

    <!-- Full Screen Preview Modal -->
    <Sheet v-model:open="isPreviewOpen">
        <SheetContent side="bottom" class="h-[80vh] w-full max-w-none p-0 border-0 ">
            <div class="relative h-full w-full flex items-center justify-center">
                <!-- Header with controls -->
                <SheetHeader class="absolute top-0 left-0 right-8 z-10 py-1.5 px-4 to-transparent">
                    <div class="flex items-center justify-between">
                        <SheetTitle class="text-lg">
                            Image Preview
                        </SheetTitle>
                        <div class="flex items-center gap-2">
                            <!-- Download button -->
                            <Button variant="ghost" size="icon" class="" @click="downloadImage">
                                <Download :size="20" />
                            </Button>
                        </div>
                    </div>
                </SheetHeader>

                <!-- Main image display -->
                <div class="w-full h-full flex items-center justify-center p-16">
                    <img v-if="previewUrl" :src="previewUrl" alt="Full size preview"
                        class="max-w-full max-h-full object-contain" />
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>
