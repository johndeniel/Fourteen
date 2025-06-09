<script setup lang="ts"></script>

<template>

  <div id="app" class="min-h-screen">

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <Suspense
        > <template #default> <RouterView /> </template> <template #fallback
          >
          <div class="flex min-h-screen items-center justify-center">

            <div class="w-full max-w-md text-center">

              <div class="mb-4">

                <div
                  class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"
                ></div>

              </div>

              <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">
                 Loading
              </h2>

              <p class="mt-2 text-sm text-gray-600 sm:text-base">
                 Please wait while we prepare your content...
              </p>

            </div>

          </div>
           </template
        > </Suspense
      >
    </div>

  </div>

</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>

