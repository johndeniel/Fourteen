import { ref, get } from 'firebase/database'
import database from '@/lib/firebase-config'
import { Cover } from '@/lib/model/cover'
import { CoverTypedef } from '@/lib/typedef/cover-typedef'

type Cache = {
  data?: Cover[]
  promise?: Promise<void>
  error?: Error
}

let cache: Cache = {}

export const GetCoverData = (): Cover[] => {
  if (!cache.promise) {
    cache.promise = get(ref(database, 'cover'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const coverData: { [key: string]: CoverTypedef } = snapshot.val()
          cache.data = Object.values(coverData).map((item) => new Cover(item))
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
