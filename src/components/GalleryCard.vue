<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  CalendarDaysIcon,
  EyeIcon,
  FolderIcon,
  GitForkIcon,
  StarIcon,
} from 'lucide-vue-next'
import type { GalleryTypedef } from '@/lib/typedef/gallery-typedef'

// Define the component's props, expecting a 'gallery' object and its 'index'.
const props = defineProps<{
  gallery: GalleryTypedef // The data object for this project card.
  index: number // The index of this card in the parent list.
}>()

/**
 * A computed property to determine the image loading strategy.
 * The first image (index 0) loads 'eagerly' to improve Largest Contentful Paint (LCP).
 * All other images load 'lazily' to save bandwidth and improve initial page load.
 */
const imageLoadingStrategy = computed(() =>
  props.index === 0 ? 'eager' : 'lazy'
)

/**
 * A computed property that creates a clean list of technologies.
 * It maps over the four possible tech slots, gathers their details,
 * and then filters out any that are incomplete.
 */
const technologies = computed(() => {
  // We check for up to 4 technologies, as suggested by the prop names (e.g., 'icon1', 'icon2').
  return (
    [1, 2, 3, 4]
      .map(i => ({
        // Dynamically create a tech object for each number from 1 to 4.
        icon: props.gallery[`icon${i}` as keyof GalleryTypedef] as string,
        name: props.gallery[`itech${i}` as keyof GalleryTypedef] as string,
        info: props.gallery[`info${i}` as keyof GalleryTypedef] as string,
        date: props.gallery[`idate${i}` as keyof GalleryTypedef] as string,
      }))
      // Only keep technologies that have all the required fields.
      .filter(tech => tech.icon && tech.name && tech.info && tech.date)
  )
})

/**
 * Fallback for a broken project image.
 * Replaces the broken image source with a random placeholder to maintain UI integrity.
 * @param event The DOM error event from the <img> tag.
 */
const handleImageError = (event: Event) => {
  const imageElement = event.target as HTMLImageElement
  // Use a placeholder service for a random fallback image.
  imageElement.src = `https://picsum.photos/400/250?random=${props.index}`
}

/**
 * Fallback for a broken avatar image.
 * Hides the <img> tag so the <AvatarFallback> component becomes visible.
 * @param event The DOM error event from the <img> tag inside the Avatar.
 */
const handleAvatarError = (event: Event) => {
  const avatarImageElement = event.target as HTMLImageElement
  // Hiding the element triggers the display of the fallback.
  avatarImageElement.style.display = 'none'
}
</script>

<template>
   <Card
    class="flex w-full max-w-sm flex-col overflow-hidden border border-gray-200 bg-white p-0"
    >
    <div class="relative">

      <div class="aspect-[16/10] overflow-hidden">
         <img
          class="h-full w-full object-cover"
          :src="gallery.img"
          :alt="`Project: ${gallery.title}`"
          :loading="imageLoadingStrategy"
          decoding="async"
          @error="handleImageError"
        />
      </div>

      <div class="absolute top-3 right-3">
         <TooltipProvider
          > <Tooltip
            > <TooltipTrigger as-child
              > <a
                :href="gallery.fork"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Fork ${gallery.title}`"
                > <Button
                  class="flex items-center justify-center gap-1 border border-gray-200 bg-white px-4 py-2 shadow-sm"
                  variant="outline"
                  > <GitForkIcon class="h-4 w-4" aria-hidden="true" /> <span
                    class="text-sm font-medium"
                    >Fork</span
                  > </Button
                > </a
              > </TooltipTrigger
            > <TooltipContent
              >
              <p class="text-sm">Fork this project on GitHub</p>
               </TooltipContent
            > </Tooltip
          > </TooltipProvider
        >
      </div>

    </div>
     <CardHeader
      >
      <div class="flex items-start justify-between gap-3">
         <CardTitle
          class="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-gray-900"
          > {{ gallery.title }} </CardTitle
        >
        <div
          class="flex h-5 flex-shrink-0 items-center gap-3 text-sm text-gray-600"
        >

          <div class="flex items-center gap-1">
             <StarIcon class="fill-primary h-4 w-4" aria-hidden="true" /> <span
              class="font-medium text-gray-700"
              >{{ gallery.star || 0 }}</span
            >
          </div>
           <Separator class="h-4 w-px bg-gray-300" orientation="vertical" />
          <div class="flex items-center gap-1">
             <EyeIcon class="h-4 w-4" aria-hidden="true" /> <span
              class="font-medium text-gray-700"
              >{{ gallery.view || 0 }}</span
            >
          </div>

        </div>

      </div>

      <div class="mt-1 flex items-center gap-2 text-sm text-gray-500">
         <FolderIcon class="h-4 w-4" aria-hidden="true" /> <span
          class="font-medium"
          >{{ gallery.category || 'Uncategorized' }}</span
        >
      </div>
       </CardHeader
    > <CardContent
      class="flex flex-1 flex-col space-y-3 overflow-hidden px-5 pb-7"
      >
      <p
        class="line-clamp-3 h-16 overflow-hidden text-sm leading-relaxed text-gray-600"
      >
         {{ gallery.description }}
      </p>

      <div v-if="technologies.length > 0" class="mb-5 flex items-center gap-3">
         <span class="text-xs font-semibold text-gray-500">STACK:</span>
        <template v-for="tech in technologies" :key="tech.name"
          > <HoverCard :open-delay="200"
            > <HoverCardTrigger as-child
              > <Avatar class="h-7 w-7 cursor-pointer border"
                > <AvatarImage
                  :alt="tech.name"
                  :src="tech.icon"
                  @error="handleAvatarError"
                /> <AvatarFallback class="text-xs font-semibold"
                  > {{ tech.name.charAt(0).toUpperCase() }} </AvatarFallback
                > </Avatar
              > </HoverCardTrigger
            > <HoverCardContent class="w-80" side="top"
              >
              <div class="flex space-x-4">
                 <Avatar
                  > <AvatarImage :src="tech.icon" /> <AvatarFallback>{{
                    tech.name.slice(0, 2).toUpperCase()
                  }}</AvatarFallback
                  > </Avatar
                >
                <div class="space-y-1">

                  <h4 class="text-sm font-semibold">{{ tech.name }}</h4>

                  <p class="text-sm">{{ tech.info }}</p>

                  <div class="flex items-center pt-2">
                     <CalendarDaysIcon class="mr-2 h-4 w-4 opacity-70" /> <span
                      class="text-muted-foreground text-xs"
                      >{{ tech.date }}</span
                    >
                  </div>

                </div>

              </div>
               </HoverCardContent
            > </HoverCard
          > </template
        >
      </div>

      <div class="flex items-center gap-3 pt-4">
         <Button
          as="a"
          class="flex-1"
          target="_blank"
          rel="noopener noreferrer"
          :href="gallery.live"
          :aria-label="`Live demo of ${gallery.title}`"
          > Live Demo </Button
        > <Button
          as-child
          variant="outline"
          class="flex-1"
          :aria-label="`Read more about ${gallery.title}`"
          > <RouterLink
            :to="{
              name: 'article',
              params: { id: gallery.title.toLowerCase() },
            }"
            > Full Read </RouterLink
          > </Button
        >
      </div>
       </CardContent
    > </Card
  >
</template>

<style scoped>
/* Scoped styles are not needed as Tailwind CSS classes handle the component's styling. */
</style>

