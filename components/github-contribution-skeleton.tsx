import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { GitCommitVerticalIcon } from '@/lib/icons'
import { GithubIconOutline } from '@/lib/icons'
import { Skeleton } from '@/components/ui/skeleton'

const CARD_COUNT = 5
const COMMIT_COUNT = 3

/**
 * GithubContributionSkeletonComponent renders a set of skeleton cards
 * representing GitHub contributions, suitable for use as placeholders
 * while loading actual content.
 */
export function GithubContributionSkeleton(): React.ReactElement {
  return (
    <div className="p-4 md:p-8">
      <main>
        <section className="mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[...Array(CARD_COUNT)].map((_, index) => (
              <div key={index} className="w-[280px] flex-shrink-0">
                <Card className="relative z-10 bg-card text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg sm:static sm:z-auto">
                  <CardContent className="flex flex-col items-start p-4">
                    <div className="mb-3 flex w-full items-center">
                      <GithubIconOutline className="mr-2 h-5 w-5 text-muted-foreground" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="mb-3 h-4 w-full" />
                    <Skeleton className="mb-3 h-4 w-5/6" />
                    <div className="w-full">
                      {[...Array(COMMIT_COUNT)].map((_, commitIndex) => (
                        <div
                          key={commitIndex}
                          className="mt-2 flex text-xs text-muted-foreground"
                        >
                          <GitCommitVerticalIcon className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                          <Skeleton className="h-3 w-5/6" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <Avatar className="mr-2 h-6 w-6">
                        <Skeleton className="h-full w-full rounded-full" />
                      </Avatar>
                      <div className="flex items-center">
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
