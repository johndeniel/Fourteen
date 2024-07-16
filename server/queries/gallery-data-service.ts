import { ref, get, DatabaseReference } from 'firebase/database'
import { GalleryModel } from '@/lib/model/gallery-model'
import { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import database from '@/lib/firebase-config'

/**
 * Represents the structure of the gallery cache.
 */
interface GalleryCache {
  data: GalleryModel[] | null
  fetchPromise: Promise<GalleryModel[]> | null
  lastError: Error | null
}

/**
 * Cache to store fetched gallery data.
 */
const galleryCache: GalleryCache = {
  data: null,
  fetchPromise: null,
  lastError: null,
}

/**
 * Firebase database path for gallery.
 */
const GALLERY_DB_PATH = 'gallery'

/**
 * Fetches gallery data from Firebase and caches the result.
 * @returns A promise that resolves to an array of GalleryModel.
 */
export async function FetchGalleryData(): Promise<GalleryModel[]> {
  if (galleryCache.data !== null) {
    return galleryCache.data
  }

  if (galleryCache.fetchPromise) {
    return galleryCache.fetchPromise
  }

  const galleryDatabaseRef: DatabaseReference = ref(database, GALLERY_DB_PATH)

  galleryCache.fetchPromise = get(galleryDatabaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const galleryDataMap = snapshot.val() as Record<string, GalleryTypedef>
        const galleryData = Object.values(galleryDataMap)
          .map((item) => new GalleryModel(item))
          .sort((a, b) => a.id - b.id)
        galleryCache.data = galleryData
        return galleryData
      } else {
        galleryCache.data = []
        return []
      }
    })
    .catch((error: Error) => {
      console.error('Error fetching gallery data:', error)
      galleryCache.lastError = error
      galleryCache.data = []
      throw error // Re-throw the error to allow the caller to handle it
    })
    .finally(() => {
      galleryCache.fetchPromise = null
    })

  return galleryCache.fetchPromise
}
