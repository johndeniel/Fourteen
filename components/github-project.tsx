import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GitCommitVerticalIcon } from '@/lib/icons'
import { GithubIconOutline } from '@/lib/icons'
import { ProjectTypedef } from '@/lib/typedef/project-typedef'

interface GithubContributionsProps {
  projects: ProjectTypedef[]
}

export function GithubProject({ projects }: GithubContributionsProps) {
  return (
    <div className="p-4 text-foreground sm:p-6 md:p-8 lg:p-12">
      <header className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h1 className="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
          Good morning, John Deniel Dela Peña
        </h1>
        <p className="relative z-10 text-muted-foreground">
          Welcome back to your dashboard.
        </p>
      </header>
      <main>
        <section className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="mb-3 flex items-center sm:mb-4">
            <h2 className="relative z-10 text-lg font-semibold sm:text-xl md:text-2xl">
              Recent GitHub Projects
            </h2>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-[calc(25%-12px)] min-w-[250px] flex-shrink-0"
              >
                <Card className="bg-card text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="flex flex-col items-start p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="mb-3 flex items-center">
                      <GithubIconOutline className="mr-2 h-5 w-5 text-muted-foreground" />
                      <p className="text-sm font-semibold">{project.name}</p>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground sm:mb-2">
                      {project.description}
                    </p>
                    {project.commits.map((commit, commitIndex) => (
                      <div
                        key={commitIndex}
                        className="mt-2 flex items-center text-xs text-muted-foreground"
                      >
                        <GitCommitVerticalIcon className="mr-2 h-4 w-4" />
                        <span>{commit}</span>
                      </div>
                    ))}
                    <div className="flex items-center text-xs text-muted-foreground sm:mt-4">
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={project.avatarUrl} />
                        <AvatarFallback>
                          {project.avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                      Updated {project.updatedAt}
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
