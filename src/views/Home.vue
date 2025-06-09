<script setup lang="ts">
import { ref, onMounted, onErrorCaptured } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import GalleryCardSkeleton from '@/components/GalleryCardSkeleton.vue'
import GithubContribution from '@/components/GithubContribution.vue'
import GithubContributionSkeleton from '@/components/GithubContributionSkeleton.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { FetchGalleryData } from '@/lib/queries/gallery-data-service'
import { FetchRepositoryData } from '@/lib/queries/repository-data-service'
import type { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
// Import for the repository type is now active
import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

// --- Reactive State ---
const galleryData = ref<GalleryTypedef[]>([])
// FIX: The 'any' type has been replaced with the specific RepositoryTypedef
const repositoryData = ref<RepositoryTypedef[] | null>(null)
const isGalleryLoading = ref(true)
const isRepositoryLoading = ref(true)
const galleryError = ref<string | null>(null)
const repositoryError = ref<string | null>(null)

// --- Data Fetching ---

/**
 * Loads gallery data from the server, handling loading and error states.
 */
const loadGalleryData = async () => {
  try {
    isGalleryLoading.value = true
    galleryError.value = null
    const data = await FetchGalleryData()
    galleryData.value = data
  } catch (error) {
    console.error('Failed to load gallery data:', error)
    galleryError.value =
      error instanceof Error ? error.message : 'An unknown error occurred'
  } finally {
    isGalleryLoading.value = false
  }
}

/**
 * Loads repository data from the server, handling loading and error states.
 */
const loadRepositoryData = async () => {
  try {
    isRepositoryLoading.value = true
    repositoryError.value = null
    const data = await FetchRepositoryData()
    repositoryData.value = data
  } catch (error) {
    console.error('Failed to load repository data:', error)
    repositoryError.value =
      error instanceof Error ? error.message : 'An unknown error occurred'
  } finally {
    isRepositoryLoading.value = false
  }
}

// --- Retry Logic ---
const retryGalleryLoad = () => loadGalleryData()
const retryRepositoryLoad = () => loadRepositoryData()

// --- Lifecycle Hooks ---
onErrorCaptured(error => {
  console.error('A component-level error was captured:', error)
  // Return false to prevent the error from propagating further
  return false
})

onMounted(() => {
  loadGalleryData()
  loadRepositoryData()
})
</script>

<template>
  <main class="relative h-full w-full bg-white dark:bg-black">
    <div
      class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] absolute inset-0 -z-10"
    />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />

      <section class="py-16 sm:py-20">
        <div class="text-center">
          <h1
            class="relative text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            Project Gallery
          </h1>
          <p
            class="text-muted-foreground relative mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl"
          >
            A collection of projects showcasing cutting-edge technologies.
          </p>
        </div>

        <div class="relative z-10 mt-12">
          <div v-if="isGalleryLoading">
            <GalleryCardSkeleton :count="6" />
          </div>

          <div
            v-else-if="galleryError"
            class="flex flex-col items-center justify-center text-center"
          >
            <div
              class="w-full max-w-lg rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/20"
            >
              <h3
                class="mb-2 text-xl font-semibold text-red-800 dark:text-red-200"
              >
                Failed to Load Gallery
              </h3>
              <p class="mb-6 text-red-600 dark:text-red-300">
                {{ galleryError }}
              </p>
              <button
                @click="retryGalleryLoad"
                class="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-offset-black"
              >
                Try Again
              </button>
            </div>
          </div>

          <div
            v-else-if="galleryData.length > 0"
            class="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            <GalleryCard
              v-for="(item, index) in galleryData"
              :key="item.id"
              :gallery="item"
              :index="index"
            />
          </div>

          <div
            v-else
            class="flex flex-col items-center justify-center text-center"
          >
            <div
              class="w-full max-w-lg rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <h3
                class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                No Projects Found
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                The gallery is currently empty. Check back later for new and
                exciting projects!
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr class="border-gray-200 dark:border-gray-800" />

      <section class="py-16 sm:py-20">
        <div class="text-center">
          <h1
            class="relative text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            Open Source Activity
          </h1>
          <p
            class="text-muted-foreground relative mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl"
          >
            Following my latest contributions and progress on GitHub.
          </p>
        </div>

        <div class="mt-12">
          <div v-if="isRepositoryLoading">
            <GithubContributionSkeleton />
          </div>

          <div
            v-else-if="repositoryError"
            class="flex flex-col items-center justify-center text-center"
          >
            <div
              class="w-full max-w-lg rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/20"
            >
              <h3
                class="mb-2 text-xl font-semibold text-red-800 dark:text-red-200"
              >
                Failed to Load Activity
              </h3>
              <p class="mb-6 text-red-600 dark:text-red-300">
                {{ repositoryError }}
              </p>
              <button
                @click="retryRepositoryLoad"
                class="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-offset-black"
              >
                Try Again
              </button>
            </div>
          </div>

          <div v-else-if="repositoryData && repositoryData.length > 0">
            <GithubContribution :repository="repositoryData" />
          </div>

          <div
            v-else
            class="flex flex-col items-center justify-center text-center"
          >
            <div
              class="w-full max-w-lg rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <h3
                class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                No Repository Data
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Recent GitHub activity will appear here when available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  </main>
</template>

<style scoped>
/* Scoped styles are not necessary as Tailwind CSS classes are used for styling. */
</style>
