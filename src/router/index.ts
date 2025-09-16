import { createRouter, createWebHistory } from 'vue-router'
import NewChatPage from '../views/new-chat.vue'
import OAuthCallbackPage from '../views/oauth-callback.vue'
import ConversationPage from '../views/conversation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewChatPage,
    },
    {
      path: '/auth/google/callback',
      name: 'google-callback',
      component: OAuthCallbackPage,
    },
    {
      path: '/auth/github/callback',
      name: 'github-callback',
      component: OAuthCallbackPage,
    },
    {
      path: '/conversation/:id',
      name: 'conversation',
      component: ConversationPage,
    },
  ],
})

export default router
