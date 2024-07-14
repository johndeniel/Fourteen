import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticlesModel } from '@/lib/model/article-model'
import { ArticlesTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

/**
 * Cache interface for storing Articles data, promises, and errors.
 */
interface ArticlesCache {
  [key: string]: {
    data?: ArticlesModel
    fetchPromise?: Promise<ArticlesModel | null>
    lastError?: Error
  }
}

// Initialize the cache object
const articlesCache: ArticlesCache = {}

/**
 * Fetches article data from Firebase and caches the result.
 * @param articleId - The ID of the article to fetch.
 * @returns A promise that resolves to an ArticlesModel object or null.
 */
export const FetchArticleData = async (
  articleId: string,
): Promise<ArticlesModel | null> => {
  // Return cached data if available
  if (articlesCache[articleId]?.data) {
    return articlesCache[articleId].data
  }

  // Return existing promise if a fetch is already in progress
  if (articlesCache[articleId]?.fetchPromise) {
    return articlesCache[articleId].fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, 'article')

  if (!articlesCache[articleId]) {
    articlesCache[articleId] = {}
  }

  articlesCache[articleId].fetchPromise = get(
    child(articleDatabaseRef, articleId),
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as ArticlesTypedef
        articlesCache[articleId].data = new ArticlesModel(data)
        return articlesCache[articleId].data
      } else {
        console.warn(`No article data available for ID: ${articleId}`)
        return null
      }
    })
    .catch((error: Error) => {
      articlesCache[articleId].lastError = error
      console.error(`Error fetching article data for ID ${articleId}:`, error)
      return null
    })
    .finally(() => {
      // Clear the promise from cache once resolved or rejected
      articlesCache[articleId].fetchPromise = undefined
    })

  return articlesCache[articleId].fetchPromise
}
