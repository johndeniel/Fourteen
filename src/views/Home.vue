<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FetchGalleryData } from '@/lib/queries/gallery-data-service'
import { FetchRepositoryData } from '@/lib/queries/repository-data-service'
import type { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import HeroSection from '@/components/HeroSection.vue'
import GalleryCard from '@/components/GalleryCard.vue'
import GalleryCardSkeleton from '@/components/GalleryCardSkeleton.vue'
import GithubContribution from '@/components/GithubContribution.vue'
import GithubContributionSkeleton from '@/components/GithubContributionSkeleton.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// Reactive State
const galleryData = ref<GalleryTypedef[]>([])
const isGalleryLoading = ref(false)
const galleryError = ref('')

const repositoryData = ref<RepositoryTypedef[]>([])
const isRepositoryLoading = ref(false)
const repositoryError = ref('')

// Data Loading Functions
const loadGalleryData = async () => {
  if (isGalleryLoading.value) return

  isGalleryLoading.value = true
  galleryError.value = ''

  try {
    galleryData.value = await FetchGalleryData()
  } catch (error) {
    galleryError.value =
      error instanceof Error ? error.message : 'Failed to load gallery'
    console.error('Gallery error:', error)
  } finally {
    isGalleryLoading.value = false
  }
}

const loadRepositoryData = async () => {
  if (isRepositoryLoading.value) return

  isRepositoryLoading.value = true
  repositoryError.value = ''

  try {
    repositoryData.value = await FetchRepositoryData()
  } catch (error) {
    repositoryError.value =
      error instanceof Error ? error.message : 'Failed to load repository data'
    console.error('Repository error:', error)
  } finally {
    isRepositoryLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadGalleryData()
  loadRepositoryData()
})
</script>

<template>

  <main class="container mx-auto px-4 sm:px-6 lg:px-8">
     <!-- Hero Section --> <HeroSection /> <!-- Project Gallery Section -->
    <section class="py-16 sm:py-20">

      <header class="mb-12 text-center">

        <h2
          class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
           Project Gallery
        </h2>

        <p
          class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl"
        >
           A collection of projects showcasing cutting-edge technologies.
        </p>

      </header>
       <!-- Gallery States -->
      <div class="mt-12">
         <!-- Loading State -->
        <div v-if="isGalleryLoading"> <GalleryCardSkeleton :count="6" /> </div>
         <!-- Error State -->
        <div v-else-if="galleryError" class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20"
          >

            <h3
              class="mb-2 text-xl font-semibold text-red-800 dark:text-red-200"
            >
               Unable to Load Gallery
            </h3>

            <p class="mb-6 text-red-600 dark:text-red-300">
               {{ galleryError }}
            </p>
             <button
              @click="loadGalleryData"
              class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
            >
               Try Again </button
            >
          </div>

        </div>
         <!-- Content State -->
        <div v-else-if="galleryData.length > 0">

          <div
            class="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
             <GalleryCard
              v-for="(item, index) in galleryData"
              :key="item.id"
              :gallery="item"
              :index="index"
            />
          </div>

        </div>
         <!-- Empty State -->
        <div v-else class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
          >

            <h3
              class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200"
            >
               No Projects Available
            </h3>

            <p class="text-gray-600 dark:text-gray-400">
               Check back later for new and exciting projects!
            </p>

          </div>

        </div>

      </div>

    </section>
     <!-- Section Divider -->
    <hr class="border-gray-200 dark:border-gray-800" />
     <!-- GitHub Activity Section -->
    <section class="py-16 sm:py-20">

      <header class="mb-12 text-center">

        <h2
          class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
           Open Source Activity
        </h2>

        <p
          class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl"
        >
           Following my latest contributions and progress on GitHub.
        </p>

      </header>
       <!-- Repository States -->
      <div class="mt-12">
         <!-- Loading State -->
        <div v-if="isRepositoryLoading"> <GithubContributionSkeleton /> </div>
         <!-- Error State -->
        <div v-else-if="repositoryError" class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20"
          >

            <h3
              class="mb-2 text-xl font-semibold text-red-800 dark:text-red-200"
            >
               Unable to Load Activity
            </h3>

            <p class="mb-6 text-red-600 dark:text-red-300">
               {{ repositoryError }}
            </p>
             <button
              @click="loadRepositoryData"
              class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
            >
               Try Again </button
            >
          </div>

        </div>
         <!-- Content State -->
        <div v-else-if="repositoryData.length > 0">
           <GithubContribution :repository="repositoryData" />
        </div>
         <!-- Empty State -->
        <div v-else class="flex justify-center">

          <div
            class="w-full max-w-md rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
          >

            <h3
              class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200"
            >
               No Activity Data
            </h3>

            <p class="text-gray-600 dark:text-gray-400">
               Recent GitHub activity will appear here when available.
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

