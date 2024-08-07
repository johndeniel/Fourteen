import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GitCommitVerticalIcon } from '@/lib/icons'
import { GithubIconOutline } from '@/lib/icons'
import { RepositoryModel } from '@/lib/model/repository-model'

interface GithubContributionProps {
  repository: RepositoryModel[]
}

/**
 * A functional component to render a list of GitHub repository contributions.
 */
export function GithubContribution({
  repository,
}: GithubContributionProps): React.ReactElement {
  return (
    <main>
      <section className="mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {repository.map((repo, index) => (
            <div key={index} className="w-[280px] flex-shrink-0">
              <Card className="relative z-10 bg-card text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg sm:static sm:z-auto">
                <CardContent className="flex flex-col items-start p-4">
                  <div className="mb-3 flex items-center">
                    <GithubIconOutline className="mr-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-sm font-semibold">
                      {repo.getRepositoryName()}
                    </p>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {repo.getRepositoryDescription()}
                  </p>
                  <div className="w-full">
                    {repo.getCommitMessage().map((commit, commitIndex) => (
                      <div
                        key={commitIndex}
                        className="mt-2 flex text-xs text-muted-foreground"
                      >
                        <GitCommitVerticalIcon className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                        <span className="break-words">{commit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage src={repo.getAuthorAvatarUrl()} />
                      <AvatarFallback>{repo.getAuthorName()}</AvatarFallback>
                    </Avatar>
                    <span>Updated on {repo.getLastUpdated()}</span>
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
