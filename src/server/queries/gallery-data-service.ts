// this is server/queries/gallery-data-service.ts
import { ref, get, type DatabaseReference } from 'firebase/database'
import type { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import { database } from '@/plugins/firebase'

interface GalleryCache {
  data: GalleryTypedef[] | null
  fetchPromise: Promise<GalleryTypedef[]> | null
  lastError: Error | null
  lastFetchTime: number | null
}

const galleryCache: GalleryCache = {
  data: null,
  fetchPromise: null,
  lastError: null,
  lastFetchTime: null,
}

const GALLERY_DB_PATH = 'gallery'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

export async function FetchGalleryData(): Promise<GalleryTypedef[]> {
  // Check if we have fresh cached data
  if (
    galleryCache.data !== null &&
    galleryCache.lastFetchTime &&
    Date.now() - galleryCache.lastFetchTime < CACHE_DURATION
  ) {
    return galleryCache.data
  }

  // If there's already a fetch in progress, wait for it
  if (galleryCache.fetchPromise) {
    return galleryCache.fetchPromise
  }

  const galleryDatabaseRef: DatabaseReference = ref(database, GALLERY_DB_PATH)

  galleryCache.fetchPromise = get(galleryDatabaseRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const galleryDataMap = snapshot.val() as Record<string, GalleryTypedef>

        // Validate and sort the data
        const galleryData = Object.values(galleryDataMap)
          .filter((item): item is GalleryTypedef => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof item.id === 'number' &&
              typeof item.title === 'string' &&
              typeof item.description === 'string'
            )
          })
          .sort((a, b) => a.id - b.id)

        galleryCache.data = galleryData
        galleryCache.lastFetchTime = Date.now()
        galleryCache.lastError = null

        return galleryData
      } else {
        galleryCache.data = []
        galleryCache.lastFetchTime = Date.now()
        return []
      }
    })
    .catch((error: Error) => {
      console.error('Error fetching gallery data:', error)
      galleryCache.lastError = error

      // Return cached data if available, otherwise empty array
      if (galleryCache.data !== null) {
        return galleryCache.data
      }

      galleryCache.data = []
      throw error
    })
    .finally(() => {
      galleryCache.fetchPromise = null
    })

  return galleryCache.fetchPromise
}

export function clearGalleryCache(): void {
  galleryCache.data = null
  galleryCache.fetchPromise = null
  galleryCache.lastError = null
  galleryCache.lastFetchTime = null
}

export function getGalleryCacheStatus() {
  return {
    hasData: galleryCache.data !== null,
    isLoading: galleryCache.fetchPromise !== null,
    lastError: galleryCache.lastError,
    lastFetchTime: galleryCache.lastFetchTime,
  }
}
