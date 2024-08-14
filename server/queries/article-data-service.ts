import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticleTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

/**
 * Represents the structure of the article cache.
 */
interface ArticleCache {
  data: ArticleTypedef[] | null
  fetchPromise: Promise<ArticleTypedef[] | null> | null
  lastError: Error | null
  cacheTime: number
}

/**
 * Cache to store fetched articles with a 5-minute expiration time.
 */
const articlesCache: Record<string, ArticleCache> = {}

const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Firebase database path for articles.
 */
const ARTICLE_DB_PATH = 'article'

/**
 * Fetches article data from Firebase and caches the result.
 * @param articleId - The ID of the article to fetch.
 * @returns A promise that resolves to an array of ArticleTypedef or null if not found.
 */
export async function FetchArticleData(
  articleId: string,
): Promise<ArticleTypedef[] | null> {
  const currentTime = Date.now()

  if (
    articlesCache[articleId] &&
    articlesCache[articleId].data &&
    currentTime - articlesCache[articleId].cacheTime < CACHE_EXPIRATION
  ) {
    return articlesCache[articleId].data
  }

  if (!articlesCache[articleId]) {
    articlesCache[articleId] = {
      data: null,
      fetchPromise: null,
      lastError: null,
      cacheTime: 0,
    }
  }

  const articleCacheEntry = articlesCache[articleId]

  if (articleCacheEntry.fetchPromise) {
    return articleCacheEntry.fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, ARTICLE_DB_PATH)

  articleCacheEntry.fetchPromise = get(child(articleDatabaseRef, articleId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ArticleTypedef>
        const articles = Object.values(data)
        articleCacheEntry.data = articles
        articleCacheEntry.cacheTime = currentTime
        return articles
      } else {
        articleCacheEntry.data = null
        return null
      }
    })
    .catch((error: Error) => {
      console.error('Error fetching article data:', error)
      articleCacheEntry.lastError = error
      articleCacheEntry.data = null
      return null
    })
    .finally(() => {
      articleCacheEntry.fetchPromise = null
    })

  return articleCacheEntry.fetchPromise
}
