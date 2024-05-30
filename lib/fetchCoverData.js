import { ref, get } from 'firebase/database'
import database from '@/lib/firebase-config'
import { Cover } from '@/lib/model/cover'

let cache = {}

const fetchCoverData = () => {
  if (!cache.promise) {
    cache.promise = get(ref(database, 'cover'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const coverData = snapshot.val()
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

export default fetchCoverData
