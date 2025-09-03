# 用户认证功能设置指南

## 功能概述

本项目已集成以下用户认证功能：

1. **游客身份识别**：使用 FingerprintJS 生成唯一标识作为游客身份
2. **第三方登录**：支持 Google 和 GitHub OAuth 登录
3. **状态管理**：使用 Pinia store 管理用户认证状态
4. **本地存储**：自动保存和恢复用户登录状态

## 技术实现

### 依赖包
- `@fingerprintjs/fingerprintjs`: 用于生成浏览器指纹作为游客标识
- `pinia`: 状态管理
- `vue-sonner`: 消息提示

### 核心文件
- `src/stores/auth.ts`: 认证状态管理
- `src/services/oauth.ts`: OAuth 服务
- `src/components/NavUser.vue`: 用户导航组件
- `src/views/oauth-callback.vue`: OAuth 回调处理页面

## 使用方法

### 1. 环境配置

复制 `.env.example` 到 `.env.local` 并配置 OAuth 客户端 ID：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```env
# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# GitHub OAuth Client ID  
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
```

### 2. OAuth 应用配置

#### Google OAuth 设置
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权重定向 URI：`http://localhost:3001/auth/google/callback`

#### GitHub OAuth 设置
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App
3. 设置 Authorization callback URL：`http://localhost:3001/auth/github/callback`

### 3. 功能使用

#### 游客模式
- 应用启动时自动生成游客身份
- 使用 FingerprintJS 创建唯一标识
- 游客信息存储在 localStorage 中

#### 用户登录
- 点击用户头像下拉菜单中的登录选项
- 支持 Google 和 GitHub 登录
- 登录成功后自动清除游客状态

#### 用户登出
- 已登录用户可以通过下拉菜单登出
- 登出后自动恢复游客身份

## API 接口

### 认证 Store 方法

```typescript
// 初始化认证状态
await authStore.initialize()

// Google 登录
await authStore.loginWithGoogle()

// GitHub 登录  
await authStore.loginWithGitHub()

// 登出
authStore.logout()

// 重新生成游客 ID
await authStore.initializeGuestId()
```

### 认证状态

```typescript
// 当前用户（包括游客）
authStore.currentUser

// 是否已认证
authStore.isAuthenticated

// 是否为游客
authStore.isGuest

// 加载状态
authStore.isLoading
```

## 测试页面

访问 `/auth-test` 页面可以测试所有认证功能：
- 查看当前用户状态
- 测试登录/登出功能
- 查看本地存储状态

## 安全注意事项

1. **HTTPS 要求**：生产环境必须使用 HTTPS
2. **客户端 ID 保护**：虽然客户端 ID 不是秘密，但应该限制授权域名
3. **状态验证**：OAuth 流程中使用 state 参数防止 CSRF 攻击
4. **本地存储**：敏感信息不应存储在 localStorage 中

## 故障排除

### 常见问题

1. **OAuth 弹窗被阻止**
   - 确保浏览器允许弹窗
   - 检查弹窗阻止设置

2. **回调 URL 错误**
   - 确保 OAuth 应用配置的回调 URL 正确
   - 检查端口号是否匹配

3. **客户端 ID 未配置**
   - 检查 `.env.local` 文件是否存在
   - 确认环境变量名称正确

4. **FingerprintJS 错误**
   - 检查网络连接
   - 确认浏览器支持相关 API

### 调试模式

开发环境下，可以在浏览器控制台查看详细的错误信息和认证流程日志。

## 扩展功能

### 添加新的 OAuth 提供商

1. 在 `src/services/oauth.ts` 中添加新的配置和方法
2. 更新 `src/stores/auth.ts` 中的登录方法
3. 在 `src/components/NavUser.vue` 中添加新的登录按钮
4. 添加相应的回调路由

### 自定义用户信息

可以通过修改 `User` 接口来添加更多用户字段：

```typescript
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  provider?: 'google' | 'github' | 'custom'
  // 添加自定义字段
  role?: string
  preferences?: object
}
```
