<script setup lang="ts">
import {
  ChevronsUpDown,
  LogOut,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth'

const { isMobile } = useSidebar()
const authStore = useAuthStore()

// 处理Google登录
const handleGoogleLogin = async () => {
  try {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login/start?provider=google&redirect=${location.href}`
    toast.success('Successfully logged in with Google!')
  } catch (error) {
    toast.error('Failed to login with Google')
    console.error('Google login error:', error)
  }
}

// 处理登出
const handleLogout = () => {
  authStore.logout()
  toast.success('Successfully logged out')
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarFallback class="rounded-lg">
                {{ authStore.isGuest ? 'G' : (authStore.currentUser?.name?.charAt(0) || 'U') }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ authStore.currentUser?.name }}</span>
              <span class="truncate text-xs">{{ authStore.currentUser?.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'top'" align="end" :side-offset="4">
          <!-- 游客状态：显示登录选项 -->
          <template v-if="authStore.isGuest">
            <DropdownMenuGroup>
              <DropdownMenuItem @click="handleGoogleLogin" :disabled="authStore.isLoading">
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Login with Google
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </template>

          <!-- 已登录状态：显示用户菜单 -->
          <template v-else>
            <DropdownMenuItem @click="handleLogout">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
