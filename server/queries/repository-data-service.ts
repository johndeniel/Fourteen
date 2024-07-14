import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

const GITHUB_API_BASE_URL = 'https://api.github.com'
const REPOS_PER_PAGE = 100 // GitHub's maximum per page

/**
 * Fetches all repositories for the authenticated user.
 * @returns A promise that resolves to an array of RepositoryTypedef objects.
 */
export async function fetchRepositoryData(): Promise<RepositoryTypedef[]> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  /**
   * Fetches all pages of data from a paginated API endpoint.
   * @param url - The initial URL to fetch from.
   * @returns A promise that resolves to an array of all fetched items.
   */
  async function fetchAllPages(url: string): Promise<any[]> {
    let accumulatedData: any[] = []
    let nextPageUrl = url

    while (nextPageUrl) {
      const response = await fetch(nextPageUrl, { headers })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const pageData = await response.json()
      accumulatedData = accumulatedData.concat(pageData)

      const linkHeader = response.headers.get('Link')
      nextPageUrl = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || ''
    }

    return accumulatedData
  }

  try {
    const allRepositories = await fetchAllPages(
      `${GITHUB_API_BASE_URL}/user/repos?affiliation=owner,collaborator&per_page=${REPOS_PER_PAGE}`,
    )

    const uniqueRepositories = new Map(
      allRepositories.map((repo) => [repo.id, repo]),
    )

    const repositoryDetails: (RepositoryTypedef & {
      lastUpdatedTimestamp: number
    })[] = await Promise.all(
      Array.from(uniqueRepositories.values()).map(async (repo) => {
        const commitsResponse = await fetch(
          `${GITHUB_API_BASE_URL}/repos/${repo.owner.login}/${repo.name}/commits`,
          { headers },
        )
        const commits = await commitsResponse.json()

        const lastTwoCommits = commits.slice(0, 2).map((commit: any) => ({
          message: commit.commit.message,
          sha: commit.sha,
        }))

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
          author_avatar_url: repo.owner.avatar_url,
          last_updated: formattedDate,
          lastUpdatedTimestamp: commitDate.getTime(),
        }
      }),
    )

    // Sort repositories by last update time (most recent first)
    const sortedRepositoryDetails = repositoryDetails.sort(
      (a, b) => b.lastUpdatedTimestamp - a.lastUpdatedTimestamp,
    )

    // Remove the temporary lastUpdatedTimestamp field
    return sortedRepositoryDetails.map(
      ({ lastUpdatedTimestamp, ...repo }) => repo,
    )
  } catch (error) {
    console.error('Error fetching repository data:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`)
    }
    throw new Error('An unknown error occurred while fetching repositories')
  }
}
