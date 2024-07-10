export const GetRecentRepos = async (): Promise<string[]> => {
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
    const repoNames = allRepos.map((repo) => repo.name)

    return repoNames
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`)
    }
    throw new Error('An unknown error occurred while fetching repositories')
  }
}
