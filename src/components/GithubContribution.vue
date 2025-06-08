<template>
  <main>
    <section class="mb-6">
      <div
        class="flex space-x-4 overflow-x-auto pb-4"
        aria-label="GitHub repositories"
      >
        <div
          v-for="(repo, index) in repository"
          :key="index"
          class="w-[280px] flex-shrink-0"
        >
          <Card
            class="bg-card text-card-foreground relative z-10 shadow-md transition-shadow duration-300 hover:shadow-lg sm:static sm:z-auto"
          >
            <CardContent class="flex flex-col items-start p-4">
              <div class="mb-3 flex items-center">
                <Github
                  class="text-muted-foreground mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                <p class="text-sm font-semibold">
                  {{ repo.repository_name }}
                </p>
              </div>
              <p class="text-muted-foreground mb-3 text-sm">
                {{ repo.repository_description }}
              </p>
              <div class="w-full">
                <div
                  v-for="(commit, commitIndex) in repo.commit_message"
                  :key="commitIndex"
                  class="text-muted-foreground mt-2 flex text-xs"
                >
                  <GitCommitVertical
                    class="mt-1 mr-2 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span class="break-words">{{ commit }}</span>
                </div>
              </div>
              <div class="text-muted-foreground mt-4 flex items-center text-xs">
                <Avatar class="mr-2 h-6 w-6">
                  <AvatarImage
                    :src="repo.author_avatar_url"
                    :alt="`${repo.author_name}'s avatar`"
                  />
                  <AvatarFallback>{{ repo.author_name }}</AvatarFallback>
                </Avatar>
                <span>Updated on {{ repo.last_updated }}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Github, GitCommitVertical } from 'lucide-vue-next'
import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

interface GithubContributionProps {
  repository: RepositoryTypedef[]
}

defineProps<GithubContributionProps>()
</script>
