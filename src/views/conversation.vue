<template>
    <div
        class="max-h-screen overflow-hidden py-8 pb-4  px-2 sm:px-0 flex flex-col gap-3 items-center bg-background text-black/75">
        <section class="space-y-6  w-full flex-1 overflow-auto px-3 sm:px-12 flex justify-center">
            <div class="max-w-4xl w-full">
                <div v-for="message, index in messages" :key="message.id"
                    :class="['flex items-start gap-3', message.type === 'user' ? 'justify-end' : 'justify-start']">
                    <div class="py-2" :class="{ 'text-right': message.type === 'user' }">
                        <template v-for="item in message.message">
                            <PrwviewImage v-if="item.type === 'image'" :previewUrl="item.content"
                                :prompt="item.prompt" />
                            <section class="my-2" v-if="item.type === 'text'">
                                <p
                                    :class="['rounded-lg text-left inline-block break-all', message.type === 'user' ? 'bg-muted py-2.5 px-4' : '']">
                                    {{
                                        item.content
                                    }}</p>
                            </section>
                        </template>
                        <div v-if="message.status === 2" class="flex gap-3">
                            <Button @click="retrieve(false)" :disabled="index !== messages.length - 1"
                                variant="destructive">
                                Retrieve
                            </Button>

                            <Button @click="retrieve(true)" :disabled="index !== messages.length - 1"
                                class="hover:bg-violet-500/90 bg-violet-500">
                                Generate Directly
                            </Button>
                        </div>
                        <div v-if="message.status === 3">
                            <Button @click="tryon()" :disabled="index !== messages.length - 1"
                                class="hover:bg-violet-500/90 bg-violet-500">
                                Try-on
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div
            class="bg-background border max-w-4xl p-3 border-gray-200 flex w-full cursor-text flex-col items-center justify-center overflow-clip bg-clip-padding contain-inline-size rounded-3xl">
            <Textarea id="travel-description" v-model="travelDescription"
                placeholder="Please enter your travel description here, for example: 'I'm planning to travel to Singapore in July. Could you recommend suitable outfits for the trip?'"
                class="min-h-[60px] resize-none border-0 focus-visible:ring-ring/0 focus-visible:shadow-none shadow-none"
                :disabled="isLoading" />
            <div class="flex w-full justify-between items-end mt-3">
                <ImageUploader @file-selected="handleFileSelected" @remove-image="handleImageRemoved"
                    preview-class="object-contain" />
                <Button size="icon" class="rounded-full" @click="chat" :disabled="!canGenerate || isLoading">
                    <UploadIcon />
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWardrobeStore, type Message } from '@/stores/wardrobe'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'vue-sonner'
import { UploadIcon } from 'lucide-vue-next'
import ImageUploader from '@/components/ImageUploader.vue'
import PrwviewImage from '@/components/image/index.vue'

// Reactive data
const travelDescription = ref('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const route = useRoute()
const wardrobeStore = useWardrobeStore()
const conversationId = computed(() => route.params.id as string)
const messages = computed(() => wardrobeStore.getMessages())
const canGenerate = computed(() => {
    return travelDescription.value.trim().length > 0 || selectedFile.value !== null
})

// File handling methods
const handleFileSelected = (file: File) => {
    selectedFile.value = file
    toast.success('Image uploaded successfully!')
}

const handleImageRemoved = () => {
    selectedFile.value = null
}

const chat = () => {
    if (!canGenerate.value || isLoading.value) return;

    const userMessageParts: Message['message'] = [];
    if (selectedFile.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                userMessageParts.push({ type: 'image', content: e.target.result as string });
            }
        };
        reader.readAsDataURL(selectedFile.value);
    }
    if (travelDescription.value.trim()) {
        userMessageParts.push({ type: 'text', content: travelDescription.value.trim() });
    }
    sendMessage(userMessageParts);
};

const sendMessage = (messageParts: Message['message'], data = {}) => {
    const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        message: messageParts,
        ...data
    };
    wardrobeStore.addMessage(newMessage);
    travelDescription.value = '';
    selectedFile.value = null;
}

const retrieve = (skipretrieve = false) => {
    const message: Message['message'] = [{
        type: 'text',
        content: skipretrieve ? 'generate directly' : 'retrieve'
    }]
    sendMessage(message, {
        skip_retrieve: skipretrieve
    })
}
const tryon = () => {
    const message: Message['message'] = [{
        type: 'text',
        content: 'Try-on'
    }]
    sendMessage(message, {
        try_on: true
    })
}
if (!messages.value.length) {
    wardrobeStore.getConversationDetail(conversationId.value)
}

</script>

<style scoped>
/* Additional custom styles if needed */
</style>