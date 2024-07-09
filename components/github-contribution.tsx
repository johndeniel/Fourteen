import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { GitCommitVerticalIcon } from '@/lib/icons'
import { GithubIconOutline } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from '@/lib/icons'
import { ContributionTypedef } from '@/lib/typedef/contribution-typedef'

interface GithubContributionsProps {
  contributions: ContributionTypedef[]
}

export function GithubContribution({
  contributions,
}: GithubContributionsProps) {
  return (
    <section className="p-4 text-foreground sm:p-6 md:p-8 lg:p-12">
      <div className="mb-3 flex items-center sm:mb-4">
        <h2 className="relative z-10 text-lg font-semibold sm:text-xl md:text-2xl">
          Recent GitHub Contributions
        </h2>
      </div>
      <Card className="bg-card p-4 text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-6 md:p-8 lg:p-10">
        <div className="w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left font-semibold">
                    Repository
                  </TableHead>
                  <TableHead className="text-left font-semibold">
                    Commit Message
                  </TableHead>
                  <TableHead className="text-left font-semibold">
                    Commit Hash
                  </TableHead>
                  <TableHead className="text-left font-semibold">
                    Author
                  </TableHead>
                  <TableHead className="text-left font-semibold">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.map((contribution, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GithubIconOutline className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">{contribution.repository}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GitCommitVerticalIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{contribution.commitMessage}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge>{contribution.commitHash}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={contribution.authorAvatar} />
                          <AvatarFallback>
                            {contribution.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{contribution.authorName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{contribution.date}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </section>
  )
}
