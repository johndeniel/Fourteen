import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

export const GetRecentRepos = async (): Promise<RepositoryTypedef[]> => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  const fetchAllPages = async (url: string): Promise<any[]> => {
    let allData: any[] = []
    let nextUrl = url

    while (nextUrl) {
      const response = await fetch(nextUrl, { headers })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      allData = allData.concat(data)

      const linkHeader = response.headers.get('Link')
      nextUrl = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || ''
    }

    return allData
  }

  try {
    const userRepos = await fetchAllPages('https://api.github.com/user/repos')

    let collabRepos: any[] = []
    if (token) {
      collabRepos = await fetchAllPages(
        'https://api.github.com/user/repos?type=collaborator',
      )
    }

    const allRepos = [...userRepos, ...collabRepos]

    const repoDetails: RepositoryTypedef[] = await Promise.all(
      allRepos.map(async (repo) => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`,
          { headers },
        )
        const commits = await commitsResponse.json()

        // Get the last two commit messages and their details
        const lastTwoCommits = commits.slice(0, 2).map((commit: any) => ({
          message: commit.commit.message,
          sha: commit.sha,
        }))

        // Format date
        const latestCommit = commits[0]
        const commitDate = new Date(latestCommit.commit.author.date)
        const formattedDate = commitDate.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

        return {
          repository_name: repo.name,
          repository_description: repo.description,
          commit_message: lastTwoCommits.map(
            (commit: { message: any }) => commit.message,
          ),
          author_name: repo.owner.login,
          author_initial: repo.owner.login
            .split(' ')
            .map((n: string) => n[0])
            .join(''),
          author_avatar_url: repo.owner.avatar_url,
          last_updated: formattedDate,
        }
      }),
    )

    return repoDetails
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`)
    }
    throw new Error('An unknown error occurred while fetching repositories')
  }
}
