'use client'

import { use, Suspense, useState, useEffect } from 'react'
import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { CardSnapshotSkeleton } from '@/components/card-snapshot-skeleton'
import { SiteFooter } from '@/components/site-footer'
import { GetCoverData } from '@/server/queries/get-cover-data'
import { Cover } from '@/lib/model/cover'
import { GithubProject } from '@/components/github-project'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import { GetRecentRepos } from '@/server/queries/get-recent-repos'

export default function Home() {
  const coversPromise = GetCoverData()
  const [project, setProject] = useState<RepositoryTypedef[]>([])

  useEffect(() => {
    async function fetchRepository() {
      const res = await getRepository()
      setProject(res)
    }
    fetchRepository()
  }, [])

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <Suspense fallback={<CoverListSkeleton count={6} />}>
        <Covers promise={coversPromise} />
      </Suspense>
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
        <GithubProject projects={project} />
      </div>
      <SiteFooter />
    </main>
  )
}

function Covers({ promise }: { promise: Promise<Cover[]> }) {
  const covers = use(promise)
  return <CoverList covers={covers} />
}

function CoverList({ covers }: { covers: Cover[] }) {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {covers.map((cover: Cover) => (
        <CardSnapshot key={cover.id} cover={cover} />
      ))}
    </div>
  )
}

function CoverListSkeleton({ count }: { count: number }) {
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <CardSnapshotSkeleton key={index} />
  ))

  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {skeletons}
    </div>
  )
}

async function getRepository(): Promise<RepositoryTypedef[]> {
  try {
    const repository = await GetRecentRepos()
    return repository
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}
