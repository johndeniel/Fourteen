<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ArticleTypedef } from '@/lib/typedef/article-typedef'

interface ArticleSectionProps {
  section: ArticleTypedef
  index: number
  totalSections: number
}

const props = defineProps<ArticleSectionProps>()

const imageError = ref(false)
const imageLoaded = ref(false)

const imageAlt = computed(() => `Illustration for ${props.section.header}`)

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const renderableParagraphs = computed(() => {
  const paragraphs = props.section.paragraphs

  if (Array.isArray(paragraphs)) {
    return paragraphs.filter(p => p && typeof p === 'string' && p.trim())
  }

  if (isObject(paragraphs)) {
    return Object.values(paragraphs)
      .map(String)
      .filter(p => p && p.trim())
  }

  if (typeof paragraphs === 'string' && paragraphs) {
    return [paragraphs]
  }

  return []
})

const hasContent = computed(() => renderableParagraphs.value.length > 0)

const handleImageError = () => {
  imageError.value = true
  console.warn(`Failed to load image: ${props.section.image}`)
}

const handleImageLoad = () => {
  imageLoaded.value = true
}
</script>

<template>
  <section :aria-labelledby="`section-header-${index}`" class="scroll-mt-16">
    <div class="p-6 sm:p-8">
      <header>
        <h2
          :id="`section-header-${index}`"
          class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white"
        >
          {{ section.header }}
        </h2>
      </header>

      <figure class="mb-6 sm:mb-8">
        <img
          :src="section.image"
          :alt="imageAlt"
          class="h-auto w-full rounded-lg object-cover shadow-sm transition-opacity duration-300"
          loading="eager"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <figcaption class="sr-only">
          {{ imageAlt }}
        </figcaption>
      </figure>

      <div
        class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
        role="region"
        :aria-label="`Content for ${section.header}`"
      >
        <template v-if="hasContent">
          <p
            v-for="(paragraph, pIndex) in renderableParagraphs"
            :key="`paragraph-${pIndex}`"
            class="mb-3 sm:mb-4"
          >
            {{ paragraph }}
          </p>
        </template>
        <p v-else class="text-gray-500 italic">
          No content available for this section.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any component-specific styles if needed */
</style>
