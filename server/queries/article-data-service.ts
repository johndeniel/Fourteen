import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticleModel } from '@/lib/model/article-model'
import { ArticleTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

interface ArticleCache {
  data: ArticleModel[] | null
  fetchPromise: Promise<ArticleModel[] | null> | null
  lastError: Error | null
}

const articlesCache: Record<string, ArticleCache> = {}

export const FetchArticleData = async (
  articleId: string,
): Promise<ArticleModel[] | null> => {
  if (!articlesCache[articleId]) {
    articlesCache[articleId] = {
      data: null,
      fetchPromise: null,
      lastError: null,
    }
  }

  const cache = articlesCache[articleId]

  if (cache.data !== null) {
    return cache.data
  }

  if (cache.fetchPromise) {
    return cache.fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, 'article')

  cache.fetchPromise = get(child(articleDatabaseRef, articleId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ArticleTypedef>
        const articles = Object.values(data).map(
          (articleData) => new ArticleModel(articleData),
        )
        cache.data = articles
        console.log('Fetched Data:', articles) // Logging the fetched data
        return articles
      } else {
        cache.data = null
        console.log('No data found for articleId:', articleId) // Logging when no data is found
        return null
      }
    })
    .catch((error: Error) => {
      cache.lastError = error
      cache.data = null
      console.error('Error fetching data for articleId:', articleId, error) // Logging the error
      return null
    })
    .finally(() => {
      cache.fetchPromise = null
    })

  return cache.fetchPromise
}
