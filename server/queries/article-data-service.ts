import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticleModel } from '@/lib/model/article-model'
import { ArticleTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

interface SectionCache {
  data: ArticleModel[] | null
  fetchPromise: Promise<ArticleModel[] | null> | null
  lastError: Error | null
}

const sectionsCache: Record<string, SectionCache> = {}

export const FetchArticleData = async (
  sectionId: string,
): Promise<ArticleModel[] | null> => {
  if (!sectionsCache[sectionId]) {
    sectionsCache[sectionId] = {
      data: null,
      fetchPromise: null,
      lastError: null,
    }
  }

  const cache = sectionsCache[sectionId]

  if (cache.data !== null) {
    return cache.data
  }

  if (cache.fetchPromise) {
    return cache.fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, 'article')

  cache.fetchPromise = get(child(articleDatabaseRef, sectionId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ArticleTypedef>
        const sections = Object.values(data).map(
          (sectionData) => new ArticleModel(sectionData),
        )
        cache.data = sections
        return sections
      } else {
        cache.data = null
        return null
      }
    })
    .catch((error: Error) => {
      cache.lastError = error
      cache.data = null
      return null
    })
    .finally(() => {
      cache.fetchPromise = null
    })

  return cache.fetchPromise
}
