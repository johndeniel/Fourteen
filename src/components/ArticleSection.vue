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
  imageLoaded.value = true
  console.warn(`Failed to load image: ${props.section.image}`)
}

const handleImageLoad = () => {
  imageLoaded.value = true
}
</script>

<template>

  <section
    :aria-labelledby="`section-header-${index}`"
    class="scroll-mt-16 py-8 sm:py-12"
  >

    <div class="mx-auto max-w-4xl p-4 sm:p-8">

      <header class="mb-8 text-left">

        <h2
          :id="`section-header-${index}`"
          class="text-2xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
        >
           {{ section.header }}
        </h2>

      </header>

      <figure
        class="relative mb-10 w-full overflow-hidden rounded-xl shadow-lg"
        :class="{
          'animate-pulse bg-gray-100 dark:bg-gray-700':
            !imageLoaded && !imageError,
          'bg-gray-200 dark:bg-gray-800': imageError && !imageLoaded,
        }"
      >
         <img
          :src="section.image"
          :alt="imageAlt"
          class="aspect-video w-full rounded-xl object-cover transition-opacity duration-500 ease-in-out"
          :class="{
            'opacity-0': !imageLoaded && !imageError,
            'opacity-100': imageLoaded,
          }"
          loading="eager"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <figcaption class="sr-only"> {{ imageAlt }} </figcaption>

        <div
          v-if="imageError"
          class="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 p-4 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        >
           <svg
            class="mb-2 h-12 w-12 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
             </svg
          > <span>Image not found or failed to load.</span>
        </div>

      </figure>

      <div
        class="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
        role="region"
        :aria-label="`Content for ${section.header}`"
      >
         <template v-if="hasContent"
          >
          <p
            v-for="(paragraph, pIndex) in renderableParagraphs"
            :key="`paragraph-${pIndex}`"
            class="mb-4 leading-relaxed sm:mb-5"
          >
             {{ paragraph }}
          </p>
           </template
        >
        <p
          v-else
          class="mx-auto max-w-prose border-t border-b border-gray-200 py-6 text-center text-base text-gray-500 italic sm:text-lg dark:border-gray-700"
        >
           No detailed content available for this section yet. Please check back
          later!
        </p>

      </div>

    </div>

  </section>

</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>

