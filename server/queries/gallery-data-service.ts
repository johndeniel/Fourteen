import { ref, get, DatabaseReference } from 'firebase/database'
import { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import database from '@/lib/firebase-config'

interface GalleryCache {
  data: GalleryTypedef[] | null
  fetchPromise: Promise<GalleryTypedef[]> | null
  lastError: Error | null
}

const galleryCache: GalleryCache = {
  data: null,
  fetchPromise: null,
  lastError: null,
}

const GALLERY_DB_PATH = 'gallery'

export async function FetchGalleryData(): Promise<GalleryTypedef[]> {
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
        const galleryData = Object.values(galleryDataMap).sort(
          (a, b) => a.id - b.id,
        )
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
      throw error
    })
    .finally(() => {
      galleryCache.fetchPromise = null
    })

  return galleryCache.fetchPromise
}
