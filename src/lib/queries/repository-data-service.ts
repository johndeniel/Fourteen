import type { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

interface RepositoryCache {
  data: RepositoryTypedef[] | null
  fetchPromise: Promise<RepositoryTypedef[]> | null
  lastError: Error | null
}

const repositoryCache: RepositoryCache = {
  data: null,
  fetchPromise: null,
  lastError: null,
}

const GITHUB_API_BASE_URL = 'https://api.github.com'
const REPOS_PER_PAGE = 100

export async function FetchRepositoryData(): Promise<RepositoryTypedef[]> {
  if (repositoryCache.data) return repositoryCache.data
  if (repositoryCache.fetchPromise) return repositoryCache.fetchPromise

  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchAllPages(url: string): Promise<any[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any[] = []
    let nextUrl: string | null = url
    while (nextUrl) {
      const response = await fetch(nextUrl, { headers })
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)
      data = data.concat(await response.json())
      const linkHeader = response.headers.get('Link')
      nextUrl = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || null
    }
    return data
  }

  repositoryCache.fetchPromise = (async () => {
    try {
      const repos = await fetchAllPages(
        `${GITHUB_API_BASE_URL}/user/repos?affiliation=owner,collaborator&per_page=${REPOS_PER_PAGE}`
      )
      const uniqueRepos = Array.from(
        new Map(repos.map(repo => [repo.id, repo])).values()
      )

      const repoDetails: RepositoryTypedef[] = await Promise.all(
        uniqueRepos.map(async repo => {
          const commitsRes = await fetch(
            `${GITHUB_API_BASE_URL}/repos/${repo.owner.login}/${repo.name}/commits`,
            { headers }
          )
          const commits = await commitsRes.json()
          const latestCommit = commits[0]

          return {
            repository_name: repo.name,
            repository_description: repo.description,
            commit_message: commits
              .slice(0, 2)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((c: any) => c.commit.message),
            author_name: repo.owner.login,
            author_avatar_url: repo.owner.avatar_url,
            last_updated: new Date(
              latestCommit.commit.author.date
            ).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
          }
        })
      )

      repositoryCache.data = repoDetails.sort(
        (a, b) =>
          new Date(b.last_updated).getTime() -
          new Date(a.last_updated).getTime()
      )
      return repositoryCache.data
    } catch (error) {
      console.error('Error fetching repository data:', error)
      repositoryCache.lastError =
        error instanceof Error ? error : new Error('An unknown error occurred')
      repositoryCache.data = []
      throw repositoryCache.lastError
    } finally {
      repositoryCache.fetchPromise = null
    }
  })()

  return repositoryCache.fetchPromise
}
