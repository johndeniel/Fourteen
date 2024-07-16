import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticleModel } from '@/lib/model/article-model'
import { ArticleTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

/**
 * Represents the structure of the article cache.
 */
interface ArticleCache {
  data: ArticleModel[] | null
  fetchPromise: Promise<ArticleModel[] | null> | null
  lastError: Error | null
}

/**
 * Cache to store fetched articles.
 */
const articlesCache: Record<string, ArticleCache> = {}

/**
 * Firebase database path for articles.
 */
const ARTICLE_DB_PATH = 'article'

/**
 * Fetches article data from Firebase and caches the result.
 * @param articleId - The ID of the article to fetch.
 * @returns A promise that resolves to an array of ArticleModel or null if not found.
 */
export async function FetchArticleData(
  articleId: string,
): Promise<ArticleModel[] | null> {
  if (!articlesCache[articleId]) {
    articlesCache[articleId] = {
      data: null,
      fetchPromise: null,
      lastError: null,
    }
  }

  const articleCacheEntry = articlesCache[articleId]

  if (articleCacheEntry.data !== null) {
    return articleCacheEntry.data
  }

  if (articleCacheEntry.fetchPromise) {
    return articleCacheEntry.fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, ARTICLE_DB_PATH)

  articleCacheEntry.fetchPromise = get(child(articleDatabaseRef, articleId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ArticleTypedef>
        const articles = Object.values(data).map(
          (articleData) => new ArticleModel(articleData),
        )
        articleCacheEntry.data = articles
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
