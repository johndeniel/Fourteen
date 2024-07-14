import { ref, get, DatabaseReference } from 'firebase/database'
import { Cover } from '@/lib/model/cover'
import { CoverTypedef } from '@/lib/typedef/cover-typedef'
import database from '@/lib/firebase-config'

/**
 * Cache interface for storing Cover data, promises, and errors.
 */
interface CoverCache {
  data?: Cover[]
  fetchPromise?: Promise<Cover[]>
  lastError?: Error
}

// Initialize the cache object
const coverCache: CoverCache = {}

/**
 * Fetches cover data from Firebase and caches the result.
 * @returns A promise that resolves to an array of Cover objects.
 */
export const fetchCoverData = async (): Promise<Cover[]> => {
  // Return cached data if available
  if (coverCache.data) {
    return coverCache.data
  }

  // Return existing promise if a fetch is already in progress
  if (coverCache.fetchPromise) {
    return coverCache.fetchPromise
  }

  const coverDatabaseRef: DatabaseReference = ref(database, 'cover')

  coverCache.fetchPromise = get(coverDatabaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const coverDataMap: Record<string, CoverTypedef> = snapshot.val()
        coverCache.data = Object.values(coverDataMap)
          .map((item) => new Cover(item))
          .sort((a, b) => a.id - b.id)
      } else {
        coverCache.data = []
      }
      return coverCache.data
    })
    .catch((error: Error) => {
      coverCache.lastError = error
      console.error('Error fetching cover data:', error)
      throw error
    })
    .finally(() => {
      // Clear the promise from cache once resolved or rejected
      coverCache.fetchPromise = undefined
    })

  return coverCache.fetchPromise
}
