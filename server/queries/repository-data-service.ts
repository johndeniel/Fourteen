import { RepositoryModel } from '@/lib/model/repository-model'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

// Define the structure for the repository cache
interface RepositoryCache {
  data: RepositoryModel[] | null
  fetchPromise: Promise<RepositoryModel[]> | null
  lastError: Error | null
}

// Initialize the repository cache
const repositoryCache: RepositoryCache = {
  data: null,
  fetchPromise: null,
  lastError: null,
}

// GitHub API constants
const GITHUB_API_BASE_URL = 'https://api.github.com'
const REPOS_PER_PAGE = 100

/**
 * Fetches repository data from GitHub API
 * @returns Promise<RepositoryModel[]>
 */
export async function FetchRepositoryData(): Promise<RepositoryModel[]> {
  // Return cached data if available
  if (repositoryCache.data) return repositoryCache.data
  // Return ongoing fetch promise if exists
  if (repositoryCache.fetchPromise) return repositoryCache.fetchPromise

  // Set up GitHub API authentication
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  /**
   * Fetches all pages from a paginated API endpoint
   * @param url - The initial URL to fetch from
   * @returns Promise<any[]>
   */
  async function fetchAllPages(url: string): Promise<any[]> {
    let data: any[] = [],
      nextUrl = url
    while (nextUrl) {
      const response = await fetch(nextUrl, { headers })
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)
      data = data.concat(await response.json())
      nextUrl =
        response.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ||
        ''
    }
    return data
  }

  // Start the fetch process and store the promise in cache
  repositoryCache.fetchPromise = (async () => {
    try {
      // Fetch all repositories
      const repos = await fetchAllPages(
        `${GITHUB_API_BASE_URL}/user/repos?affiliation=owner,collaborator&per_page=${REPOS_PER_PAGE}`,
      )
      // Remove duplicate repositories
      const uniqueRepos = Array.from(
        new Map(repos.map((repo) => [repo.id, repo])).values(),
      )

      // Fetch commit details for each repository
      const repoDetails = await Promise.all(
        uniqueRepos.map(async (repo) => {
          const commits = await fetch(
            `${GITHUB_API_BASE_URL}/repos/${repo.owner.login}/${repo.name}/commits`,
            { headers },
          ).then((r) => r.json())
          const latestCommit = commits[0]

          // Create RepositoryTypedef object
          const repoData: RepositoryTypedef = {
            repository_name: repo.name,
            repository_description: repo.description,
            commit_message: commits
              .slice(0, 2)
              .map((c: any) => c.commit.message),
            author_name: repo.owner.login,
            author_avatar_url: repo.owner.avatar_url,
            last_updated: new Date(
              latestCommit.commit.author.date,
            ).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
          }
          // Create and return RepositoryModel instance
          return new RepositoryModel(repoData)
        }),
      )

      // Sort repositories by last update time (most recent first)
      repositoryCache.data = repoDetails.sort(
        (a, b) =>
          new Date(b.getLastUpdated()).getTime() -
          new Date(a.getLastUpdated()).getTime(),
      )
      return repositoryCache.data
    } catch (error) {
      console.error('Error fetching repository data:', error)
      repositoryCache.lastError =
        error instanceof Error ? error : new Error('An unknown error occurred')
      repositoryCache.data = []
      throw repositoryCache.lastError
    } finally {
      // Clear the fetch promise from cache
      repositoryCache.fetchPromise = null
    }
  })()

  return repositoryCache.fetchPromise
}
