'use client'

import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { CardSnapshotSkeleton } from '@/components/card-snapshot-skeleton'
import { SiteFooter } from '@/components/site-footer'
import { useState, useEffect, Suspense } from 'react'
import { GetCoverData } from '@/server/queries/get-cover-data'
import { Cover } from '@/lib/model/cover'
import { GithubProject } from '@/components/github-project'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import { GetRecentRepos } from '@/server/queries/get-recent-repos'

async function getRepo(): Promise<RepositoryTypedef[]> {
  try {
    const repoNames = await GetRecentRepos()
    console.log('Repository names:', repoNames)
    return repoNames
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

export default function Home() {
  const covers: Cover[] = GetCoverData()
  const [project, setProject] = useState<RepositoryTypedef[]>([])

  useEffect(() => {
    async function fetchRepo() {
      const repoData = await getRepo()
      setProject(repoData)
    }
    fetchRepo()
  }, [])

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <Suspense fallback={<CoverListSkeleton count={covers.length} />}>
        <CoverList covers={covers} />
      </Suspense>
      <div className="sm:mt-28">
        <GithubProject projects={project} />
      </div>
      <SiteFooter />
    </main>
  )
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
