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
                  class="flex items-center justify-center gap-1 border border-gray-200 bg-white px-4 py-2 shadow-sm"
                  variant="outline"
                >
                  <GitForkIcon class="h-4 w-4" aria-hidden="true" />
                  <span class="text-sm font-medium">Fork</span>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p class="text-sm">Fork this project on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>

    <CardHeader>
      <div class="flex items-start justify-between gap-3">
        <CardTitle
          class="line-clamp-2 text-xl leading-tight font-bold tracking-tight text-gray-900"
        >
          {{ gallery.title }}
        </CardTitle>
        <div
          class="flex h-5 flex-shrink-0 items-center gap-3 text-sm text-gray-600"
        >
          <div class="flex items-center gap-1">
            <StarIcon class="fill-primary h-4 w-4" aria-hidden="true" />
            <span class="font-medium text-gray-700">{{
              gallery.star || 0
            }}</span>
          </div>
          <Separator class="h-4 w-px bg-gray-300" orientation="vertical" />
          <div class="flex items-center gap-1">
            <EyeIcon class="h-4 w-4" aria-hidden="true" />
            <span class="font-medium text-gray-700">{{
              gallery.view || 0
            }}</span>
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
      class="flex flex-1 flex-col space-y-3 overflow-hidden px-5 pb-7"
    >
      <p
        class="line-clamp-3 h-16 overflow-hidden text-sm leading-relaxed text-gray-600"
      >
        {{ gallery.description }}
      </p>

      <div
        v-if="validTechIndices.length > 0"
        class="mb-5 flex items-center gap-3"
      >
        <span class="text-xs font-semibold text-gray-500">STACK:</span>
        <template v-for="techIndex in validTechIndices" :key="techIndex">
          <HoverCard :open-delay="200">
            <HoverCardTrigger as-child>
              <Avatar class="h-7 w-7 cursor-pointer border">
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
            <HoverCardContent class="w-80" side="top">
              <div class="flex space-x-4">
                <Avatar>
                  <AvatarImage :src="getTechInfo(techIndex).icon" />
                  <AvatarFallback>{{
                    getTechInfo(techIndex).tech.slice(0, 2).toUpperCase()
                  }}</AvatarFallback>
                </Avatar>
                <div class="space-y-1">
                  <h4 class="text-sm font-semibold">
                    {{ getTechInfo(techIndex).tech }}
                  </h4>
                  <p class="text-sm">
                    {{ getTechInfo(techIndex).info }}
                  </p>
                  <div
                    v-if="getTechInfo(techIndex).date"
                    class="flex items-center pt-2"
                  >
                    <CalendarDaysIcon class="mr-2 h-4 w-4 opacity-70" />
                    <span class="text-muted-foreground text-xs">{{
                      getTechInfo(techIndex).date
                    }}</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </template>
      </div>
      <div class="flex items-center gap-3">
        <Button
          as="a"
          class="flex-1"
          target="_blank"
          rel="noopener noreferrer"
          :href="gallery.live"
          :aria-label="`Live demo of ${gallery.title}`"
        >
          Live Demo
        </Button>
        <Button
          as-child
          variant="outline"
          class="flex-1"
          :aria-label="`Read more about ${gallery.title}`"
        >
          <RouterLink
            :to="{
              name: 'article',
              params: { id: gallery.title.toLowerCase() },
            }"
          >
            Full Read
          </RouterLink>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
