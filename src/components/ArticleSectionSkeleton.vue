<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

interface ArticleSectionSkeletonProps {
  sectionCount?: number
  paragraphCount?: number
}

const { sectionCount = 1, paragraphCount = 1} = defineProps<ArticleSectionSkeletonProps>()
</script>

<template>
  <div>
    <div
      v-for="section in sectionCount"
      :key="`skeleton-${section}`"
      class="scroll-mt-16 py-8 sm:py-12"
    >
      <div class="mx-auto max-w-4xl p-4 sm:p-8">
        <!-- Header skeleton -->
        <header class="mb-8 text-left">
          <Skeleton class="h-8 w-3/4 sm:h-10 lg:h-12" />
        </header>

        <!-- Image skeleton -->
        <figure class="relative mb-10 w-full overflow-hidden rounded-xl shadow-lg">
          <Skeleton class="aspect-video w-full rounded-xl" />
        </figure>

        <!-- Content skeleton -->
        <div class="prose prose-base sm:prose-lg lg:prose-xl max-w-none">
          <div class="space-y-4 sm:space-y-5">
            <div
              v-for="paragraph in paragraphCount"
              :key="`paragraph-${paragraph}`"
              class="space-y-2"
            >
              <!-- First line of paragraph -->
              <Skeleton class="h-4 w-full" />
              <!-- Second line of paragraph -->
              <Skeleton class="h-4 w-11/12" />
              <!-- Third line of paragraph -->
              <Skeleton class="h-4 w-5/6" />
              <!-- Fourth line of paragraph (shorter to simulate end of paragraph) -->
              <Skeleton class="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
