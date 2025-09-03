<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Authentication Test</h1>
    
    <div class="space-y-4">
      <div class="p-4 border rounded-lg">
        <h2 class="text-lg font-semibold mb-2">Current User Status</h2>
        <p><strong>Is Authenticated:</strong> {{ authStore.isAuthenticated }}</p>
        <p><strong>Is Guest:</strong> {{ authStore.isGuest }}</p>
        <p><strong>Loading:</strong> {{ authStore.isLoading }}</p>
        
        <div v-if="authStore.currentUser" class="mt-2">
          <h3 class="font-medium">User Info:</h3>
          <p><strong>ID:</strong> {{ authStore.currentUser.id }}</p>
          <p><strong>Name:</strong> {{ authStore.currentUser.name }}</p>
          <p><strong>Email:</strong> {{ authStore.currentUser.email }}</p>
          <p><strong>Provider:</strong> {{ authStore.currentUser.provider || 'Guest' }}</p>
        </div>
      </div>
      
      <div class="p-4 border rounded-lg">
        <h2 class="text-lg font-semibold mb-2">Actions</h2>
        <div class="space-y-2">
          <button 
            @click="authStore.loginWithGoogle()"
            :disabled="authStore.isLoading"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Login with Google
          </button>
          
          <button 
            @click="authStore.loginWithGitHub()"
            :disabled="authStore.isLoading"
            class="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
          >
            Login with GitHub
          </button>
          
          <button 
            @click="authStore.logout()"
            :disabled="authStore.isLoading || authStore.isGuest"
            class="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Logout
          </button>
          
          <button 
            @click="authStore.initializeGuestId()"
            :disabled="authStore.isLoading"
            class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Reinitialize Guest ID
          </button>
        </div>
      </div>
      
      <div class="p-4 border rounded-lg">
        <h2 class="text-lg font-semibold mb-2">Local Storage</h2>
        <div class="text-sm">
          <p><strong>Guest ID:</strong> {{ localStorage.getItem('guest_id') }}</p>
          <p><strong>User:</strong> {{ localStorage.getItem('user') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
})
</script>
