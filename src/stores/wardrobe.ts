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
  const conversation = ref<Record<string, any>>({
    id: "",
    messages: [{
      type: 'user',
      message: [{
        type: 'text',
        content: '我要去新西兰旅游'
      }]
    }, {
      type: 'assistant',
      message: [{
        type: 'text',
        content: '很好，你的消息是完整的'
      }],
      status: 2
    }, {
      type: 'user',
      message: [{
        type: 'text',
        content: 'generate directly'
      }]
    }, {
      type: 'assistant',
      message: [{
        type: 'text',
        content: 'ongratulations! Congratulations! Here’s a wardrobe recommendation that fits your needs. You can click the generate button to continue creating a Visualized Fashion Wardrobe.'
      }, {
        type: 'image',
        content: 'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
      }, {
        type: 'image',
        content: 'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
      }, {
        type: 'image',
        content: 'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
      }],
      status: 3
    }]
  });
  const getConversation = () => {
    return conversation.value
  }
  const getMessages = () => {
    const data = getConversation()
    return data.messages || []
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
  return {
    getConversationDetail,
    initConversation,
    getConversation,
    getMessages,
    addMessage
  };
});
