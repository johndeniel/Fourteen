<script setup lang="ts">
import { ref, onMounted, onErrorCaptured } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import GalleryCardSkeleton from '@/components/GalleryCardSkeleton.vue'
import GithubContribution from '@/components/GithubContribution.vue'
import GithubContributionSkeleton from '@/components/GithubContributionSkeleton.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { FetchGalleryData } from '@/server/queries/gallery-data-service'
import { FetchRepositoryData } from '@/server/queries/repository-data-service'
import type { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
// Add the proper import for your repository type
// import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

// Reactive state
const galleryData = ref<GalleryTypedef[]>([])
// Fix the type - replace 'any' with your actual RepositoryTypedef type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repositoryData = ref<any[] | null>(null)
const isGalleryLoading = ref(true)
const isRepositoryLoading = ref(true)
const galleryError = ref<string | null>(null)
const repositoryError = ref<string | null>(null)

// Load gallery data
const loadGalleryData = async () => {
  try {
    isGalleryLoading.value = true
    galleryError.value = null
    const data = await FetchGalleryData()
    galleryData.value = data
  } catch (error) {
    console.error('Failed to load gallery data:', error)
    galleryError.value =
      error instanceof Error ? error.message : 'Failed to load gallery data'
  } finally {
    isGalleryLoading.value = false
  }
}

// Load repository data
const loadRepositoryData = async () => {
  try {
    isRepositoryLoading.value = true
    repositoryError.value = null
    const data = await FetchRepositoryData()
    repositoryData.value = data
  } catch (error) {
    console.error('Failed to load repository data:', error)
    repositoryError.value =
      error instanceof Error ? error.message : 'Failed to load repository data'
  } finally {
    isRepositoryLoading.value = false
  }
}

// Retry functions
const retryGalleryLoad = () => {
  loadGalleryData()
}

const retryRepositoryLoad = () => {
  loadRepositoryData()
}

// Error handling
onErrorCaptured(error => {
  console.error('Component error captured:', error)
  return false
})

// Load data on component mount
onMounted(() => {
  loadGalleryData()
  loadRepositoryData()
})
</script>

<template>
  <main
    class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative h-full w-full items-center justify-center bg-white sm:container dark:bg-black"
  >
    <HeroSection />

    <!-- Gallery Section -->
    <section class="mb-4 p-4 md:p-8">
      <h1 class="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
        Project Gallery - Cutting Edge Innovation
      </h1>
      <p class="text-muted-foreground relative z-10">
        Implementing various technologies
      </p>
    </section>

    <!-- Gallery Content -->
    <div class="relative z-10 px-4">
      <!-- Loading State -->
      <div v-if="isGalleryLoading">
        <GalleryCardSkeleton :count="6" />
      </div>

      <!-- Error State -->
      <div
        v-else-if="galleryError"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <div class="rounded-lg bg-red-50 p-6 dark:bg-red-950/20">
          <h3 class="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">
            Failed to Load Gallery
          </h3>
          <p class="mb-4 text-sm text-red-600 dark:text-red-300">
            {{ galleryError }}
          </p>
          <button
            @click="retryGalleryLoad"
            class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Success State -->
      <div
        v-else-if="galleryData.length > 0"
        class="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <GalleryCard
          v-for="(item, index) in galleryData"
          :key="item.id"
          :gallery="item"
          :index="index"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
          <h3
            class="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            No Projects Found
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Check back later for new projects!
          </p>
        </div>
      </div>
    </div>

    <!-- GitHub Activity Section -->
    <section class="mt-10 p-4 sm:mt-12 md:mt-16 md:p-8 lg:mt-20 xl:mt-24">
      <header class="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h1
          class="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl"
        >
          Latest Activity - Open Source Contribution
        </h1>
        <p class="text-muted-foreground relative z-10">
          Stay informed about my progress
        </p>
      </header>
      <div class="mb-4 flex items-center">
        <h2 class="relative z-10 text-lg font-semibold sm:text-xl md:text-2xl">
          Recent GitHub Commits
        </h2>
      </div>

      <!-- Repository Loading State -->
      <div v-if="isRepositoryLoading">
        <GithubContributionSkeleton />
      </div>

      <!-- Repository Error State -->
      <div
        v-else-if="repositoryError"
        class="flex flex-col items-center justify-center py-8 text-center"
      >
        <div class="rounded-lg bg-red-50 p-6 dark:bg-red-950/20">
          <h3 class="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">
            Failed to Load Repository Data
          </h3>
          <p class="mb-4 text-sm text-red-600 dark:text-red-300">
            {{ repositoryError }}
          </p>
          <button
            @click="retryRepositoryLoad"
            class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Repository Success State -->
      <div v-else-if="repositoryData && repositoryData.length > 0">
        <GithubContribution :repository="repositoryData" />
      </div>

      <!-- Repository Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-8 text-center"
      >
        <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
          <h3
            class="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            No Repository Data Available
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Repository information will appear here when available.
          </p>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>
