import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { loginWithGoogle as oauthLoginWithGoogle, loginWithGitHub as oauthLoginWithGitHub, isOAuthSupported } from '@/services/oauth'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  provider?: 'google' | 'github'
}

export interface GuestUser {
  id: string
  name: string
  email: string
  avatar: string
  isGuest: true
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const guestId = ref<string | null>(null)
  const isLoading = ref(false)

  // 计算属性：当前用户（包括游客）
  const currentUser = computed(() => {
    if (user.value) {
      return user.value
    }
    if (guestId.value) {
      return {
        id: guestId.value,
        name: 'Guest User',
        email: 'guest@example.com',
        avatar: 'https://via.placeholder.com/40x40/6b7280/ffffff?text=G',
        isGuest: true
      } as GuestUser
    }
    return null
  })

  const isAuthenticated = computed(() => !!user.value)
  const isGuest = computed(() => !!guestId.value && !user.value)

  // 初始化游客身份
  const initializeGuestId = async () => {
    try {
      // 检查本地存储中是否已有游客ID
      const storedGuestId = localStorage.getItem('guest_id')
      if (storedGuestId) {
        guestId.value = storedGuestId
        return storedGuestId
      }

      // 使用FingerprintJS生成唯一标识
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      const fingerprint = result.visitorId
      
      // 生成游客ID（添加前缀以区分）
      const newGuestId = `guest_${fingerprint}`
      guestId.value = newGuestId
      localStorage.setItem('guest_id', newGuestId)
      
      return newGuestId
    } catch (error) {
      console.error('Failed to initialize guest ID:', error)
      // 降级方案：使用随机ID
      const fallbackId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      guestId.value = fallbackId
      localStorage.setItem('guest_id', fallbackId)
      return fallbackId
    }
  }

  // Google OAuth登录
  const loginWithGoogle = async () => {
    isLoading.value = true
    try {
      // 检查是否支持OAuth
      if (!isOAuthSupported()) {
        throw new Error('OAuth is only supported on HTTPS or localhost')
      }

      // 使用OAuth服务进行登录
      await oauthLoginWithGoogle()

      // OAuth成功后，用户信息会在回调页面中设置
      // 这里不需要额外处理，因为回调页面会更新store状态

    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // GitHub OAuth登录
  const loginWithGitHub = async () => {
    isLoading.value = true
    try {
      // 检查是否支持OAuth
      if (!isOAuthSupported()) {
        throw new Error('OAuth is only supported on HTTPS or localhost')
      }

      // 使用OAuth服务进行登录
      await oauthLoginWithGitHub()

      // OAuth成功后，用户信息会在回调页面中设置
      // 这里不需要额外处理，因为回调页面会更新store状态

    } catch (error) {
      console.error('GitHub login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    
    // 重新初始化游客身份
    initializeGuestId()
  }

  // 从本地存储恢复用户状态
  const restoreUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      } else {
        // 如果没有登录用户，初始化游客身份
        initializeGuestId()
      }
    } catch (error) {
      console.error('Failed to restore user from storage:', error)
      initializeGuestId()
    }
  }

  // 初始化认证状态
  const initialize = async () => {
    restoreUserFromStorage()
    if (!user.value && !guestId.value) {
      await initializeGuestId()
    }
  }

  return {
    user,
    guestId,
    currentUser,
    isAuthenticated,
    isGuest,
    isLoading,
    initializeGuestId,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    restoreUserFromStorage,
    initialize
  }
})
