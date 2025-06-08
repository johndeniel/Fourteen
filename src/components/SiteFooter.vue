<template>
  <section
    class="flex items-center justify-between border-t border-gray-200 bg-white p-4 text-sm text-gray-600 md:p-6 lg:p-8"
  >
    <div class="flex-1">
      Follow me on
      <a
        href="https://www.instagram.com/johndeniel_"
        target="_blank"
        rel="noreferrer"
        class="font-medium text-indigo-600 hover:text-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Follow johndeniel on Instagram"
      >
        Instagram
      </a>
    </div>
    <div>
      <a
        href="https://github.com/johndeniel"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center justify-center rounded-full p-2 text-gray-500 transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Visit John Deniel's GitHub profile"
      >
        <Github class="h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Github } from 'lucide-vue-next'
</script>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
