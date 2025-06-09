<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Eye, Folder, GitFork, Star } from 'lucide-vue-next'

interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 6,
})

const AVATAR_COUNT = 4
</script>

<template>

  <div
    class="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3"
  >
     <Card
      v-for="index in props.count"
      :key="`skeleton-card-${index}`"
      class="m-0 flex h-full w-full max-w-sm flex-col border border-gray-200 bg-white p-0"
      > <!-- Image Skeleton -->
      <div class="relative m-0 p-0">
         <Skeleton class="aspect-[16/10] min-h-[160px] w-full" />
        <div class="absolute top-4 right-4">
           <Button
            class="bg-white/80 transition-colors hover:bg-white"
            size="sm"
            variant="outline"
            disabled
            > <GitFork class="mr-2 h-4 w-4 opacity-50" /> <span
              class="opacity-50"
              >Fork</span
            > </Button
          >
        </div>

      </div>
       <!-- Header Skeleton --> <CardHeader class="px-5 pt-4 pb-2"
        >
        <div class="flex items-start justify-between gap-3">
           <Skeleton class="h-6 w-2/3" />
          <div
            class="flex h-5 flex-shrink-0 items-center gap-3 text-sm text-gray-500"
          >

            <div class="flex items-center gap-1">
               <Star class="fill-primary h-4 w-4 opacity-50" /> <Skeleton
                class="h-4 w-6"
              />
            </div>
             <Separator
              class="h-4 w-px bg-gray-300 opacity-50"
              orientation="vertical"
            />
            <div class="flex items-center gap-1">
               <Eye class="h-4 w-4 opacity-50" /> <Skeleton class="h-4 w-6" />
            </div>

          </div>

        </div>

        <div class="mt-1 flex items-center gap-2 text-sm text-gray-500">
           <Folder class="h-4 w-4 opacity-50" /> <Skeleton class="h-4 w-24" />
        </div>
         </CardHeader
      > <!-- Content Skeleton --> <CardContent
        class="flex flex-1 flex-col space-y-4 px-5 pb-4"
        > <!-- Description Placeholder -->
        <div class="space-y-2">
           <Skeleton class="h-4 w-full" /> <Skeleton class="h-4 w-5/6" />
          <Skeleton class="h-4 w-4/6" />
        </div>
         <!-- Avatar Icons -->
        <div class="flex flex-wrap items-center gap-2">
           <Avatar
            v-for="avatarIndex in AVATAR_COUNT"
            :key="`avatar-${index}-${avatarIndex}`"
            class="h-8 w-8 border border-gray-200"
            > <Skeleton class="h-8 w-8 rounded-full" /> </Avatar
          >
        </div>
         <!-- Footer Buttons -->
        <div class="mt-auto flex items-center gap-2">
           <Button
            class="h-9 flex-1 cursor-not-allowed rounded-md bg-white/80 opacity-50 transition-colors hover:bg-white"
            variant="outline"
            disabled
            > Live Demo </Button
          > <Button
            class="h-9 flex-1 cursor-not-allowed rounded-md bg-white/80 opacity-50 transition-colors hover:bg-white"
            variant="outline"
            disabled
            > Full Read </Button
          >
        </div>
         </CardContent
      > </Card
    >
  </div>

</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>

