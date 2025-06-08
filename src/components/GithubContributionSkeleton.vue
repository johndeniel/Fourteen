<template>
  <div class="p-4 md:p-8">
    <main>
      <section class="mb-6">
        <div class="flex space-x-4 overflow-x-auto pb-4">
          <div
            v-for="index in CARD_COUNT"
            :key="index"
            class="w-[280px] flex-shrink-0"
          >
            <Card
              class="bg-card text-card-foreground relative z-10 shadow-md transition-shadow duration-300 hover:shadow-lg sm:static sm:z-auto"
            >
              <CardContent class="flex flex-col items-start p-4">
                <div class="mb-3 flex w-full items-center">
                  <GitCommitVertical
                    class="text-muted-foreground mr-2 h-5 w-5"
                  />
                  <Skeleton class="h-4 w-2/3" />
                </div>
                <Skeleton class="mb-3 h-4 w-full" />
                <Skeleton class="mb-3 h-4 w-5/6" />
                <div class="w-full">
                  <div
                    v-for="commitIndex in COMMIT_COUNT"
                    :key="commitIndex"
                    class="text-muted-foreground mt-2 flex text-xs"
                  >
                    <Github class="mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <Skeleton class="h-3 w-5/6" />
                  </div>
                </div>
                <div
                  class="text-muted-foreground mt-4 flex items-center text-xs"
                >
                  <Avatar class="mr-2 h-6 w-6">
                    <Skeleton class="h-full w-full rounded-full" />
                  </Avatar>
                  <div class="flex items-center">
                    <Skeleton class="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Github, GitCommitVertical } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'

const CARD_COUNT = 5
const COMMIT_COUNT = 3

/**
 * GithubContributionSkeletonComponent renders a set of skeleton cards
 * representing GitHub contributions, suitable for use as placeholders
 * while loading actual content.
 */
</script>
