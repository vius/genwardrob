import { ref } from 'vue';
import { defineStore } from 'pinia';
import { post } from '@/utils/request'
// Updated message structure to match conversation.vue
interface MessagePart {
  type: 'text' | 'image';
  content: string;
}

export interface Message {
  id?: string;
  type: 'user' | 'assistant';
  message: MessagePart[];
  skip_retrieve?: boolean,
  try_on?: boolean
}

export const useWardrobeStore = defineStore('wardrobe', () => {
  const conversation = ref<Record<string, any>>();
  const getConversation = () => {
    return conversation.value
  }
  const getMessages = () => {
    const data = getConversation()
    return data?.messages || []
  }
  const addMessage = async (item: Message) => {
    const messages = getMessages()
    messages.push(item)
    const data = await post('/conversation/chat', {
      conversationId: conversation.value?.id,
      ...item
    })
    console.log('data', data)
    messages.push(data)
  }
  const initConversation = (conversationId: string, initialMessage: Message | null = null) => {
    conversation.value = {
      id: conversationId,
      messages: []
    }
    if (initialMessage) {
      addMessage(initialMessage)
    }
  }

  const getConversationDetail = async (conversationId: string) => {
    initConversation(conversationId)
    // 获取详情
    console.log('获取详情', conversationId)
  }
  const createConversation = async () => {
    const conversation = await post('/conversation/create', {
      title: 'New Conversation'
    })
    return conversation
  }
  return {
    createConversation,
    getConversationDetail,
    initConversation,
    getConversation,
    getMessages,
    addMessage,
  };
});
