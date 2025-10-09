import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { loginWithGoogle as oauthLoginWithGoogle, isOAuthSupported } from '@/services/oauth'
import { post, get } from '@/utils/request'

export interface User {
  name: string
  email: string
}

export interface GuestUser {
  id: string
  name: string
  email: string
  avatar: string
  isGuest: true
}
function maskGuestId(str: string) {
  const prefix = "guest_";
  if (!str.startsWith(prefix)) return str;

  const id = str.slice(prefix.length);
  if (id.length <= 8) return str;

  return prefix + id.slice(0, 4) + "****" + id.slice(-4);
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
        name: 'Guest User',
        email: maskGuestId(guestId.value),
        avatar: '',
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
      localStorage.setItem('guest_id', newGuestId);
      return newGuestId
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

  // 登出
  const logout = async () => {
    user.value = null
    await post('/auth/logout')
    location.href = location.origin
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  const getUserInfo = async () => {
    const data = await get('/auth/getuserInfo')
    const { email } = data
    if (email) {
      user.value = {
        name: 'Google User',
        email,
      }
    } else {
      initializeGuestId()
    }
    console.log('data', data)
  }

  // 初始化认证状态
  const initialize = () => {
    try {
      getUserInfo()
    } catch (_) {
      initializeGuestId()
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
    logout,
    initialize,
    getUserInfo
  }
})
