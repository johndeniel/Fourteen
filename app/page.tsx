'use client'

import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { SiteFooter } from '@/components/site-footer'
import { useEffect, useState } from 'react'
import { ref, get } from 'firebase/database'
import { Cover } from '@/lib/model/cover'
import database from '@/lib/firebase-config'

export default function Home() {
  const [covers, setCovers] = useState<Cover[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const coverRef = ref(database, 'cover')
      const snapshot = await get(coverRef)
      if (snapshot.exists()) {
        const coverData = snapshot.val()
        const coversArray = Object.values(coverData).map(
          (item) => new Cover(item),
        )
        setCovers(coversArray)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="relative h-full w-full items-center  justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
        {covers.map((cover, index) => (
          <CardSnapshot key={index} cover={cover} />
        ))}
      </div>
      <SiteFooter />
    </main>
  )
}
