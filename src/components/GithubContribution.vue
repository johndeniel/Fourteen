<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GitCommitVertical } from 'lucide-vue-next'
import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

interface GithubContributionProps {
  repository: RepositoryTypedef[]
}

defineProps<GithubContributionProps>()
</script>

<template>
  <main>
    <div
      class="flex space-x-4 overflow-x-auto"
      style="-ms-overflow-style: none; scrollbar-width: none"
      aria-label="GitHub repositories"
    >
      <div
        v-for="(repo, index) in repository"
        :key="index"
        class="w-[320px] flex-shrink-0"
      >
        <Card
          class="bg-card text-card-foreground border-border/50 hover:border-border/80 relative z-10 border shadow-sm transition-all duration-300 hover:shadow-md sm:static sm:z-auto"
        >
          <CardHeader class="pb-3">
            <div class="flex items-center space-x-2">
              <CardTitle>
                {{ repo.repository_name }}
              </CardTitle>
            </div>
            <p
              class="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed"
            >
              {{ repo.repository_description }}
            </p>
          </CardHeader>

          <CardContent class="flex flex-col pt-0">
            <div class="space-y-3">
              <div class="space-y-2">
                <div
                  v-for="(commit, commitIndex) in repo.commit_message"
                  :key="commitIndex"
                  class="text-muted-foreground/90 flex items-start text-xs"
                >
                  <GitCommitVertical
                    class="mt-0.5 mr-3 h-3.5 w-3.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span class="leading-relaxed break-words">{{ commit }}</span>
                </div>
              </div>
            </div>

            <div class="border-border/30 mt-4 border-t pt-3">
              <div class="text-muted-foreground flex items-center text-xs">
                <Avatar class="ring-border/20 mr-3 h-6 w-6 ring-1">
                  <AvatarImage
                    :src="repo.author_avatar_url"
                    :alt="`${repo.author_name}'s avatar`"
                  />
                  <AvatarFallback class="text-xs font-medium">{{
                    repo.author_name
                  }}</AvatarFallback>
                </Avatar>
                <span class="font-medium"
                  >Updated on {{ repo.last_updated }}</span
                >
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* No specific scoped styles are needed as Tailwind handles the styling. */
</style>
