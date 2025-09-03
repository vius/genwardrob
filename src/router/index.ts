import { createRouter, createWebHistory } from 'vue-router'
import NewChatPage from '../views/new-chat.vue'
import AuthTestPage from '../views/auth-test.vue'
import OAuthCallbackPage from '../views/oauth-callback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewChatPage,
    },
    {
      path: '/auth-test',
      name: 'auth-test',
      component: AuthTestPage,
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
  ],
})

export default router
