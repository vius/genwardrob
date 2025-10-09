<template>
  <div class="min-h-screen overflow-hidden">
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <main class="flex-1 flex flex-col">
        <header class="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear absolute">
          <div class="flex items-center gap-2 px-3">
            <SidebarTrigger class="-ml-1" />
          </div>
        </header>
        <router-view class="flex-1" :key="$route.fullPath" />
      </main>
    </SidebarProvider>
  </div>
  <SpeedInsights />
  <Toaster position="top-right" richColors />
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Toaster } from 'vue-sonner'
import AppSidebar from "@/components/AppSidebar.vue";
import {
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { generateFingerprint } from '@/utils/finger';
import { ref } from 'vue'
import { useAuthStore } from './stores/auth';
const authStore = useAuthStore()
authStore.initialize()
const fingerprint: any = ref('')
const init = async () => {
  fingerprint.value = generateFingerprint('stable');
}
init()

</script>
