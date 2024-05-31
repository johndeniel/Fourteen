import { ref, get } from 'firebase/database'
import { Cover } from '@/lib/model/cover'
import { CoverTypedef } from '@/lib/typedef/cover-typedef'
import database from '@/lib/firebase-config'

type Cache = {
  data?: Cover[]
  promise?: Promise<void>
  error?: Error
}

let cache: Cache = {}

export const GetCoverData = (): Cover[] => {
  if (!cache.promise) {
    const coverRef = ref(database, 'cover')

    cache.promise = get(coverRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const coverData: { [key: string]: CoverTypedef } = snapshot.val()
          cache.data = Object.values(coverData)
            .map((item) => new Cover(item))
            .sort((a, b) => a.id - b.id)
        } else {
          cache.data = []
        }
      })
      .catch((error) => {
        cache.error = error
      })
  }

  if (cache.error) {
    throw cache.error
  }

  if (!cache.data) {
    throw cache.promise
  }

  return cache.data
}
