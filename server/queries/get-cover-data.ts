import { ref, get } from 'firebase/database'
import { Cover } from '@/lib/model/cover'
import { CoverTypedef } from '@/lib/typedef/cover-typedef'
import database from '@/lib/firebase-config'

type Cache = {
  data?: Cover[]
  promise?: Promise<Cover[]>
  error?: Error
}

let cache: Cache = {}

export const GetCoverData = (): Promise<Cover[]> => {
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
        return cache.data
      })
      .catch((error) => {
        cache.error = error
        throw error
      })
  }

  return cache.promise
}
