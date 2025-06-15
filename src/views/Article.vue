<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FetchArticleData } from '@/lib/queries/article-data-service'
import type { ArticleTypedef } from '@/lib/typedef/article-typedef'
import ArticleSection from '@/components/ArticleSection.vue'
import ArticleSectionSkeleton from '@/components/ArticleSectionSkeleton.vue'
import SiteFooter from '@/components/SiteFooter.vue'

interface Props {
  id?: string
}

const props = defineProps<Props>()
const route = useRoute()

// Reactive State
const sections = ref<ArticleTypedef[]>([])
const isLoading = ref(false)
const error = ref('')

// Data Loading Functions
const loadArticleData = async () => {
  if (isLoading.value) return

  isLoading.value = true
  error.value = ''

  try {
    const articleId = props.id || (route.params.id as string)

    if (!articleId) {
      error.value = 'Article ID is required'
      return
    }

    const data = await FetchArticleData(articleId)
    sections.value = data || []
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Failed to load article data'
    console.error('Article error:', err)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadArticleData()
})
</script>

<template>

  <main class="container mx-auto px-4 sm:px-6 lg:px-8">
     <!-- Article Content Section -->
    <section class="py-16 sm:py-20">

      <div class="mt-12">
         <!-- Loading State -->
        <div v-if="isLoading"> <ArticleSectionSkeleton /> </div>
         <!-- Error State -->
        <div v-else-if="error" class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20"
          >

            <h3
              class="mb-2 text-xl font-semibold text-red-800 dark:text-red-200"
            >
               Unable to Load Article
            </h3>

            <p class="mb-6 text-red-600 dark:text-red-300"> {{ error }} </p>
             <button
              @click="loadArticleData"
              class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
            >
               Try Again </button
            >
          </div>

        </div>
         <!-- Content State -->
        <div v-else-if="sections.length > 0">

          <article>
             <ArticleSection
              v-for="(section, index) in sections"
              :key="`section-${index}`"
              :section="section"
              :index="index"
              :total-sections="sections.length"
            />
          </article>

        </div>
         <!-- Empty State -->
        <div v-else class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
          >

            <h3
              class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200"
            >
               No Article Content
            </h3>

            <p class="text-gray-600 dark:text-gray-400">
               The requested article could not be found or has no content
              available.
            </p>

          </div>

        </div>

      </div>

    </section>
     <!-- Footer --> <SiteFooter />
  </main>

</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>

