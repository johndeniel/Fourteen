import { ref, get, child, DatabaseReference } from 'firebase/database'
import { ArticleModel } from '@/lib/model/article-model'
import { ArticleTypedef } from '@/lib/typedef/article-typedef'
import database from '@/lib/firebase-config'

interface SectionsCache {
  [key: string]: {
    data?: ArticleModel[] | null
    fetchPromise?: Promise<ArticleModel[] | null>
    lastError?: Error
  }
}

const sectionsCache: SectionsCache = {}

export const FetchSectionData = async (
  sectionId: string,
): Promise<ArticleModel[] | null> => {
  if (sectionsCache[sectionId]?.data !== undefined) {
    return sectionsCache[sectionId].data
  }

  if (sectionsCache[sectionId]?.fetchPromise) {
    return sectionsCache[sectionId].fetchPromise
  }

  const articleDatabaseRef: DatabaseReference = ref(database, 'article')

  if (!sectionsCache[sectionId]) {
    sectionsCache[sectionId] = {}
  }

  sectionsCache[sectionId].fetchPromise = get(
    child(articleDatabaseRef, sectionId),
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ArticleTypedef>

        const sections = Object.values(data).map(
          (sectionData) => new ArticleModel(sectionData),
        )
        sectionsCache[sectionId].data = sections
        return sectionsCache[sectionId].data
      } else {
        sectionsCache[sectionId].data = null
        return null
      }
    })
    .catch((error: Error) => {
      sectionsCache[sectionId].lastError = error
      sectionsCache[sectionId].data = null
      return null
    })
    .finally(() => {
      sectionsCache[sectionId].fetchPromise = undefined
    })

  return sectionsCache[sectionId].fetchPromise
}
