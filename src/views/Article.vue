<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ArticleSection from '@/components/ArticleSection.vue'
import ArticleSectionSkeleton from '@/components/ArticleSectionSkeleton.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { FetchArticleData } from '@/server/queries/article-data-service'
import type { ArticleTypedef } from '@/lib/typedef/article-typedef'

interface Props {
  id?: string
}

const props = defineProps<Props>()
const route = useRoute()

const sections = ref<ArticleTypedef[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadArticleData = async () => {
  try {
    isLoading.value = true
    error.value = null
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
    console.error('Error loading article data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadArticleData()
})
</script>

<template>
  <main role="main">
    <div class="mx-auto px-4 pt-8 sm:px-6 sm:pt-12">
      <!-- Loading skeleton -->
      <ArticleSectionSkeleton v-if="isLoading" />

      <!-- Error state -->
      <div v-else-if="error" class="py-8 text-center">
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Content -->
      <template v-else-if="sections.length > 0">
        <article>
          <ArticleSection
            v-for="(section, index) in sections"
            :key="`section-${index}`"
            :section="section"
            :index="index"
            :total-sections="sections.length"
          />
        </article>
        <SiteFooter />
      </template>

      <!-- No content state -->
      <div v-else class="py-8 text-center">
        <p class="text-gray-500 dark:text-gray-400">
          No article content found.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
