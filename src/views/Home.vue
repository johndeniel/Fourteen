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
import Skills from '@/components/Skills.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// Reactive state for gallery data, loading status, and error messages.
const galleryData = ref<GalleryTypedef[]>([])
const isGalleryLoading = ref(false)
const galleryError = ref('')

// Reactive state for repository data, loading status, and error messages.
const repositoryData = ref<RepositoryTypedef[]>([])
const isRepositoryLoading = ref(false)
const repositoryError = ref('')

/**
 * Asynchronously fetches gallery data from the service.
 * It sets the loading state and handles any potential errors.
 */
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

/**
 * Asynchronously fetches repository data from the service.
 * It manages the loading state and captures any errors that occur.
 */
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

// When the component is mounted, load both gallery and repository data.
onMounted(() => {
  loadGalleryData()
  loadRepositoryData()
})
</script>

<template>

  <main class="container mx-auto px-4 sm:px-6 lg:px-8">
     <HeroSection />
    <section class="py-12 sm:py-16 md:py-20">

      <header class="mb-10 text-center sm:mb-12 md:mb-16">

        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
           Project Gallery
        </h2>

        <p
          class="mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400"
        >
           A curated collection of my work, demonstrating skills in modern web
          technologies.
        </p>

      </header>

      <div class="mt-8 sm:mt-10 md:mt-12">

        <div v-if="isGalleryLoading"> <GalleryCardSkeleton :count="6" /> </div>

        <div v-else-if="galleryError" class="flex justify-center">

          <div
            class="w-full max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-md dark:border-red-900/50 dark:bg-red-950/20"
          >

            <h3
              class="mb-3 text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200"
            >
               Could Not Load Gallery
            </h3>

            <p class="mb-5 text-sm sm:text-base text-red-600 dark:text-red-300">
               {{ galleryError }}
            </p>
             <button
              @click="loadGalleryData"
              class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
               Retry </button
            >
          </div>

        </div>

        <div
          v-else-if="galleryData.length > 0"
          class="grid grid-cols-1 justify-items-center gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
           <GalleryCard
            v-for="(item, index) in galleryData"
            :key="item.id"
            :gallery="item"
            :index="index"
          />
        </div>

        <div v-else class="flex justify-center">

          <div
            class="w-full max-w-lg rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
          >

            <h3
              class="mb-3 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200"
            >
               No Projects to Display
            </h3>

            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
               Please check back later to see new and exciting projects.
            </p>

          </div>

        </div>

      </div>

    </section>

    <hr
      class="border-t border-gray-200 dark:border-gray-800 my-4 sm:my-6 md:my-8"
    />

    <section class="py-12 sm:py-16 md:py-20">

      <header class="mb-10 text-center sm:mb-12 md:mb-16">

        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
           Open Source Activity
        </h2>

        <p
          class="mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400"
        >
           A look into my recent contributions and involvement in the
          open-source community.
        </p>

      </header>

      <div class="mt-8 sm:mt-10 md:mt-12">

        <div v-if="isRepositoryLoading"> <GithubContributionSkeleton /> </div>

        <div v-else-if="repositoryError" class="flex justify-center">

          <div
            class="w-full max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-md dark:border-red-900/50 dark:bg-red-950/20"
          >

            <h3
              class="mb-3 text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200"
            >
               Could Not Load Activity
            </h3>

            <p class="mb-5 text-sm sm:text-base text-red-600 dark:text-red-300">
               {{ repositoryError }}
            </p>
             <button
              @click="loadRepositoryData"
              class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
               Retry </button
            >
          </div>

        </div>

        <div v-else-if="repositoryData.length > 0">
           <GithubContribution :repository="repositoryData" />
        </div>

        <div v-else class="flex justify-center">

          <div
            class="w-full max-w-lg rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
          >

            <h3
              class="mb-3 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200"
            >
               No Recent Activity
            </h3>

            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
               My latest GitHub activities will be displayed here.
            </p>

          </div>

        </div>

      </div>

    </section>

    <hr
      class="border-t border-gray-200 dark:border-gray-800 my-4 sm:my-6 md:my-8"
    />

    <section class="py-12 sm:py-16 md:py-20">

      <div class="mt-8 sm:mt-10 md:mt-12"> <Skills /> </div>

    </section>
     <SiteFooter />
  </main>

</template>

<style scoped>
/* Scoped styles are not necessary as Tailwind CSS utility classes are used for styling. */
</style>

