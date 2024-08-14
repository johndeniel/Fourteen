import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GitCommitVerticalIcon, GithubIconOutline } from '@/lib/icons'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

interface GithubContributionProps {
  repository: RepositoryTypedef[]
}

export function GithubContribution({
  repository,
}: GithubContributionProps): React.ReactElement {
  return (
    <main>
      <section className="mb-6">
        <div
          className="flex space-x-4 overflow-x-auto pb-4"
          aria-label="GitHub repositories"
        >
          {repository.map((repo, index) => (
            <div key={index} className="w-[280px] flex-shrink-0">
              <Card className="relative z-10 bg-card text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg sm:static sm:z-auto">
                <CardContent className="flex flex-col items-start p-4">
                  <div className="mb-3 flex items-center">
                    <GithubIconOutline
                      className="mr-2 h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold">
                      {repo.repository_name}
                    </p>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {repo.repository_description}
                  </p>
                  <div className="w-full">
                    {repo.commit_message.map((commit, commitIndex) => (
                      <div
                        key={commitIndex}
                        className="mt-2 flex text-xs text-muted-foreground"
                      >
                        <GitCommitVerticalIcon
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="break-words">{commit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage
                        src={repo.author_avatar_url}
                        alt={`${repo.author_name}'s avatar`}
                      />
                      <AvatarFallback>{repo.author_name}</AvatarFallback>
                    </Avatar>
                    <span>Updated on {repo.last_updated}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
