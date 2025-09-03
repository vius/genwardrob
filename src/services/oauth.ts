// OAuth服务配置和方法
export interface OAuthConfig {
  clientId: string
  redirectUri: string
  scope: string
}

export interface OAuthUser {
  id: string
  name: string
  email: string
  avatar: string
  provider: 'google' | 'github'
}

// Google OAuth配置
const GOOGLE_CONFIG: OAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/auth/google/callback`,
  scope: 'openid profile email'
}

// GitHub OAuth配置
const GITHUB_CONFIG: OAuthConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/auth/github/callback`,
  scope: 'user:email'
}

/**
 * 生成随机状态字符串用于OAuth安全验证
 */
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Google OAuth登录
 */
export function loginWithGoogle(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!GOOGLE_CONFIG.clientId) {
      reject(new Error('Google Client ID not configured'))
      return
    }

    const state = generateState()
    localStorage.setItem('oauth_state', state)

    const params = new URLSearchParams({
      client_id: GOOGLE_CONFIG.clientId,
      redirect_uri: GOOGLE_CONFIG.redirectUri,
      response_type: 'code',
      scope: GOOGLE_CONFIG.scope,
      state: state,
      access_type: 'offline',
      prompt: 'consent'
    })

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    
    // 在新窗口中打开OAuth授权页面
    const popup = window.open(authUrl, 'google-oauth', 'width=500,height=600')
    
    if (!popup) {
      reject(new Error('Failed to open popup window'))
      return
    }

    // 监听消息事件
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      
      if (event.data.type === 'OAUTH_SUCCESS') {
        window.removeEventListener('message', messageListener)
        popup.close()
        resolve()
      } else if (event.data.type === 'OAUTH_ERROR') {
        window.removeEventListener('message', messageListener)
        popup.close()
        reject(new Error(event.data.error))
      }
    }

    window.addEventListener('message', messageListener)

    // 检查弹窗是否被关闭
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed)
        window.removeEventListener('message', messageListener)
        reject(new Error('OAuth popup was closed'))
      }
    }, 1000)
  })
}

/**
 * GitHub OAuth登录
 */
export function loginWithGitHub(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!GITHUB_CONFIG.clientId) {
      reject(new Error('GitHub Client ID not configured'))
      return
    }

    const state = generateState()
    localStorage.setItem('oauth_state', state)

    const params = new URLSearchParams({
      client_id: GITHUB_CONFIG.clientId,
      redirect_uri: GITHUB_CONFIG.redirectUri,
      scope: GITHUB_CONFIG.scope,
      state: state
    })

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
    
    // 在新窗口中打开OAuth授权页面
    const popup = window.open(authUrl, 'github-oauth', 'width=500,height=600')
    
    if (!popup) {
      reject(new Error('Failed to open popup window'))
      return
    }

    // 监听消息事件
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      
      if (event.data.type === 'OAUTH_SUCCESS') {
        window.removeEventListener('message', messageListener)
        popup.close()
        resolve()
      } else if (event.data.type === 'OAUTH_ERROR') {
        window.removeEventListener('message', messageListener)
        popup.close()
        reject(new Error(event.data.error))
      }
    }

    window.addEventListener('message', messageListener)

    // 检查弹窗是否被关闭
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed)
        window.removeEventListener('message', messageListener)
        reject(new Error('OAuth popup was closed'))
      }
    }, 1000)
  })
}

/**
 * 处理OAuth回调
 */
export async function handleOAuthCallback(provider: 'google' | 'github', code: string, state: string): Promise<OAuthUser> {
  // 验证state参数
  const storedState = localStorage.getItem('oauth_state')
  if (!storedState || storedState !== state) {
    throw new Error('Invalid state parameter')
  }

  // 清除存储的state
  localStorage.removeItem('oauth_state')

  // 这里应该调用后端API来交换code获取用户信息
  // 目前使用模拟数据
  if (provider === 'google') {
    return {
      id: 'google_' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://via.placeholder.com/40x40/4285f4/ffffff?text=GU',
      provider: 'google'
    }
  } else {
    return {
      id: 'github_' + Date.now(),
      name: 'GitHub User',
      email: 'user@github.com',
      avatar: 'https://via.placeholder.com/40x40/333333/ffffff?text=GU',
      provider: 'github'
    }
  }
}

/**
 * 检查是否支持OAuth（需要HTTPS或localhost）
 */
export function isOAuthSupported(): boolean {
  return window.location.protocol === 'https:' || window.location.hostname === 'localhost'
}
