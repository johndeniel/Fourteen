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

interface TechInfo {
  icon: string
  tech: string
  info: string
  date: string
}

const props = defineProps<{
  gallery: GalleryTypedef
  index: number
}>()

const getTechInfo = (index: number): TechInfo => {
  return {
    icon:
      (props.gallery[`icon${index}` as keyof GalleryTypedef] as string) || '',
    tech:
      (props.gallery[`itech${index}` as keyof GalleryTypedef] as string) || '',
    info:
      (props.gallery[`info${index}` as keyof GalleryTypedef] as string) || '',
    date:
      (props.gallery[`idate${index}` as keyof GalleryTypedef] as string) || '',
  }
}

const isFirstCard = computed(() => props.index === 0)

const validTechIndices = computed(() => {
  return [1, 2, 3, 4].filter(index => {
    const techInfo = getTechInfo(index)
    return techInfo.tech && techInfo.icon
  })
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-project.jpg'
}

const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
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
          :loading="isFirstCard ? 'eager' : 'lazy'"
          decoding="async"
          @error="handleImageError"
        />
      </div>
      <div class="absolute top-3 right-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                :href="gallery.fork"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Fork ${gallery.title}`"
              >
                <Button
                  class="border border-gray-200 bg-white shadow-sm"
                  size="sm"
                  variant="outline"
                >
                  <GitForkIcon class="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  <span class="text-sm font-medium">Fork</span>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fork this project on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>

    <CardHeader class="px-5 pt-4 pb-2">
      <div class="flex items-start justify-between gap-3">
        <CardTitle
          class="line-clamp-2 text-lg leading-snug font-semibold text-gray-900"
        >
          {{ gallery.title }}
        </CardTitle>
        <div
          class="flex flex-shrink-0 items-center gap-3 text-sm text-gray-500"
        >
          <div class="flex items-center gap-1">
            <StarIcon class="fill-primary h-4 w-4" aria-hidden="true" />
            <span class="font-medium">{{ gallery.star || 0 }}</span>
          </div>
          <Separator class="h-4" orientation="vertical" />
          <div class="flex items-center gap-1">
            <EyeIcon class="h-4 w-4" aria-hidden="true" />
            <span class="font-medium">{{ gallery.view || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <FolderIcon class="h-4 w-4" aria-hidden="true" />
        <span class="font-medium">{{
          gallery.category || 'Uncategorized'
        }}</span>
      </div>
    </CardHeader>

    <CardContent
      class="flex flex-1 flex-col space-y-3 overflow-hidden px-5 pb-4"
    >
      <p class="line-clamp-3 h-16 overflow-hidden text-sm text-gray-600">
        {{ gallery.description }}
      </p>

      <div
        v-if="validTechIndices.length > 0"
        class="flex flex-wrap items-center gap-2"
      >
        <template v-for="techIndex in validTechIndices" :key="techIndex">
          <HoverCard>
            <HoverCardTrigger as-child>
              <Avatar class="h-8 w-8 cursor-default border border-gray-200">
                <AvatarImage
                  :alt="getTechInfo(techIndex).tech"
                  :src="getTechInfo(techIndex).icon"
                  @error="handleAvatarError"
                />
                <AvatarFallback class="text-xs font-semibold">
                  {{ getTechInfo(techIndex).tech.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent
              class="w-72 border border-gray-200 bg-white p-4 shadow-md"
            >
              <div class="flex space-x-3">
                <Avatar class="h-10 w-10">
                  <AvatarImage
                    :src="getTechInfo(techIndex).icon"
                    :alt="getTechInfo(techIndex).tech"
                    @error="handleAvatarError"
                  />
                  <AvatarFallback class="text-sm font-semibold">
                    {{ getTechInfo(techIndex).tech.charAt(0).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex-1 space-y-1">
                  <h4 class="text-sm font-semibold text-gray-900">
                    {{ getTechInfo(techIndex).tech }}
                  </h4>
                  <p class="line-clamp-2 text-sm text-gray-600">
                    {{ getTechInfo(techIndex).info }}
                  </p>
                  <div
                    v-if="getTechInfo(techIndex).date"
                    class="flex items-center pt-1 text-xs text-gray-500"
                  >
                    <CalendarDaysIcon class="mr-2 h-4 w-4 opacity-70" />
                    <span>{{ getTechInfo(techIndex).date }}</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </template>
      </div>

      <div class="mt-auto flex items-center gap-2">
        <a
          class="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          target="_blank"
          rel="noopener noreferrer"
          :href="gallery.live"
          :aria-label="`Live demo of ${gallery.title}`"
        >
          Live Demo
        </a>
        <RouterLink
          class="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          :to="{ name: 'article', params: { id: gallery.title.toLowerCase() } }"
          :aria-label="`Read more about ${gallery.title}`"
        >
          Full Read
        </RouterLink>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
