<template>
  <div>
    <router-view />
  </div>
  <SpeedInsights />
  <Toaster position="top-right" richColors />
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Toaster } from 'vue-sonner'
</script>
