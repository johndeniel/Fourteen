import { ref, get, DatabaseReference } from 'firebase/database'
import { GalleryModel } from '@/lib/model/gallery-model'
import { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import database from '@/lib/firebase-config'

/**
 * Cache interface for storing Gallery data, promises, and errors.
 */
interface GalleryCache {
  data?: GalleryModel[]
  fetchPromise?: Promise<GalleryModel[]>
  lastError?: Error
}

// Initialize the cache object
const galleryCache: GalleryCache = {}

/**
 * Fetches gallery data from Firebase and caches the result.
 * @returns A promise that resolves to an array of gallery objects.
 */
export const FetchGalleryData = async (): Promise<GalleryModel[]> => {
  // Return cached data if available
  if (galleryCache.data) {
    return galleryCache.data
  }

  // Return existing promise if a fetch is already in progress
  if (galleryCache.fetchPromise) {
    return galleryCache.fetchPromise
  }

  const coverDatabaseRef: DatabaseReference = ref(database, 'cover')

  galleryCache.fetchPromise = get(coverDatabaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const coverDataMap: Record<string, GalleryTypedef> = snapshot.val()
        galleryCache.data = Object.values(coverDataMap)
          .map((item) => new GalleryModel(item))
          .sort((a, b) => a.id - b.id)
      } else {
        galleryCache.data = []
      }
      return galleryCache.data
    })
    .catch((error: Error) => {
      galleryCache.lastError = error
      console.error('Error fetching cover data:', error)
      throw error
    })
    .finally(() => {
      // Clear the promise from cache once resolved or rejected
      galleryCache.fetchPromise = undefined
    })

  return galleryCache.fetchPromise
}
