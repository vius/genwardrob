<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="text-gray-600">Processing authentication...</p>
      </div>
      
      <div v-else-if="error" class="space-y-4">
        <div class="text-red-500 text-xl">❌</div>
        <p class="text-red-600">{{ error }}</p>
        <button 
          @click="closeWindow"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
      
      <div v-else class="space-y-4">
        <div class="text-green-500 text-xl">✅</div>
        <p class="text-green-600">Authentication successful!</p>
        <p class="text-gray-600">This window will close automatically...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { handleOAuthCallback } from '@/services/oauth'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const loading = ref(true)
const error = ref('')

const closeWindow = () => {
  window.close()
}

onMounted(async () => {
  try {
    const provider = route.path.includes('google') ? 'google' : 'github'
    const code = route.query.code as string
    const state = route.query.state as string
    const errorParam = route.query.error as string

    if (errorParam) {
      throw new Error(`OAuth error: ${errorParam}`)
    }

    if (!code || !state) {
      throw new Error('Missing required OAuth parameters')
    }

    // 处理OAuth回调
    const user = await handleOAuthCallback(provider, code, state)
    
    // 更新认证状态
    authStore.user = user
    localStorage.setItem('user', JSON.stringify(user))
    
    // 清除游客状态
    localStorage.removeItem('guest_id')
    authStore.guestId = null

    // 通知父窗口认证成功
    if (window.opener) {
      window.opener.postMessage({ type: 'OAUTH_SUCCESS', user }, window.location.origin)
    }

    loading.value = false

    // 3秒后自动关闭窗口
    setTimeout(() => {
      window.close()
    }, 3000)

  } catch (err) {
    console.error('OAuth callback error:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    loading.value = false

    // 通知父窗口认证失败
    if (window.opener) {
      window.opener.postMessage({ 
        type: 'OAUTH_ERROR', 
        error: error.value 
      }, window.location.origin)
    }
  }
})
</script>
