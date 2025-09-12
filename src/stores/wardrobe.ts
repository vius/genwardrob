import { ref } from 'vue';
import { defineStore } from 'pinia';

// Updated message structure to match conversation.vue
interface MessagePart {
  type: 'text' | 'image';
  content: string;
}

export interface Message {
  id?: string;
  type: 'user' | 'assistant';
  message: MessagePart[];
  retrieve?: boolean
}

export const useWardrobeStore = defineStore('wardrobe', () => {
  // New state for conversations
  const conversation = ref<Record<string, any>>();
  const getConversation = () => {
    return conversation.value
  }
  const getMessages = () => {
    const data = getConversation()
    return data?.messages || []
  }
  const addMessage = async (message: Message) => {
    const messages = getMessages()
    messages.push(message)
    // 调用接口
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
    return 12313
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
