<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-opacity-80 backdrop-blur-sm"
    >
      <div class="relative flex flex-col items-center gap-6">
        <!-- Spinner -->
        <div
          class="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"
        ></div>

        <!-- Wave text animation -->
        <div class="flex overflow-hidden">
          <span
            v-for="(letter, index) in text.split('')"
            :key="index"
            class="inline-block px-0.5 text-xl font-medium text-primary"
            :style="{
              animation: 'wave 1.5s infinite',
              animationDelay: `${index * 0.05}s`,
            }"
          >
            {{ letter }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: 'Generating Results',
  },
})
</script>

<style scoped>
@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
