<template>
  <div class="animate-pulse">
    <div
      v-for="section in sectionCount"
      :key="`skeleton-${section}`"
      class="mb-8 p-6 sm:p-8"
    >
      <!-- Header skeleton -->
      <div class="mb-4">
        <div class="mb-2 h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
      </div>

      <!-- Image skeleton -->
      <div class="mb-6 sm:mb-8">
        <div
          class="h-48 w-full rounded-lg bg-gray-300 sm:h-64 dark:bg-gray-600"
        ></div>
      </div>

      <!-- Content skeleton -->
      <div class="space-y-3 sm:space-y-4">
        <div
          v-for="paragraph in paragraphCount"
          :key="`paragraph-${paragraph}`"
          class="space-y-2"
        >
          <div class="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
          <div class="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div class="h-4 w-4/5 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ArticleSectionSkeletonProps {
  sectionCount?: number
  paragraphCount?: number
}

const { sectionCount = 3, paragraphCount = 4 } =
  defineProps<ArticleSectionSkeletonProps>()
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
